import { fetchPostComments } from "@/lib/notion"; 
import CommentForm from "./CommentForm";
// Importando o date-fns
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function CommentSection({ postSlug }: { postSlug: string }) {
  const comments = await fetchPostComments(postSlug);

  return (
    <section className="mt-20 pt-10 px-6 border-t border-border/50 max-w-3xl mx-auto w-full">
      <h2 className="text-2xl font-serif text-garden-text mb-8">
        Comentários ({comments.length})
      </h2>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            Nenhum comentário ainda. Seja o primeiro a compartilhar sua opinião!
          </p>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment.id} 
              className="bg-garden-dark/40 border border-border/60 rounded-xl p-5 sm:p-6 space-y-3 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <strong className="text-garden-text font-medium text-lg">
                  {comment.name}
                </strong>
                {/* Aqui entra a mágica do date-fns */}
                <time className="text-xs text-muted-foreground font-mono">
                  {format(new Date(comment.date), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </time>
              </div>
              <p className="text-garden-text/90 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>

      <CommentForm postSlug={postSlug} />
    </section>
  );
}