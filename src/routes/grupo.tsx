import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";


export const Route = createFileRoute("/grupo")({
  head: () => ({
    meta: [
      { title: "Entrando no grupo… — Pedal em Oferta" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Grupo,
});

// Fallback caso o link ativo não possa ser carregado
const FALLBACK_LINK = "https://chat.whatsapp.com/KnyYvtoZ0dcEjOWeRlUAcv";

// ─── component ───────────────────────────────────────────────────────────────

function Grupo() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [link, setLink] = useState(FALLBACK_LINK);

  useEffect(() => {
    setIsDesktop(!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const started = Date.now();

    const go = (target: string) => {
      if (cancelled) return;
      setLink(target);
      const wait = Math.max(0, 1200 - (Date.now() - started));
      timer = setTimeout(() => {
        window.location.href = target;
      }, wait);
    };

    supabase
      .from("whatsapp_links")
      .select("url")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle()
      .then(({ data }) => go(data?.url ?? FALLBACK_LINK))
      .catch(() => go(FALLBACK_LINK));

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#fff",
        fontFamily: "inherit",
        padding: "20px",
      }}
    >
      {/* Spinner verde WhatsApp */}
      <div
        style={{
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #25D366",
          borderRadius: "50%",
          width: 56,
          height: 56,
          animation: "spin 1s linear infinite",
          marginBottom: 24,
        }}
      />

      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#111",
          margin: 0,
        }}
      >
        {isDesktop
          ? "Abrindo no WhatsApp Web…"
          : "Aguarde, abrindo o WhatsApp…"}
      </p>

      <p
        style={{
          fontSize: 13,
          color: "#888",
          marginTop: 8,
        }}
      >
        Se não abrir automaticamente,{" "}
        <a
          href={REDIRECT_LINK}
          style={{ color: "#25D366", fontWeight: 700, textDecoration: "none" }}
        >
          clique aqui
        </a>
        .
      </p>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
