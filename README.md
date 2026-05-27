# Horský Hotel Ramzová — webové stránky

Elegantní web pro luxusní horský hotel ve stylu *Badrutt's Palace*. Postaveno na Next.js 14 + Tailwind, dvojjazyčné (CZ / EN).

## Spuštění

```bash
npm install
npm run dev
```

Web poběží na `http://localhost:3000` (čeština) a `http://localhost:3000/en` (angličtina).

## Výměna drone videa

Hero video a sekce "Pohled z výšky" používají placeholder z Pexels. Pro nahrazení vlastním záběrem:

1. Ulož vlastní soubor do `public/videos/hero.mp4` a `public/videos/drone.mp4`
2. V `src/components/Hero.tsx` nahraď `src="https://videos.pexels.com/..."` cestou `src="/videos/hero.mp4"`
3. V `src/components/DroneVideo.tsx` analogicky pro `drone.mp4`
4. Aktualizuj `poster` na vlastní náhledový obrázek

Doporučené parametry videa: H.264, max 8 MB, 1920×1080, 24–30 fps, bez zvuku.

## Struktura

```
src/
  app/[locale]/    # localizované routy
  components/      # React komponenty (Hero, Rooms, Dining, ...)
  i18n/            # konfigurace next-intl
  messages/        # překlady CZ/EN
```

## Úprava textů

Všechny texty jsou v `src/messages/cs.json` a `src/messages/en.json`. Změny se projeví okamžitě v dev režimu.

## Build pro produkci

```bash
npm run build
npm start
```
