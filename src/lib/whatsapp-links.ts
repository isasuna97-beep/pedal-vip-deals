// ═══════════════════════════════════════════════════════════════════════════
// LINKS DO GRUPO DE WHATSAPP — edite este arquivo para trocar o link ativo.
//
// Como trocar o link (sem banco de dados, sem custo):
//   1. Abra este arquivo no GitHub (botão de lápis ✏️) ou peça aqui no chat.
//   2. Coloque `active: true` no link desejado e `active: false` nos demais.
//   3. Para adicionar um link novo, copie uma linha e troque label/url.
//   4. Salve — o site publica a mudança automaticamente.
//
// Regra: apenas UM link pode ter `active: true`. Se nenhum tiver, o primeiro
// da lista é usado como padrão.
// ═══════════════════════════════════════════════════════════════════════════

export type WhatsappLink = {
  label: string;
  url: string;
  active: boolean;
};

export const WHATSAPP_LINKS: WhatsappLink[] = [
  {
    label: "Grupo principal",
    url: "https://chat.whatsapp.com/KnyYvtoZ0dcEjOWeRlUAcv",
    active: true,
  },
  // Exemplo de link reserva — basta marcar active: true nele e false no de cima:
  // {
  //   label: "Grupo reserva",
  //   url: "https://chat.whatsapp.com/SEU_CODIGO_AQUI",
  //   active: false,
  // },
];

export function getActiveWhatsappLink(): string {
  const active = WHATSAPP_LINKS.find((l) => l.active);
  return (active ?? WHATSAPP_LINKS[0]).url;
}
