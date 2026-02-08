import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ContentMeta {
  title: string;
  fileName?: string;
  icon?: "document" | "folder" | "notepad";
  order?: number;
  year?: string;
  technologies?: string[];
  [key: string]: unknown;
}

export interface ContentEntry {
  slug: string;
  meta: ContentMeta;
  content: string;
}

export function getContent(filePath: string): ContentEntry {
  const fullPath = path.join(contentDir, filePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".mdx");
  return { slug, meta: data as ContentMeta, content };
}

export function getContentFolder(folder: string): ContentEntry[] {
  const dirPath = path.join(contentDir, folder);
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => getContent(path.join(folder, file)))
    .sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99));
}
