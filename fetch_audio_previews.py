import urllib.request
import urllib.parse
import json
import re
import time
import os

books_path = 'src/data/books.ts'

with open(books_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract title, author, and narrator for search
books = []
current_book = {}

for line in lines:
    title_match = re.search(r"title:\s*['\x22](.*?)['\x22],", line)
    author_match = re.search(r"author:\s*['\x22](.*?)['\x22],", line)
    narrator_match = re.search(r"narrator:\s*['\x22](.*?)['\x22],", line)
    
    if title_match: current_book['title'] = title_match.group(1)
    if author_match: current_book['author'] = author_match.group(1)
    if narrator_match: current_book['narrator'] = narrator_match.group(1)
    
    # affiliateLink is always at the bottom of a book object in our format
    if 'affiliateLink:' in line:
        if 'title' in current_book and 'author' in current_book:
            books.append(current_book)
        current_book = {}

print(f"Found {len(books)} books to search.")

previews = {}

for i, book in enumerate(books):
    title = book['title']
    author = book['author']
    narrator = book.get('narrator', '')
    
    # Strip out extra narrator info like "Full Cast" or "et al." to help search
    if narrator:
        narrator = narrator.replace('Full Cast', '').replace('et al.', '').replace('()', '').strip()
        # If multiple narrators (comma separated), just use the first one to improve match rate
        if ',' in narrator:
            narrator = narrator.split(',')[0].strip()

    search_queries = []
    
    # Primary Query: Title + Author + Narrator
    if narrator:
        search_queries.append(f"{title} {author} {narrator}")
    
    # Fallback Query: Title + Author
    search_queries.append(f"{title} {author}")
    
    # Fallback 2: Title only
    search_queries.append(f"{title}")
    
    found_preview = False
    
    for query_idx, search_term in enumerate(search_queries):
        if found_preview:
            break
            
        encoded_term = urllib.parse.quote(search_term)
        url = f"https://itunes.apple.com/search?term={encoded_term}&media=audiobook&limit=1"
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))
                
                if data['resultCount'] > 0:
                    preview_url = data['results'][0].get('previewUrl')
                    if preview_url:
                        previews[title] = preview_url
                        if query_idx == 0 and narrator:
                            print(f"[{i+1}/{len(books)}] SUCCESS (Exact Narrator Match): {title} ({narrator})")
                        elif query_idx == 1 and narrator:
                            print(f"[{i+1}/{len(books)}] SUCCESS (Fallback - Generic Edition): {title}")
                        else:
                            print(f"[{i+1}/{len(books)}] SUCCESS (Generic): {title}")
                        found_preview = True
        except Exception as e:
            if "403" in str(e) or "429" in str(e):
                print(f"[{i+1}/{len(books)}] RATE LIMIT HIT. Taking a long break...")
                time.sleep(5)
            # Will just silently continue to next fallback if it's a normal error
            pass
        
        # Be polite to the API between fallback attempts
        time.sleep(1)
        
    if not found_preview:
        print(f"[{i+1}/{len(books)}] NO PREVIEW FOUND: {title}")
        
    # Be polite between books
    time.sleep(1.5)

print(f"\nFound previews for {len(previews)} out of {len(books)} books.")

print("Updating books.ts (overwriting existing audio preview URLs with exact matches)...")
new_lines = []
current_book_title = None
in_book_block = False

# We will read lines again, remove old audioPreviewUrl lines, and inject the new ones
for line in lines:
    title_match = re.search(r"title:\s*['\x22](.*?)['\x22],", line)
    if title_match:
        current_book_title = title_match.group(1)
        in_book_block = True
    
    # Skip old audioPreviewUrl lines
    if 'audioPreviewUrl:' in line:
        continue
        
    if in_book_block and 'affiliateLink:' in line:
        if current_book_title in previews:
            preview_url = previews[current_book_title]
            new_lines.append(f"        audioPreviewUrl: '{preview_url}',\n")
        in_book_block = False
        current_book_title = None
    
    new_lines.append(line)

with open(books_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Finished updating books.ts!")
