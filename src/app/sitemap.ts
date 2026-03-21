import { MetadataRoute } from "next";
import { fetchPublishedPosts, getPost } from "@/lib/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // 1. Buscamos todos os posts do Notion para gerar as URLs dinâmicas
  const response = await fetchPublishedPosts();
  const allPosts = await Promise.all(
    response.results.map((post) => getPost(post.id)),
  );

  const postEntries: MetadataRoute.Sitemap = allPosts
    .filter((post) => post !== null)
    .map((post) => ({
      url: `${baseUrl}/posts/${post!.slug}`,
      lastModified: new Date(post!.date),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  // 2. Definimos as páginas estáticas principais
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/procedimentos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [...staticPages, ...postEntries];
}
