export const getSize = (initial?: number | string) => {
    let size;
    if (typeof initial === 'number') {
        size = `${initial}px`;
    } else {
        size = initial || '100%';
    }
    return size;
};
