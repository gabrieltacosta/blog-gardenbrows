import { fetchPublishedPosts, getPost } from "@/lib/notion";
import PostCard from "@/components/post-card";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

export const revalidate = 86400; // 24 horas

const getCachedPublishedPosts = unstable_cache(
  async () => fetchPublishedPosts(),
  ["published-posts"],
  { revalidate: 86400, tags: ["posts"] },
);

export async function generateStaticParams() {
  const posts = await getCachedPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const categories = new Set(allPosts.map((p) => p?.category).filter(Boolean));
  return Array.from(categories).map((c) => ({
    category: c,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category as string;
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
