<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules

- Active WhatsApp group links live in `src/lib/whatsapp-links.ts` (plain code config), not in the database — so the site works and links can be swapped without Lovable Cloud or credits.
- The redirect flow must always stay: home CTA → `/grupo` → active link from that config file; never bypass or reorder it.
- Root route error/not-found components take the router's own prop types (`ErrorComponentProps`) so the build stays clean after router upgrades.
