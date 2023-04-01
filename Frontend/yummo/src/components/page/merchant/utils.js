export function shortenAddress(address) {
    return address.replace(/, Singapore \d{6}/, "");
}
  
export function assetUrl(path) {
    return `${process.env.REACT_APP_BACKEND_URL}${path}`;
}