import os

def fix_file_content(file_path, replacements):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Successfully updated {os.path.basename(file_path)}")
    else:
        print(f"ℹ️ No changes needed in {os.path.basename(file_path)}")

# 1. Clean reviews.ts
reviews_path = "/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/data/reviews.ts"
reviews_replacements = {
    "https://www.thelongbookclub.com/book/": "https://thelongbookclub.com/book/"
}
fix_file_content(reviews_path, reviews_replacements)

# 2. Clean Links.tsx
links_path = "/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/pages/Links.tsx"
links_replacements = {
    "https://www.thelongbookclub.com/collections/longest-ever": "https://thelongbookclub.com/collections/longest-ever/"
}
fix_file_content(links_path, links_replacements)
