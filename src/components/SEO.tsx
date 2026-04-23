import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    canonical?: string;
    type?: 'website' | 'article' | 'book';
    schema?: string; // JSON-LD string
    themeColor?: string; // Hex code for browser UI (notch/status bar)
}

export const SEO = ({ title, description, image, canonical, type = 'website', schema, themeColor = '#2c5143' }: SEOProps) => {
    const location = useLocation();
    const baseUrl = 'https://thelongbookclub.com';

    // Dynamic canonical: Use provided or constructing from current path
    const pathname = location.pathname;
    // Standardize: no trailing slash unless root
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const url = canonical || `${baseUrl}${cleanPath}`;

    const defaultTitle = 'The Long Book Club';
    const defaultDescription = 'Curated long audiobooks for deep listening. We help you find the best 20+ hour books to maximize your credits.';
    const defaultImage = '/assets/social-share-2.jpg';

    const fullTitle = title && title !== defaultTitle ? `${title} | The Long Book Club` : defaultTitle;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="theme-color" content={themeColor} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="The Long Book Club" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "url": baseUrl,
                    "logo": `${baseUrl}/assets/lbc-fav.svg`
                })}
            </script>
            {schema && (
                <script type="application/ld+json">
                    {schema}
                </script>
            )}
        </Helmet>
    );
};
