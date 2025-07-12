export const getProductDescription = (description: string, isMobile: boolean): string => {
    if (isMobile && description) {
        return description.length > 30 ? description.slice(0, 100) + '...' : description;
    }
    return description;
};