import { MetadataRoute } from "next";
import { fetchPublishedPosts, getPost } from "@/lib/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const response = await fetchPublishedPosts();
  const allPosts = await Promise.all(
    response.results.map((post) => getPost(post.id)),
  );

  const activePosts = allPosts.filter((post) => post !== null);

  // 1. URLs dos Posts
  const postEntries: MetadataRoute.Sitemap = activePosts.map((post) => ({
    url: `${baseUrl}/posts/${post!.slug}`,
    lastModified: post?.date ? new Date(post!.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 2. URLs de Categorias - Adicionado .filter(Boolean) para remover undefined
  const categories = Array.from(
    new Set(activePosts.map((p) => p?.category?.toLowerCase()).filter(Boolean)),
  );

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categorias/${encodeURIComponent(cat!.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // 3. URLs de Tags - Adicionado .filter(Boolean) para garantir que não existam tags vazias
  const tags = Array.from(
    new Set(
      activePosts
        .flatMap((p) => p?.tags?.map((t) => t.toLowerCase()) || [])
        .filter(Boolean),
    ),
  );

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag!.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // 4. Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
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
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...postEntries, ...categoryEntries, ...tagEntries];
}
