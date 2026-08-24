"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { contentApi } from "@/services/contentApi";
import { ArrowRight, BookOpen } from "lucide-react";

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

const BlogIndex = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    contentApi.getBlogArticles()
      .then((data) => {
        if (isMounted) {
          setArticles(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load blog articles", err);
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Separate featured article from regular cards
  const featuredArticle = articles.find((article) => article.featured) || articles[0];
  const regularArticles = articles.filter(
    (article) => article.slug !== (featuredArticle?.slug || "")
  );

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* ── Editorial Header ── */}
        <header className="max-w-4xl mx-auto px-6 pt-[140px] md:pt-[180px] pb-12 text-left space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-label-caps text-surface-tint tracking-widest uppercase font-semibold">
            <BookOpen className="w-4 h-4 text-surface-tint" />
            <span>Mimir Nest Publication</span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-foreground font-bold tracking-tight leading-tight">
            The Editorial <span className="text-surface-tint">Blog</span>
          </h1>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Original stories, insights, and guides built around student life, developer tools, placements, and open-source software engineering.
          </p>
        </header>

        {/* ── Main Content Area ── */}
        <main className="max-w-5xl mx-auto px-6 pb-24 space-y-20">
          {loading ? (
            <div className="py-24 text-center text-on-surface-variant/60 font-body-md text-sm">
              Loading articles...
            </div>
          ) : articles.length === 0 ? (
            <div className="py-24 text-center text-on-surface-variant/60 font-body-md text-sm">
              No articles published yet.
            </div>
          ) : (
            <>
              {/* Featured Section */}
              {featuredArticle && (
                <section className="border-y border-border/40 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-xs font-label-caps text-surface-tint tracking-widest uppercase font-semibold block">
                      Featured Entry · {featuredArticle.category}
                    </span>
                    <span className="text-xs font-body-md text-on-surface-variant/70 block">
                      {formatDate(featuredArticle.publishedAt)} · {calculateReadingTime(featuredArticle.content)}
                    </span>
                  </div>

                  <div className="md:col-span-8 space-y-6">
                    <Link href={`/blog/${featuredArticle.slug}`} className="group block space-y-3">
                      <h2 className="font-display-lg text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-surface-tint transition-colors leading-tight">
                        {featuredArticle.title}
                      </h2>
                      <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                        {featuredArticle.description}
                      </p>
                    </Link>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <span className="text-xs font-body-md text-on-surface-variant">
                        By <span className="font-semibold text-foreground">{featuredArticle.author}</span>
                      </span>
                      <Link
                        href={`/blog/${featuredArticle.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-label-caps text-surface-tint hover:underline uppercase tracking-wider font-semibold"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </section>
              )}

              {/* Regular Articles Section */}
              {regularArticles.length > 0 && (
                <section className="space-y-10">
                  <h3 className="font-label-caps text-xs text-on-surface-variant/60 tracking-widest uppercase border-b border-border/40 pb-3">
                    Recent Stories
                  </h3>
                  
                  <div className="grid gap-12 md:grid-cols-2">
                    {regularArticles.map((article) => (
                      <article key={article.slug} className="flex flex-col justify-between space-y-4 pt-2">
                        <div className="space-y-2">
                          <span className="text-[11px] font-label-caps text-surface-tint tracking-widest uppercase font-semibold block">
                            {article.category}
                          </span>
                          <Link href={`/blog/${article.slug}`} className="group block">
                            <h4 className="font-headline-md text-lg md:text-xl font-bold text-foreground group-hover:text-surface-tint transition-colors leading-snug">
                              {article.title}
                            </h4>
                          </Link>
                          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                            {article.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border/30 flex items-center justify-between text-xs text-on-surface-variant">
                          <span>
                            {formatDate(article.publishedAt)} · {calculateReadingTime(article.content)}
                          </span>
                          <span>
                            By <span className="text-foreground font-medium">{article.author}</span>
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default BlogIndex;
