export const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};


export const generatePageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
    const delta = 2;

    if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers: (number | string)[] = [];

    pageNumbers.push(1);

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    if (start > 2) {
        pageNumbers.push("...");
    }

    const middlePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    pageNumbers.push(...middlePages);

    if (end < totalPages - 1) {
        pageNumbers.push("...");
    }

    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }

    return pageNumbers;
};
