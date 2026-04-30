import re
import glob

def fix_slashes(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find links starting with http or https, thelongbookclub.com/book/, 
    # followed by a slug (lowercase letters, numbers, hyphens),
    # NOT followed by a slash.
    # It replaces `https://thelongbookclub.com/book/slug` with `https://thelongbookclub.com/book/slug/`
    pattern = r'(https?://(?:www\.)?thelongbookclub\.com/book/[a-z0-9-]+)(?!/)'
    
    new_content, count = re.subn(pattern, r'\1/', content)
    
    if count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {count} links in {file_path}")

for file_path in glob.glob('src/data/*.ts'):
    fix_slashes(file_path)
