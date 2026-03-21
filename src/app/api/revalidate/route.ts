import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // Removido o revalidateTag daqui

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";

  // 1. Segurança: Verifique se o "token" secreto está correto
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "Token Inválido" }, { status: 401 });
  }

  try {
    // 2. Limpa o cache do caminho específico
    // Use 'layout' como segundo argumento se quiser limpar a página e todas as subpáginas
    revalidatePath(path, "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Cache limpo com sucesso para: ${path}`,
    });
  } catch (err) {
    console.error({ err });
    return NextResponse.json({ message: "Erro ao revalidar" }, { status: 500 });
  }
}
