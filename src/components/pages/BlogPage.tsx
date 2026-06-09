import { useState } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { PageHero } from "../PageHero";
import { ClosingCTA } from "../ClosingCTA";
import { withBase } from "../../utils/url";
import { ArrowRight } from "lucide-react";
import type { BlogPostSummary } from "../../utils/blog";

interface BlogPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  emptyHeading?: string;
  emptyBody?: string;
  ctaHeading?: string;
  ctaText?: string;
  posts?: BlogPostSummary[];
  allCategoriesLabel?: string;
}

const CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "news", label: "News" },
  { key: "events", label: "Events" },
  { key: "food-drink", label: "Food & Drink" },
  { key: "behind-the-scenes", label: "Behind the Scenes" },
];

function PostCardImage({ post }: { post: BlogPostSummary }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !post.heroImage || failed;

  if (showPlaceholder) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-espresso via-teal-mid to-brass flex items-center justify-center overflow-hidden">
        <span className="font-serif italic text-white/90 text-[clamp(22px,3vw,30px)] text-center px-6 leading-tight">
          {post.title.split(":")[0]}
        </span>
        <div className="absolute inset-0 grain" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={withBase(post.heroImage!)}
      alt={post.heroImageAlt ?? post.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function CategoryTag({ label, tone = "solid" }: { label: string; tone?: "solid" | "outline" }) {
  if (tone === "outline") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[11px] font-medium uppercase tracking-wide">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-pale text-teal-deep text-[11px] font-medium uppercase tracking-wide">
      {label}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPostSummary }) {
  return (
    <a
      href={withBase(post.href)}
      className="group grid md:grid-cols-12 gap-0 overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_30px_70px_-40px_rgba(23,14,7,0.4)] hover:shadow-[0_40px_90px_-40px_rgba(23,14,7,0.5)] transition-all duration-300"
    >
      <div className="md:col-span-7 relative aspect-[5/4] md:aspect-auto md:min-h-[440px] overflow-hidden">
        <PostCardImage post={post} />
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-brass text-espresso text-[11px] font-semibold uppercase tracking-wide">
            Featured
          </span>
          <CategoryTag label={post.categoryLabel} tone="outline" />
        </div>
      </div>
      <div className="md:col-span-5 p-8 md:p-11 flex flex-col justify-center">
        <time dateTime={post.pubDateISO} className="eyebrow text-sage block mb-4">{post.pubDate}</time>
        <h2 className="mb-4 font-serif italic text-balance group-hover:text-teal-mid transition-colors">{post.title}</h2>
        <p className="text-[17px] text-text-muted leading-relaxed mb-6">{post.description}</p>
        <span className="inline-flex items-center gap-2 text-teal-deep font-medium text-[15px]">
          <span className="border-b border-brass/70 pb-0.5 group-hover:border-brass transition-colors">Read the post</span>
          <ArrowRight className="w-4 h-4 text-brass transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    <a
      href={withBase(post.href)}
      className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-white hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(23,14,7,0.4)] transition-all duration-300"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <PostCardImage post={post} />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <CategoryTag label={post.categoryLabel} />
          <time dateTime={post.pubDateISO} className="text-xs text-text-muted">{post.pubDate}</time>
        </div>
        <h3 className="mb-3 font-serif italic text-balance group-hover:text-teal-mid transition-colors">{post.title}</h3>
        <p className="text-[15px] text-text-muted leading-relaxed line-clamp-3 mb-5">{post.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-teal-deep font-medium text-[14px]">
          <span className="border-b border-brass/70 pb-0.5 group-hover:border-brass transition-colors">Read more</span>
          <ArrowRight className="w-3.5 h-3.5 text-brass transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

export function BlogPage({
  heroLabel = "the journal",
  heroHeading = "Stories from the café.",
  heroSubheading = "Updates from Millie and Callum - events, new menu additions, and a peek at what's happening behind the scenes at Cafeina.",
  emptyHeading = "Stay in the loop.",
  emptyBody = "We're working on the first few posts. In the meantime - pop in, have a coffee, and we'll tell you in person.",
  ctaHeading = "Let's stay in touch.",
  ctaText = "Follow us on Instagram, or drop by in person. Mon-Sat from 9am, Sun from 5pm.",
  posts = [],
  allCategoriesLabel = "Everything",
}: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const hasPosts = posts.length > 0;
  const featured = posts.find((p) => p.featured);
  const restAll = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  const visibleCategories = CATEGORY_ORDER.filter((c) => {
    if (c.key === "all") return true;
    return posts.some((p) => p.category === c.key);
  }).map((c) => (c.key === "all" ? { ...c, label: allCategoriesLabel } : c));

  const filtered = activeCategory === "all" ? restAll : restAll.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar transparentOverHero />
      <main>
        <PageHero label={heroLabel} heading={heroHeading} subheading={heroSubheading} image="/images/hero/coffee-moment" imageAlt="A freshly poured coffee at Cafeina" />

        {hasPosts ? (
          <>
            {featured && (
              <section className="py-14 md:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <FadeIn>
                    <FeaturedCard post={featured} />
                  </FadeIn>
                </div>
              </section>
            )}

            <section className={`${featured ? "pt-2 pb-20 md:pb-28" : "py-20 md:py-28"} bg-white`}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {visibleCategories.length > 2 && (
                  <FadeIn>
                    <div className="flex flex-wrap gap-2 justify-center mb-12">
                      {visibleCategories.map((c) => {
                        const isActive = activeCategory === c.key;
                        return (
                          <button
                            key={c.key}
                            type="button"
                            onClick={() => setActiveCategory(c.key)}
                            className={`px-4 py-2 rounded-full text-[13px] font-medium uppercase tracking-wide transition-all ${
                              isActive ? "bg-espresso text-white shadow-sm" : "bg-white border border-border text-text-muted hover:border-teal-mid hover:text-teal-deep"
                            }`}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </FadeIn>
                )}

                <FadeIn stagger={0.06} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filtered.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </FadeIn>

                {filtered.length === 0 && (
                  <p className="text-center text-text-muted text-lg mt-12">Nothing in that category yet - try another one.</p>
                )}
              </div>
            </section>
          </>
        ) : (
          <section className="py-20 md:py-28 bg-white">
            <div className="max-w-3xl mx-auto px-4">
              <FadeIn>
                <div className="relative overflow-hidden rounded-[24px] border border-border bg-cream/40 p-10 md:p-14 text-center">
                  <h2 className="mb-4 font-serif italic">{emptyHeading}</h2>
                  <p className="text-lg leading-relaxed text-text-muted max-w-prose mx-auto">{emptyBody}</p>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        <ClosingCTA
          heading={ctaHeading}
          text={ctaText}
          eyebrow="the journal"
          primary={{ label: "Say hola", href: "/contact" }}
          secondary={{ label: "See the menu", href: "/menu" }}
        />
      </main>
      <Footer />
    </>
  );
}
