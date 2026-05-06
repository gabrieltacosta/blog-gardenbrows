import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";
import PostCard from "@/components/post-card";
import { notFound } from "next/navigation";
import { cache } from "react";
import { generateSlug } from "@/lib/utils"; // 1. Importando o helper

export const revalidate = 3600; // 1 hora

const getCachedPublishedPosts = cache(
  async () => fetchPublishedPosts(),
);

export async function generateMetadata({ params }: TagsPageProps) {
  const { tag: tagSlug } = await params;

  const posts = await getCachedPublishedPosts();
  const allPosts = await Promise.all(
    posts.results.map((post) => getPost(post.id)),
  );

  // 2. Filtra os posts comparando o slug da tag
  const taggedPosts = allPosts.filter(
    (post): post is Post =>
      post !== null &&
      (post.tags?.some((t) => generateSlug(t) === tagSlug) ?? false),
  );

  const firstPost = taggedPosts[0];
  
  // 3. Resgata o nome original da tag (com letras maiúsculas, etc.) para os metadados
  const originalTag = firstPost?.tags?.find(t => generateSlug(t) === tagSlug) || tagSlug;

  return {
    title: `${originalTag.charAt(0).toUpperCase() + originalTag.slice(1)} | Journal Garden Brows`,
    description: `Explore todas as nossas publicações e crônicas sobre ${originalTag}. Conteúdo exclusivo do Studio Garden Brows.`,
    keywords: [originalTag, "Garden Brows", "Beleza Natural", "Journal"],
    alternates: {
      canonical: `/tags/${tagSlug}`, // O canonical agora usa o slug limpo
    },
    openGraph: {
      title: `Assunto: ${originalTag} | Garden Brows`,
      description: `Confira nossos ${taggedPosts.length} artigos sobre ${originalTag}.`,
      images: [firstPost?.coverImage || ""],
    },
  };
}

interface TagsPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getCachedPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const tags = new Set(allPosts.flatMap((p) => p?.tags || []));
  
  // 4. Gera as rotas estáticas usando o slug
  return Array.from(tags).map((t) => ({
    tag: generateSlug(t),
  }));
}

export default async function TagPage({ params }: TagsPageProps) {
  const { tag: tagSlug } = await params;
  const response = await getCachedPublishedPosts();

  const allPosts = await Promise.all(
    response.results.map((post) => getPost(post.id)),
  );

  // 5. Filtra pelo slug na renderização da página
  const filteredPosts = allPosts.filter(
    (post) =>
      post && post.tags?.some((t) => generateSlug(t) === tagSlug),
  );

  if (filteredPosts.length === 0) return notFound();

  // 6. Resgata o nome bonito para mostrar no H1
  const displayTag = filteredPosts[0]?.tags?.find(t => generateSlug(t) === tagSlug) || tagSlug;

  return (
    <div className="bg-garden-dark min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 border-b border-garden-text/5 pb-12">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/40 block mb-4">
            Assunto Relacionado
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light italic">
            #{displayTag}
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredPosts.map((post) => (
            <PostCard key={post!.id} post={post!} />
          ))}
        </div>
      </div>
    </div>
  );
}
