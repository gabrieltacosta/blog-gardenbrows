import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";
import Link from "next/link";
import { Metadata } from "next";
import { generateSlug } from "@/lib/utils"; // Utilizando o mesmo helper do seu notion.ts
import { cache } from "react";

export const metadata: Metadata = {
  title: "Categorias | Garden Brows Studio",
  description: "Explore nossos artigos por categoria e encontre os melhores conteúdos sobre design de sobrancelhas e cílios.",
};

const getCachedPosts = cache(async (): Promise<Post[]> => {
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(
    posts.results.map((post) => getPost(post.id)),
  );
  return allPosts.filter((post): post is Post => post !== null);
});

export default async function CategoriesPage() {
  // 1. Busca todos os posts publicados direto do Notion
  const posts = await getCachedPosts();


  // 2. Extrai e conta as categorias dinamicamente
  const categoryCounts: Record<string, number> = {};

  posts.forEach((page) => {
    // Acessa a propriedade Category do seu banco de dados do Notion
    const categoryName = page.category
    
    if (categoryName) {
      categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
    }
  });

  // 3. Transforma o objeto em um array e ordena (das categorias com mais posts para as com menos)
  const categories = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count,
      slug: generateSlug(name),
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="bg-garden-dark min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Cabeçalho da Página */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="font-serif text-5xl md:text-6xl text-garden-text font-light mb-4">
            Categorias
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore nossos conteúdos divididos por temas. Encontre dicas, técnicas e novidades sobre o universo da beleza e design.
          </p>
        </header>

        {/* Grid de Categorias */}
        {categories.length === 0 ? (
          <div className="text-center py-20 border border-border/50 rounded-2xl bg-garden-dark/50">
            <p className="text-muted-foreground text-lg">Nenhuma categoria encontrada no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categorias/${category.slug}`}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-garden-dark/40 border border-border/40 hover:border-garden-olive transition-all duration-300 hover:shadow-lg hover:shadow-garden-olive/5 hover:-translate-y-1 overflow-hidden"
              >
                {/* Efeito de brilho sutil no hover usando as suas cores */}
                <div className="absolute inset-0 bg-gradient-to-br from-garden-olive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  <h2 className="font-serif text-2xl text-garden-text transition-colors duration-300">
                    {category.name}
                  </h2>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-garden-text bg-garden-olive/30 px-3 py-1 rounded-full">
                      {category.count} {category.count === 1 ? "artigo" : "artigos"}
                    </span>
                    
                    {/* Seta indicativa elegante */}
                    <span className="text-garden-olive opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}