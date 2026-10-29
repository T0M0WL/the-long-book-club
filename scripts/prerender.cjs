
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const BOOKS_FILE = path.join(__dirname, '../src/data/books.ts');
const REVIEWS_FILE = path.join(__dirname, '../src/data/reviews.ts');
const JOURNAL_FILE = path.join(__dirname, '../src/data/journal.ts');
const GENRE_DATA_FILE = path.join(__dirname, '../src/data/genreData.ts');
const COLLECTIONS_FILE = path.join(__dirname, '../src/data/collections.ts');
const TEMPLATE_FILE = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://thelongbookclub.com';

/**
 * Extracts field values from a TypeScript block.
 * Enhanced to handle multi-line content for body injection.
 */
function extractField(content, fieldName, stripHtml = true) {
    const regex = new RegExp(`${fieldName}:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`, 'm');
    const match = content.match(regex);
    if (!match) return null;
    
    let val = match[2];
    val = val.replace(/\\(['"`])/g, '$1')
             .replace(/\\n/g, '\n')
             .replace(/\\t/g, '\t');
             
    if (stripHtml) {
        return val.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    return val.trim();
}

/**
 * Parses both array and single string formats for the genre field.
 */
function extractGenre(block) {
    const match = block.match(/genre:\s*(\[[^\]]+\]|'[^']+'|"[^"]+")/);
    if (!match) return ['Fiction'];
    const raw = match[1];
    if (raw.startsWith('[')) {
        return raw.replace(/[\[\]'"]/g, '').split(',').map(g => g.trim()).filter(Boolean);
    } else {
        return [raw.replace(/['"]/g, '').trim()];
    }
}

/**
 * Parses a standard string array from a TypeScript block.
 */
function extractArray(content, fieldName) {
    const match = content.match(/bookIds:\s*\[([^\]]+)\]/m);
    if (!match) return [];
    return match[1].replace(/['"\s]/g, '').split(',').filter(Boolean);
}

/**
 * Simple HTML escape
 */
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');
}

/**
 * Ensures internal TLBC URLs always end with a trailing slash for Hostinger/Googlebot compatibility.
 */
function normalizeInternalUrl(url) {
    if (!url) return '';
    let clean = url.trim();
    const isInternal = clean.startsWith('/') || clean.startsWith(BASE_URL);
    if (isInternal && !clean.endsWith('/') && !clean.includes('?') && !clean.includes('#')) {
        clean += '/';
    }
    return clean;
}

/**
 * Safely formats review/journal body text into crawlable HTML paragraphs while preserving
 * both HTML <a href="..."> links and Markdown [text](url) links as real <a> tags.
 */
function formatRichTextHtml(text) {
    if (!text) return '';
    const links = [];

    // 1. Capture existing HTML <a href="...">label</a> tags
    let processed = text.replace(/<a\s+[^>]*href=(?:\\?["'])([^"'\s\\]+)(?:\\?["'])[^>]*>([\s\S]*?)<\/a>/gi, (_, url, label) => {
        const token = `%%TLBC_LINK_${links.length}%%`;
        const cleanLabel = label.replace(/<[^>]*>/g, '').trim();
        links.push(`<a href="${escapeHtml(normalizeInternalUrl(url))}">${escapeHtml(cleanLabel)}</a>`);
        return token;
    });

    // 2. Capture Markdown [label](url) links
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
        const token = `%%TLBC_LINK_${links.length}%%`;
        links.push(`<a href="${escapeHtml(normalizeInternalUrl(url))}">${escapeHtml(label.trim())}</a>`);
        return token;
    });

    // 3. Escape remaining text safely
    processed = escapeHtml(processed);

    // 4. Convert basic Markdown bold **text** to <strong>
    processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // 5. Restore crawlable <a> tags
    links.forEach((htmlLink, idx) => {
        processed = processed.replace(`%%TLBC_LINK_${idx}%%`, htmlLink);
    });

    return processed;
}

/**
 * Converts audiobook length string (e.g., "67h", "52h 41m") to ISO 8601 duration format (e.g., "PT67H", "PT52H41M").
 */
function convertLengthToIso8601(lengthStr) {
    if (!lengthStr) return null;
    const hoursMatch = lengthStr.match(/(\d+)\s*h/);
    const minutesMatch = lengthStr.match(/(\d+)\s*m/);
    let iso = 'PT';
    if (hoursMatch) iso += `${hoursMatch[1]}H`;
    if (minutesMatch) iso += `${minutesMatch[1]}M`;
    return iso === 'PT' ? null : iso;
}

async function prerender() {
    console.log('🚀 Starting "Thick" Prerender for SEO Restoration...');

    if (!fs.existsSync(TEMPLATE_FILE)) {
        console.error('❌ dist/index.html not found. Run build first.');
        process.exit(1);
    }

    const template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
    const booksContent = fs.readFileSync(BOOKS_FILE, 'utf-8');
    const reviewsContent = fs.existsSync(REVIEWS_FILE) ? fs.readFileSync(REVIEWS_FILE, 'utf-8') : '';
    const genreDataContent = fs.existsSync(GENRE_DATA_FILE) ? fs.readFileSync(GENRE_DATA_FILE, 'utf-8') : '';

    // 1. Parse Reviews into a Map
    const reviewsMap = new Map();
    if (reviewsContent) {
        const reviewRegex = /^\s*(?:"([^"\r\n]+)"|'([^'\r\n]+)')\s*:\s*\{([\s\S]*?)(?=^\s*(?:"[^"\r\n]+"|'[^'\r\n]+')\s*:\s*\{|^\s*\};\s*$)/gm;
        let match;
        while ((match = reviewRegex.exec(reviewsContent)) !== null) {
            const title = match[1] || match[2];
            const block = match[3];
            reviewsMap.set(title, {
                curatorNote: extractField(block, 'curatorNote', false),
                curatorTitle: extractField(block, 'curatorTitle'),
                narrator: extractField(block, 'narrator'),
                soundCheck: extractField(block, 'soundCheck', false),
                longBookClubTake: extractField(block, 'longBookClubTake', false)
            });
        }
    }

    // 2. Parse Genre Data into a Map
    const genreMetaMap = new Map();
    if (genreDataContent) {
        const gBlocks = genreDataContent.split(/^\s*\{/gm).slice(1);
        for (const block of gBlocks) {
            const cleanBlock = block.split(/^\s*\}/gm)[0];
            const genre = extractField(cleanBlock, 'genre');
            if (genre) {
                genreMetaMap.set(genre, {
                    metaTitle: extractField(cleanBlock, 'metaTitle'),
                    intro: extractField(cleanBlock, 'intro')
                });
            }
        }
    }

    // --- Book Prerendering ---
    const allBooks = [];
    const booksStartIndex = booksContent.indexOf('const baseBooks: Book[] = [');
    if (booksStartIndex !== -1) {
        const arrayContent = booksContent.substring(booksStartIndex);
        const bookBlocks = arrayContent.split(/(?:\n    \{)/gm).slice(1);
        for (const block of bookBlocks) {
            const cleanBlock = block.split(/\n    \}/)[0];
            const slug = extractField(cleanBlock, 'slug');
            if (!slug) continue;

            const id = extractField(cleanBlock, 'id');
            const title = extractField(cleanBlock, 'title') || 'The Long Book Club';
            const author = extractField(cleanBlock, 'author');
            const bookDesc = extractField(cleanBlock, 'description', false);
            const coverUrl = extractField(cleanBlock, 'coverUrl') || '/assets/social-share-2.jpg';
            const narrator = extractField(cleanBlock, 'narrator');
            const length = extractField(cleanBlock, 'length');
            const genres = extractGenre(cleanBlock);
            const affiliateLink = extractField(cleanBlock, 'affiliateLink');
            const teaserTitle = extractField(cleanBlock, 'teaserTitle');
            const teaser = extractField(cleanBlock, 'teaser');
            const cardOverview = extractField(cleanBlock, 'cardOverview');
            const audioPreviewUrl = extractField(cleanBlock, 'audioPreviewUrl');

            let graphicAudioParts = [];
            const gaMatch = cleanBlock.match(/graphicAudioParts:\s*(\[\s*\{[\s\S]*?\}\s*\])(?=\s*,\s*relatedBookIds)/);
            if (gaMatch) {
                try {
                    const fn = new Function(`return ${gaMatch[1]}`);
                    graphicAudioParts = fn();
                } catch (e) {}
            }

            const lengthHoursMatch = cleanBlock.match(/lengthHours:\s*([0-9.]+)/);
            const lengthHours = lengthHoursMatch ? parseFloat(lengthHoursMatch[1]) : 0;
            const reviewNarrator = reviewsMap.get(title)?.narrator;
            const effectiveNarrator = reviewNarrator || narrator;

            allBooks.push({
                id,
                slug,
                title,
                author,
                description: bookDesc,
                coverUrl,
                narrator: effectiveNarrator,
                length,
                lengthHours,
                genres,
                affiliateLink,
                teaserTitle,
                teaser,
                cardOverview,
                graphicAudioParts,
                audioPreviewUrl
            });
        }
    }

    let bookCount = 0;
    for (const book of allBooks) {
        const { slug, title, author, description: bookDesc, coverUrl, narrator: bookNarrator, length, genres, affiliateLink, graphicAudioParts, audioPreviewUrl } = book;
        const genreRaw = genres.join(', ');

        const review = reviewsMap.get(title);
        const narrator = (review && review.narrator) ? review.narrator : bookNarrator;
        let seoDescription = (review && review.curatorNote) ? review.curatorNote : (bookDesc || 'Curated long audiobooks.');
        seoDescription = seoDescription.replace(/<[^>]*>/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
        if (seoDescription.length > 250) seoDescription = seoDescription.substring(0, 247) + '...';

        const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;
        const absoluteUrl = BASE_URL + '/book/' + slug + '/';

        const formattedCuratorNote = (review && review.curatorNote)
            ? review.curatorNote.split('\n\n').map(p => `<p>${formatRichTextHtml(p.trim())}</p>`).join('')
            : '';

        // Injection Content (Visible Body)
        const bodyContent = `
            <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                <h1>${escapeHtml(title)}</h1>
                <p><strong>Author:</strong> ${escapeHtml(author)} | <strong>Narrator:</strong> ${escapeHtml(narrator)}</p>
                <p><strong>Runtime:</strong> ${escapeHtml(length)} | <strong>Genre:</strong> ${escapeHtml(genreRaw)}</p>
                <hr />
                <div class="book-description">
                    <h2>About this Audiobook</h2>
                    <p>${formatRichTextHtml(bookDesc)}</p>
                </div>
                ${review ? `
                <div class="curator-review" style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h2>${escapeHtml(review.curatorTitle || "Our Curator's Review")}</h2>
                    ${formattedCuratorNote}
                </div>
                ${review.soundCheck ? `
                <div class="narrator-soundcheck" style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h3>Narrator Soundcheck: ${escapeHtml(narrator)}</h3>
                    <p>${formatRichTextHtml(review.soundCheck)}</p>
                    <p style="font-size: 0.85em; font-style: italic; opacity: 0.8; margin-top: 8px;">*Note: Narrators may differ across regional releases and audiobook editions.</p>
                </div>
                ` : ''}
                ` : ''}
                ${graphicAudioParts && graphicAudioParts.length > 0 ? `
                <div class="graphic-audio-editions" style="background: #eef4f1; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #2c5143;">
                    <h3 style="margin-top: 0; color: #2c5143;">Graphic Audio Dramatized Editions</h3>
                    <p style="margin-bottom: 8px;">Full-cast dramatizations with sound effects and cinematic scoring:</p>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${graphicAudioParts.map(p => `<li><a href="${escapeHtml(p.affiliateLink)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(p.title)} on Audible</a></li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                <div class="interactive-listening-tools" style="background: #fafaf6; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #e2dec9;">
                    <h3 style="margin-top: 0; color: #2c5143;">Interactive Listening Tools</h3>
                    <p style="margin-bottom: 0;">This page features our interactive <strong>Audiobook Commute Calculator</strong> (calculating commute weeks based on daily travel time) and <strong>Credit Value Calculator</strong> (cost-per-hour credit breakdown for ${escapeHtml(length)} of audio), alongside verified narrator soundchecks${audioPreviewUrl ? ' and audio sample previews' : ''}.</p>
                </div>
            </div>
        `;

        // JSON-LD
        const offers = [];
        if (affiliateLink) {
            offers.push({
                "@type": "Offer",
                "name": "Audible",
                "url": affiliateLink,
                "offeredBy": { "@type": "Organization", "name": "Audible" },
                "price": "0.00",
                "priceCurrency": "GBP",
                "availability": "https://schema.org/InStock"
            });
        }
        if (graphicAudioParts && graphicAudioParts.length > 0) {
            for (const part of graphicAudioParts) {
                offers.push({
                    "@type": "Offer",
                    "name": `Audible (${part.title})`,
                    "url": part.affiliateLink,
                    "offeredBy": { "@type": "Organization", "name": "Audible" },
                    "price": "0.00",
                    "priceCurrency": "GBP",
                    "availability": "https://schema.org/InStock"
                });
            }
        }

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Audiobook",
            "name": title,
            "author": { "@type": "Person", "name": author },
            "description": seoDescription,
            "image": absoluteCoverUrl,
            "genre": genres,
            "readBy": { "@type": "Person", "name": narrator },
            "url": absoluteUrl
        };

        const duration = convertLengthToIso8601(length);
        if (duration) jsonLd.duration = duration;
        if (offers.length > 0) jsonLd.offers = offers;
        if (audioPreviewUrl) {
            jsonLd.audio = {
                "@type": "AudioObject",
                "name": `${title} (Narrator Audio Sample)`,
                "contentUrl": audioPreviewUrl,
                "encodingFormat": "audio/mp4"
            };
        }

        if (review) {
            jsonLd.review = {
                "@type": "Review",
                "author": { "@type": "Person", "name": "The Long Book Club Curator" },
                "reviewBody": review.curatorNote.replace(/<[^>]*>/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim(),
                "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": "5",
                    "worstRating": "1"
                }
            };
        }

        let html = template;
        html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | The Long Book Club</title>`);
        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(seoDescription)}" />`);
        // OG tags
        html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
        html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(seoDescription)}" />`);
        html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
        html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
        html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

        // Inject Body Content
        html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
        
        // Inject JSON-LD
        html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head>`);

        const outDir = path.join(DIST_DIR, 'book', slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        bookCount++;
    }
    console.log(`✅ Prerendered ${bookCount} "Thick" book pages.`);

    // --- Journal Prerendering ---
    if (fs.existsSync(JOURNAL_FILE)) {
        const journalContent = fs.readFileSync(JOURNAL_FILE, 'utf-8');
        const jBlocks = journalContent.split(/(?:\s*\{)/gm).slice(1);
        let jCount = 0;

        for (const block of jBlocks) {
            const cleanBlock = block.split(/^\s*\}/gm)[0];
            const slug = extractField(cleanBlock, 'slug');
            if (!slug) continue;

            const title = extractField(cleanBlock, 'title');
            const excerpt = extractField(cleanBlock, 'excerpt');
            const fullContent = extractField(cleanBlock, 'content', false);
            const author = extractField(cleanBlock, 'author') || 'The Long Book Club';
            const date = extractField(cleanBlock, 'date');
            const coverUrl = extractField(cleanBlock, 'coverUrl') || '/assets/social-share-2.jpg';

            const absoluteUrl = BASE_URL + '/journal/' + slug + '/';
            const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;

            const formattedJournalBody = fullContent
                ? fullContent.split('\n\n').map(p => `<p>${formatRichTextHtml(p.trim())}</p>`).join('')
                : `<p>${formatRichTextHtml(excerpt)}</p>`;

            const bodyContent = `
                <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                    <h1>${escapeHtml(title)}</h1>
                    <p><em>Published on ${escapeHtml(date)} by ${escapeHtml(author)}</em></p>
                    <hr />
                    <div class="journal-excerpt">
                        <p><strong>${escapeHtml(excerpt)}</strong></p>
                    </div>
                    <div class="journal-content">
                        ${formattedJournalBody}
                    </div>
                </div>
            `;

            let html = template;
            html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | The Long Book Club Journal</title>`);
            html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(excerpt)}" />`);
            
            // OG & Canonical tags
            html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
            html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(excerpt)}" />`);
            html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
            html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
            html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

            html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
            
            const outDir = path.join(DIST_DIR, 'journal', slug);
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.join(outDir, 'index.html'), html);
            jCount++;
        }
        console.log(`✅ Prerendered ${jCount} "Thick" journal pages.`);
    }

    // --- Genre Prerendering ---
    const genresMap = new Map();
    for (const book of allBooks) {
        for (const g of book.genres) {
            if (!genresMap.has(g)) {
                genresMap.set(g, []);
            }
            genresMap.get(g).push(book);
        }
    }

    const slugify = (text) => text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
    let gCount = 0;
    genresMap.forEach((booksInGenre, genreName) => {
        // Only prerender genre pages with at least 2 books to prevent thin doorway pages
        if (booksInGenre.length < 2) return;

        const slug = slugify(genreName);
        const meta = genreMetaMap.get(genreName) || { 
            metaTitle: `${genreName} Audiobooks Over 20 Hours | The Long Book Club`,
            intro: `Explore our selection of epic ${genreName} audiobooks.` 
        };

        // Build the list of books in this genre
        let booksListHtml = '<ul>';
        for (const b of booksInGenre) {
            const overviewText = b.cardOverview || b.teaser || b.description || '';
            const overviewHtml = overviewText ? `<p>${escapeHtml(overviewText)}</p>` : '';
            booksListHtml += `<li>
                <h3><a href="/book/${b.slug}/">${escapeHtml(b.title)}</a> by ${escapeHtml(b.author)} (${escapeHtml(b.length)})</h3>
                ${b.narrator ? `<p><strong>Narrated by:</strong> ${escapeHtml(b.narrator)}</p>` : ''}
                ${overviewHtml}
            </li>`;
        }
        booksListHtml += '</ul>';

        const bodyContent = `
            <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                <h1>Best Long ${escapeHtml(genreName)} Audiobooks</h1>
                <p>${escapeHtml(meta.intro)}</p>
                <p>Welcome to our curated collection of the best and longest ${escapeHtml(genreName)} audiobooks, all 20+ hours in length.</p>
                <hr />
                <h2>Epic Audiobooks in this Genre</h2>
                ${booksListHtml}
            </div>
        `;

        let html = template;
        html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.metaTitle)}</title>`);
        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(meta.intro)}" />`);
        
        const absoluteUrl = BASE_URL + '/genre/' + slug + '/';
        const absoluteCoverUrl = BASE_URL + '/assets/social-share-2.jpg';
        // OG & Canonical tags
        html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(meta.metaTitle)}" />`);
        html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(meta.intro)}" />`);
        html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
        html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
        html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

        html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);

        const outDir = path.join(DIST_DIR, 'genre', slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        gCount++;
    });
    console.log(`✅ Prerendered ${gCount} "Thick" genre pages.`);

    // --- Static Hub Prerendering (Enriched) ---
    // Helper to clean narrators
    const cleanNarrators = (raw) => {
        if (!raw) return [];
        let text = raw.replace(/\((UK|US|Unabridged|GraphicAudio|Anniversary[^\)]*)\)/gi, '');
        text = text.replace(/\s*\/\s*/g, ',');
        text = text.replace(/\s+and\s+/gi, ',');
        text = text.replace(/\s*&\s*/g, ',');
        text = text.replace(/Full Cast\s*\(/gi, '').replace(/\)/g, '');
        const parts = text.split(',');
        const results = [];
        for (const part of parts) {
            const p = part.trim().replace(/\bet al\.?\b/gi, '').replace(/^Full Cast$/i, '').replace(/^[,\s]+|[,\s]+$/g, '');
            if (p.length > 2 && !p.toLowerCase().includes('full cast') && !p.toLowerCase().includes('graphicaudio')) {
                if (!results.includes(p)) results.push(p);
            }
        }
        if (results.length >= 4) return [];
        return results;
    };

    // Build Author Map & Narrator Map
    const authorsMap = new Map();
    const narratorsMap = new Map();

    for (const book of allBooks) {
        const author = book.author ? book.author.trim() : '';
        if (author) {
            if (!authorsMap.has(author)) authorsMap.set(author, []);
            authorsMap.get(author).push(book);
        }

        const names = cleanNarrators(book.narrator);
        for (const name of names) {
            if (!narratorsMap.has(name)) narratorsMap.set(name, []);
            const list = narratorsMap.get(name);
            if (!list.some(existing => existing.id === book.id)) {
                list.push(book);
            }
        }
    }

    const sortedAuthors = [];
    authorsMap.forEach((booksInAuthor, name) => {
        if (booksInAuthor.length >= 2) {
            const totalHours = Math.round(booksInAuthor.reduce((acc, b) => acc + (b.lengthHours || 0), 0) * 10) / 10;
            sortedAuthors.push({
                name,
                slug: slugify(name),
                books: [...booksInAuthor].sort((a, b) => (b.lengthHours || 0) - (a.lengthHours || 0)),
                totalHours
            });
        }
    });
    sortedAuthors.sort((a, b) => b.books.length !== a.books.length ? b.books.length - a.books.length : b.totalHours - a.totalHours);

    const sortedNarrators = [];
    narratorsMap.forEach((booksInNarrator, name) => {
        if (booksInNarrator.length >= 2) {
            const totalHours = Math.round(booksInNarrator.reduce((acc, b) => acc + (b.lengthHours || 0), 0) * 10) / 10;
            sortedNarrators.push({
                name,
                slug: slugify(name),
                books: [...booksInNarrator].sort((a, b) => (b.lengthHours || 0) - (a.lengthHours || 0)),
                totalHours
            });
        }
    });
    sortedNarrators.sort((a, b) => b.books.length !== a.books.length ? b.books.length - a.books.length : b.totalHours - a.totalHours);

    const staticPages = [
        { slug: 'about', title: 'About | The Long Book Club', desc: 'About our mission to find the most epic audiobooks over 20 hours long.' },
        { slug: 'privacy', title: 'Privacy Policy | The Long Book Club', desc: 'Privacy policy for The Long Book Club.' },
        { slug: 'long-book-finder', title: 'Long Audiobook Finder | The Long Book Club', desc: 'Filter and discover 20+ hour epic audiobooks by length, author, and genre.' },
        { slug: 'collections', title: 'Curated Collections | The Long Book Club', desc: 'Explore hand-picked lists of the best long-form audiobooks, from Epic Fantasy to Non-Fiction Titans.' },
        { slug: 'authors', title: 'Audiobook Authors | The Long Book Club', desc: 'Explore our directory of epic audiobook authors with 2 or more 20+ hour audiobooks in our curated catalog.' },
        { slug: 'narrators', title: 'Audiobook Narrators | The Long Book Club', desc: 'Meet the legendary voice artists who bring our longest audiobooks to life. Explore narrators with 2 or more epic performances in our catalog.' },
        { slug: 'narrators/leaderboard', title: 'Audiobook Narrators Leaderboard: Ranked by Marathon Hours | The Long Book Club', desc: 'Explore all 66 qualifying audiobook narrators ranked by continuous listening runtime. Celebrating 9,700+ hours of masterclass audio storytelling.' },
        { slug: 'narrator-styles/fireside-warmth', title: 'Fireside Warmth: Comforting & Cozy Audiobook Narrators | The Long Book Club', desc: 'Discover the warmest, most comforting audiobook narrators in long-form literature. Explore epic audiobooks narrated with intimate fireside warmth.' },
        { slug: 'narrator-styles/historical-gravitas', title: 'Historical Gravitas: Epic & Authoritative Audiobook Narrators | The Long Book Club', desc: 'Explore the most authoritative, classically commanding voice actors in historical fiction, feudal fantasy, and timeless literary epics.' },
        { slug: 'narrator-styles/propulsive-momentum', title: 'Propulsive Momentum: High-Energy & Action Audiobook Narrators | The Long Book Club', desc: 'Find high-octane, breathless audiobooks driven by relentless narrative momentum. Discover voice artists who command massive action and sci-fi epics.' },
        { slug: 'narrator-styles/character-chameleon', title: 'Character Chameleon: Multi-Voice Ensemble Audiobook Narrators | The Long Book Club', desc: 'Meet the greatest vocal chameleons in audiobook narration. Voice artists who inhabit dozens of distinct accents, ages, and creatures in a single epic.' },
        { slug: 'narrator-styles/dual-pov-synergy', title: 'Dual-POV Energy: Best Multi-Narrator Fantasy & Romance Audiobooks | The Long Book Club', desc: 'Explore sensationally popular dual-narrated audiobooks featuring sizzling romantic tension, alternating chapters, and powerhouse vocal duos.' },
        { slug: 'narrator-styles/satirical-bite', title: 'Satirical Bite: Witty, Dry & Comedic Audiobook Narrators | The Long Book Club', desc: 'Experience dry British wit, sardonic irony, and comedic audiobooks narrated by masters of deadpan delivery and razor-sharp satire.' },
        { slug: 'narrator-styles/dialect-immersion', title: 'Dialect Immersion: Authentic Regional & International Audiobook Accents | The Long Book Club', desc: 'Discover audiobook narrators renowned for authentic regional dialects, cultural fidelity, and linguistics across massive world-spanning casts.' },
        { slug: 'journal', title: 'The Long Book Club Journal', desc: 'Latest insights, guides, and strategic listening tips for long-form audiobook fans.' },
        { slug: 'links', title: 'Social Hub | The Long Book Club', desc: 'Quick links to our latest social campaigns, book finder tool, and curated collections.' }
    ];

    // Helper to extract all blocks from a file
    function extractAllBlocks(content) {
        return content.split(/(?:\s*\{)/gm).slice(1).map(b => b.split(/^\s*\}/gm)[0]);
    }

    const collectionsContent = fs.existsSync(COLLECTIONS_FILE) ? fs.readFileSync(COLLECTIONS_FILE, 'utf-8') : '';
    const journalContent = fs.existsSync(JOURNAL_FILE) ? fs.readFileSync(JOURNAL_FILE, 'utf-8') : '';

    for (const page of staticPages) {
        let bodyContent = `<div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;"><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.desc)}</p>`;

        if (page.slug === 'collections' && collectionsContent) {
            bodyContent += '<h2>Our Curated Lists</h2><ul>';
            const cBlocks = extractAllBlocks(collectionsContent);
            for (const b of cBlocks) {
                const cTitle = extractField(b, 'title');
                const cDesc = extractField(b, 'description');
                const cSlug = extractField(b, 'slug');
                if (cTitle && cSlug) {
                    bodyContent += `<li><strong><a href="/collections/${cSlug}/">${escapeHtml(cTitle)}</a></strong>: ${escapeHtml(cDesc)}</li>`;
                }
            }
            bodyContent += '</ul>';
        } else if (page.slug === 'authors') {
            bodyContent += '<h2>Featured Authors</h2><p>Every author featured has two or more long-form audiobooks in our curated collection:</p><ul>';
            for (const a of sortedAuthors) {
                bodyContent += `<li><strong><a href="/author/${a.slug}/">${escapeHtml(a.name)}</a></strong>: ${a.books.length} Audiobooks (Over ${Math.floor(a.totalHours)} hours total)</li>`;
            }
            bodyContent += '</ul>';
        } else if (page.slug === 'narrators') {
            bodyContent += '<h2>Featured Narrators</h2><p>Every narrator featured has two or more epic audio performances in our curated collection:</p><ul>';
            for (const n of sortedNarrators) {
                bodyContent += `<li><strong><a href="/narrator/${n.slug}/">${escapeHtml(n.name)}</a></strong>: ${n.books.length} Audiobooks (Over ${Math.floor(n.totalHours)} hours total)</li>`;
            }
            bodyContent += '</ul>';
        } else if (page.slug === 'journal' && journalContent) {
            bodyContent += '<h2>Latest Insights & Guides</h2><ul>';
            const jBlocks = extractAllBlocks(journalContent);
            for (const b of jBlocks) {
                const jTitle = extractField(b, 'title');
                const jExcerpt = extractField(b, 'excerpt');
                const jSlug = extractField(b, 'slug');
                if (jTitle && jSlug) {
                    bodyContent += `<li><strong><a href="/journal/${jSlug}/">${escapeHtml(jTitle)}</a></strong>: ${escapeHtml(jExcerpt)}</li>`;
                }
            }
            bodyContent += '</ul>';
        } else if (page.slug === 'long-book-finder') {
            bodyContent += '<h2>Top Long Audiobooks</h2><p>Our library contains over 130 epic audiobooks. Some of our favorites include:</p><ul>';
            // Just take first 10 for thickening
            const firstTen = extractAllBlocks(booksContent).slice(0, 10);
            for (const b of firstTen) {
                const bTitle = extractField(b, 'title');
                const bAuthor = extractField(b, 'author');
                const bSlug = extractField(b, 'slug');
                if (bTitle && bSlug) {
                    bodyContent += `<li><a href="/book/${bSlug}/">${escapeHtml(bTitle)}</a> by ${escapeHtml(bAuthor)}</li>`;
                }
            }
            bodyContent += '</ul>';
        }

        bodyContent += '</div>';

        let html = template;
        html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(page.desc)}" />`);
        
        const absoluteUrl = BASE_URL + '/' + page.slug + '/';
        const absoluteCoverUrl = BASE_URL + '/assets/social-share-2.jpg';
        // OG & Canonical tags
        html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
        html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(page.desc)}" />`);
        html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
        html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
        html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

        html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
        
        const outDir = path.join(DIST_DIR, page.slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
    }
    console.log(`✅ Prerendered ${staticPages.length} "Thick" hub pages.`);

    // --- Author Detail Prerendering (Enriched) ---
    let authorCount = 0;
    sortedAuthors.forEach((author) => {
        const slug = author.slug;
        const metaTitle = `${author.name} Audiobooks Over 20 Hours | The Long Book Club`;
        const metaDesc = `Discover the best, longest audiobooks by ${author.name}. Explore ${author.books.length} epic listens totaling over ${Math.floor(author.totalHours)} hours of immersive storytelling, complete with narration reviews and soundchecks.`;

        let booksListHtml = '<ul>';
        for (const b of author.books) {
            const overviewText = b.cardOverview || b.teaser || b.description || '';
            const overviewHtml = overviewText ? `<p>${escapeHtml(overviewText)}</p>` : '';
            booksListHtml += `<li>
                <h3><a href="/book/${b.slug}/">${escapeHtml(b.title)}</a> (${escapeHtml(b.length)})</h3>
                ${b.narrator ? `<p><strong>Narrated by:</strong> ${escapeHtml(b.narrator)}</p>` : ''}
                ${overviewHtml}
            </li>`;
        }
        booksListHtml += '</ul>';

        const bodyContent = `
            <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                <h1>${escapeHtml(author.name)} Audiobooks Over 20 Hours</h1>
                <p><strong>${author.books.length} Audiobooks • Over ${Math.floor(author.totalHours)} Hours of Listening</strong></p>
                <p>Every long-listen edition by ${escapeHtml(author.name)} in our collection, curated for expansive storytelling, deep worldbuilding, and maximum credit value.</p>
                <hr />
                <h2>Epic Audiobooks by ${escapeHtml(author.name)}</h2>
                ${booksListHtml}
            </div>
        `;

        const absoluteUrl = BASE_URL + '/author/' + slug + '/';
        const absoluteCoverUrl = BASE_URL + '/assets/social-share-2.jpg';

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: metaTitle,
            description: metaDesc,
            url: absoluteUrl,
            about: {
                '@type': 'Person',
                name: author.name
            },
            mainEntity: {
                '@type': 'ItemList',
                numberOfItems: author.books.length,
                itemListElement: author.books.map((b, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    item: {
                        '@type': 'Audiobook',
                        name: b.title,
                        author: { '@type': 'Person', name: author.name },
                        url: `${BASE_URL}/book/${b.slug}/`
                    }
                }))
            }
        };

        let html = template;
        html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(metaTitle)}</title>`);
        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(metaDesc)}" />`);
        html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(metaTitle)}" />`);
        html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(metaDesc)}" />`);
        html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
        html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
        html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);
        html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
        html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head>`);

        const outDir = path.join(DIST_DIR, 'author', slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        authorCount++;
    });
    console.log(`✅ Prerendered ${authorCount} "Thick" author pages.`);

    // --- Narrator Detail Prerendering (Enriched with Dashboard & Hallmarks) ---
    const NARRATOR_DATA_FILE = path.join(__dirname, '../src/data/narratorData.ts');
    const narratorDataContent = fs.existsSync(NARRATOR_DATA_FILE) ? fs.readFileSync(NARRATOR_DATA_FILE, 'utf-8') : '';
    const narratorProfilesMap = new Map();
    if (narratorDataContent) {
        const nBlocks = narratorDataContent.split(/\n    '([a-z0-9-]+)':\s*\{/g);
        for (let i = 1; i < nBlocks.length; i += 2) {
            const nSlug = nBlocks[i];
            const nBody = nBlocks[i + 1] || '';
            const heroBioRaw = extractField(nBody, 'heroBio', false);
            const heroBioPlain = extractField(nBody, 'heroBio', true)?.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
            const vocalSummary = extractField(nBody, 'vocalHallmarksSummary', true);
            const referenceUrl = extractField(nBody, 'referenceUrl', true);
            const quoteText = extractField(nBody, 'quote', true);
            const quoteBookTitle = extractField(nBody, 'bookTitle', true);
            const quoteBookSlug = extractField(nBody, 'bookSlug', true);
            const kwMatch = nBody.match(/vocalHallmarksKeywords:\s*\[([\s\S]*?)\]/);
            const vocalKeywords = kwMatch
                ? kwMatch[1].replace(/['"\n\r]/g, '').split(',').map(s => s.trim()).filter(Boolean)
                : [];
            narratorProfilesMap.set(nSlug, {
                heroBioRaw,
                heroBioPlain,
                vocalSummary,
                vocalKeywords,
                referenceUrl,
                quoteText,
                quoteBookTitle,
                quoteBookSlug
            });
        }
    }

    let narratorCount = 0;
    sortedNarrators.forEach((narrator) => {
        const slug = narrator.slug;
        const prof = narratorProfilesMap.get(slug);
        const roundedHours = Math.floor(narrator.totalHours);
        const metaTitle = `${narrator.name} Long Audiobooks & Narrations | The Long Book Club`;
        const metaDesc = prof?.heroBioPlain
            ? `${prof.heroBioPlain} Explore ${narrator.books.length} epic audiobooks narrated by ${narrator.name} totaling over ${roundedHours} hours.`
            : `Explore epic audiobooks narrated by ${narrator.name}. Discover ${narrator.books.length} immersive long listens totaling over ${roundedHours} hours of voice narration with verified soundchecks.`;

        let booksListHtml = '<ul>';
        for (const b of narrator.books) {
            const overviewText = b.cardOverview || b.teaser || b.description || '';
            const overviewHtml = overviewText ? `<p>${escapeHtml(overviewText)}</p>` : '';
            booksListHtml += `<li>
                <h3><a href="/book/${b.slug}/">${escapeHtml(b.title)}</a> by ${escapeHtml(b.author)} (${escapeHtml(b.length)})</h3>
                ${overviewHtml}
            </li>`;
        }
        booksListHtml += '</ul>';

        const heroBioHtml = prof?.heroBioRaw
            ? formatRichTextHtml(prof.heroBioRaw)
            : `<p>Masterful voice performances by ${escapeHtml(narrator.name)}. Experience marathon listening journeys brought to life with world-class vocal pacing, distinct character voices, and stamina.</p>`;

        const longestBook = narrator.books[0];
        const longestHtml = longestBook
            ? `<p><strong>Longest Continuous Performance:</strong> <a href="/book/${longestBook.slug}/">${escapeHtml(longestBook.title)}</a> by ${escapeHtml(longestBook.author)} (${escapeHtml(longestBook.length)})</p>`
            : '';

        const hallmarksHtml = prof?.vocalSummary
            ? `<section><h2>Vocal Hallmarks: ${escapeHtml(prof.vocalKeywords.join(' '))}</h2><p>${escapeHtml(prof.vocalSummary)}</p></section>`
            : '';

        const archiveQuoteHtml = prof?.quoteText && prof?.quoteBookSlug
            ? `<blockquote>"${escapeHtml(prof.quoteText)}" — From <a href="/book/${prof.quoteBookSlug}/">${escapeHtml(prof.quoteBookTitle || '')}</a></blockquote>`
            : '';

        const bodyContent = `
            <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                <h1>${escapeHtml(narrator.name)} Long Audiobooks & Narrations</h1>
                <p><strong>${narrator.books.length} Epic Performances • Over ${roundedHours} Hours of Narration</strong></p>
                ${heroBioHtml}
                ${longestHtml}
                ${hallmarksHtml}
                ${archiveQuoteHtml}
                <hr />
                <h2>Epic Audiobooks Narrated by ${escapeHtml(narrator.name)}</h2>
                ${booksListHtml}
            </div>
        `;

        const absoluteUrl = BASE_URL + '/narrator/' + slug + '/';
        const absoluteCoverUrl = BASE_URL + '/assets/social-share-2.jpg';

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: metaTitle,
            description: metaDesc,
            url: absoluteUrl,
            about: {
                '@type': 'Person',
                name: narrator.name,
                ...(prof?.heroBioPlain ? { description: `${prof.heroBioPlain} ${prof.vocalSummary || ''}`.trim() } : {}),
                ...(prof?.referenceUrl ? { sameAs: [prof.referenceUrl] } : {})
            },
            mainEntity: {
                '@type': 'ItemList',
                numberOfItems: narrator.books.length,
                itemListElement: narrator.books.map((b, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    item: {
                        '@type': 'Audiobook',
                        name: b.title,
                        readBy: { '@type': 'Person', name: narrator.name },
                        url: `${BASE_URL}/book/${b.slug}/`
                    }
                }))
            }
        };

        let html = template;
        html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(metaTitle)}</title>`);
        html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(metaDesc)}" />`);
        html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(metaTitle)}" />`);
        html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(metaDesc)}" />`);
        html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
        html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
        html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);
        html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
        html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head>`);

        const outDir = path.join(DIST_DIR, 'narrator', slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html);
        narratorCount++;
    });
    console.log(`✅ Prerendered ${narratorCount} "Thick" narrator pages.`);
    
    // --- Collection Detail Prerendering (Enriched) ---
    if (collectionsContent) {
        const cBlocks = extractAllBlocks(collectionsContent);
        let cdCount = 0;
        for (const block of cBlocks) {
            const slug = extractField(block, 'slug');
            if (!slug) continue;

            const title = extractField(block, 'title');
            const cardOverview = extractField(block, 'cardOverview');
            const heroSubtitle = extractField(block, 'heroSubtitle');
            const editorialHeading = extractField(block, 'editorialHeading');
            const editorialIntro = extractField(block, 'editorialIntro', false);
            const desc = extractField(block, 'description');
            const coverUrl = extractField(block, 'coverUrl') || '/assets/social-share-2.jpg';

            const absoluteUrl = BASE_URL + '/collections/' + slug + '/';
            const absoluteCoverUrl = coverUrl.startsWith('http') ? coverUrl : BASE_URL + coverUrl;
            const effectiveSubtitle = heroSubtitle || desc || '';
            const seoDescription = heroSubtitle || cardOverview || desc || '';

            const bookIds = extractArray(block, 'bookIds');
            
            // Build the list of books for injection
            let bookListHtml = '<ul>';
            for (const id of bookIds) {
                const book = allBooks.find(b => b.id === id);
                if (book) {
                    const snippetTitle = book.teaserTitle ? `<h4>${escapeHtml(book.teaserTitle)}</h4>` : '';
                    const snippetText = book.teaser || book.cardOverview || book.description || '';
                    const snippetP = snippetText ? `<p>${escapeHtml(snippetText)}</p>` : '';
                    bookListHtml += `<li>
                        <h3><a href="/book/${book.slug}/">${escapeHtml(book.title)}</a> by ${escapeHtml(book.author)} (${escapeHtml(book.length)})</h3>
                        ${snippetTitle}
                        ${snippetP}
                    </li>`;
                }
            }
            bookListHtml += '</ul>';

            const briefingHtml = editorialIntro ? `
                <div class="curator-briefing" style="margin: 20px 0; padding: 15px; background: #fafaf6; border-left: 3px solid #ed835e;">
                    <h2>${escapeHtml(editorialHeading || "Curator's Briefing")}</h2>
                    <p>${formatRichTextHtml(editorialIntro)}</p>
                </div>
            ` : '';

            const bodyContent = `
                <div id="no-js-content" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
                    <h1>${escapeHtml(title)}</h1>
                    ${effectiveSubtitle ? `<h2>${escapeHtml(effectiveSubtitle)}</h2>` : ''}
                    ${briefingHtml}
                    <hr />
                    <h2>Books in this Collection</h2>
                    ${bookListHtml}
                </div>
            `;

            let html = template;
            html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | The Long Book Club Collections</title>`);
            html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${escapeHtml(seoDescription)}" />`);
            // OG tags
            html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
            html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${escapeHtml(seoDescription)}" />`);
            html = html.replace(/<meta property="og:image" content="[^"]+" \/>/, `<meta property="og:image" content="${absoluteCoverUrl}" />`);
            html = html.replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${absoluteUrl}" />`);
            html = html.replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${absoluteUrl}" />`);

            html = html.replace('<!-- SEO_CONTENT_HOLDER -->', bodyContent);
            
            const outDir = path.join(DIST_DIR, 'collections', slug);
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.join(outDir, 'index.html'), html);
            cdCount++;
        }
        console.log(`✅ Prerendered ${cdCount} "Thick" collection detail pages.`);
    }

    // --- Legacy Redirect Map Generation (.htaccess) ---
    console.log('🔗 Generating Legacy Redirect Map for .htaccess...');
    let redirectRules = '\n# --- ID to Slug Legacy Redirects (Generated) ---\n';
    const allBookBlocks = extractAllBlocks(booksContent);
    for (const block of allBookBlocks) {
        const id = extractField(block, 'id');
        const slug = extractField(block, 'slug');
        if (id && slug) {
            // Support both /book/ID and /book/ID/ (trailing slash)
            redirectRules += `Redirect 301 /book/${id} /book/${slug}/\n`;
            redirectRules += `Redirect 301 /book/${id}/ /book/${slug}/\n`;
        }
    }

    const dotHtmlTemplate = `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Force non-www domain canonicalization
  RewriteCond %{HTTP_HOST} ^www\.(.+) [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
  
  # Plural to Singular Canonical 301 Redirects
  RewriteRule ^genres/(.*)$ /genre/$1 [R=301,L]
  RewriteRule ^books/(.*)$ /book/$1 [R=301,L]

  # Force trailing slash on directories for SEO consistency and Prerender discovery
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.*)/$
  RewriteCond %{REQUEST_URI} ^/(book|genre|collections|journal|links|long-book-finder|about|privacy) [NC]
  RewriteRule ^(.*)$ $1/ [L,R=301]

  ${redirectRules}
  
  # --- Book Alias Redirects (Manual) ---
  Redirect 301 /book/project-hail-mary-andy-weir /book/project-hail-mary/
  Redirect 301 /book/project-hail-mary-andy-weir/ /book/project-hail-mary/
  Redirect 301 /books/project-hail-mary /book/project-hail-mary/
  Redirect 301 /books/project-hail-mary/ /book/project-hail-mary/

  # --- Genre Redirects (Manual) ---
  Redirect 301 /genre/nonfiction /genre/non-fiction/
  Redirect 301 /genre/nonfiction/ /genre/non-fiction/
  Redirect 301 /genre/contemporary /genre/contemporary-fiction/
  Redirect 301 /genre/contemporary/ /genre/contemporary-fiction/

  # Standard SPA Fallback
  DirectoryIndex index.html
  Options -MultiViews
  
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`;

    fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), dotHtmlTemplate);
    fs.writeFileSync(path.join(__dirname, '../public/.htaccess'), dotHtmlTemplate);
    
    // Convenience copy for user upload (non-hidden)
    fs.writeFileSync(path.join(DIST_DIR, 'htaccess.txt'), dotHtmlTemplate);
    fs.writeFileSync(path.join(__dirname, '../public/htaccess.txt'), dotHtmlTemplate);
    
    console.log('✅ Generated .htaccess and htaccess.txt with legacy redirect map.');
}

prerender();
