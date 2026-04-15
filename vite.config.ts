import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const saveBookDataPlugin = () => {
    return {
        name: 'save-book-data-plugin',
        configureServer(server: any) {
            server.middlewares.use((req: any, res: any, next: any) => {
                if (req.url === '/api/save-book' && req.method === 'POST') {
                    // Set up body parser for potentially large bodies (like images)
                    let body = '';
                    // Handle large payloads
                    req.on('data', (chunk: Buffer) => {
                        body += chunk.toString();
                    });
                    
                    req.on('end', () => {
                        try {
                            const { bookTitle, baseBookSnippet, reviewSnippet, coverImageBase64, slug } = JSON.parse(body);
                            
                            // 1. Save Cover Image
                            if (coverImageBase64 && slug) {
                                const base64Data = coverImageBase64.replace(/^data:image\/\w+;base64,/, "");
                                const imagePath = path.resolve(process.cwd(), `public/covers/${slug}.jpg`);
                                fs.writeFileSync(imagePath, base64Data, 'base64');
                            }

                            // 2. Save Review to reviews.ts
                            if (reviewSnippet) {
                                const reviewsPath = path.resolve(process.cwd(), 'src/data/reviews.ts');
                                let reviewContent = fs.readFileSync(reviewsPath, 'utf8');

                                const escapedTitle = bookTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                const reviewRegex = new RegExp(`^[ \\t]*(?:["'\`]?)` + escapedTitle + `(?:["'\`]?)\\s*:\\s*\\{[\\s\\S]*?\\},?`, 'm');

                                if (reviewRegex.test(reviewContent)) {
                                    reviewContent = reviewContent.replace(reviewRegex, reviewSnippet);
                                } else {
                                    const lastBraceIndex = reviewContent.lastIndexOf('};');
                                    if (lastBraceIndex !== -1) {
                                        // Ensure previous item has a comma
                                        const preBrace = reviewContent.slice(0, lastBraceIndex);
                                        const hasTrailingComma = preBrace.trim().endsWith(',');
                                        const comma = hasTrailingComma ? '' : ',';
                                        reviewContent = preBrace + comma + '\n' + reviewSnippet + '\n' + reviewContent.slice(lastBraceIndex);
                                    } else {
                                        throw new Error("Could not find concluding '};' in reviews.ts. Please check file structure.");
                                    }
                                }
                                fs.writeFileSync(reviewsPath, reviewContent, 'utf8');
                            }

                            // 3. Save Book Metadata to books.ts
                            if (baseBookSnippet) {
                                const booksPath = path.resolve(process.cwd(), 'src/data/books.ts');
                                let booksContent = fs.readFileSync(booksPath, 'utf8');
                                
                                // We are looking for the closing bracket of `baseBooks` array
                                // "    }\n];"
                                const endOfArrayRegex = /[ \t]*\}\s*\n\];/;
                                if (endOfArrayRegex.test(booksContent)) {
                                    booksContent = booksContent.replace(endOfArrayRegex, `    },\n    {\n${baseBookSnippet}\n    }\n];`);
                                    fs.writeFileSync(booksPath, booksContent, 'utf8');
                                } else {
                                    throw new Error("Could not find concluding '];' for baseBooks array in books.ts.");
                                }
                            }

                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true }));
                        } catch (error: any) {
                            console.error('Error in saveBookDataPlugin:', error);
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: error.message || 'Unknown error' }));
                        }
                    });
                    return;
                }
                next();
            });
        }
    };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), saveBookDataPlugin()],
  server: {
    host: true
  }
})
