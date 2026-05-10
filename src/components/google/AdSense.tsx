"use client";

import Script from "next/script";

interface Props {
  pId: string;
}

export default function AdSense({ pId }: Props) {
  if (!pId) return null;

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
    />
  );
}
