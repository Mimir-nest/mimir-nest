import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

// Helper to calculate reading time dynamically
const calculateReadingTime = (content) => {
  if (!content) return "1 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Static params generation for SSG
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), "public", "content", "blog", "articles.json");
    if (!fs.existsSync(filePath)) return [];
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const articles = JSON.parse(fileContent);
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (e) {
    console.error("Error generating static params for blog:", e);
    return [];
  }
}

// Dynamic metadata generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const filePath = path.join(process.cwd(), "public", "content", "blog", "articles.json");
    if (!fs.existsSync(filePath)) return {};
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const articles = JSON.parse(fileContent);
    const article = articles.find((art) => art.slug === slug);
    
    if (!article) {
      return {
        title: "Article Not Found | Mimir Nest Blog",
      };
    }
    
    const baseUrl = "https://mimirnest.vercel.app";
    const title = article.seoTitle || `${article.title} | Mimir Nest Blog`;
    const description = article.seoDescription || article.description;
    const url = `${baseUrl}/blog/${slug}`;
    
    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        type: "article",
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt || undefined,
        authors: [article.author],
        tags: article.tags,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for blog article:", error);
    return {
      title: "Blog Article | Mimir Nest",
    };
  }
}

// Content renderer component
const ArticleContent = ({ content }) => {
  if (!content) return null;

  const blocks = content.split(/\n\n+/);

  const parseInline = (text) => {
    if (!text) return text;

    const tokenRegex = /(\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      const startIndex = match.index;
      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }

      const fullMatch = match[0];
      if (fullMatch.startsWith("**") && fullMatch.endsWith("**")) {
        const boldText = match[2];
        parts.push(
          <strong key={startIndex} className="font-semibold text-foreground">
            {parseInline(boldText)}
          </strong>
        );
      } else if (fullMatch.startsWith("[")) {
        const linkText = match[3];
        const linkPath = match[4];
        parts.push(
          <Link
            key={startIndex}
            href={linkPath}
            className="text-surface-tint hover:underline font-semibold"
          >
            {parseInline(linkText)}
          </Link>
        );
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Horizontal Rules
        if (trimmed === "---" || trimmed === "***") {
          return <hr key={index} className="border-t border-border/40 my-8" />;
        }

        // H3 Headers
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="font-headline-md text-lg md:text-xl text-foreground font-semibold pt-4 pb-1 tracking-tight"
            >
              {parseInline(trimmed.slice(4))}
            </h3>
          );
        }

        // H2 Headers
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="font-headline-lg text-xl md:text-2xl text-foreground font-semibold pt-6 pb-2 border-b border-border/40 tracking-tight"
            >
              {parseInline(trimmed.slice(3))}
            </h2>
          );
        }

        // Numbered lists
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split("\n");
          return (
            <ol
              key={index}
              className="list-decimal pl-6 space-y-2 text-on-surface-variant font-body-md text-base md:text-lg leading-relaxed"
            >
              {items.map((item, idx) => (
                <li key={idx}>
                  {parseInline(item.replace(/^\d+\.\s*/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        // Bullet lists
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n");
          return (
            <ul
              key={index}
              className="list-disc pl-6 space-y-2 text-on-surface-variant font-body-md text-base md:text-lg leading-relaxed"
            >
              {items.map((item, idx) => (
                <li key={idx}>
                  {parseInline(item.replace(/^[-*]\s*/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        // Blockquotes (Markdown > syntax)
        if (trimmed.startsWith("> ")) {
          const quoteText = trimmed
            .split("\n")
            .map((line) => line.replace(/^>\s*/, ""))
            .join("\n");
          return (
            <blockquote
              key={index}
              className="border-l-4 border-surface-tint pl-6 py-3 my-8 italic font-body-lg text-lg md:text-xl text-foreground bg-surface-container/30 rounded-r-lg leading-relaxed"
            >
              {parseInline(quoteText)}
            </blockquote>
          );
        }

        // Pull quotes
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-surface-tint pl-6 py-3 my-8 italic font-body-lg text-lg md:text-xl text-foreground bg-surface-container/30 rounded-r-lg leading-relaxed"
            >
              {parseInline(trimmed)}
            </blockquote>
          );
        }

        // Standard Paragraphs
        return (
          <p
            key={index}
            className="text-on-surface-variant font-body-md text-base md:text-lg leading-relaxed"
          >
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  
  let articles = [];
  try {
    const filePath = path.join(process.cwd(), "public", "content", "blog", "articles.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      articles = JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Error reading articles.json in article page:", error);
  }

  const article = articles.find((art) => art.slug === slug);
  if (!article) {
    notFound();
  }

  const readingTime = calculateReadingTime(article.content);
  const relatedArticles = articles
    .filter((art) => art.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mimirnest.vercel.app/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div>
        <Navbar />

        {/* ── Article Layout Container ── */}
        <main className="max-w-4xl mx-auto px-6 pt-[140px] md:pt-[180px] pb-24">
          <div className="space-y-12">
            
            {/* Header info */}
            <header className="space-y-6">
              <span className="font-label-caps text-xs text-surface-tint tracking-widest uppercase font-semibold block">
                {article.category}
              </span>
              
              <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {article.title}
              </h1>
              
              <p className="font-body-lg text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl">
                {article.description}
              </p>
              
              {/* Meta information line */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40 text-xs text-on-surface-variant/80 font-body-md">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-surface-tint" />
                  <span>{article.author}</span>
                </span>
                
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-surface-tint" />
                  <span>{formatDate(article.publishedAt)}</span>
                </span>
                
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-surface-tint" />
                  <span>{readingTime}</span>
                </span>
              </div>
            </header>

            {/* Optional Cover Image */}
            {article.image && (
              <div className="overflow-hidden rounded-2xl border border-border/50 max-h-[400px]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Constrained Article Body */}
            <article className="max-w-2xl mx-auto border-t border-border/20 pt-8">
              <ArticleContent content={article.content} />
            </article>

            {/* Divider */}
            <div className="border-t border-border/40 pt-12"></div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section className="space-y-6">
                <h3 className="font-label-caps text-xs text-on-surface-variant/60 tracking-widest uppercase border-b border-border/40 pb-2">
                  Related Content
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="block p-6 rounded-2xl bg-surface-container/40 border border-border/30 hover:border-surface-tint/60 transition-colors space-y-2"
                    >
                      <span className="text-[10px] font-label-caps text-surface-tint tracking-widest uppercase font-semibold block">
                        {rel.category}
                      </span>
                      <h4 className="font-headline-md text-base font-bold text-foreground line-clamp-1">
                        {rel.title}
                      </h4>
                      <p className="font-body-md text-xs text-on-surface-variant line-clamp-2">
                        {rel.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back to Blog */}
            <div className="pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-surface-tint hover:underline font-label-caps text-xs uppercase tracking-wider font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
