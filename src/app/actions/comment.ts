"use server";

import { addCommentToNotion } from "@/lib/notion";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// 1. Replicamos o Schema do Zod no backend para dupla segurança
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
  // 2. Valida os dados no servidor (segurança contra bots que burlam o frontend)
  const parsedData = commentSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: "Dados inválidos." };
  }

  const result = await addCommentToNotion(parsedData.data);

  if (result.success) {
    revalidatePath(`/posts/${parsedData.data.postSlug}`);
    return { success: true };
  } else {
    return { error: "Erro ao enviar comentário. Tente novamente mais tarde." };
  }
}
