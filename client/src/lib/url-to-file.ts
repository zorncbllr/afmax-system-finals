export async function urlToFile(url: string): Promise<File> {
  const filename = url.substring(url.lastIndexOf("/") + 1);
  const response = await fetch(url);
  const mimeType =
    response.headers.get("Content-Type") || "application/octet-stream";
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}
