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