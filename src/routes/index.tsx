import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, BadgeCheck } from "lucide-react";
import logo from "@/assets/pedal-logo.png.asset.json";
import whatsappIcon from "@/assets/whatsapp-icon.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pedal em Oferta — Grupo VIP de Ofertas Secretas" },
      {
        name: "description",
        content:
          "Entre gratuitamente no grupo VIP Pedal em Oferta: cupons secretos e promoções de bikes, peças, acessórios e fitness na Shopee, Mercado Livre e Amazon.",
      },
      { property: "og:title", content: "Pedal em Oferta — Grupo VIP de Ofertas Secretas" },
      {
        property: "og:description",
        content: "Cupons secretos e promoções selecionadas de bikes, peças e acessórios. Entre grátis no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});



const NOMES_FEM = [
  "Maria", "Ana", "Juliana", "Fernanda", "Camila", "Patrícia", "Larissa",
  "Amanda", "Beatriz", "Carolina", "Gabriela", "Letícia", "Bruna", "Aline",
  "Vanessa", "Rafaela", "Débora", "Priscila", "Tatiane", "Sabrina", "Jéssica",
  "Renata", "Luciana", "Mariana", "Bianca", "Cristiane", "Simone", "Natália",
];

const NOMES_MASC = [
  "João", "Pedro", "Carlos", "Bruno", "Rafael", "Lucas", "Gabriel", "Felipe",
  "Rodrigo", "Marcos", "André", "Thiago", "Eduardo", "Ricardo", "Marcelo",
  "Gustavo", "Diego", "Vinícius", "Leonardo", "Daniel", "Fábio", "Rafael",
  "Caio", "Matheus", "Henrique", "Guilherme", "Rogério", "Alexandre", "Júlio",
  "Paulo", "Roberto", "Fernando", "Sérgio", "Maurício", "Evandro",
];


type Notif = { id: number; nome: string };

function Notifications() {
  const [items, setItems] = useState<Notif[]>([]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let counter = 0;

    const schedule = () => {
      const delay = 4000 + Math.random() * 3000;
      timeout = setTimeout(() => {
        const id = ++counter;
        const isMasc = Math.random() < 0.7;
        const pool = isMasc ? NOMES_MASC : NOMES_FEM;
        const nome = pool[Math.floor(Math.random() * pool.length)];
        setItems((prev) => [...prev, { id, nome }]);
        setTimeout(() => {
          setItems((prev) => prev.filter((i) => i.id !== id));
        }, 3800);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="pointer-events-none fixed right-2 top-2 z-50 flex w-[11rem] flex-col gap-1.5">
      {items.map((item) => (
        <div
          key={item.id}
          className="animate-notif rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-soft"
        >
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3" strokeWidth={3} />
            </span>
            <p className="truncate text-[11px] font-medium text-foreground">
              <span className="font-bold">{item.nome}</span> entrou no grupo
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const BENEFITS = [
  { emoji: "🚵", text: "Bikes e peças com os melhores preços" },
  { emoji: "⚡", text: "Cupons VIP antes de qualquer um" },
  { emoji: "✨", text: "Apenas promoções selecionadas" },
];

function Index() {

  return (
    <main className="min-h-screen bg-background">
      <Notifications />

      <div className="w-full bg-primary px-4 py-3 text-center">
        <p className="text-xs font-extrabold uppercase tracking-wide text-primary-foreground whitespace-nowrap">
          🔥 Grupo VIP Gratuito &mdash; Vagas Limitadas 🔥
        </p>
      </div>

      <section className="mx-auto flex w-full max-w-md flex-col items-center px-5 pb-10 pt-6 text-center">
        <h2 className="text-lg font-bold italic text-foreground">Pedal em Oferta</h2>
        <p className="mt-0.5 text-sm font-medium italic text-muted-foreground">
          Bikes · Peças · Acessórios · Fitness
        </p>

        <div className="relative mt-4">
          <img
            src={logo.url}
            alt="Logo do grupo Pedal em Oferta"
            className="size-28 rounded-full border-4 border-primary object-cover shadow-soft"
          />
          <span className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full bg-background">
            <BadgeCheck className="size-7 fill-verified text-background" />
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground">
          Grupo VIP de Ofertas Secretas
        </h1>

        <div className="mt-3 rounded-full border-2 border-primary/40 bg-primary/10 px-4 py-1.5">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
            <span className="inline-block size-2 rounded-full bg-primary animate-blink" />
            ⏰ Últimas vagas disponíveis hoje
          </span>
        </div>

        <ul className="mt-5 w-full space-y-2.5 text-left">
          {BENEFITS.map((b) => (
            <li key={b.text} className="flex items-center gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary">
                <Check className="size-4 text-primary-foreground" strokeWidth={3} />
              </span>
              <span className="min-w-0 text-base font-semibold text-foreground">
                {b.emoji} {b.text}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to="/grupo"
          onClick={() => {
            // Meta Pixel standard Lead event
            if (typeof window !== "undefined") {
              const w = window as unknown as { fbq?: (...a: unknown[]) => void };
              w.fbq?.("track", "Lead");
            }
          }}
          className="animate-pulse-cta mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp px-5 py-4 text-base font-extrabold uppercase tracking-wide text-whatsapp-foreground transition-transform active:scale-95"
        >
          <img
            src={whatsappIcon}
            alt="Ícone do WhatsApp"
            className="size-7 shrink-0"
          />
          Entrar no grupo e economizar
        </Link>

        <p className="mt-3 text-sm text-muted-foreground">
          Mais de <span className="font-bold text-foreground">2 mil pessoas</span> já economizam
          todos os dias no grupo
        </p>
      </section>
    </main>
  );
}
