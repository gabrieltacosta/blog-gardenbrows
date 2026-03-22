import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import MainFeed from "@/components/MainFeed";
import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";

export const revalidate = 86400; // 24 horas

async function getRecentPosts(): Promise<Post[]> {
  const response = await fetchPublishedPosts();
  // Buscamos apenas os detalhes dos 3 primeiros posts
  const posts = await Promise.all(
    response.results.slice(1, 4).map((post) => getPost(post.id)),
  );
  return posts.filter((post): post is Post => post !== null);
}

async function getFeaturedPost(): Promise<Post | null> {
  const posts = await fetchPublishedPosts();

  const firstPost = posts.results[0];
  if (!firstPost) return null;

  const featuredPost = await getPost(firstPost.id);

  return featuredPost;
}

export default async function HomePage() {
  const posts = await getRecentPosts();
  const featuredPost = await getFeaturedPost();

  if (!featuredPost) {
    return <div>Nenhum post em destaque encontrado.</div>;
  }

  return (
    <main className="min-h-screen bg-garden-dark overflow-x-hidden">
      <Hero featuredPost={featuredPost} />
      <CategoryGrid />
      <MainFeed recentPosts={posts} />
    </main>
  );
}
