import urllib.request, re

print("Downloading live JS bundle...")
req = urllib.request.Request('https://thelongbookclub.com/assets/index-Bv8gATc0.js', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        js = response.read().decode('utf-8')
except Exception as e:
    print(f"Error downloading bundle: {e}")
    exit(1)

print("Extracting live metadata (Slug-based mapping)...")
# Match specifically for objects with SLUG and TITLE (Books)
matches = re.finditer(r'\{[^{}]*?slug:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?title:(\x22[^\x22]+\x22|\x27[^\x27]+\x27)[^{}]*?\}', js)
live_data = {}

def extract_val(field, obj_str):
    m = re.search(rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
    return m.group(1).strip('"\'') if m else None

for m in matches:
    obj_str = m.group(0)
    slug = m.group(1).strip('"\'')
    metadata = {}
    for field in ['relatedBookIds', 'cardOverview', 'teaser', 'teaserTitle', 'narrator']:
        m_field = re.search(rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)', obj_str)
        if m_field:
            val = m_field.group(1)
            if field == 'relatedBookIds':
                val = val.replace('"', "'").replace(',', ', ')
            metadata[field] = val
    if metadata:
        live_data[slug] = metadata

print(f"Captured metadata for {len(live_data)} books.")

books_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/books.ts'
with open(books_path, 'r') as f:
    text = f.read()

start_marker = 'export const baseBooks: Book[] = ['
end_marker = '];'
start_idx = text.find(start_marker) + len(start_marker)
end_idx = text.rfind(end_marker)
array_content = text[start_idx:end_idx]

# Split by objects
blocks = re.split(r'\},', array_content)
new_blocks = []
updates = 0

for block in blocks:
    if not block.strip(): continue
    clean_block = block.strip()
    if not clean_block.startswith('{'):
        new_blocks.append(block)
        continue
    
    slug_m = re.search(r"slug:\s*['\x22](.*?)['\x22]", clean_block)
    if slug_m:
        slug = slug_m.group(1)
        if slug in live_data:
            metadata = live_data[slug]
            for field in metadata.keys():
                clean_block = re.sub(rf'\s*{field}:\s*.*?(?:,\n|,\s|\n)', '\n', clean_block, flags=re.DOTALL)
            
            injection = ""
            for field, val in metadata.items():
                injection += f"\n        {field}: {val},"
            
            last_bracket = clean_block.rfind('}')
            if last_bracket != -1:
                clean_block = clean_block[:last_bracket] + injection + "\n    }"
                updates += 1
            
    new_blocks.append("\n    " + clean_block)

final_text = text[:start_idx] + ",".join(new_blocks) + "\n" + text[end_idx:]
with open(books_path, 'w') as f:
    f.write(final_text)

print(f"SUCCESS: Synchronized {updates} books.")
