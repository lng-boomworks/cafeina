import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;
export type BlogCategory = BlogPost["data"]["category"];

const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

export function postSlug(entry: BlogPost): string {
  return entry.id.replace(DATE_PREFIX, "");
}

export function postHref(entry: BlogPost): string {
  return `/blog/${postSlug(entry)}`;
}

/**
 * Normalise markdown frontmatter image references (e.g. `./images/foo.jpg`) to
 * a root-relative path under `/images/blog/` so `withBase()` and the existing
 * `public/` conventions can handle it. Returns `undefined` for empty input.
 */
export function resolveBlogImage(raw?: string): string | undefined {
  if (!raw) return undefined;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const cleaned = raw.replace(/^\.\/(images\/)?/, "").replace(/^\/+/, "");
  if (cleaned.startsWith("images/")) return `/${cleaned}`;
  return `/images/blog/${cleaned}`;
}

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  news: "News",
  events: "Events",
  "food-drink": "Food & Drink",
  "behind-the-scenes": "Behind the Scenes",
};

export function categoryLabel(category: BlogCategory): string {
  return CATEGORY_LABELS[category];
}

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const entries = await getCollection("blog", ({ data }) => !data.draft);
  return entries.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export interface BlogPostSummary {
  slug: string;
  href: string;
  title: string;
  description: string;
  pubDate: string;
  pubDateISO: string;
  category: BlogCategory;
  categoryLabel: string;
  heroImage?: string;
  heroImageAlt?: string;
  tags: string[];
  author: string;
  featured: boolean;
}

export function toSummary(entry: BlogPost): BlogPostSummary {
  const slug = postSlug(entry);
  return {
    slug,
    href: `/blog/${slug}`,
    title: entry.data.title,
    description: entry.data.description,
    pubDate: formatPostDate(entry.data.pubDate),
    pubDateISO: entry.data.pubDate.toISOString(),
    category: entry.data.category,
    categoryLabel: categoryLabel(entry.data.category),
    heroImage: resolveBlogImage(entry.data.heroImage),
    heroImageAlt: entry.data.heroImageAlt,
    tags: entry.data.tags,
    author: entry.data.author,
    featured: entry.data.featured,
  };
}
