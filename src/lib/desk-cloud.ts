import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const snapshot = z.object({
  done: z.record(z.string(), z.boolean()),
  leads: z.array(z.object({
    id: z.string(), name: z.string(), where: z.string(), size: z.string(), note: z.string(),
    status: z.enum(["watching", "talking", "quoted", "won", "passed"]), sample: z.boolean(),
  }).passthrough()).max(1000),
}).passthrough();

export const deskCloud = createServerFn({ method: 'POST' })
  .validator(z.object({ password: z.string().max(256), state: snapshot.optional(), revision: z.number().int().optional() }))
  .handler(async ({ data }) => {
    // Cloudflare bindings are available only inside a Worker request.
    // @ts-ignore Cloudflare provides this module at runtime.
    const { env } = await import('cloudflare:workers');
    if (!env.DB || !env.DESK_PASSWORD) throw new Error('Cloud storage needs a D1 DB binding and DESK_PASSWORD secret.');
    if (data.password !== env.DESK_PASSWORD) throw new Error('Incorrect workspace password.');
    const db = env.DB;
    if (data.state) {
      const body = JSON.stringify(data.state);
      if (body.length > 500000) throw new Error('Workspace is too large to save.');
      if (data.revision === 0) {
        await db.prepare('INSERT OR IGNORE INTO desk_state (id, body, revision) VALUES (1, ?, 1)').bind(body).run();
      } else {
        const result = await db.prepare('UPDATE desk_state SET body = ?, revision = revision + 1 WHERE id = 1 AND revision = ?').bind(body, data.revision).run();
        if (!result.meta.changes) throw new Error('Another device updated this workspace. Refresh before saving again.');
      }
    }
    const row = await db.prepare('SELECT body, revision FROM desk_state WHERE id = 1').first();
    return row ? { state: JSON.parse(row.body), revision: row.revision as number } : { state: null, revision: 0 };
  });
