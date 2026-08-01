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

const WHATSAPP_LINK = "https://chat.whatsapp.com/DzkCF5hSe8EEtiHh7PHkII";

// ─── helpers (mesma lógica do mamaeeconomiza.site) ───────────────────────────

function getInApp(): "tiktok" | "instagram" | "facebook" | "other" | false {
  const ua =
    navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || "";
  if (/TikTok/i.test(ua)) return "tiktok";
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV/i.test(ua)) return "facebook";
  if (/Line|KAKAOTALK|Twitter|Snapchat/i.test(ua)) return "other";
  return false;
}

function isMobile(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function buildLinks() {
  const inviteCode = WHATSAPP_LINK.split("chat.whatsapp.com/")[1];
  const appProtocol = `whatsapp://chat?code=${inviteCode}`;
  const webLink = `https://chat.whatsapp.com/${inviteCode}`;
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const intentLink = isAndroid
    ? `intent://chat?code=${inviteCode}#Intent;scheme=whatsapp;package=com.whatsapp;end`
    : "";
  return { appProtocol, webLink, isAndroid, isIOS, intentLink };
}

// ─── component ───────────────────────────────────────────────────────────────

function Grupo() {
  useEffect(() => {
    // ✅ fbq Lead dispara aqui — só quando a pessoa chega na página intermediária
    window.fbq?.("track", "Lead");

    const { appProtocol, webLink, isAndroid, isIOS, intentLink } = buildLinks();
    const inApp = getInApp();

    if (inApp === "tiktok") {
      // TikTok tem restrições especiais de deep link
      if (isAndroid && intentLink) {
        setTimeout(() => (window.location.href = intentLink), 800);
        setTimeout(() => (window.location.href = webLink), 1800);
      } else if (isIOS) {
        setTimeout(() => (window.location.href = webLink), 800);
        setTimeout(() => (window.location.href = appProtocol), 1800);
      } else {
        window.location.href = webLink;
      }
    } else if (inApp) {
      // Instagram, Facebook, outros browsers in-app
      setTimeout(() => (window.location.href = webLink), 800);
      setTimeout(() => (window.location.href = appProtocol), 1500);
    } else if (isMobile()) {
      // Mobile normal: abre app direto com fallback web
      window.location.href = appProtocol;
      setTimeout(() => (window.location.href = webLink), 1000);
    } else {
      // Desktop
      setTimeout(() => (window.location.href = webLink), 500);
    }
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
