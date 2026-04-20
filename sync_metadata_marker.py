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
matches = re.finditer(r'\{[^{}]*?slug:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?title:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?\}', js)
live_data = {}

def extract_val(field, obj_str):
    m = re.search(rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
    return m.group(1) if m else None

for m in matches:
    obj_str = m.group(0)
    slug = m.group(1).strip('"\'')
    metadata = {}
    for field in ['relatedBookIds', 'cardOverview', 'teaser', 'teaserTitle', 'narrator']:
        val = extract_val(field, obj_str)
        if val:
            if field == 'relatedBookIds':
                val = val.replace('"', "'").replace(',', ', ')
            metadata[field] = val
    if metadata:
        live_data[slug] = metadata

print(f"Captured metadata for {len(live_data)} books from live.")

books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
with open(books_path, 'r') as f:
    ts_content = f.read()

updates = 0
for slug, metadata in live_data.items():
    # Find the slug line
    pattern = rf"(slug:\s*['\x22]{re.escape(slug)}['\x22],)"
    slug_match = re.search(pattern, ts_content)
    if not slug_match: continue
        
    start_pos = slug_match.start()
    # Find the next closing bracket } for this object
    # We look for a } that is indented at the same level (4 spaces)
    closing_match = re.search(r'\n\s*\}', ts_content[start_pos:])
    if not closing_match: continue
    
    end_pos = start_pos + closing_match.start()
    
    # Extract the block between slug and the end of object
    block = ts_content[start_pos:end_pos]
    
    # Clean it
    for field in metadata.keys():
        block = re.sub(rf'\n\s*{field}:\s*.*?(?:,\n|,\s|\n)', '\n', block, flags=re.DOTALL)
    
    # Inject
    injection = ""
    for field, val in metadata.items():
        injection += f"\n        {field}: {val},"
    
    new_block = block.rstrip() + injection
    ts_content = ts_content[:start_pos] + new_block + ts_content[end_pos:]
    updates += 1

with open(books_path, 'w') as f:
    f.write(ts_content)

print(f"SUCCESS: Synchronized {updates} books.")
