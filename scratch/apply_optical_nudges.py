
import os
import re

file_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/pages/CollectionDetail.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# All slugs in the file
slugs = [
    'best-long-books-2025',
    'romantasy',
    'dark-academia',
    'longest-ever',
    'long-life-stories',
    'bucket-list'
]

# We use a regex to find the slug and then the next dimensions line
for slug in slugs:
    # Look for the slug check, then any content until the HERO_ICON_DIMS
    pattern = rf"(collection\.slug === '{slug}'[\s\S]*?topGraphicDimensions={{)HERO_ICON_DIMS(}})"
    content = re.sub(pattern, rf"\1getBalancedDims('{slug}')\2", content)

with open(file_path, 'w') as f:
    f.write(content)

print("Balanced scaling factors applied successfully to all collections.")
