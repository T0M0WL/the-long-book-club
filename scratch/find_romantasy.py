
import re

with open('src/data/books.ts', 'r') as f:
    content = f.read()

# Find all book objects
# A simple way is to split by { and then look for genre and id
books = re.findall(r'\{(?:[^{}]|\{[^{}]*\})*\}', content)

romantasy_books = []
for book in books:
    if "'Romantasy'" in book:
        id_match = re.search(r"id: '(\d+)'", book)
        title_match = re.search(r"title: ['\"](.+?)['\"]", book)
        if id_match and title_match:
            romantasy_books.append((id_match.group(1), title_match.group(1)))

print(f"Total Romantasy books: {len(romantasy_books)}")
for id, title in romantasy_books:
    print(f"ID: {id}, Title: {title}")
