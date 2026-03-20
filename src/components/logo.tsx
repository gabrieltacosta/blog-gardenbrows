"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const Logo = () => {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <Image
      src={isDark ? "/logowhite.png" : "/logoblack.png"}
      alt="Logo do blog"
      width={150}
      height={100}
      priority
      className="object-contain"
    />
  );
};

export default Logo;
