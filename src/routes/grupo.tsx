import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/grupo")({
  head: () => ({
    meta: [
      { title: "Entrando no grupo… — Pedal em Oferta" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Grupo,
});

const REDIRECT_LINK = "https://pedalemoferta.lucreshop.com.br/whatsapp/488ZftC";

// ─── component ───────────────────────────────────────────────────────────────

function Grupo() {
  useEffect(() => {
    // Redireciona para o link cadastrado após a análise/loading
    const timer = setTimeout(() => {
      window.location.href = REDIRECT_LINK;
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const isDesktop =
    typeof window !== "undefined" &&
    !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

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
          href={WHATSAPP_LINK}
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
