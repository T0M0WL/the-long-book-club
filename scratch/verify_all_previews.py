import urllib.request, re, json, time
from urllib.parse import quote

def get_books_metadata():
    books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
    with open(books_path, 'r') as f:
        content = f.read()
    
    # Simple regex to get title, author, and narrator
    book_blocks = re.findall(r'\{[^{}]*?title:\s*[\'"](.*?)[\'"].*?author:\s*[\'"](.*?)[\'"].*?audioPreviewUrl:\s*[\'"](.*?)[\'"]', content, re.DOTALL)
    
    # We also need the narrator from reviews.ts
    reviews_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/reviews.ts'
    with open(reviews_path, 'r') as f:
        rev_content = f.read()
    
    narrators = {}
    for match in re.finditer(r'[\'"](.*?)[\'"]:\s*\{.*?narrator:\s*[\'"](.*?)[\'"]', rev_content, re.DOTALL):
        narrators[match.group(1)] = match.group(2)
        
    return [(b[0], b[1], narrators.get(b[0], "Unknown"), b[2]) for b in book_blocks]

def verify_previews():
    books = get_books_metadata()
    mismatches = []
    
    print(f"Checking {len(books)} books...")
    
    for title, author, narrator, current_url in books:
        if not narrator or narrator == "Unknown":
            continue
            
        term = quote(f"{title} {author} {narrator}")
        url = f"https://itunes.apple.com/search?term={term}&media=audiobook&limit=1"
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))
                
            if data['resultCount'] > 0:
                result = data['results'][0]
                matched_url = result.get('previewUrl')
                
                # Check for major mismatches
                # 1. URL mismatch (could just be a different part/edition)
                # 2. Artist mismatch (Narrator check)
                
                # The iTunes API usually puts the author in artistName for audiobooks, 
                # but sometimes the narrator is in the description or elsewhere.
                # Apple's search is finicky.
                
                if matched_url != current_url:
                    # It's a different URL. Let's see why.
                    # We'll just flag it for manual review if it's not a close match.
                    mismatches.append({
                        "title": title,
                        "expected_narrator": narrator,
                        "current_url": current_url,
                        "found_url": matched_url,
                        "found_title": result.get('collectionName'),
                        "found_artist": result.get('artistName')
                    })
            else:
                print(f"⚠️ No results found for: {title} by {author} ({narrator})")
                
        except Exception as e:
            print(f"Error checking {title}: {e}")
        
        time.sleep(0.2) # Rate limit safety
        
    return mismatches

if __name__ == "__main__":
    mismatches = verify_previews()
    if mismatches:
        print(f"\nFound {len(mismatches)} potential mismatches for manual review:\n")
        for m in mismatches:
            print(f"--- {m['title']} ---")
            print(f"Current URL: {m['current_url']}")
            print(f"Found URL:   {m['found_url']}")
            print(f"Narrator:    {m['expected_narrator']}")
            print(f"Found Title: {m['found_title']}")
            print(f"Found Artist: {m['found_artist']}")
            print("")
    else:
        print("\n✅ All previews appear to be consistent with narrator searches!")
