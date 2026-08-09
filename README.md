# PebbleFlowRV.com

A fast, modern, static fan site for the **Pebble Flow** electric RV — built to earn ad revenue and to make posting commentary on images and videos easy. No build step, no database, no framework. Just open the files or drag the folder onto a host.

---

## 1. What's in the box

Every page lives in its own folder as `index.html`, so URLs are clean
(`/features/` rather than `/features.html`). This works identically on any host.

```
PebbleFlowRV/
├── index.html                    →  /              Home
├── specs/index.html              →  /specs/        Spec sheet + pricing
├── features/index.html           →  /features/     Feature deep-dives
├── comparison/index.html         →  /comparison/   Electric vs. gas
├── pebble-ai/index.html          →  /pebble-ai/    AI concept gallery
├── blog/index.html               →  /blog/         Blog index
├── about/index.html              →  /about/        About + disclaimer
├── privacy/index.html            →  /privacy/      Privacy policy
├── posts/
│   ├── pebble-flow-first-look/index.html    (image-commentary template)
│   ├── magic-hitch-explained/index.html     (video-embed template)
│   └── electric-vs-gas-rv-cost/index.html   (analysis template)
├── *.html                        redirect stubs for the old .html URLs
├── CNAME                         custom domain (managed by GitHub)
├── robots.txt
├── sitemap.xml                   list every page here for SEO
└── assets/
    ├── css/style.css             One stylesheet for the whole site
    ├── js/main.js                Menu, animations, newsletter (no dependencies)
    └── img/                      photos + favicon
```

**Adding a page:** create `your-page/index.html`. Link to it as `your-page/`
from the root, or `../your-page/` from inside another folder. Assets are
`../assets/…` one level deep, `../../assets/…` from a post.

To preview locally, just double-click `index.html` — it works straight from disk.

---

## 2. Ads (Google AdSense)

**Your publisher ID is already installed:** `ca-pub-8517278297185534`.
The loader script sits in the `<head>` of all 11 pages, so the site is verified
and ready for **Auto ads** — Google places them for you, nothing further needed.

### Turning on Auto ads
In AdSense → **Ads → By site → pebbleflowrv.com → Edit**, switch Auto ads on and
choose how aggressive the placement should be. Changes take effect within an hour
or so; no code edits required.

### Using the built-in manual placements instead
Four hand-placed slots already exist (header leaderboard, in-content, sidebar
rectangle) and currently show a labelled "Advertisement" placeholder. To activate one:

1. In AdSense → **Ads → By ad unit**, create a display unit and copy its
   `data-ad-slot` number.
2. In the page, find that `.ad-slot` block. The `<ins>` code is already there,
   commented out, with your publisher ID filled in.
3. Paste the slot number into `data-ad-slot="…"`, uncomment the block, and delete
   the `<span class="ad-placeholder">…</span>` line above it.

Manual units give exact control; Auto ads are less work. Running both is possible
but tends to feel crowded on a young site.

> If ads don't appear at first, that's normal — a new site can take a few days to
> start serving while Google reviews it, and ad blockers hide them entirely.

---

## 3. Write a new blog post (3 steps)

1. **Copy** any folder in `posts/` (e.g. `posts/pebble-flow-first-look/`) and rename it, e.g. `posts/my-road-trip/`. Keep folder names lowercase-with-dashes — the folder name becomes the URL (`/posts/my-road-trip/`).
2. **Edit** the `<title>`, `<h1>`, the `<meta name="description">`, and the article body. Two ready-made building blocks are inside:
   - **Image with commentary** — the `<figure class="figure">` block. Swap the placeholder `<div class="frame">…</div>` for your own `<img src="assets/img/your-photo.jpg" alt="...">` and write your caption/credit in `<figcaption>`.
   - **Video with commentary** — the `<div class="video-embed">` block in `posts/magic-hitch-explained/index.html`. Replace the placeholder link with the YouTube iframe (the exact code is commented right there) and add your take below it.
3. **Link it** on `blog/index.html`: copy one of the `<article class="post-card">` cards, point it at your new file, and update the title/excerpt. Then add one `<url>` line to `sitemap.xml`.

### Adding your own images
Put photos in `assets/img/` and reference them by depth: `assets/img/x.jpg` from the home page, `../assets/img/x.jpg` from a section folder, `../../assets/img/x.jpg` from a post.

**Copyright reminder:** use your own photos, licensed images, or owner-submitted photos with permission. Don't re-host Pebble's marketing images — link to their gallery instead. Embed YouTube videos only when embedding is enabled, and always credit the creator. (More on the About page.)

---

## 3b. Adding renders to the Pebble AI gallery

`pebble-ai/index.html` is a filterable gallery of AI-imagined Flow concepts. It ships with your two real renders plus **empty slots**, each showing a ready-to-use prompt.

**To fill a slot:**

1. Generate the image (Midjourney, DALL·E, Firefly, whatever). Each slot has a **Copy prompt** button with a prompt already written for it.
2. Save it to `assets/img/` — e.g. `ai-forest-green.jpg`. Keep it under ~400 KB (JPEG quality ~85, about 1600px wide).
3. In `pebble-ai/index.html`, find that slot's `<figure class="tile tile-slot" ...>` and replace it with a real tile:

```html
<figure class="tile" data-cat="exterior color">
  <a class="tile-img" data-lightbox href="../assets/img/ai-forest-green.jpg">
    <span class="tile-badge">Forest green</span>
    <img src="../assets/img/ai-forest-green.jpg" alt="Forest green Pebble Flow concept among pines" loading="lazy" />
  </a>
  <figcaption class="tile-cap">
    <h3><span class="swatch" style="background:#2f4a35"></span>Forest Green</h3>
    <p>Deep matte green disappearing into old-growth pine.</p>
  </figcaption>
</figure>
```

The `data-cat` attribute drives the filter chips — use any of `exterior`, `color`, `interior`, `setting` (space-separated for multiple). The `swatch` span is the little color dot; set it to any hex.

Clicking any real tile opens the lightbox. Slots don't open — they just show the prompt.

**Keep the AI labeling.** The page carries a prominent "AI-generated fan art" banner and every image is presented as a concept, not a real product. That distinction is what keeps the page clearly unofficial — don't remove it.

---

## 4. Turn on reader comments (optional)

Each post has a `#comments` section ready for a free, hosted comment widget:

- **Giscus** (free, uses GitHub Discussions) — https://giscus.app — generate a script tag and paste it inside the `#comments` div.
- **Disqus** (free tier) — https://disqus.com — paste their universal embed code inside the `#comments` div.

No server needed either way.

---

## 5. Publish it on GitHub Pages

The repo is already initialized and committed on branch `main`, with the remote set to
`https://github.com/quampy20/PebbleFlowRV.git`.

### Step 1 — Push the code

From the `PebbleFlowRV` folder:

```
git push -u origin main
```

Refresh the repo page on GitHub; you should see all the files.

### Step 2 — Check your repo visibility ⚠️

**GitHub Pages only works on private repos if you have a paid plan (GitHub Pro or higher).**
On the free plan, the repo must be **public**.

- Free plan → **Settings → General → Danger Zone → Change visibility → Make public**
- GitHub Pro → leave it private, Pages will work

Either way, **the published website itself is public.** Making the repo public only additionally
exposes the source files — which for a static site is just the HTML/CSS you're already serving.

### Step 3 — Turn on Pages

1. In the repo, go to **Settings → Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. **Branch:** `main`, **Folder:** `/ (root)`. Click **Save**.
4. Wait 1–2 minutes. The page will show your live URL:
   `https://quampy20.github.io/PebbleFlowRV/`

No build step is needed — this is plain HTML, which is exactly what Pages serves.

### Step 4 — Point pebbleflowrv.com at it

At your **domain registrar's DNS settings**, add these five records:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `quampy20.github.io.` |

Then back in **Settings → Pages → Custom domain**, enter `pebbleflowrv.com` and **Save**.
GitHub commits a `CNAME` file to the repo for you — run `git pull` afterward to stay in sync.

DNS can take anywhere from a few minutes to 24 hours. Once GitHub shows "DNS check successful,"
tick **Enforce HTTPS** (free certificate).

### Step 5 — Publishing updates

Every push to `main` redeploys automatically, usually within a minute:

```
git add -A
git commit -m "Add new post"
git push
```

> After going live, submit the site and `sitemap.xml` to **Google Search Console** so pages get
> indexed — that's how the ad-earning traffic starts.

### Alternatives

**Netlify** (https://app.netlify.com/drop — drag the folder in) and **Cloudflare Pages** are also
free, work with private repos on their free tiers, and connect a custom domain the same way.

---

## 6. Before-launch checklist

- [ ] Replace `hello@pebbleflowrv.com` (in `about.html` and `privacy.html`) with your real email.
- [ ] Get AdSense approved and wire in your publisher/slot IDs (Section 2).
- [ ] Point the footer social links to your real profiles (they're `#` for now).
- [ ] Add a couple of your own posts so the site looks active.
- [ ] Have the privacy policy reviewed for your region (GDPR/CCPA), add a cookie-consent banner if you have EU/UK traffic.
- [ ] Submit `sitemap.xml` in Google Search Console.

---

## 7. Editing the look

The site uses a **dark premium theme** — obsidian black with electric violet, deep azure and ion cyan accents.

All colors, fonts and spacing live at the top of `assets/css/style.css` under `:root`. Change one variable and the whole site updates:

| Variable | What it controls |
|---|---|
| `--bg` | Page background (obsidian `#07060d`) |
| `--violet` / `--azure` / `--cyan` | The three accent colors |
| `--grad-hot` | The signature gradient used on buttons, headings and the logo |
| `--ink` / `--ink-2` / `--ink-3` | Primary / muted / faint text |
| `--radius` | Corner rounding |

Fonts are Inter + Space Grotesk from Google Fonts.

### Motion
Movement is built in and all of it respects `prefers-reduced-motion`:

- Slow drifting aurora glow behind the whole page
- Hero photo slow-zooms on load, then parallaxes on scroll
- Content fades and rises in as you scroll, staggered
- Cards lift with an animated gradient border on hover
- Gradient sheen on the hero rule, rotating conic glow on CTA bands, ripple pulse on the video play button
- Nav underlines wipe in; header darkens once you scroll

### Swapping the hero image
Replace `assets/img/hero-pebble-flow.jpg` with any wide photo (roughly 1600×900 or larger) using the same filename and it takes over automatically. `hero-pebble-flow-sm.jpg` is the smaller version used in cards and the feature row. Keep hero images under ~400 KB — export at JPEG quality 85 — so pages stay fast.

The dark cinematic grade over the photo is `.hero-bg::after` in the stylesheet; adjust those gradient stops to make the image lighter or darker behind the text.

Enjoy — and happy trails. 🏕️
