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

Projekt je nakonfigurovaný jako **statický export** (`output: 'export'`) — generuje čisté HTML soubory bez nutnosti edge funkcí.

1. Přihlaš se na <https://dash.cloudflare.com> → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Vyber repo `kol8isek/Ramzova`
3. Nastav build konfiguraci:
   - **Framework preset:** `Next.js (Static HTML Export)` (nebo `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Environment variables → přidej `NODE_VERSION = 20`
5. **Save and Deploy**

Po dokončení deployi bude web dostupný na `https://ramzova.pages.dev`:
- `/` → automatický redirect na `/cs/` (definováno v `public/_redirects`)
- `/cs/`, `/en/`, `/pl/`, `/de/` → jednotlivé jazykové verze

Každý push do `main` spustí nový deploy.

### Lokální produkční náhled

```bash
npm run build         # vygeneruje out/
npx serve out         # spustí statický server na http://localhost:3000
```

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
