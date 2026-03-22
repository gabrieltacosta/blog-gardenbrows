import { fetchPublishedPosts, getPost } from "@/lib/notion";
import PostCard from "@/components/post-card";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

export const revalidate = 86400;

interface TagsPageProps {
  params: Promise<{
    tag: string;
  }>;
}

const getCachedPublishedPosts = unstable_cache(
  async () => fetchPublishedPosts(),
  ["published-posts"],
  { revalidate: 86400, tags: ["posts"] },
);

export async function generateStaticParams() {
  const posts = await getCachedPublishedPosts();
  const allPosts = await Promise.all(
    posts.results.map((p) => getPost(p.id)),
  );
  const tags = new Set(allPosts.flatMap((p) => p?.tags || []));
  return Array.from(tags).map((t) => ({
    tag: encodeURIComponent(t.toLowerCase()),
  }));
}

export default async function TagPage({ params }: TagsPageProps) {
  const { tag: tagFromParams } = await params;
  const tag = decodeURIComponent(tagFromParams);
  const response = await getCachedPublishedPosts();

  const allPosts = await Promise.all(
    response.results.map((post) => getPost(post.id)),
  );

  const filteredPosts = allPosts.filter(
    (post) =>
      post && post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );

  if (filteredPosts.length === 0) return notFound();

  return (
    <div className="bg-garden-dark min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 border-b border-garden-text/5 pb-12">
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/40 block mb-4">
            Assunto Relacionado
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light italic">
            #{tag}
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
