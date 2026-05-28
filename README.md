# Horské ubytování Ramzová — webové stránky

Elegantní web ve stylu *Badrutt's Palace*. Postaveno na Next.js 14 + Tailwind, 4 jazyky (CS / EN / PL / DE).

## Lokální vývoj

```bash
npm install
npm run dev
```

Web poběží na `http://localhost:3000`:
- `/` — čeština (výchozí)
- `/en` — angličtina
- `/pl` — polština
- `/de` — němčina

## Nasazení na Cloudflare Pages

Projekt je předpřipravený pro Cloudflare Pages přes `@cloudflare/next-on-pages`.

### Možnost A — přes Cloudflare dashboard (doporučeno)

1. Přihlaš se na <https://dash.cloudflare.com> → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Vyber repo `kol8isek/Ramzova` a klikni **Begin setup**.
3. Nastav build konfiguraci:
   - **Framework preset:** `Next.js`
   - **Build command:** `npx @cloudflare/next-on-pages@1`
   - **Build output directory:** `.vercel/output/static`
4. Environment variables → přidat `NODE_VERSION = 20`
5. Po prvním (potenciálně neúspěšném) buildu jdi do **Settings → Functions** a nastav:
   - **Compatibility flag:** `nodejs_compat`
   - **Compatibility date:** `2024-09-23` (nebo novější)
6. Retry deployment. Každý push do `main` pak spustí nový deploy.

### Možnost B — přes Wrangler CLI z lokálu (Linux/macOS/WSL)

```bash
npm install
npm run pages:build              # vyžaduje Linux/macOS/WSL (ne čisté Windows)
npx wrangler login
npx wrangler pages deploy .vercel/output/static --project-name=ramzova
```

> **Poznámka pro Windows:** lokální `pages:build` na čistém Windows neprojde kvůli omezení Vercel CLI. Buď použij **WSL**, nebo nech build běžet přímo na Cloudflare (Možnost A).

## Struktura

```
src/
  app/[locale]/    # localizované routy (cs/en/pl/de)
  components/      # Hero, Intro, Rooms, Dining, DroneVideo, Contact, Header, Footer
  i18n/            # konfigurace next-intl
  messages/        # překlady — cs.json, en.json, pl.json, de.json
wrangler.toml      # konfigurace Cloudflare Pages
```

## Úprava obsahu

- **Texty:** `src/messages/{cs,en,pl,de}.json`
- **Kontakt:** sekce `contact` v každém z JSON souborů
- **Restaurace v okolí:** `dining.items[]` v každém JSON
- **Drone videa:**
  - Hero: [`src/components/Hero.tsx`](src/components/Hero.tsx) — nahraď URL v `<source src="…">` cestou `/videos/hero.mp4` a soubor ulož do `public/videos/`
  - Druhá video sekce: [`src/components/DroneVideo.tsx`](src/components/DroneVideo.tsx) — stejně
- **Fotky:** Unsplash placeholdery v jednotlivých komponentách (`Intro.tsx`, `Rooms.tsx`, `Dining.tsx`)

## Build pro produkci

```bash
npm run build      # standardní Next.js build
npm run pages:build  # Cloudflare Pages build (Linux/macOS/WSL)
```
