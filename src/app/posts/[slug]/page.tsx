import { fetchPublishedPosts, getPost, getWordCount, Post } from "@/lib/notion";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { calculateReadingTime } from "@/lib/utils";
import { components } from "@/components/mdx-component";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ptBR } from "date-fns/locale";
import RelatedPosts from "@/components/RelatedPosts";
import Link from "next/link";
import { unstable_cache } from "next/cache";

export const revalidate = 3600; // 1 hora

const getCachedPost = unstable_cache(
  async (slug: string) => {
    const posts = await getCachedPublishedPosts();
    const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
    return allPosts.find((p) => p?.slug === slug);
  },
  ["post"],
  { revalidate: 86400, tags: ["posts"] },
);

const getCachedPublishedPosts = unstable_cache(
  async () => fetchPublishedPosts(),
  ["published-posts"],
  { revalidate: 86400, tags: ["posts"] },
);

export async function generateStaticParams() {
  const posts = await getCachedPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  return allPosts
    .filter((p): p is Post => p !== null)
    .map((p) => ({
      slug: p.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug as string;
  const post = await getCachedPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: post.title,
    description: post.description,
    keywords: [
      ...(post.tags || []),
      post.category || "Beleza",
      "Garden Brows Studio",
      "Carolina Costa",
      "Crônicas de Beleza",
      "Lifestyle",
    ],
    alternates: {
      canonical: `${siteUrl}/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteUrl}/posts/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
      authors: post.author ? [post.author] : [],
      tags: post.tags,
      images: [
        {
          url: post.coverImage || `${siteUrl}/logo-512x512.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.coverImage || `${siteUrl}/opengraph-image.png`,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug as string;
  const post = await getCachedPost(slug);
  const wordCount = post?.content ? getWordCount(post.content) : 0;

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage || `${siteUrl}/opengraph-image.png`,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Carolina Costa",
      url: `${siteUrl}/sobre`,
    },
    publisher: {
      "@type": "Organization",
      name: "Garden Brows Studio",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/posts/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-garden-dark min-h-screen text-garden-text pb-24 pt-10 md:pt-20">
        <header className="pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-garden-text/40 mb-8 font-sans">
              <span>{post.category || "Lifestyle"}</span>
              <span className="w-1 h-1 rounded-full bg-garden-text/20"></span>
              <time>
                {format(new Date(post.date), "dd MMMM, yyyy", {
                  locale: ptBR,
                })}
              </time>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-3 mb-12 italic font-serif text-garden-text/60">
              {post.author && <span>Por {post.author}</span>}
              <span className="not-italic opacity-30">•</span>
              <span>{calculateReadingTime(wordCount)} de leitura</span>
            </div>
          </div>

          {post.coverImage && (
            <div className="max-w-6xl mx-auto relative aspect-16/9 overflow-hidden rounded-t-[100px] md:rounded-t-[200px] border-x border-t border-garden-text/10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-invert prose-garden max-w-none 
          prose-headings:font-serif prose-headings:font-light
          prose-p:font-sans prose-p:text-garden-text/80 prose-p:leading-relaxed
          prose-strong:text-garden-text prose-strong:font-semibold
          prose-img:rounded-xl"
          >
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-20 pt-12 border-t border-garden-text/10 flex flex-col items-center gap-6">
            <p className="font-serif italic text-lg text-garden-text/60">
              Gostou dessa leitura?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {post.tags?.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <span className="text-[10px] uppercase tracking-widest border border-garden-text/20 px-4 py-2 rounded-full hover:bg-garden-text hover:text-garden-dark transition-all">
                    #{tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 pb-24">
          <RelatedPosts
            currentPostId={post.id}
            category={post.category || ""}
            tags={post.tags || []}
          />
        </div>
      </article>
    </>
  );
}
