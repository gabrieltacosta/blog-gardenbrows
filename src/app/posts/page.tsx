import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";
import PostCard from "@/components/post-card";

export const revalidate = 86400; // 24 horas

async function getPosts(): Promise<Post[]> {
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(
    posts.results.map((post) => getPost(post.id)),
  );
  return allPosts.filter((post): post is Post => post !== null);
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className="bg-garden-dark min-h-screen pb-24 pt-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-garden-text/50 block mb-6">
          The Journal
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light mb-6 italic">
          Crônicas de Beleza
        </h1>
        <div className="w-20 h-px bg-garden-text/20 mx-auto mb-8"></div>
        <p className="text-lg text-garden-text/60 font-sans max-w-xl mx-auto font-light leading-relaxed">
          Um mergulho profundo em tendências, rituais de cuidado e o lifestyle
          do nosso studio.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
