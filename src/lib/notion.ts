/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const n2m = new NotionToMarkdown({ notionClient: notion });

export interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  description: string;
  date: string;
  content: string;
  author?: string;
  tags?: string[];
  category?: string;
}

// Helper para extrair a URL da imagem de forma segura
function getCoverImageUrl(page: any): string | undefined {
  const properties = page.properties;

  // 1. Tenta pegar da propriedade customizada "Featured Image" (Files & Media)
  const featured = properties["Featured Image"]?.files?.[0];
  if (featured) {
    return featured.file?.url || featured.external?.url;
  }

  // 2. Fallback para a capa nativa do Notion (Cover)
  if (page.cover) {
    return page.cover.file?.url || page.cover.external?.url;
  }

  return undefined;
}

export async function fetchPublishedPosts() {
  return await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [{ property: "Published Date", direction: "descending" }],
  });
}

export async function getPost(pageId: string): Promise<Post | null> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as PageObjectResponse;

    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const { parent: contentString } = n2m.toMarkdownString(mdBlocks);

    const properties = page.properties as any;

    // Melhora a geração automática de descrição
    const firstParagraph =
      contentString
        .split("\n")
        .find((line) => line.trim().length > 10 && !line.startsWith("#")) || "";

    const description =
      firstParagraph
        .replace(/[#*`_]/g, "") // Limpa markdown da descrição
        .slice(0, 160) + (firstParagraph.length > 160 ? "..." : "");

    return {
      id: page.id,
      title: properties.Title?.title[0]?.plain_text || "Untitled",
      slug:
        properties.Title.title[0]?.plain_text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric chars with dash
          .replace(/^-+|-+$/g, "") || "untitled", // Remove leading/trailing dashes
      coverImage: getCoverImageUrl(page),
      description,
      date:
        properties["Published Date"]?.date?.start || new Date().toISOString(),
      content: contentString,
      author:
        properties.Author?.people[0]?.name ||
        properties.Author?.rich_text?.[0]?.plain_text || "Carolina Costa",
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      category: properties.Category?.select?.name || "Lifestyle",
    };
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}

export function getWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}
