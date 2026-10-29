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

Checklist progress and leads sync to a private, password-protected D1 workspace after clicking Connect. A local browser copy remains as a backup. Enter the same password on another device to load the shared workspace. The first connection imports local data only when the database is empty; an existing cloud workspace takes precedence. Passwords remain in memory and must be re-entered after refresh. Concurrent-device save conflicts stop cloud writes and show an error instead of silently overwriting newer data. The existing coach endpoint has no sign-in restriction: anyone with access to the published app can call it using the server's configured key. If this is a personal workspace, restrict access with Cloudflare Access before enabling a funded key.

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

## D1 setup (before publishing)

1. In Cloudflare, create a D1 database named `brass-desk`.
2. Copy its database ID into `wrangler.jsonc`, replacing `REPLACE_WITH_YOUR_D1_DATABASE_ID`, and commit the change.
3. In the database console, execute the SQL in `d1-migrations/0001_desk.sql`. Alternatively run `npx wrangler d1 migrations apply brass-desk --remote`.
4. Add a Worker runtime **Secret** named `DESK_PASSWORD`, with a strong password of your choosing. Save and deploy the settings. Do not prefix it with VITE_.
5. Open the app, enter that password in Cloud storage, and click Connect. Changes then save automatically. Until connected, edits remain local only. If a save fails, the status explains the failure and the local backup remains available. Refresh and reconnect to load the latest cloud version.

This is one shared workspace, not a multi-user account system. Anyone with the workspace password can read and change its data. Existing AI coach access is separate from this storage password.
