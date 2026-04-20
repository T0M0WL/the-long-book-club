import urllib.request, re

def get_live_data():
    print('1. Downloading live bundle...')
    url = 'https://thelongbookclub.com/assets/index-Bv8gATc0.js'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as res:
        js = res.read().decode('utf-8')

    print('2. Mapping live data by ID...')
    live = {}
    
    def extract_field(field, obj_str):
        # Matches field: [ ... ] or field: " ... " or field: ' ... '
        pattern = rf'{field}:\s*(\[.*?\]|\x22[^\x22]*\x22|\x27[^\x27]*\x27)'
        m = re.search(pattern, obj_str)
        return m.group(1) if m else None

    # Find every object with an ID in the live bundle
    for m in re.finditer(r'\{[^{}]*?id:\x22(\d+)\x22[^{}]*?\}', js):
        obj_str = m.group(0)
        bid = m.group(1)
        
        meta = {}
        for f in ['relatedBookIds', 'cardOverview', 'teaser', 'teaserTitle', 'narrator', 'genre', 'description']:
            val = extract_field(f, obj_str)
            if val:
                # Standardize arrays to single quotes for the TS file
                if f in ['relatedBookIds', 'genre']:
                    val = val.replace('"', "'")
                # Ensure strings are single-quoted if possible, or leave as is if double-quoted
                meta[f] = val
        
        if meta:
            live[bid] = meta
    return live

def sync_local(live_data):
    print(f'3. Syncing {len(live_data)} books (ID-Anchored)...')
    path = 'src/data/books.ts'
    with open(path, 'r') as f:
        text = f.read()

    start_tag = 'export const baseBooks: Book[] = ['
    end_tag = '];'
    start_idx = text.find(start_tag) + len(start_tag)
    end_idx = text.rfind(end_tag)

    header = text[:start_idx]
    footer = text[end_idx:]
    array_content = text[start_idx:end_idx]

    # Block Parser (State Machine)
    blocks = []
    current_block = ""
    depth = 0
    for char in array_content:
        current_block += char
        if char == '{': depth += 1
        elif char == '}':
            depth -= 1
            if depth == 0:
                blocks.append(current_block)
                current_block = ""

    new_blocks = []
    updated = 0
    for block in blocks:
        id_match = re.search(r'id:\s*[\x22\x27](\d+)[\x22\x27]', block)
        if id_match:
            bid = id_match.group(1)
            if bid in live_data:
                m = live_data[bid]
                # Clean block of the fields we are replacing
                for f in m.keys():
                    # Delete the whole line for this field
                    block = re.sub(rf'\n\s*{f}:.*?\n', '\n', block)
                
                # Inject metadata right after the opening {
                injection = ""
                for k, v in m.items():
                    injection += f"\n        {k}: {v},"
                
                idx = block.find('{') + 1
                block = block[:idx] + injection + block[idx:]
                updated += 1
        
        new_blocks.append(block)

    with open(path, 'w') as f:
        f.write(header + "".join(new_blocks) + footer)
    
    print(f'4. Successfully synchronized {updated} books.')

if __name__ == "__main__":
    live = get_live_data()
    sync_local(live)
