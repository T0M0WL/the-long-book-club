import urllib.request, re

print("Downloading live JS bundle...")
req = urllib.request.Request('https://thelongbookclub.com/assets/index-Bv8gATc0.js', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        js = response.read().decode('utf-8')
except Exception as e:
    print(f"Error downloading bundle: {e}")
    exit(1)

print("Extracting live metadata...")
# Match based on title:"..." to be absolutely certain of the mapping
matches = re.finditer(r'\{[^{}]*?title:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?\}', js)
live_data = {}

def extract_val(field, obj_str):
    # Match field: [ ... ] or field: " ... " or field: ' ... '
    m = re.search(rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
    return m.group(1) if m else None

for m in matches:
    obj_str = m.group(0)
    title = m.group(1).replace('"', '').replace("'", "")
    
    # We will use title as the primary key for local matching as it is unique in your database
    metadata = {}
    
    # relatedBookIds
    r_val = extract_val('relatedBookIds', obj_str)
    if r_val: metadata['relatedBookIds'] = r_val.replace('"', "'").replace(',', ', ')
    
    # cardOverview
    c_val = extract_val('cardOverview', obj_str)
    if c_val: metadata['cardOverview'] = c_val
    
    # teaser
    t_match = re.search(r'(?<!teaserTitle)teaser:(\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
    if t_match: metadata['teaser'] = t_match.group(1)
    
    # teaserTitle
    tt_val = extract_val('teaserTitle', obj_str)
    if tt_val: metadata['teaserTitle'] = tt_val
    
    if metadata:
        live_data[title] = metadata

print(f"Found live metadata for {len(live_data)} books.")

books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
with open(books_path, 'r') as f:
    lines = f.readlines()

print("Updating books.ts (Line-by-line mode to prevent shifting)...")
new_lines = []
current_book_title = None
in_book_block = False

# We'll walk the file. When we hit a title, we check if we have metadata for it.
# Then we'll inject it before the affiliateLink line.

for line in lines:
    # Detect book title
    title_match = re.search(r"title:\s*['\x22](.*?)['\x22],", line)
    if title_match:
        current_book_title = title_match.group(1)
        in_book_block = True
    
    # If we are in a book block and hit affiliateLink, inject our saved metadata
    if in_book_block and 'affiliateLink:' in line:
        if current_book_title in live_data:
            metadata = live_data[current_book_title]
            for field, value in metadata.items():
                new_lines.append(f"        {field}: {value},\n")
            # Clear it so we don't inject twice
            del live_data[current_book_title]
        in_book_block = False
        current_book_title = None
    
    # Before adding the line, clean existing metadata fields to avoid duplicates
    is_duplicate = any(f + ':' in line for f in ['relatedBookIds', 'cardOverview', 'teaser', 'teaserTitle'])
    if not is_duplicate:
        new_lines.append(line)

with open(books_path, 'w') as f:
    f.writelines(new_lines)

print(f"Update complete. {len(live_data)} titles remain unmatched (likely expected for deleted books).")
