export function useUrlParams(searchObj) {
    if (searchObj) {
        return new URLSearchParams(searchObj);
    }
}
