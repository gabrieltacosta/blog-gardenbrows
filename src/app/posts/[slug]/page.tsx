import { fetchPublishedPosts, getPost, getWordCount } from "@/lib/notion";
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

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const post = allPosts.find((p) => p?.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: post.title,
    description: post.description,
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
          url: post.coverImage || `${siteUrl}/opengraph-image.png`,
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


export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const post = allPosts.find((p) => p?.slug === slug);
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
      name: post.author || "Carolina Costa", // Ajustado para o nome real dela
      url: `${siteUrl}/sobre`, // Link para a página da Carol
    },
    publisher: {
      "@type": "Organization",
      name: "Garden Brows Studio", // Nome real do negócio
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`, // Certifique-se que esse arquivo existe em /public
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
    
    <article className="bg-garden-dark min-h-screen text-garden-text pb-24 pt-20">
      {/* Header Editorial */}
      <header className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-garden-text/40 mb-8 font-sans">
             <span>{post.category || "Lifestyle"}</span>
             <span className="w-1 h-1 rounded-full bg-garden-text/20"></span>
             <time>{format(new Date(post.date), "dd MMMM, yyyy", { locale: ptBR })}</time>
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

        {/* Imagem de Capa com moldura estilo Portfólio (Arco) */}
        {post.coverImage && (
          <div className="max-w-6xl mx-auto relative aspect-[21/9] md:aspect-[21/7] overflow-hidden rounded-t-[100px] md:rounded-t-[200px] border-x border-t border-garden-text/10">
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

      {/* Conteúdo do Artigo */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-invert prose-garden max-w-none 
          prose-headings:font-serif prose-headings:font-light
          prose-p:font-sans prose-p:text-garden-text/80 prose-p:leading-relaxed
          prose-strong:text-garden-text prose-strong:font-semibold
          prose-img:rounded-xl">
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer do Post */}
        <div className="mt-20 pt-12 border-t border-garden-text/10 flex flex-col items-center gap-6">
           <p className="font-serif italic text-lg text-garden-text/60">Gostou dessa leitura?</p>
           <div className="flex gap-4">
              {post.tags?.map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-widest border border-garden-text/20 px-4 py-2 rounded-full hover:bg-garden-text hover:text-garden-dark transition-all">
                  #{tag}
                </span>
              ))}
           </div>
        </div>
      </div>
    </article>
    </>
  );
}