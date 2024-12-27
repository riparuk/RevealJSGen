
export function extractMarkdownCodeBlock(markdown: string): string | null {
  // Use regex to extract the code block
  const regex = /```(?:markdown)?\s*([\s\S]*?)\s*```/;
  const match = markdown.match(regex);

  if (match) {
	return match[1].trim(); // Mengembalikan teks di dalam blok kode
  } else {
	return null; // Tidak ada kode blok yang ditemukan
  }
}

export function splitMarkdownBySeparator(markdown: string): string[] {
  // Memisahkan string berdasarkan pemisah '---' dan menghapus spasi tambahan
  return markdown.split('---').map(item => item.trim()).filter(item => item.length > 0);
}
