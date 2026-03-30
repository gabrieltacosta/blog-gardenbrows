/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/";
import { generateSlug } from "@/lib/utils";

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

export interface Comment {
  id: string;
  name: string;
  content: string;
  date: string;
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

    const title = properties.Title?.title[0]?.plain_text || "untitled";

    return {
      id: page.id,
      title,
      slug: generateSlug(title),
      coverImage: getCoverImageUrl(page),
      description,
      date:
        properties["Published Date"]?.date?.start || new Date().toISOString(),
      content: contentString,
      author:
        properties.Author?.people[0]?.name ||
        properties.Author?.rich_text?.[0]?.plain_text ||
        "Carolina Costa",
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      category: properties.Category?.select?.name || "Lifestyle",
    };
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}

// --- FUNÇÕES DE COMENTÁRIOS ---

// Função para buscar os comentários aprovados de um post específico
export async function fetchPostComments(postSlug: string): Promise<Comment[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_COMMENTS_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "Post Slug",
            rich_text: { equals: postSlug },
          },
          {
            property: "Status",
            select: { equals: "Aprovado" }, // Só traz os que você aprovou no Notion
          },
        ],
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending", // Mais recentes primeiro
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        name: properties.Nome?.title[0]?.plain_text || "Anônimo",
        content: properties["Comentário"]?.rich_text[0]?.plain_text || "",
        date: page.created_time,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return [];
  }
}

// Função para enviar um novo comentário para o Notion
export async function addCommentToNotion(data: {
  name: string;
  email: string;
  content: string;
  postSlug: string;
  consent: boolean;
  ip?: string;
}) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_COMMENTS_DATABASE_ID! },
      properties: {
        "Nome": {
          title: [{ text: { content: data.name } }],
        },
        "Comentário": {
          rich_text: [{ text: { content: data.content } }],
        },
        "Email": {
          email: data.email,
        },
        "Post Slug": {
          rich_text: [{ text: { content: data.postSlug } }],
        },
        "Status": {
          select: { name: "Pendente" }, // Cai na sua moderação
        },
        "Aceitou Termos": {
          checkbox: data.consent,
        },
        "IP e Navegador": {
          rich_text: [{ text: { content: data.ip || "Não rastreado" } }],
        },
      },
    });

    return { success: true, id: response.id };
  } catch (error) {
    console.error("Erro ao salvar comentário no Notion:", error);
    return { success: false, error: "Falha ao comunicar com o banco de dados." };
  }
}

export function getWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}
