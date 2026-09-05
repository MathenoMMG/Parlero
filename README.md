<div align="center">

  <img src="logo-mark.png" alt="Parleró Logo" width="110" height="110" />

  # Parleró

  <p align="center">
    <strong>La tua guida interattiva per l'esame di lingua italiana A2 (Politecnico di Torino)</strong>
  </p>

  <p align="center">
    Una web app moderna, mobile-first e gamificata creata per preparare e superare l'esame ufficiale di accreditamento linguistico <strong>CLA (Centro Linguistico di Ateneo) A2</strong> del <strong>PoliTo</strong>, integrando il sillabo del corso <em>Dieci A2</em>.
  </p>

  <p align="center">
    <a href="https://github.com/MathenoMMG/Parlero/stargazers"><img src="https://img.shields.io/github/stars/MathenoMMG/Parlero?style=for-the-badge&logo=star&color=E8956E&labelColor=23201F" alt="Stars" /></a>
    <a href="https://github.com/MathenoMMG/Parlero/network/members"><img src="https://img.shields.io/github/forks/MathenoMMG/Parlero?style=for-the-badge&color=E8956E&labelColor=23201F" alt="Forks" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&color=E8956E&labelColor=23201F" alt="License: MIT" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://www.netlify.com/"><img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" /></a>
  </p>

  <p align="center">
    <img src="logo-text-dark.png#gh-dark-mode-only" alt="Parleró Logo Text Dark" width="300" />
    <img src="logo-text-light.png#gh-light-mode-only" alt="Parleró Logo Text Light" width="300" />
  </p>

  ---
</div>

## 🌟 Cos'è Parleró?

**Parleró** nasce dall'esigenza degli studenti internazionali del **Politecnico di Torino** di avere uno strumento d'apprendimento agile, portatile e fedele alla struttura dell'esame CLA A2. 

Invece di sfogliare centinaia di pagine PDF disorganizzate o svolgere test cartacei, Parleró condensa l'intero percorso accademico in un'esperienza mobile nativa, elegante e stimolante:

- 🗺️ **Percorso di Studio a 10 Tappe:** Programma d'esame suddiviso in 10 milestone tematiche, con grammatica esplicativa (con contrasto italiano/spagnolo), vocabolario contestualizzato ed esercizi pratici per fissare i concetti.
- 🎯 **Simulatore d'Esame Ufficiale CLA:** Riproduce l'esperienza della prova d'esame del CLA con selezione di domande reali, timer configurabile e punteggio dettagliato per valutare la propria preparazione.
- 🔄 **Sincronizzazione Cloud Trasparente:** Tracciamento automatico dei progressi con persistenza locale offline-first e sincronizzazione cloud in background tramite Supabase (senza frizioni di login forzato).
- 🎨 **Design Editoriale Raffinato:** Interfaccia mobile-first meticolosamente curata, supporto completo **Dark/Light Mode**, micro-animazioni fluide con Framer Motion e audio feedback opzionale.

---

## 🚀 Caratteristiche Principali

### 1. 📚 Percorso di Studio (10 Milestone)
Il sillabo di *Dieci A2* e del CLA PoliTo è strutturato in 10 moduli progressivi:
1. **I Tempi Verbali** (Presente, passato prossimo, imperfetto, futuro e condizionale)
2. **I Pronomi Diretti e Indiretti** (Uso di *mi, ti, lo, la, ci, vi, li, le*, pronomi doppi)
3. **I Pronomi Partitivi e Locativi** (*Ne* e *Ci* e le loro combinazioni)
4. **I Pronomi Relativi** (*Che, cui, il quale*)
5. **Le Preposizioni e Articolate** (Regole d'uso per moto a luogo, stato in luogo, tempo e modi)
6. **I Verbi Riflessivi e Reciproci** (Coniugazioni nei tempi composti con accordo dell'ausiliare *essere*)
7. **Il Congiuntivo Presente** (Verbi d'opinione, dubbio, speranza ed espressioni impersonali)
8. **Il Periodo Ipotetico della Realtà e Possibilità** (Strutture con *se*)
9. **Forma Passiva e Si Impersonale** (Costruzioni con *essere/venire* e uso del *si*)
10. **Lessico e Situazioni Quotidiane** (Università, trasporti a Torino, affitti, salute e burocrazia)

### 2. ⏱️ Simulatore CLA A2 PoliTo
- Modalità esame personalizzabile: scegli il numero di quesiti e se attivare o meno il limite di tempo.
- Filtro mirato per argomenti o simulazione completa dell'intero test.
- Revisione finale interattiva con feedback immediato su errori e risposte corrette.

### 3. 🌗 Esperienza Visiva & Mobile First
- Progettato per schermi di smartphone ma ottimizzato con layout adattivo per desktop/tablet.
- Palette cromatica accogliente (*Terracotta/Warm Sand/Dark Charcoal*).
- Gestione della modalità scura con memorizzazione delle preferenze.

---

## 🛠️ Stack Tecnologico

| Tecnologia | Scopo |
| :--- | :--- |
| **[Next.js 16 (App Router)](https://nextjs.org/)** | Framework React con architettura moderna e SSG static export |
| **[React 19](https://react.dev/)** | Core UI con componenti funzionali e hooks reattivi |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Motore di styling utility-first e theming avanzato |
| **[Framer Motion](https://www.framer.com/motion/)** | Animazioni per transizioni di pagina e feedback visivi |
| **[Zustand](https://zustand-demo.pmnd.rs/)** | Gestione dello stato globale con persistenza in `localStorage` |
| **[Supabase](https://supabase.com/)** | Database PostgreSQL serverless per la sincronizzazione del progresso |
| **[Netlify](https://www.netlify.com/)** | Hosting e deployment continuo statico ad alte prestazioni |

---

## 📂 Struttura del Progetto

```text
Parleró/
├── logo-mark.png           # Isotipo del brand
├── logo-text-dark.png      # Logotipo Dark mode
├── logo-text-light.png     # Logotipo Light mode
├── netlify.toml            # Configurazione di build e deploy per Netlify
└── app/                    # Applicazione Next.js
    ├── src/
    │   ├── app/            # App Router (Home, /study, /exam, ecc.)
    │   ├── components/     # Componenti UI, Study Map ed Exam Engine
    │   ├── data/           # Milestone, banco di domande e seed SQL
    │   ├── lib/            # Client Supabase e utilità
    │   ├── stores/         # Store Zustand (progress, audio, theme)
    │   └── types/          # Definizioni TypeScript
    ├── public/             # Asset statici
    ├── package.json        # Dipendenze e script npm
    └── next.config.ts      # Configurazione Next.js (output: 'export')
```

---

## 🏁 Prerequisiti e Installazione Locale

Per clonare ed eseguire il progetto in locale, assicurati di avere installato:
- **Node.js**: v20 o v22+
- **npm**, **pnpm** o **yarn**

### 1. Clona il repository
```bash
git clone https://github.com/MathenoMMG/Parlero.git
cd Parlero/app
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Configura le variabili d'ambiente
Crea un file `.env.local` all'interno della cartella `app/`:
```env
NEXT_PUBLIC_SUPABASE_URL=tuo_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tua_supabase_anon_key
```

### 4. Avvia il server di sviluppo
```bash
npm run dev
```
Apri il tuo browser su [http://localhost:3000](http://localhost:3000).

---

## 📦 Build e Deploy

Il progetto è configurato per produrre una build statica completamente ottimizzata:

```bash
cd app
npm run build
```

L'output viene generato nella directory `app/out` ed è pronto per essere distribuito su qualsiasi CDN o provider statico (Netlify, Vercel, Cloudflare Pages o GitHub Pages).

---

## 🤝 Contributi e Licenza

I contributi, suggerimenti e feedback sono sempre i benvenuti! Se trovi un refuso in una domanda d'esame o vuoi aggiungere una spiegazione grammaticale:
1. Apri una [Issue](https://github.com/MathenoMMG/Parlero/issues)
2. Invia una [Pull Request](https://github.com/MathenoMMG/Parlero/pulls)

Questo progetto è rilasciato sotto licenza open-source [MIT](LICENSE). Consulta il file `LICENSE` per maggiori dettagli.

---

<div align="center">
  <p><em>“Una seconda lingua è una seconda anima.”</em></p>
  <sub>Sviluppato per la comunità studentesca del Politecnico di Torino 🇮🇹</sub>
</div>
