import urllib.request, re

print("Downloading live JS bundle...")
req = urllib.request.Request('https://thelongbookclub.com/assets/index-Bv8gATc0.js', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        js = response.read().decode('utf-8')
except Exception as e:
    print(f"Error downloading bundle: {e}")
    exit(1)

print("Extracting live metadata (Perfect mapping)...")
# Find all book objects in the JS bundle
matches = re.finditer(r'\{[^{}]*?title:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?\}', js)
live_data = {}

def extract_val(field, obj_str):
    # Match field: [ ... ] or field: " ... " or field: ' ... '
    m = re.search(rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
    return m.group(1) if m else None

for m in matches:
    obj_str = m.group(0)
    title = m.group(1).replace('"', '').replace("'", "")
    metadata = {}
    
    # Extract ALL fields from live
    for field in ['relatedBookIds', 'cardOverview', 'teaser', 'teaserTitle', 'narrator']:
        val = extract_val(field, obj_str)
        if val:
            if field == 'relatedBookIds':
                val = val.replace('"', "'").replace(',', ', ')
            metadata[field] = val
    
    if metadata:
        live_data[title] = metadata

print(f"Captured metadata for {len(live_data)} books.")

books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
with open(books_path, 'r') as f:
    content = f.read()

# SPLIT INTO BLOCKS
# The file structure is essentially: export const baseBooks: Book[] = [ { ... }, { ... } ];
# We'll split on the `    {` (with 4 spaces) to get individual book starts.

# First, capture the header (everything before the first book)
header_match = re.search(r'export const baseBooks: Book\[\] = \[', content)
header = content[:header_match.end()]
footer = content[content.rfind('];'):]

# Extract the book entries part
books_section = content[header_match.end():content.rfind('];')]

# Split by `    {` but keep the separator
blocks = re.split(r'(\n\s*\{)', books_section)

new_blocks = []
current_separator = ""

for item in blocks:
    if re.match(r'\n\s*\{', item):
        current_separator = item
        continue
    
    if not item.strip():
        new_blocks.append(item)
        continue
    
    # This item is a book block (minus the opening `{`)
    # Re-attach the separator
    block_content = current_separator + item
    
    # Find title
    title_match = re.search(r"title:\s*['\x22](.*?)['\x22],", block_content)
    if title_match:
        title = title_match.group(1)
        if title in live_data:
            metadata = live_data[title]
            
            # Clean existing redundant fields from this block
            for field in metadata.keys():
                # Remove field: ..., (if it exists)
                block_content = re.sub(rf'\n\s*{field}:\s*.*?(?:,\s*?\n|\s*?\n)', '\n', block_content, flags=re.DOTALL)
            
            # Inject new metadata before the final closing bracket of the block
            # Find the last `    }`
            closing_match = list(re.finditer(r'\n\s*\}', block_content))
            if closing_match:
                last_closing = closing_match[-1]
                pos = last_closing.start()
                
                injection = ""
                for field, val in metadata.items():
                    injection += f"        {field}: {val},\n"
                
                block_content = block_content[:pos] + injection + block_content[pos:]
            
            del live_data[title]
            
    new_blocks.append(block_content)

# STITCH BACK TOGETHER
final_content = header + "".join(new_blocks) + footer

with open(books_path, 'w') as f:
    f.write(final_content)

print(f"Sync complete! Database rewritten with {len(new_blocks)} blocks.")
