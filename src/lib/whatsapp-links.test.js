import { describe, expect, it } from "bun:test";
import { getActiveWhatsappLink, WHATSAPP_LINKS } from "./whatsapp-links";

describe("configured WhatsApp destination", () => {
  it("keeps only the requested Lucreshop destination", () => {
    expect(WHATSAPP_LINKS).toHaveLength(1);
    expect(getActiveWhatsappLink()).toBe(
      "https://pedalemoferta.lucreshop.com.br/whatsapp/BoErTR7",
    );
  });
});