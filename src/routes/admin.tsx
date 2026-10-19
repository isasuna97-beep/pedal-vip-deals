import { createFileRoute } from "@tanstack/react-router";
import { Check, Link2 } from "lucide-react";
import { WHATSAPP_LINKS } from "@/lib/whatsapp-links";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Links do grupo — Pedal em Oferta" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl bg-background px-5 py-8">
      <header className="flex items-center gap-2">
        <Link2 className="size-5 text-primary" />
        <h1 className="text-xl font-extrabold text-foreground">Links do grupo</h1>
      </header>

      <p className="mt-2 text-sm text-muted-foreground">
        O link marcado como ativo é o destino final após a página /grupo. Para
        trocar o link ativo, edite o arquivo{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs font-semibold">
          src/lib/whatsapp-links.ts
        </code>{" "}
        no GitHub (botão de lápis) ou peça a alteração no chat do Lovable — sem
        banco de dados e sem custo de créditos de Cloud.
      </p>

      <ul className="mt-6 space-y-3">
        {WHATSAPP_LINKS.map((l) => (
          <li
            key={l.url}
            className="flex items-center gap-3 rounded-xl border border-border p-3 shadow-soft"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">{l.label}</p>
              <p className="truncate text-xs text-muted-foreground">{l.url}</p>
            </div>
            {l.active && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-whatsapp/15 px-2.5 py-1 text-xs font-bold text-whatsapp">
                <Check className="size-3.5" strokeWidth={3} /> Ativo
              </span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
