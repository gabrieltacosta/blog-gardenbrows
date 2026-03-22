import { fetchPublishedPosts, getPost } from "@/lib/notion";
import PostCard from "@/components/post-card";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 3600; // 1 hora

const getCachedPublishedPosts = cache(
  async () => fetchPublishedPosts(),
);

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const category = decodeURIComponent(categoryParam);

  const response = await getCachedPublishedPosts();
  const allPosts = await Promise.all(
    response.results.map((post) => getPost(post.id)),
  );

  // Filtro seguro para a categoria
  const filteredPosts = allPosts.filter(
    (post) => post?.category?.toLowerCase() === category.toLowerCase(),
  );

  // Pegamos o primeiro post para usar a imagem no OpenGraph
  const firstPost = filteredPosts[0];

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} | Garden Brows`,
    description: `Descubra tudo sobre ${category} no Journal do Studio Garden Brows. Crônicas e tendências de beleza por Carolina Costa.`,
    keywords: [
      category,
      `Dicas de ${category}`,
      "Garden Brows",
      "Carolina Costa",
      "Estética Natural São Paulo",
      "Beleza com Propósito",
    ],
    alternates: {
      canonical: `/categorias/${categoryParam}`,
    },
    openGraph: {
      title: `Categoria: ${category} | Garden Brows`,
      description: `Explorar conteúdos exclusivos sobre ${category}.`,
      images: [firstPost?.coverImage || ""],
    },
  };
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}


export async function generateStaticParams() {
  const posts = await getCachedPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const categories = new Set(allPosts.map((p) => p?.category));
  return Array.from(categories)
    .filter((c): c is string => !!c)
    .map((c) => ({
      category: encodeURIComponent(c.toLowerCase()),
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryFromParams } = await params;
  const category = decodeURIComponent(categoryFromParams);
  const response = await getCachedPublishedPosts();

  const allPosts = await Promise.all(
    response.results.map((post) => getPost(post.id)),
  );

  const filteredPosts = allPosts.filter(
    (post) => post && post.category?.toLowerCase() === category.toLowerCase(),
  );

  if (filteredPosts.length === 0) return notFound();

  return (
    <div className="bg-garden-dark min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 border-b border-garden-text/5 pb-12">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/40 block mb-4">
            Explorando Categoria
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light italic">
            {category}
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
