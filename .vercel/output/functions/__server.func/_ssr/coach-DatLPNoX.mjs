import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-DatLPNoX.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var KINDS = [
	"today",
	"walkin",
	"email",
	"capability"
];
function clean(value, max) {
	return value.replace(/\s+/g, " ").trim().slice(0, max);
}
var askCoach_createServerFn_handler = createServerRpc({
	id: "b73c24e577847b3bbd52b52f7212b6f724eed0460e3bf6e758a403befc335ef3",
	name: "askCoach",
	filename: "src/lib/coach.ts"
}, (opts) => askCoach.__executeServer(opts));
var askCoach = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || !KINDS.includes(input.kind)) throw new Error("Choose a coaching task.");
	return {
		kind: input.kind,
		doneTitles: (input.doneTitles ?? []).slice(0, 20).map((t) => clean(String(t), 120)),
		openTitles: (input.openTitles ?? []).slice(0, 20).map((t) => clean(String(t), 120)),
		businessName: clean(String(input.businessName ?? "my LLC"), 80) || "my LLC"
	};
}).handler(askCoach_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "The coach is not available in this environment."
	};
	const task = data.kind === "today" ? "Give the single next action for today, then three numbered micro-steps, then one sentence on what done looks like. No pep talk." : data.kind === "walkin" ? "Write a 90-second in-person script for walking into a Massachusetts town purchasing or IT office. Plain speech. Include what to hand them and how to leave." : data.kind === "email" ? "Write a short email to a municipal purchasing officer offering help on small software work. Subject line plus body under 140 words. No hype." : "Write a one-page capability statement in plain prose with these headings: Who we are, What we build, How we work, Proof, Contact. Use the business name given. Leave bracketed blanks where a fact is unknown. Do not invent clients, dollars, or certifications.";
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			temperature: .4,
			messages: [{
				role: "system",
				content: "You coach a solo software developer near Boston who has an LLC and wants small state and local software contracts in weeks, not giant RFPs. Be concrete, calm, and specific to Massachusetts local buying. Never invent live solicitations, award amounts, or legal advice. Never swear. Do not use BCE/CE. Refer to an unnamed person as he."
			}, {
				role: "user",
				content: `${task}\n\nBusiness name: ${data.businessName}\nFinished: ${data.doneTitles.join("; ") || "nothing yet"}\nStill open: ${data.openTitles.join("; ") || "the early checklist"}`
			}]
		})
	});
	if (!res.ok) {
		let detail = "The coach could not answer. Try once more.";
		try {
			const errBody = await res.json();
			const raw = typeof errBody.error === "string" ? errBody.error : errBody.error?.message;
			if (raw?.toLowerCase().includes("credit") || res.status === 403) detail = "The coach is paused because this Grok account is out of credits. The path and pipeline still work. Add credits, then press the button again.";
			else if (raw) detail = raw;
		} catch {
			detail = `The coach could not answer (${res.status}). Try once more.`;
		}
		return {
			ok: false,
			error: detail
		};
	}
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "The coach returned an empty note."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askCoach_createServerFn_handler };
