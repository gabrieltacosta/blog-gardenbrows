import { fetchPublishedPosts, getPost } from "@/lib/notion";
import PostCard from "@/components/post-card";
import { notFound } from "next/navigation";
import { cache } from "react";
import { generateSlug } from "@/lib/utils"; // Importe seu helper

export const revalidate = 3600;

const getCachedPublishedPosts = cache(async () => fetchPublishedPosts());

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const response = await getCachedPublishedPosts();
  
  const allPosts = await Promise.all(response.results.map((post) => getPost(post.id)));

  // Encontramos o post para recuperar o nome real da categoria (para o título)
  const firstPost = allPosts.find(
    (post) => post && post.category && generateSlug(post.category) === categorySlug
  );
  const categoryDisplayName = firstPost?.category || categorySlug;

  return {
    title: `${categoryDisplayName.charAt(0).toUpperCase() + categoryDisplayName.slice(1)}`,
    description: `Descubra tudo sobre ${categoryDisplayName} no Journal do Studio Garden Brows.`,
    alternates: { canonical: `/categorias/${categorySlug}` },
    openGraph: {
      title: `Categoria: ${categoryDisplayName}`,
      images: [firstPost?.coverImage || ""],
    },
  };
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const posts = await getCachedPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const categories = new Set(allPosts.map((p) => p?.category).filter(Boolean));
  
  return Array.from(categories).map((c) => ({
    category: generateSlug(c as string),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const response = await getCachedPublishedPosts();

  const allPosts = await Promise.all(response.results.map((post) => getPost(post.id)));

  // Filtramos comparando Slugs
  const filteredPosts = allPosts.filter(
    (post) => post && post.category && generateSlug(post.category) === categorySlug
  );

  if (filteredPosts.length === 0) return notFound();

  const categoryName = filteredPosts[0]?.category;

  return (
    <div className="bg-garden-dark min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 border-b border-garden-text/5 pb-12">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/40 block mb-4">
            Explorando Categoria
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light italic">
            {categoryName}
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
