"use server";

import { addCommentToNotion } from "@/lib/notion";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const commentSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  content: z.string().min(5, "Comentário deve ter pelo menos 5 caracteres"),
  postSlug: z.string(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar a Política de Privacidade.",
  }),
});

export async function submitComment(data: z.infer<typeof commentSchema>) {
  const parsedData = commentSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: "Dados inválidos." };
  }

  const headersList = await headers(); 
  
  // 1. Tenta pegar o IP direto do Cloudflare (Mais seguro)
  let ipUsuario = headersList.get("cf-connecting-ip");
  
  // 2. Se não estiver passando pelo Cloudflare, tenta as alternativas padrões
  if (!ipUsuario) {
    const forwardedFor = headersList.get("x-forwarded-for");
    if (forwardedFor) {
      ipUsuario = forwardedFor.split(",")[0].trim();
    } else {
      ipUsuario = headersList.get("x-real-ip") || "IP desconhecido";
    }
  }

  const dataWithIp = {
    ...parsedData.data,
    ip: ipUsuario,
  };

  const result = await addCommentToNotion(dataWithIp);

  if (result.success) {
    revalidatePath(`/posts/${parsedData.data.postSlug}`);
    return { success: true };
  } else {
    return { error: "Erro ao enviar comentário. Tente novamente mais tarde." };
  }
}
