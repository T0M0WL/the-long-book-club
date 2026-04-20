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
matches = re.finditer(r'\{[^{}]*?title:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?\}', js)
live_data = {}

for m in matches:
    obj_str = m.group(0)
    title = m.group(1).strip('"\'')
    metadata = {}
    for field in ['relatedBookIds', 'cardOverview', 'teaser', 'teaserTitle', 'narrator']:
        m_field = re.search(rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
        if m_field:
            val = m_field.group(1)
            if field == 'relatedBookIds':
                val = val.replace('"', "'").replace(',', ', ')
            metadata[field] = val
    if metadata:
        live_data[title] = metadata

print(f"Captured {len(live_data)} books from live.")

books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
with open(books_path, 'r') as f:
    text = f.read()

# We will replace the entire baseBooks array content
# Find the start and end of the array
start_marker = 'export const baseBooks: Book[] = ['
end_marker = '];'
start_idx = text.find(start_marker) + len(start_marker)
end_idx = text.rfind(end_marker)

array_content = text[start_idx:end_idx]

# Split into individual book objects by `},`
# This is safe because your books.ts is well-formatted
blocks = re.split(r'\},', array_content)

new_blocks = []
updates = 0

for block in blocks:
    if not block.strip():
        continue
    
    # Clean it up
    clean_block = block.strip()
    if not clean_block.startswith('{'):
        # This might be a separator or trailing bit
        new_blocks.append(block)
        continue
        
    # Extract title
    title_m = re.search(r"title:\s*['\x22](.*?)['\x22]", clean_block)
    if title_m:
        title = title_m.group(1)
        if title in live_data:
            metadata = live_data[title]
            
            # Remove existing versions of these fields
            for field in metadata.keys():
                clean_block = re.sub(rf'\s*{field}:\s*.*?(?:,\n|,\s|\n)', '\n', clean_block, flags=re.DOTALL)
            
            # Inject new metadata at the end of the object
            injection = ""
            for field, val in metadata.items():
                injection += f"\n        {field}: {val},"
            
            # Insert before the last closing }
            last_bracket = clean_block.rfind('}')
            if last_bracket != -1:
                clean_block = clean_block[:last_bracket] + injection + "\n    }"
                updates += 1
            
    new_blocks.append("\n    " + clean_block)

final_array = ",".join(new_blocks) + "\n"
final_text = text[:start_idx] + final_array + text[end_idx:]

with open(books_path, 'w') as f:
    f.write(final_text)

print(f"SUCCESS: Synchronized {updates} books. Verifying...")
