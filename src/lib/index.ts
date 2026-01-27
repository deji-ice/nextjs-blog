export const formatPathname = (pathname: string): string => {
    const removedPostPathname = pathname.slice(6); // Remove "/post/" (assuming it's always "/post/")
    const formattedPathname = removedPostPathname.replace(/-/g, ' '); // Replace hyphens with spaces

    // Function to capitalize each word
    const capitalizeEachWord = (str: string): string => {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    };

    const capitalizedPathname = capitalizeEachWord(formattedPathname);

    return capitalizedPathname;
};

export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/**
 * Calculate estimated reading time for a blog post
 * @param body - Sanity Portable Text content array
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export const calculateReadingTime = (body: any[], wordsPerMinute: number = 200): number => {
    if (!body || !Array.isArray(body)) return 0;

    // Extract text from all blocks
    const text = body
        .filter((block) => block._type === 'block')
        .map((block) => {
            if (block.children) {
                return block.children
                    .map((child: any) => child.text || '')
                    .join(' ');
            }
            return '';
        })
        .join(' ');

    // Count words (split by whitespace and filter empty strings)
    const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;

    // Calculate reading time in minutes, round up to nearest minute
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return readingTime;
};