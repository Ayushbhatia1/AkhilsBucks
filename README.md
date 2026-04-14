# Akhil's Bucks Trip — Queenstown 2026

Static website for Akhil Arya's bucks trip to Queenstown, New Zealand.  
**13 – 18 August 2026** | Snowboarding, Golf, Absolute Chaos.

## Pages

- **Home** — Hero with countdown timer to 13 Aug 2026
- **Schedule** — Day-by-day itinerary (arrival, snowboarding, golf, big nights, departure)
- **The Crew** — Roster grid with avatar cards (edit to add names)
- **Activities** — Snowboarding, golf details, and après-ski/nightlife suggestions

## Run Locally

No build step required — it's plain HTML, CSS, and JS.

**Option 1 — Open directly:**
```
open akhil-bucks/index.html
```

**Option 2 — Local server (recommended for clean URLs):**
```bash
# Python 3
cd akhil-bucks
python3 -m http.server 8000
# then open http://localhost:8000

# or Node.js
npx serve .
```

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `akhil-bucks`).
2. Push this folder to the `main` branch:
   ```bash
   cd akhil-bucks
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/akhil-bucks.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repo.
4. Under **Source**, select `Deploy from a branch` → `main` → `/ (root)`.
5. Your site will be live at `https://YOUR_USERNAME.github.io/akhil-bucks/`.

## Customising

- **Add crew members:** Edit `crew.html` — replace `TBA` names and `??` initials with real ones.
- **Update schedule:** Edit `schedule.html` — modify activities, times, or add new days.
- **Change colours:** Edit CSS variables at the top of `css/style.css`.

## Tech

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools
- Google Fonts (Inter)
- Mobile responsive
- Live countdown timer (JS)
