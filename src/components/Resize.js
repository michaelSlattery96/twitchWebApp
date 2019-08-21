export function resize(url) {
  let newUrl = url.replace("{width}", "300")
  .replace("{height}", "300")
  return newUrl;
}
