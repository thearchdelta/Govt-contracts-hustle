# Brass Desk — Govt-contracts-hustle

A guided desk for pursuing small state and local software contracts.

## Publish on Cloudflare Workers

This is a full-stack TanStack Start app. Use **Workers**, with the GitHub integration, so the server-side AI coach is deployed along with the interface.

1. In Cloudflare, open **Workers & Pages → Create application → Import a repository** (or **Connect to Git**).
2. Connect GitHub and select `thearchdelta/Govt-contracts-hustle`.
3. Configure the project:

   | Setting | Value |
   | --- | --- |
   | Worker name | `govt-contracts-hustle` |
   | Production branch | `main` |
   | Root directory | Repository root (leave the default) |
   | Build command | `npm run build:cloudflare` |
   | Deploy command | `npm run deploy:cloudflare` |

   Use Node **22.16 or newer**. If needed, set `NODE_VERSION` to `22` in the build variables. Let Cloudflare install dependencies from `package-lock.json`.

4. Click **Deploy**. Open the resulting `workers.dev` URL.
5. To enable the AI coach, open the Worker's **Settings → Variables and Secrets → Add**:
   - Type: **Secret**
   - Name: `OPENROUTER_API_KEY`
   - Value: your private OpenRouter key
   Save and deploy the settings change. Never use a `VITE_` prefix for the key or commit it to GitHub. The key is needed at runtime, not in the build variables.
6. `OPENROUTER_MODEL` defaults to `openrouter/free` in `wrangler.jsonc`. To change it permanently, edit that file and push the change.

Every subsequent push to the production branch triggers a new build and deployment. The Worker name in Cloudflare must match `wrangler.jsonc`.

## What to check after publishing

- The main page loads, including its background and icons.
- A checklist change remains after a refresh.
- The AI coach responds after adding the secret. Without a key, it displays a configuration message; the rest of the app still works.
- The install tutorial (`/?install=1&platform=ios`) and manifest (`/__grok/manifest.webmanifest`) load.

Checklist progress and leads are stored in this browser's local storage. Publishing does not transfer existing local data, sync devices, or add accounts. No database is required. The existing coach endpoint has no sign-in restriction: anyone with access to the published app can call it using the server's configured key. If this is a personal workspace, restrict access with Cloudflare Access before enabling a funded key.

## Development and deployment commands

```sh
npm ci
npm run dev
npm run typecheck
npm run build:cloudflare
npm run deploy:cloudflare -- --dry-run
npm run preview:cloudflare
```

For a manual deployment after building: `npx wrangler login`, then `npm run deploy:cloudflare`.

Nitro generates `.output/server/wrangler.json` and a `.wrangler/deploy/config.json` redirect during the Cloudflare build. Wrangler follows that redirect to deploy the server modules and `.output/public` assets together. Build before previewing or deploying. Generated output and local Cloudflare secrets are ignored by Git.

The original `npm run build` retains the Vercel target. Use `build:cloudflare` for Cloudflare; do not configure it as a static Vite site or upload only the public asset directory.
