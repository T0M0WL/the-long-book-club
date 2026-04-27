import urllib.request, re, json, time
from urllib.parse import quote

def get_books_metadata():
    books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
    with open(books_path, 'r') as f:
        content = f.read()
    
    # Split content by book blocks
    blocks = re.split(r'\n\s*\{', content)
    
    # We also need the narrator from reviews.ts
    reviews_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/reviews.ts'
    with open(reviews_path, 'r') as f:
        rev_content = f.read()
    
    narrators_map = {}
    for match in re.finditer(r'[\'"](.*?)[\'"]:\s*\{.*?narrator:\s*[\'"](.*?)[\'"]', rev_content, re.DOTALL):
        narrators_map[match.group(1)] = match.group(2)
        
    books = []
    for block in blocks:
        title_m = re.search(r'title:\s*[\'"](.*?)[\'"]', block)
        author_m = re.search(r'author:\s*[\'"](.*?)[\'"]', block)
        url_m = re.search(r'audioPreviewUrl:\s*[\'"](.*?)[\'"]', block)
        if title_m and author_m and url_m:
            title = title_m.group(1)
            author = author_m.group(1)
            url = url_m.group(1)
            narrator = narrators_map.get(title, "")
            if not narrator:
                nb_m = re.search(r'narrator:\s*[\'"](.*?)[\'"]', block)
                if nb_m: narrator = nb_m.group(1)
            
            books.append((title, author, narrator, url))
            
    return books

def verify_previews():
    books = get_books_metadata()
    suspicious = []
    
    print(f"Auditing {len(books)} books for narrator accuracy...")
    
    for title, author, narrator, current_url in books:
        if not narrator:
            # Try to search for author/title only if no narrator, but warn
            print(f"⚠️ No narrator metadata found for: {title}")
            continue
            
        term = quote(f"{title} {author} {narrator}")
        url = f"https://itunes.apple.com/search?term={term}&media=audiobook&limit=5"
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))
                
            results = data.get('results', [])
            found_current = any(r.get('previewUrl') == current_url for r in results)
            
            if not found_current:
                best_match = results[0] if results else None
                suspicious.append({
                    "title": title,
                    "expected_narrator": narrator,
                    "current_url": current_url,
                    "top_match_title": best_match.get('collectionName') if best_match else "None",
                    "top_match_url": best_match.get('previewUrl') if best_match else "None",
                    "top_match_artist": best_match.get('artistName') if best_match else "None"
                })
                
        except Exception as e:
            print(f"Error checking {title}: {e}")
        
        time.sleep(0.15)
        
    return suspicious

if __name__ == "__main__":
    suspicious = verify_previews()
    if suspicious:
        print(f"\nFound {len(suspicious)} suspicious entries where the current preview doesn't match a narrator search:\n")
        for s in suspicious:
            print(f"--- {s['title']} ---")
            print(f"Narrator:    {s['expected_narrator']}")
            print(f"Current URL: {s['current_url']}")
            print(f"Top Result:  {s['top_match_title']} (by {s['top_match_artist']})")
            print(f"Top URL:     {s['top_match_url']}")
            print("")
    else:
        print("\n✅ All previews passed the narrator audit!")
