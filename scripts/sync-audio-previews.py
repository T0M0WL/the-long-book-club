#!/usr/bin/env python3
"""
Sync Audio Previews from Apple Books / iTunes Search API.

Usage:
    python3 scripts/sync-audio-previews.py                # Scans all books missing audioPreviewUrl
    python3 scripts/sync-audio-previews.py --id 471,472   # Targets specific book IDs
    python3 scripts/sync-audio-previews.py --dry-run      # Preview matches without modifying files
"""

import sys
import os
import re
import time
import json
import ssl
import unicodedata
import urllib.request
import urllib.parse

BOOKS_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'data', 'books.ts')

def normalize_text(text):
    """Normalize accents, curly apostrophes, and punctuation for robust comparison."""
    if not text:
        return ""
    text = text.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    text = ''.join(c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9 ]', '', text.lower())

def extract_volume_number(text):
    """Extract volume/arc/book number if present."""
    match = re.search(r'\b(?:arc|book|volume|vol|part)\s*(\d+)\b', text.lower())
    return match.group(1) if match else None

def search_apple_audiobook(title, author, narrator="", ctx=None):
    """Query Apple Books / iTunes Search API with strict verification."""
    if ctx is None:
        ctx = ssl._create_unverified_context()

    clean_author = ''.join(c for c in unicodedata.normalize('NFD', author) if unicodedata.category(c) != 'Mn')
    base_title = title.split(':')[0].split('(')[0].strip()

    search_queries = [
        f"{base_title} {clean_author}",
        f"{title} {clean_author}",
        f"{base_title}"
    ]

    target_vol = extract_volume_number(title)

    for q in search_queries:
        encoded_q = urllib.parse.quote(q)
        url = f"https://itunes.apple.com/search?term={encoded_q}&media=audiobook&limit=8"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (TLBC/1.0)'})
            with urllib.request.urlopen(req, context=ctx, timeout=8) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                for item in data.get('results', []):
                    cname = item.get('collectionName', '')
                    aname = item.get('artistName', '')
                    preview_url = item.get('previewUrl', '')

                    if not preview_url:
                        continue

                    # 1. Never match Abridged versions unless explicitly in target title
                    if 'abridged' in cname.lower() and 'unabridged' not in cname.lower() and 'abridged' not in title.lower():
                        continue

                    norm_base = normalize_text(base_title)
                    norm_cname = normalize_text(cname)
                    norm_author = normalize_text(clean_author)
                    norm_aname = normalize_text(aname)

                    # 2. Strict Title Match
                    if norm_base not in norm_cname:
                        continue

                    # 3. Strict Volume/Arc Number Match
                    cand_vol = extract_volume_number(cname)
                    if target_vol and cand_vol and target_vol != cand_vol:
                        continue
                    if target_vol and not cand_vol:
                        # Target is specifically e.g. Arc 2 or Book 2, candidate has no volume specified
                        continue

                    # 4. Strict Author Match (surname or full name must match)
                    author_tokens = norm_author.split()
                    author_last = author_tokens[-1] if author_tokens else ''
                    
                    author_matches = False
                    if author_last and (author_last in norm_aname or norm_author in norm_aname):
                        author_matches = True
                    elif norm_aname in norm_author:
                        author_matches = True

                    if not author_matches:
                        continue

                    return {
                        'collectionName': cname,
                        'artistName': aname,
                        'previewUrl': preview_url
                    }
        except Exception:
            pass
        time.sleep(0.3)

    return None

def main():
    target_ids = None
    dry_run = False

    args = sys.argv[1:]
    for i, arg in enumerate(args):
        if arg == '--dry-run':
            dry_run = True
        elif arg == '--id' and i + 1 < len(args):
            target_ids = [x.strip() for x in args[i + 1].split(',')]

    if not os.path.exists(BOOKS_PATH):
        print(f"Error: Could not find books file at {BOOKS_PATH}")
        sys.exit(1)

    with open(BOOKS_PATH, 'r', encoding='utf-8') as f:
        file_content = f.read()

    book_blocks = re.split(r'(\n\s*\{\s*\n\s*id:\s*["\']\d+["\'])', file_content)
    
    header = book_blocks[0]
    blocks = []
    for i in range(1, len(book_blocks), 2):
        block_prefix = book_blocks[i]
        block_body = book_blocks[i+1] if i + 1 < len(book_blocks) else ""
        blocks.append(block_prefix + block_body)

    print(f"Loaded {len(blocks)} book entries from {BOOKS_PATH}.")
    if target_ids:
        print(f"Filtering to specific IDs: {', '.join(target_ids)}")

    updates = {}
    ssl_ctx = ssl._create_unverified_context()

    for idx, block in enumerate(blocks):
        id_match = re.search(r'id:\s*["\'](\d+)["\']', block)
        if not id_match:
            continue
        book_id = id_match.group(1)

        if target_ids and book_id not in target_ids:
            continue

        if 'audioPreviewUrl:' in block:
            continue

        title_match = re.search(r'title:\s*["\'](.*?)["\'],', block)
        author_match = re.search(r'author:\s*["\'](.*?)["\'],', block)
        narrator_match = re.search(r'narrator:\s*["\'](.*?)["\'],', block)

        if not title_match or not author_match:
            continue

        title = title_match.group(1)
        author = author_match.group(1)
        narrator = narrator_match.group(1) if narrator_match else ""

        print(f"Searching [{book_id}] '{title}' by {author}...")
        match = search_apple_audiobook(title, author, narrator, ctx=ssl_ctx)

        if match:
            print(f"  ✓ FOUND: {match['collectionName']} ({match['artistName']})")
            print(f"    Preview: {match['previewUrl']}")
            updates[book_id] = match['previewUrl']
        else:
            print(f"  ✗ No preview available on Apple Books")

        time.sleep(0.3)

    print(f"\nDiscovered {len(updates)} new audio preview URLs.")

    if not updates or dry_run:
        if dry_run:
            print("Dry run complete. No files were modified.")
        sys.exit(0)

    # Apply updates to file_content
    modified_blocks = []
    for block in blocks:
        id_match = re.search(r'id:\s*["\'](\d+)["\']', block)
        if id_match and id_match.group(1) in updates:
            b_id = id_match.group(1)
            preview_url = updates[b_id]
            insertion = f"        audioPreviewUrl: '{preview_url}',\n"
            if 'affiliateLink:' in block and 'audioPreviewUrl:' not in block:
                block = block.replace("        affiliateLink:", f"{insertion}        affiliateLink:", 1)
        modified_blocks.append(block)

    new_file_content = header + "".join(modified_blocks)

    with open(BOOKS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_file_content)

    print(f"Successfully updated {len(updates)} books in {BOOKS_PATH}!")

if __name__ == '__main__':
    main()
