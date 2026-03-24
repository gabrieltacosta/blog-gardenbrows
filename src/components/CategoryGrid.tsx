import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: "Brows & Style",
    slug: "sobrancelhas",
    imageUrl: "/escovinhas.webp",
    description: "Tendências e cuidados."
  },
  {
    name: "Lash Love",
    slug: "Lash Lifting",
    imageUrl: "/lashlifting.webp",
    description: "O segredo do olhar."
  },
  {
    name: "Self-Care",
    slug: "auto-cuidado",
    imageUrl: "/Care.webp",
    description: "Rituais de bem-estar."
  },
  {
    name: "Studio Life",
    slug: "dia-a-dia",
    imageUrl: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop",
    description: "Bastidores e café."
  }
];

export default function CategoryGrid() {
  return (
    <section className="bg-garden-dark py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-garden-text/50 block mb-4">
              Explore o Universo
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-garden-text font-light">
              Escolha seu Momento
            </h2>
          </div>
          <Link 
            href="/categorias" 
            className="text-garden-text/70 hover:text-garden-text text-sm uppercase tracking-widest border-b border-garden-text/20 pb-1 transition-colors"
          >
            Ver todos os temas
          </Link>
        </div>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/categorias/${encodeURIComponent(cat.slug.toLowerCase())}`}
              className="group flex flex-col items-center text-center"
            >
              {/* Círculo com a Imagem - Efeito Portal */}
              <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-full border border-garden-text/10 p-2 group-hover:border-garden-text/30 transition-all duration-500">
                <div className="relative w-full h-full overflow-hidden rounded-full">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  {/* Overlay sutil que some no hover */}
                  <div className="absolute inset-0 bg-garden-olive/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>

              {/* Texto da Categoria */}
              <h3 className="font-serif text-xl text-garden-text mb-2 tracking-wide">
                {cat.name}
              </h3>
              <p className="font-sans text-xs text-garden-text/50 uppercase tracking-tighter">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}