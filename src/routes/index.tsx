import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, BadgeCheck } from "lucide-react";
import logo from "@/assets/pedal-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pedal em Ofertas — Grupo VIP de Ofertas Secretas" },
      {
        name: "description",
        content:
          "Entre gratuitamente no grupo VIP Pedal em Ofertas: cupons secretos e promoções de bikes, peças, acessórios e fitness na Shopee, Mercado Livre e Amazon.",
      },
      { property: "og:title", content: "Pedal em Ofertas — Grupo VIP de Ofertas Secretas" },
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

const WHATSAPP_URL =
  "https://chat.whatsapp.com/DzkCF5hSe8EEtiHh7PHkII?s=cl&p=a&mlu=0&amv=1";

const NOMES = [
  "Maria", "Ana", "Juliana", "Fernanda", "Camila", "Patrícia", "Larissa",
  "Amanda", "Beatriz", "Carolina", "Gabriela", "Letícia", "Bruna", "Aline",
  "Vanessa", "Rafaela", "Débora", "Priscila", "Tatiane", "Sabrina", "Jéssica",
  "Renata", "Luciana", "Mariana", "Bianca", "Cristiane", "Simone", "Natália",
];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

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
        const nome = NOMES[Math.floor(Math.random() * NOMES.length)];
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
    <div className="pointer-events-none fixed right-3 top-3 z-50 flex w-[15rem] flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="animate-notif rounded-xl border border-border bg-card px-3 py-2 shadow-soft"
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <p className="truncate text-xs font-medium text-foreground">
              <span className="font-bold">{item.nome}</span> entrou no grupo
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const BENEFITS = [
  "Cupons Secretos",
  "Apenas promoções selecionadas",
  "Pode sair quando quiser",
];

function Index() {
  const handleClick = () => {
    window.fbq?.("track", "Lead");
  };

  return (
    <main className="min-h-screen bg-background">
      <Notifications />

      <div className="w-full bg-primary px-4 py-3 text-center">
        <p className="text-sm font-extrabold uppercase tracking-wide text-primary-foreground">
          Participe do grupo de forma gratuita
        </p>
      </div>

      <section className="mx-auto flex w-full max-w-md flex-col items-center px-5 pb-10 pt-6 text-center">
        <h2 className="text-lg font-bold italic text-foreground">Pedal em Ofertas</h2>
        <p className="mt-0.5 text-sm font-medium italic text-muted-foreground">
          Bikes · Peças · Acessórios · Fitness
        </p>

        <div className="relative mt-4">
          <img
            src={logo.url}
            alt="Logo do grupo Pedal em Ofertas"
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
          <span className="text-sm font-bold text-primary">
            Chegou a hora de economizar! 💰
          </span>
        </div>

        <ul className="mt-5 w-full space-y-2.5 text-left">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary">
                <Check className="size-4 text-primary-foreground" strokeWidth={3} />
              </span>
              <span className="min-w-0 text-base font-semibold text-foreground">{b}</span>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="animate-pulse-cta mt-6 block w-full rounded-full bg-primary px-5 py-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground transition-transform active:scale-95"
        >
          Entrar no grupo e economizar
        </a>

        <p className="mt-3 text-sm text-muted-foreground">
          Mais de <span className="font-bold text-foreground">30 mil pessoas</span> já economizam
          todos os dias no grupo
        </p>
      </section>
    </main>
  );
}
