import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

const posts = [
  {
    title: "{{BLOG_POST_1_TITLE}}",
    excerpt: "{{BLOG_POST_1_EXCERPT}}",
    date: "{{BLOG_POST_1_DATE}}",
    category: "Recipes",
  },
  {
    title: "{{BLOG_POST_2_TITLE}}",
    excerpt: "{{BLOG_POST_2_EXCERPT}}",
    date: "{{BLOG_POST_2_DATE}}",
    category: "Events",
  },
  {
    title: "{{BLOG_POST_3_TITLE}}",
    excerpt: "{{BLOG_POST_3_EXCERPT}}",
    date: "{{BLOG_POST_3_DATE}}",
    category: "La Marina",
  },
];

interface BlogPageProps {
  heroHeading?: string;
  heroSubheading?: string;
}

export function BlogPage({
  heroHeading = "Notes from the café.",
  heroSubheading = "Recipes, events, and small stories from La Marina.",
}: BlogPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="flex flex-col bg-white">
          <section className="bg-cream py-20 md:py-32">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <FadeIn>
                <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">Journal</span>
                <h1 className="mb-6">{heroHeading}</h1>
                <p className="text-xl text-text-muted">{heroSubheading}</p>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-lg text-text-muted leading-relaxed">
                  Nothing published yet — placeholders are below. Replace them with your first three posts when you're ready.
                </p>
              </FadeIn>

              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <article className="bg-white rounded-2xl border border-border hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col">
                      <div className="aspect-[16/10] bg-teal-pale border-b border-border/50 flex items-center justify-center">
                        <span className="text-text-muted text-sm">{`{{BLOG_POST_${i + 1}_IMAGE_ALT}}`}</span>
                      </div>
                      <div className="p-6 flex flex-col grow">
                        <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
                          <span className="text-sage font-medium uppercase tracking-wide">{post.category}</span>
                          <span>·</span>
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-xl mb-3">{post.title}</h3>
                        <p className="text-text-muted leading-relaxed mb-6 grow">{post.excerpt}</p>
                        <a href="#" className="text-teal-mid font-medium text-sm hover:underline underline-offset-4">
                          Read more →
                        </a>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-teal-deep text-center px-4">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-white mb-6">Questions? Get in touch.</h2>
              <p className="text-teal-light text-lg mb-10">Or just come in — we love a chat.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="white" href="/contact">Say hola</Button>
                <Button variant="outline-white" href="/services">See the menu</Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
