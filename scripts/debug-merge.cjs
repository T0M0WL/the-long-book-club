const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../src/data/books.ts');
const reviewsPath = path.join(__dirname, '../src/data/reviews.ts');

const booksContent = fs.readFileSync(booksPath, 'utf8');
const reviewsContent = fs.readFileSync(reviewsPath, 'utf8');

const target = "Jonathan Strange & Mr Norrell";

// Regex to capture the exact string used in books.ts
const bookTitleRegex = /title:\s*['"](Jonathan Strange & Mr Norrell)['"]/;
const bookMatch = bookTitleRegex.exec(booksContent);

// Regex to capture the exact key used in reviews.ts
const reviewKeyRegex = /['"](Jonathan Strange & Mr Norrell)['"]\s*:/;
const reviewMatch = reviewKeyRegex.exec(reviewsContent);

if (bookMatch && reviewMatch) {
    const bookString = bookMatch[1];
    const reviewString = reviewMatch[1];

    console.log(`Book String:   "${bookString}"`);
    console.log(`Review String: "${reviewString}"`);

    if (bookString === reviewString) {
        console.log("✅ Strings are IDENTICAL.");
    } else {
        console.log("❌ Strings are DIFFERENT.");
        console.log("Book Bytes:", Buffer.from(bookString));
        console.log("Review Bytes:", Buffer.from(reviewString));
    }
} else {
    console.log("Could not find one of the strings.");
    console.log("Book Found:", !!bookMatch);
    console.log("Review Found:", !!reviewMatch);
}
