import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Plus, LogOut, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel — Pedal em Oferta" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type LinkRow = {
  id: string;
  label: string;
  url: string;
  is_active: boolean;
  created_at: string;
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <main className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </main>
    );
  }

  return session ? <Panel /> : <LoginCard />;
}

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    if (res.error) setMsg(res.error.message);
    else if (mode === "signup" && !res.data.session)
      setMsg("Conta criada. Confirme o e-mail para entrar.");
    setBusy(false);
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border p-6 shadow-soft"
      >
        <h1 className="text-xl font-extrabold text-foreground">Painel administrativo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Entre para gerenciar os links." : "Crie a conta de administrador."}
        </p>

        <label className="mt-5 block text-sm font-semibold text-foreground">E-mail</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />

        <label className="mt-4 block text-sm font-semibold text-foreground">Senha</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />

        {msg && <p className="mt-3 text-sm font-medium text-destructive">{msg}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold uppercase text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMsg(null);
          }}
          className="mt-3 w-full text-center text-xs font-semibold text-muted-foreground underline"
        >
          {mode === "login" ? "Criar conta de administrador" : "Já tenho conta"}
        </button>
      </form>
    </main>
  );
}

function Panel() {
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("whatsapp_links")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setLinks((data as LinkRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const activate = async (id: string) => {
    setError(null);
    const { error } = await supabase.from("whatsapp_links").update({ is_active: true }).eq("id", id);
    if (error) setError(error.message);
    await load();
  };

  const remove = async (id: string) => {
    setError(null);
    const { error } = await supabase.from("whatsapp_links").delete().eq("id", id);
    if (error) setError(error.message);
    await load();
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase
      .from("whatsapp_links")
      .insert({ label: label.trim(), url: url.trim(), is_active: links.length === 0 });
    if (error) setError(error.message);
    else {
      setLabel("");
      setUrl("");
      setShowForm(false);
    }
    await load();
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl bg-background px-5 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-foreground">Links do grupo</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
        >
          <LogOut className="size-4" /> Sair
        </button>
      </header>

      <p className="mt-1 text-sm text-muted-foreground">
        O link ativo é o destino final após a página /grupo.
      </p>

      {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}

      <button
        onClick={() => setShowForm((v) => !v)}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
      >
        <Plus className="size-4" /> Cadastrar link
      </button>

      {showForm && (
        <form onSubmit={add} className="mt-4 rounded-xl border border-border p-4">
          <label className="block text-sm font-semibold text-foreground">Nome</label>
          <input
            required
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Grupo VIP 2"
            className="mt-1 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <label className="mt-3 block text-sm font-semibold text-foreground">Link</label>
          <input
            required
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://chat.whatsapp.com/..."
            className="mt-1 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            Salvar
          </button>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {loading && <Loader2 className="size-5 animate-spin text-primary" />}
        {!loading && links.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhum link cadastrado ainda.</p>
        )}
        {links.map((l) => (
          <li
            key={l.id}
            className="flex items-center gap-3 rounded-xl border border-border p-3 shadow-soft"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">{l.label}</p>
              <p className="truncate text-xs text-muted-foreground">{l.url}</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={l.is_active}
              aria-label={`Ativar ${l.label}`}
              onClick={() => !l.is_active && activate(l.id)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                l.is_active ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-background transition-all ${
                  l.is_active ? "left-[1.375rem]" : "left-0.5"
                }`}
              />
            </button>

            <button
              onClick={() => remove(l.id)}
              aria-label={`Excluir ${l.label}`}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
