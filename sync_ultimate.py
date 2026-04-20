import urllib.request, re

print("Downloading live JS bundle...")
req = urllib.request.Request('https://thelongbookclub.com/assets/index-Bv8gATc0.js', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        js = response.read().decode('utf-8')
except Exception as e:
    print(f"Error downloading bundle: {e}")
    exit(1)

print("Extracting live metadata (Safe mapping)...")
# Find slugs and metadata from the live bundle
# objects in js look like {id:"1",slug:"one",title:"One",author:"Author",...}
matches = re.finditer(r'\{[^{}]*?slug:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?title:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?\}', js)
live_metadata = {}

def extract_val(field, obj_str):
    m = re.search(rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
    return m.group(1).strip('"\'') if m else None

for m in matches:
    obj_str = m.group(0)
    slug = m.group(1).strip('"\'')
    meta = {}
    for f in ['relatedBookIds', 'cardOverview', 'teaser', 'teaserTitle', 'narrator']:
        v = re.search(rf'{f}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
        if v:
            val = v.group(1)
            if f == 'relatedBookIds':
                val = val.replace('"', "'").replace(',', ', ')
            meta[f] = val
    if meta:
        live_metadata[slug] = meta

print(f"Captured {len(live_metadata)} books from live.")

books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
with open(books_path, 'r') as f:
    text = f.read()

# Define the boundaries of the baseBooks array
start_tag = 'export const baseBooks: Book[] = ['
end_tag = '];'
start_idx = text.find(start_tag) + len(start_tag)
end_idx = text.rfind(end_tag)

header = text[:start_idx]
footer = text[end_idx:]
array_content = text[start_idx:end_idx]

# Pattern to find each book entry block { ... } in the array
# We look for leading 4 spaces, an opening bracket, anything inside, and a closing bracket at same level
# Note: This regex is sensitive to the fact that your books.ts doesn't have nested braces.
book_pattern = re.compile(r'(\n\s*\{.*?\n\s*\})', re.DOTALL)
blocks = book_pattern.findall(array_content)

print(f"Detected {len(blocks)} books in local file.")

new_blocks = []
injected_count = 0

for block in blocks:
    # Extract slug
    slug_match = re.search(r"slug:\s*['\x22](.*?)['\x22]", block)
    if not slug_match:
        new_blocks.append(block)
        continue
    
    slug = slug_match.group(1)
    if slug in live_metadata:
        meta = live_metadata[slug]
        
        # Clean current block of these fields
        for field in meta.keys():
            block = re.sub(rf'\n\s*{field}:\s*.*?(?:,\n|,\s|\n)', '\n', block, flags=re.DOTALL)
        
        # Inject metadata
        injection = ""
        for field, value in meta.items():
            injection += f"\n        {field}: {value},"
            
        # Insert before the last }
        last_bracket_pos = block.rfind('}')
        if last_bracket_pos != -1:
            block = block[:last_bracket_pos].rstrip() + injection + "\n    }"
            injected_count += 1
            
    new_blocks.append(block)

# Join the blocks with commas
# The regex findall might have missed the commas between them, so we just join with comma and newline.
final_array = ",".join(new_blocks) + "\n"
final_text = header + final_array + footer

with open(books_path, 'w') as f:
    f.write(final_text)

print(f"ULTIMATE SYNC SUCCESS: {injected_count} books synchronized.")
