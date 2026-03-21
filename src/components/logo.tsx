import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src={"/logowhite.png"}
      alt="Logo do blog"
      width={150}
      height={100}
      priority
      className="object-contain"
    />
  );
};

export default Logo;
