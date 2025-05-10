export async function urlToFile(url: string): Promise<File> {
  // Fetch the image from the URL
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );
  }

  // Clean URL and extract filename
  const cleanUrl = url.split(/[?#]/)[0];
  let filename = cleanUrl.substring(cleanUrl.lastIndexOf("/") + 1);

  // Fallback for empty filenames
  if (!filename) {
    filename = `file-${Date.now()}`;
  }

  // Determine content type with fallback
  let contentType = response.headers.get("Content-Type");
  if (!contentType) {
    const mimeTypes: Record<string, string> = {
      webp: "image/webp",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      svg: "image/svg+xml",
    };
    const extension = filename.split(".").pop()?.toLowerCase() || "";
    contentType = mimeTypes[extension] || "application/octet-stream";
  }

  // Convert response to File object
  const blob = await response.blob();
  return new File([blob], filename, { type: contentType });
}
