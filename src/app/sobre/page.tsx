import Image from "next/image";

export const metadata = {
  title: "Sobre Carolina Costa",
  description: "Conheça a trajetória de Carol Garden, sua filosofia de beleza e devoção.",
};

export default function AboutPage() {
  return (
    <div className="bg-garden-dark min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Seção 1: O Manifesto da Carolina */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border border-garden-text/10">
            <Image 
              src="/carol-garden.jpg" // Foto da Carolina
              alt="Carolina Costa - Carol Garden"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          
          <div className="flex flex-col gap-8">
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-garden-text/40">
              A Fundadora
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-garden-text font-light italic leading-tight">
              Carolina <br /> Costa.
            </h1>
            <div className="w-20 h-[1px] bg-garden-text/20"></div>
            
            <p className="font-sans text-lg text-garden-text/70 leading-relaxed font-light italic">
              &ldquo;Tudo por Jesus, nada sem Maria.&rdquo;
            </p>

            <p className="font-sans text-base text-garden-text/60 leading-relaxed font-light">
              Expert em design de sobrancelhas, Lash Lift, Brow Lamination e Micropigmentação Labial, 
              <span className="font-bold"> Carol Garden</span> transformou sua paixão pela estética em um ministério de cuidado. 
              Mãe da Mariana (nosso anjinho no céu) e da pequena Catarina, ela imprime em cada atendimento 
              o amor e a dedicação que transbordam de sua fé católica.
            </p>
            
            <p className="font-sans text-base text-garden-text/50 leading-relaxed font-light">
              No Studio Garden Brows, o trabalho das mãos é guiado pela devoção. Buscamos realçar a beleza 
              que Deus já depositou em cada mulher, com a delicadeza e a perfeição de quem entende 
              que o autocuidado é também uma forma de gratidão.
            </p>
          </div>
        </div>

        {/* Seção 2: Especialidades (Expertise) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-garden-text/5 py-16">
          {[
            "Design de Sobrancelhas",
            "Lash Lift",
            "Brow Lamination",
            "Micropigmentação Labial"
          ].map((skill) => (
            <div key={skill} className="text-center">
              <span className="font-serif italic text-lg text-garden-text/40 block mb-2 opacity-50">✓</span>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-garden-text/60">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}