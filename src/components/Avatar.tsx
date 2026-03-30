import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number; // Tamanho em pixels (largura/altura)
}

export default function Avatar({ src, alt, size = 96 }: AvatarProps) {
  return (
    // Container redondo com borda sutil
    <div className="relative inline-flex shrink-0 items-center justify-center rounded-full border-2 border-border shadow-2xl shadow-black/60 bg-garden-dark">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        // Classes essenciais para o recorte redondo perfeito
        className="rounded-full object-cover object-center aspect-square"
        // Atributo de prioridade para carregamento rápido (é o elemento principal do topo)
        priority 
      />
    </div>
  );
}