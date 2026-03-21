import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import MainFeed from "@/components/MainFeed";
import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";

async function getRecentPosts(): Promise<Post[]> {
  const response = await fetchPublishedPosts();
  // Buscamos apenas os detalhes dos 3 primeiros posts
  const posts = await Promise.all(
    response.results.slice(0, 3).map((post) => getPost(post.id)),
  );
  return posts.filter((post): post is Post => post !== null);
}

export default async function HomePage() {
  const posts = await getRecentPosts();

  return (
    <main className="min-h-screen bg-garden-dark overflow-x-hidden">
      <Hero />
      <CategoryGrid />
      <MainFeed posts={posts} />
    </main>
  );
}
