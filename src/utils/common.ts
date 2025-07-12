const wordLimit = 30;

export const getProductDescription = (description: string, isMobile: boolean): string => {
    if (isMobile && description) {
        return description.length > wordLimit ? description.slice(0, wordLimit) + '...' : description;
    }
    return description;
};