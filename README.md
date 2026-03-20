# Tai Odunaiya — Portfolio

Personal portfolio site showcasing projects, skills, and a contact form. Built as a **static** site (HTML, CSS, vanilla JavaScript) and deployed on **Netlify**.

## Features

- **Hero** with animated circles, featured text, and CTA
- **About Me** with interactive letter animation
- **Projects** grid with expandable list and project links
- **Experience / services** accordion-style skill categories
- **Contact** form with client-side validation (integrated with **Netlify Forms**)
- **Responsive** layout tuned for desktop and mobile viewports
- **Unit tests** for shared logic (`portfolio-utils.js`) via **Jasmine** + **Karma**

## Tech stack

| Area        | Technology                          |
|------------|--------------------------------------|
| Markup     | HTML5                                |
| Styling    | CSS3 (custom properties, animations) |
| Scripts    | Vanilla JavaScript                 |
| Fonts      | Google Fonts (Jura, Poppins)        |
| Hosting    | Netlify                              |
| Tests      | Jasmine, Karma, Chrome Headless     |

## Project structure

```
my_portfolio/
├── index.html           # Main page
├── style.css            # Styles
├── script.js            # App behavior & DOM wiring
├── portfolio-utils.js   # Testable helpers (validation, scroll math)
├── images/              # Background, landing, projects, icons
├── spec/
│   └── portfolio-utils.spec.js   # Jasmine specs
├── karma.conf.js        # Karma configuration
├── netlify.toml         # Netlify build / redirects / Node version
├── _redirects           # SPA-style fallback (if used)
└── package.json         # npm scripts & test devDependencies
```

## Local development

No build step is required to preview the site.

1. Clone the repository.
2. Open **`index.html`** in a browser, **or** serve the folder with any static server, for example:

   ```bash
   npx --yes serve -l 5500 .
   ```

   To open on a phone on the same Wi‑Fi, bind to all interfaces:

   ```bash
   npx --yes serve -l tcp://0.0.0.0:5500 .
   ```

   Then visit `http://<your-computer-LAN-IP>:5500` from the phone.

**VS Code / Cursor:** the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension also works for local preview.

## Tests

Logic shared with the UI lives in **`portfolio-utils.js`** (email validation, min length, scroll progress, etc.). Tests do **not** load the full `script.js` (DOM-heavy); they target `PortfolioUtils` only.

```bash
npm install
npm test              # single run (CI-friendly)
npm run test:watch    # re-run when files change
```

Requires **Google Chrome** (Headless) for Karma’s default launcher.

## Deployment (Netlify)

- **Publish directory:** site root (`.`).
- **`netlify.toml`** sets **`NODE_VERSION=22`** for Netlify’s environment (e.g. Agent Runners).
- Contact form: `data-netlify="true"` on the form — submissions appear in the Netlify dashboard after deploy (ensure form detection / build runs if you add a build command later).

Push to your connected Git branch to trigger deploys.

## Environment / Node

- The **live site** is static; visitors don’t need Node.
- **Node** is only needed locally for **`npm test`** — see **`package.json`** and **`.nvmrc`** (Node 22, aligned with Netlify).

## License

Personal portfolio — all rights reserved unless you add a license file.

---

**Author:** Tai Odunaiya
