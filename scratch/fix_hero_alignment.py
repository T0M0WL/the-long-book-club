
import os

file_path = '/Users/thomas/Desktop/The Long Book Club Project/TLBC Project Folder/src/pages/CollectionDetail.tsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    new_lines.append(line)
    if 'sectionPadding="11rem 1rem 8rem 1rem"' in line:
        # Check if the next line already has contentPaddingTop
        # (Using a simple check to avoid duplicates)
        padding_line = '                            contentPaddingTop="0",\n'.replace(',', '') # Clean up potential comma
        # Actually just append the exact string we want
        indent = line[:line.find('sectionPadding')]
        new_padding_line = f'{indent}contentPaddingTop="0"\n'
        
        # We'll check the next few lines in the original file to see if it's already there
        # But for simplicity, we'll just skip the first one which we know we did
        # Actually let's just be smart about it.
        
skip_next = False
final_lines = []
for i, line in enumerate(lines):
    final_lines.append(line)
    if 'sectionPadding="11rem 1rem 8rem 1rem"' in line:
        # Look ahead to see if already exists
        if i + 1 < len(lines) and 'contentPaddingTop="0"' in lines[i+1]:
            continue
        
        indent = line[:line.find('sectionPadding')]
        final_lines.append(f'{indent}contentPaddingTop="0"\n')

with open(file_path, 'w') as f:
    f.writelines(final_lines)

print("Alignment fix applied successfully to all instances.")
