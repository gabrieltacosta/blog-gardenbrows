import { fetchPublishedPosts, getPost } from "@/lib/notion";
import PostCard from "@/components/post-card";
import { notFound } from "next/navigation";

export const revalidate = 86400; // 24 horas

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);
  const response = await fetchPublishedPosts();

  // Buscamos os detalhes de cada post para filtrar pela categoria
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
