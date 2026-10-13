import { createServerFn } from "@tanstack/react-start";

const KINDS = ["today", "walkin", "email", "capability"] as const;
export type CoachKind = (typeof KINDS)[number];

type CoachInput = {
  kind: CoachKind;
  doneTitles: string[];
  openTitles: string[];
  businessName: string;
};

function clean(value: string, max: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export const askCoach = createServerFn({ method: "POST" })
  .validator((input: CoachInput) => {
    if (!input || !KINDS.includes(input.kind)) {
      throw new Error("Choose a coaching task.");
    }
    return {
      kind: input.kind,
      doneTitles: (input.doneTitles ?? []).slice(0, 20).map((t) => clean(String(t), 120)),
      openTitles: (input.openTitles ?? []).slice(0, 20).map((t) => clean(String(t), 120)),
      businessName: clean(String(input.businessName ?? "my LLC"), 80) || "my LLC",
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "The coach is not configured. Add an OpenRouter API key to the server environment." };
    }
    const model = process.env.OPENROUTER_MODEL || "openrouter/free";

    const task =
      data.kind === "today"
        ? "Give the single next action for today, then three numbered micro-steps, then one sentence on what done looks like. No pep talk."
        : data.kind === "walkin"
          ? "Write a 90-second in-person script for walking into a Massachusetts town purchasing or IT office. Plain speech. Include what to hand them and how to leave."
          : data.kind === "email"
            ? "Write a short email to a municipal purchasing officer offering help on small software work. Subject line plus body under 140 words. No hype."
            : "Write a one-page capability statement in plain prose with these headings: Who we are, What we build, How we work, Proof, Contact. Use the business name given. Leave bracketed blanks where a fact is unknown. Do not invent clients, dollars, or certifications.";

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 700,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You coach a solo software developer near Boston who has an LLC and wants small state and local software contracts in weeks, not giant RFPs. Be concrete, calm, and specific to Massachusetts local buying. Never invent live solicitations, award amounts, or legal advice. Never swear. Do not use BCE/CE. Refer to an unnamed person as he.",
          },
          {
            role: "user",
            content: `${task}\n\nBusiness name: ${data.businessName}\nFinished: ${data.doneTitles.join("; ") || "nothing yet"}\nStill open: ${data.openTitles.join("; ") || "the early checklist"}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      let detail = "The coach could not answer. Try once more.";
      try {
        const errBody = (await res.json()) as { error?: string | { message?: string } };
        const raw = typeof errBody.error === "string" ? errBody.error : errBody.error?.message;
        if (res.status === 402 || res.status === 403) {
          detail = "OpenRouter rejected this request. Check the API key and model access, then try again.";
        } else if (raw) {
          detail = raw;
        }
      } catch {
        detail = `The coach could not answer (${res.status}). Try once more.`;
      }
      return { ok: false as const, error: detail };
    }
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "The coach returned an empty note." };
    return { ok: true as const, text };
  });
