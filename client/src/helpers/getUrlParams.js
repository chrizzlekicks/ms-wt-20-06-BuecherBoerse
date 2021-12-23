export function getUrlParams(searchObj) {
    if (searchObj) {
        return new URLSearchParams(searchObj);
    }
}
