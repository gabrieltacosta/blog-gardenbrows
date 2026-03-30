"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { submitComment } from "@/app/actions/comment";

// Importações do Shadcn UI
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Checkbox } from "@/components/ui/checkbox";

// 1. Definimos as regras de validação e as mensagens de erro
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
  content: z
    .string()
    .min(5, { message: "O comentário é muito curto." })
    .max(100, { message: "O comentário deve ter no máximo 100 caracteres." }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar a Política de Privacidade.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CommentForm({ postSlug }: { postSlug: string }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 2. Inicializamos o React Hook Form acoplado ao Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      content: "",
      consent: false,
    },
  });

  function onSubmit(values: FormValues) {
    setErrorMsg(null);
    startTransition(async () => {
      // Passamos o objeto estruturado junto com a slug do post
      const res = await submitComment({ ...values, postSlug });

      if (res?.error) {
        setErrorMsg(res.error);
      } else {
        setSuccess(true);
        form.reset(); // Limpa o formulário após o sucesso
      }
    });
  }

  if (success) {
    return (
      <div className="p-6 mt-8 bg-garden-olive/10 border border-garden-olive/30 rounded-xl text-center animate-fade-in">
        <p className="font-medium text-garden-text">
          Comentário enviado com sucesso! Ele aparecerá aqui após ser aprovado.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 max-w-2xl animate-fade-in">
      <h3 className="text-xl font-serif text-garden-text mb-6">
        Deixe seu comentário
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo NOME */}
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nome</FieldLabel>
                  <Input
                    placeholder="Seu nome"
                    className="bg-garden-dark"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-garden-dark"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="content"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Comentário</FieldLabel>
                  <InputGroup>
                  <InputGroupTextarea 
                    {...field}
                    placeholder="O que você achou do artigo?"
                    rows={6}
                    className="bg-garden-dark min-h-25 resize-none"
                    aria-invalid={fieldState.invalid}
                    maxLength={200}
                  />
                  <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/200 caracteres
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {/* <Textarea
                    placeholder="O que você achou do artigo?"
                    className="bg-garden-dark resize-y min-h-[100px]"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  /> */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="consent"
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2"
                >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-garden-olive data-[state=checked]:border-garden-olive mt-1"
                  />
                  <div className="space-y-1 leading-snug">
                    <FieldLabel>
                      Li e concordo com a{" "}
                      <Link
                        href="/privacy"
                        className="underline hover:text-garden-text"
                      >
                        Política de Privacidade
                      </Link>{" "}
                      e os{" "}
                      <Link
                        href="/terms"
                        className="underline hover:text-garden-text"
                      >
                        Termos de Uso.
                      </Link>
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        {errorMsg && (
          <p className="text-destructive text-sm font-medium">{errorMsg}</p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto bg-garden-olive text-garden-text hover:bg-garden-olive hover:brightness-110"
        >
          {isPending ? "Enviando..." : "Publicar Comentário"}
        </Button>
      </form>
    </div>
  );
}
