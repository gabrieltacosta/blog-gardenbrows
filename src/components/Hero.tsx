import Image from 'next/image';
import Link from 'next/link';

const featuredPost = {
  title: "A Revolução do 'Clean Girl Look': O Retorno da Beleza Minimalista",
  category: "Tendências",
  date: "21 de Março, 2026",
  description: "Entenda por que a naturalidade está ganhando espaço e como adotar a estética que dominou os red carpets este ano.",
  imageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2000&auto=format&fit=crop",
  slug: "revolucao-clean-girl-look"
};

export default function Hero() {
  return (
    <section className="min-h-dvh bg-garden-olive text-garden-text pt-32 md:pt-44 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Conteúdo Editorial */}
          <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-sans opacity-70">
              <span className="font-bold">{featuredPost.category}</span>
              <div className="w-8 h-[1px] bg-garden-text/30"></div>
              <span>{featuredPost.date}</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight">
              {featuredPost.title}
            </h1>

            <p className="font-sans text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed font-light">
              {featuredPost.description}
            </p>

            <div className="pt-6">
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group relative inline-flex items-center gap-4 text-sm uppercase tracking-widest font-medium"
              >
                <span className="relative z-10 bg-garden-text text-garden-olive px-8 py-4 group-hover:bg-white transition-colors duration-300">
                  Ler Matéria Completa
                </span>
                {/* Detalhe estético: uma linha que cresce no hover */}
                <div className="hidden md:block w-12 h-[1px] bg-garden-text group-hover:w-20 transition-all duration-500"></div>
              </Link>
            </div>
          </div>

          {/* Lado Direito: Imagem com Moldura "Arco" (referência ao portfólio) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full">
              {/* O arredondamento no topo (rounded-t-full) remete aos detalhes do seu portfólio */}
              <Image
                src={featuredPost.imageUrl}
                alt="Editorial de Beleza"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-1000"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
              {/* Overlay sutil para blend com o fundo */}
              <div className="absolute inset-0 bg-gradient-to-t from-garden-olive/40 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}