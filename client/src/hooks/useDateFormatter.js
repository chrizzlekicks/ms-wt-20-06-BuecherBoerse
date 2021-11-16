export function useDateFormatter(date) {
    if (date) {
        return date.slice(0, 16).concat(' Uhr').split('T').join(' | ');
    }
}
