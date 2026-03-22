import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Post, getWordCount } from "@/lib/notion";
import { calculateReadingTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  className?: string;
}

export default function PostCard({ post, className }: PostCardProps) {
  const wordCount = post.content ? getWordCount(post.content) : 0;
  const readingTime = calculateReadingTime(wordCount);

  return (
    <div className={cn("group flex flex-col gap-5 bg-transparent transition-all duration-300 overflow-hidden", className)}>
      {/* Container da Imagem com Estética de Portal (Arco) */}
      <div className="relative aspect-portrait w-full overflow-hidden rounded-t-full border border-garden-text/5 bg-garden-olive/5">
        <Link 
          href={`/posts/${post.slug}`} 
          aria-label={post.title}
          className="block h-full w-full"
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover grayscale-20 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-garden-olive/10">
              <span className="font-serif text-4xl opacity-10 italic">G</span>
            </div>
          )}
        </Link>
        
        {/* Badge de Categoria - AGORA CLICÁVEL */}
        {post.category && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 overflow-hidden z-10">
            <Link href={`/categorias/${encodeURIComponent(post.category.toLowerCase())}`}>
              <span className="bg-garden-dark/60 px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-garden-text backdrop-blur-md hover:bg-garden-text hover:text-garden-dark transition-all duration-300 cursor-pointer">
                {post.category}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Conteúdo Textual */}
      <div className="flex flex-col gap-3 px-1 text-center items-center">
        <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-garden-text/40">
          <time>{format(new Date(post.date), "dd MMM yyyy", { locale: ptBR })}</time>
          <span className="h-1 w-1 rounded-full bg-garden-text/20" />
          <span>{readingTime}</span>
        </div>

        <Link href={`/posts/${post.slug}`}>
          <h2 className="font-serif text-2xl font-light leading-tight text-garden-text group-hover:italic transition-all duration-300">
            {post.title}
          </h2>
        </Link>

        <p className="line-clamp-2 font-sans text-sm font-light leading-relaxed text-garden-text/60">
          {post.description}
        </p>

        {/* Tags - AGORA CLICÁVEIS */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {post.tags.slice(0, 3).map((tag) => (
              <Link 
                key={tag} 
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="hover:text-garden-text transition-colors"
              >
                <span className="text-[9px] text-garden-text/30 uppercase tracking-tighter hover:text-garden-text/60">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}