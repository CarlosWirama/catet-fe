export function sanitizeContent(html: string) {
  // Keep allowed tags and replace disallowed tags with div
  const allowedTags = /<\/?(b|i|u|strong|em|p|br|ul|ol|li|div)[^>]*>/gi;
  return html.replace(/<[^>]+>/g, (tag) =>
    tag.match(allowedTags) ? tag : ""
  );
}
