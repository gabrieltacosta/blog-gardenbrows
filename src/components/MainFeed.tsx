// src/components/MainFeed.tsx
import Link from "next/link";
import PostCard from "./post-card";
import { Post } from "@/lib/notion";

interface MainFeedProps {
  recentPosts: Post[];
}

export default function MainFeed({ recentPosts }: MainFeedProps) {

  return (
    <section className="bg-garden-dark py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-garden-text/40">
              The Journal
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-garden-text font-light italic">
              Latest Stories
            </h2>
          </div>
          
          <Link 
            href="/posts" 
            className="text-[10px] uppercase tracking-[0.3em] text-garden-text/60 hover:text-garden-text transition-colors border-b border-garden-text/20 pb-1 w-fit"
          >
            View All Chronicles
          </Link>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Elemento Decorativo Sutil */}
        <div className="mt-24 flex justify-center">
          <div className="w-px h-20 bg-linear-to-b from-garden-text/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}