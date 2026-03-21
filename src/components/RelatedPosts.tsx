import { Post, fetchPublishedPosts, getPost } from "@/lib/notion";
import PostCard from "./post-card";

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
  tags: string[];
}

export default async function RelatedPosts({
  currentPostId,
  category,
  tags,
}: RelatedPostsProps) {
  const response = await fetchPublishedPosts();

  // 1. Buscar detalhes dos posts
  const allPosts = await Promise.all(
    response.results.map((post) => getPost(post.id)),
  );

  // 2. Lógica de Filtragem:
  // - Não ser o post atual
  // - Ter a mesma categoria OU compartilhar pelo menos uma tag
  const related = allPosts
    .filter((post): post is Post => post !== null && post.id !== currentPostId)
    .filter((post) => {
      const sameCategory = post.category === category;
      const sharedTags = post.tags?.some((tag) => tags.includes(tag));
      return sameCategory || sharedTags;
    })
    .slice(0, 3); // Limitar a 3 sugestões

  if (related.length === 0) return null;

  return (
    <section className="mt-24 border-t border-garden-text/5 pt-20">
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/30 mb-4">
          Continue sua jornada
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-garden-text font-light italic">
          Crônicas Relacionadas
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            className="scale-90 opacity-80 hover:opacity-100 hover:scale-100 transition-all duration-500"
          />
        ))}
      </div>
    </section>
  );
}
