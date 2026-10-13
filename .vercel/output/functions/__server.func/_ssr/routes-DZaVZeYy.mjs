import { i as __toESM } from "../_runtime.mjs";
import { U as isRedirect, b as require_jsx_runtime, q as require_react, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as MapPin, c as ArrowRight, i as Plus, n as Trash2, o as Copy, r as Sparkles, s as Check } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZaVZeYy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var askCoach = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || !KINDS.includes(input.kind)) throw new Error("Choose a coaching task.");
	return {
		kind: input.kind,
		doneTitles: (input.doneTitles ?? []).slice(0, 20).map((t) => clean(String(t), 120)),
		openTitles: (input.openTitles ?? []).slice(0, 20).map((t) => clean(String(t), 120)),
		businessName: clean(String(input.businessName ?? "my LLC"), 80) || "my LLC"
	};
}).handler(createSsrRpc("b73c24e577847b3bbd52b52f7212b6f724eed0460e3bf6e758a403befc335ef3"));
var STEPS = [
	{
		id: "ein",
		phase: "This week",
		title: "Get the EIN before anything else",
		why: "Almost every portal asks for a tax ID. The IRS issues an EIN online, free, usually in the same sitting.",
		minutes: "15 min",
		how: [
			"Open IRS.gov and search “apply for an EIN online.” Do not pay a third-party site.",
			"Use the LLC’s legal name exactly as the state has it. You are the responsible party.",
			"Download the confirmation letter and store it with the LLC papers."
		]
	},
	{
		id: "bank",
		phase: "This week",
		title: "Put a business bank account under the LLC",
		why: "Agencies pay the entity, not you personally. A matching name avoids rejected deposits later.",
		minutes: "1 visit",
		how: ["Bring the LLC formation documents and the EIN letter.", "Use this account on every W-9 and vendor form."]
	},
	{
		id: "onepager",
		phase: "This week",
		title: "Write a one-page capability statement",
		why: "Purchasing officers will not read a novel. One page: who you are, what you build, how fast, how to reach you.",
		minutes: "45 min",
		how: [
			"Name, LLC, city, phone, email.",
			"Three services only: custom web tools, small automations, simple dashboards.",
			"Two proof points from work you have already shipped, even if it was not government work.",
			"Use the coach on this desk to draft it, then edit in your own voice."
		]
	},
	{
		id: "demos",
		phase: "This week",
		title: "Ship two tiny demos you can open on a phone",
		why: "A working link beats a promise. Town staff remember the thing they clicked.",
		minutes: "1–2 days",
		how: [
			"Demo A: an internal request tracker that replaces a shared spreadsheet.",
			"Demo B: a public form that writes to a simple status board.",
			"Host both so a link works without installing anything."
		]
	},
	{
		id: "insurance",
		phase: "This week",
		title: "Get a quote for general liability",
		why: "Many towns will not issue a purchase order without a certificate. Get the quote now so you are not stalled later.",
		minutes: "30 min",
		how: ["Ask for $1 million per occurrence as a starting point. That is a common local requirement, not a universal one.", "Tell the broker you do custom software for municipalities, not construction."]
	},
	{
		id: "commbuys",
		phase: "Registers",
		title: "Register on COMMBUYS",
		why: "This is how Massachusetts executive agencies post bids. Free. You need the tax ID.",
		minutes: "40 min",
		how: [
			"Go to commbuys.com and choose Supplier Registration.",
			"Pick commodity codes for software and IT services so alerts match.",
			"Turn on email notices. Check the site twice a week anyway."
		]
	},
	{
		id: "boston",
		phase: "Registers",
		title: "Register on the City of Boston supplier portal",
		why: "Boston buys separately from the Commonwealth. Same metro, different door.",
		minutes: "30 min",
		how: [
			"Start at boston.gov/procurement and open the supplier portal.",
			"Complete the vendor profile so you can be paid if you win, not only bid.",
			"Subscribe to software and professional-services categories."
		]
	},
	{
		id: "ring",
		phase: "Registers",
		title: "Register with eight towns inside 50 miles",
		why: "Under $10,000, Massachusetts often allows “sound business practices” instead of a full bid. Being known is the whole game at that size.",
		minutes: "half a day",
		how: [
			"Cambridge, Somerville, Brookline, Newton, Quincy, Medford, Arlington, and one town you actually like.",
			"Find each purchasing page. Register if they have a portal. If they do not, save the purchasing email.",
			"Do not register in fifty states this week. Depth near Boston beats a thin national list."
		]
	},
	{
		id: "scan",
		phase: "Hunt",
		title: "Scan for small software work three times a week",
		why: "Formal RFPs are slow and crowded. Your early wins are quotes, small purchases, and problems a department head already hates.",
		minutes: "45 min / session",
		how: [
			"Search COMMBUYS and the Boston portal for software, web, dashboard, automation, application.",
			"Ignore anything that wants a multi-year ERP or a giant team. You want work you can finish.",
			"Log every real lead on the Pipeline tab. Mark practice cards so you never quote a sample."
		]
	},
	{
		id: "walk",
		phase: "Hunt",
		title: "Walk into five offices with a printed page",
		why: "You said you will smile in person inside 50 miles. That is a real advantage. Most vendors only email.",
		minutes: "one morning",
		how: [
			"Ask for purchasing or the person who handles small IT needs. Leave the one-pager.",
			"Offer a ten-minute look at a demo, not a pitch deck.",
			"Write down the name of whoever you met the same day."
		]
	},
	{
		id: "quote",
		phase: "Hunt",
		title: "Answer the first small quote the same day",
		why: "Speed is your product. A clear fixed price for a narrow scope beats a vague “we can build anything.”",
		minutes: "2 hours",
		how: [
			"Restate the job in one sentence so they can see you understood it.",
			"Price the whole small job, name what is out of scope, and give a date you can actually hit.",
			"Send it as a PDF they can attach to their file."
		]
	},
	{
		id: "deliver",
		phase: "Get paid",
		title: "Deliver, invoice, and ask for a sentence of proof",
		why: "The second contract is easier than the first because you can show a town that already paid you.",
		minutes: "ongoing",
		how: [
			"Invoice exactly as their paperwork asks. Wrong vendor name is the usual delay.",
			"Expect weeks, not days. That lag is normal; do not spend the money before it lands.",
			"Ask for one written line you may show the next town."
		]
	}
];
var PHASES = [
	"This week",
	"Registers",
	"Hunt",
	"Get paid"
];
var SAMPLE_LEADS = [
	{
		id: "sample-1",
		name: "Permit status board",
		where: "Sample · mid-size MA town",
		size: "Under $10k",
		note: "Practice card. Clerks still email PDF updates. A public status page is a classic small buy. Confirm any real posting yourself.",
		status: "watching",
		sample: true
	},
	{
		id: "sample-2",
		name: "Council packet assembler",
		where: "Sample · nearby city",
		size: "Quote range",
		note: "Practice card. Staff merge Word files by hand every meeting cycle. Narrow scope: upload, order, export one PDF.",
		status: "watching",
		sample: true
	},
	{
		id: "sample-3",
		name: "Vendor intake form",
		where: "Sample · school district",
		size: "Under $10k",
		note: "Practice card. They collect W-9s in a shared inbox. A form plus a checklist is small enough to start a relationship.",
		status: "watching",
		sample: true
	}
];
var useDesk = create()(persist((set) => ({
	done: {},
	leads: SAMPLE_LEADS,
	toggle: (id) => set((s) => ({ done: {
		...s.done,
		[id]: !s.done[id]
	} })),
	setStatus: (id, status) => set((s) => ({ leads: s.leads.map((l) => l.id === id ? {
		...l,
		status
	} : l) })),
	addLead: (lead) => set((s) => ({ leads: [{
		...lead,
		id: crypto.randomUUID(),
		sample: false,
		status: "watching"
	}, ...s.leads] })),
	removeLead: (id) => set((s) => ({ leads: s.leads.filter((l) => l.id !== id) }))
}), { name: "brass-desk-v1" }));
var COACH = [
	{
		kind: "today",
		label: "What do I do today",
		hint: "One action, sized for a single sitting."
	},
	{
		kind: "walkin",
		label: "Walk-in script",
		hint: "What to say when you step into an office."
	},
	{
		kind: "email",
		label: "Purchasing email",
		hint: "A short note you can send this afternoon."
	},
	{
		kind: "capability",
		label: "Capability page",
		hint: "A draft you edit. It will not invent clients."
	}
];
var STATUS = [
	{
		id: "watching",
		label: "Watching"
	},
	{
		id: "talking",
		label: "Talking"
	},
	{
		id: "quoted",
		label: "Quoted"
	},
	{
		id: "won",
		label: "Won"
	},
	{
		id: "passed",
		label: "Passed"
	}
];
function BrassDesk() {
	const done = useDesk((s) => s.done);
	const toggle = useDesk((s) => s.toggle);
	const leads = useDesk((s) => s.leads);
	const setStatus = useDesk((s) => s.setStatus);
	const addLead = useDesk((s) => s.addLead);
	const removeLead = useDesk((s) => s.removeLead);
	const [name, setName] = (0, import_react.useState)("My LLC");
	const [tab, setTab] = (0, import_react.useState)("path");
	const [openId, setOpenId] = (0, import_react.useState)(STEPS[0]?.id ?? "");
	const [kind, setKind] = (0, import_react.useState)("today");
	const [reply, setReply] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)({
		name: "",
		where: "",
		size: "Under $10k",
		note: ""
	});
	const coach = useServerFn(askCoach);
	const finished = STEPS.filter((s) => done[s.id]).length;
	const next = STEPS.find((s) => !done[s.id]) ?? STEPS[STEPS.length - 1];
	const pct = Math.round(finished / STEPS.length * 100);
	const grouped = (0, import_react.useMemo)(() => PHASES.map((phase) => ({
		phase,
		steps: STEPS.filter((s) => s.phase === phase)
	})), []);
	async function runCoach(nextKind) {
		setKind(nextKind);
		setTab("coach");
		setBusy(true);
		setError("");
		setCopied(false);
		try {
			const result = await coach({ data: {
				kind: nextKind,
				businessName: name,
				doneTitles: STEPS.filter((s) => done[s.id]).map((s) => s.title),
				openTitles: STEPS.filter((s) => !done[s.id]).map((s) => s.title)
			} });
			if (!result.ok) setError(result.error);
			else setReply(result.text);
		} catch {
			setError("The coach did not respond. Try the button once more.");
		} finally {
			setBusy(false);
		}
	}
	async function copyReply() {
		if (!reply) return;
		await navigator.clipboard.writeText(reply);
		setCopied(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-bg text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[280px_1fr] md:px-6 md:py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "rounded-card border border-line bg-surface p-5 shadow-[0_1px_0_rgba(26,22,18,0.04)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.18em] text-brass uppercase",
								children: "Boston · 50 miles"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-4xl leading-none text-ink",
								children: "Brass Desk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: "A hand-held path into small state and local software work. Check a box when it is actually done."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 block text-xs font-semibold tracking-wide text-muted uppercase",
								children: ["Business name on drafts", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "mt-2 w-full rounded-xl border border-line bg-bg px-3 py-3 text-sm text-ink outline-none focus:border-pine"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-card border border-pine bg-pine p-5 text-bg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.16em] uppercase opacity-80",
								children: "Do this next"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl leading-tight",
								children: next?.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-pine-soft",
								children: next?.why
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setOpenId(next?.id ?? "");
									setTab("path");
								},
								className: "mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-bg px-4 text-sm font-semibold text-pine",
								children: ["Open the steps ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-card border border-line bg-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-3xl tabular-nums leading-none",
									children: [pct, "%"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										finished,
										" of ",
										STEPS.length
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2 overflow-hidden rounded-full bg-brass-soft",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-brass",
									style: { width: `${pct}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs leading-relaxed text-muted",
								children: "Saved on this browser only. Nothing here is a live solicitation."
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mb-4 flex gap-2 overflow-x-auto",
						children: [
							["path", "The path"],
							["pipeline", "Pipeline"],
							["coach", "Coach"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTab(id),
							className: "min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold " + (tab === id ? "bg-ink text-bg" : "border border-line bg-surface text-ink"),
							children: label
						}, id))
					}),
					tab === "path" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-6",
						children: grouped.map(({ phase, steps }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-xl",
							children: phase
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "flex flex-col gap-3",
							children: steps.map((step) => {
								const open = openId === step.id;
								const checked = Boolean(done[step.id]);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-card border border-line bg-surface",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": checked,
											"aria-label": checked ? "Mark not done" : "Mark done",
											onClick: () => toggle(step.id),
											className: "mt-0.5 grid size-11 shrink-0 place-items-center rounded-full border " + (checked ? "border-pine bg-pine text-bg" : "border-line bg-bg text-transparent"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setOpenId(open ? "" : step.id),
											className: "min-w-0 flex-1 text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-baseline justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-xl leading-tight",
													children: step.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "shrink-0 text-xs font-semibold text-brass",
													children: step.minutes
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block text-sm text-muted",
												children: step.why
											})]
										})]
									}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-line px-4 pt-1 pb-4 sm:pl-20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
											className: "flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed",
											children: step.how.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => runCoach("today"),
											className: "mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-pine",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Ask the coach to sharpen this"]
										})]
									})]
								}, step.id);
							})
						})] }, phase))
					}),
					tab === "pipeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "grid gap-3 rounded-card border border-line bg-surface p-4 md:grid-cols-2",
							onSubmit: (e) => {
								e.preventDefault();
								if (!draft.name.trim() || !draft.where.trim()) return;
								addLead(draft);
								setDraft({
									name: "",
									where: "",
									size: "Under $10k",
									note: ""
								});
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "md:col-span-2 text-xl",
									children: "Add a real lead"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									placeholder: "What they need",
									value: draft.name,
									onChange: (e) => setDraft({
										...draft,
										name: e.target.value
									}),
									className: "min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									placeholder: "Town or agency",
									value: draft.where,
									onChange: (e) => setDraft({
										...draft,
										where: e.target.value
									}),
									className: "min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Size, if you know it",
									value: draft.size,
									onChange: (e) => setDraft({
										...draft,
										size: e.target.value
									}),
									className: "min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Note",
									value: draft.note,
									onChange: (e) => setDraft({
										...draft,
										note: e.target.value
									}),
									className: "min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-pine px-4 text-sm font-semibold text-bg md:col-span-2 md:w-fit",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add to the desk"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-3",
							children: leads.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-card border border-line bg-surface p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-xl leading-tight",
											children: lead.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 flex items-center gap-1 text-sm text-muted",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
												" ",
												lead.where,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-1",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular-nums",
													children: lead.size
												})
											]
										})] }), !lead.sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "Remove lead",
											onClick: () => removeLead(lead.id),
											className: "grid size-11 place-items-center rounded-full text-muted hover:text-danger",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-relaxed text-muted",
										children: lead.note
									}),
									lead.sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs font-semibold tracking-wide text-brass uppercase",
										children: "Practice card · not a live bid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setStatus(lead.id, s.id),
											className: "min-h-11 rounded-full px-3 text-xs font-semibold " + (lead.status === s.id ? "bg-ink text-bg" : "border border-line bg-bg text-ink"),
											children: s.label
										}, s.id))
									})
								]
							}, lead.id))
						})]
					}),
					tab === "coach" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-card border border-line bg-surface p-4 md:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl",
									children: "The coach"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 max-w-prose text-sm text-muted",
									children: "Press a button. It reads your checklist and writes the next concrete thing. It will not invent a contract."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-1 size-5 text-brass" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid gap-2 sm:grid-cols-2",
								children: COACH.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busy,
									onClick: () => runCoach(item.kind),
									className: "min-h-16 rounded-2xl border px-4 py-3 text-left disabled:opacity-60 " + (kind === item.kind ? "border-pine bg-pine-soft" : "border-line bg-bg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-semibold",
										children: item.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-xs text-muted",
										children: item.hint
									})]
								}, item.kind))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 min-h-40 rounded-2xl border border-line bg-bg p-4",
								children: [
									busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Writing from your checklist…"
									}),
									!busy && error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-danger",
										children: error
									}),
									!busy && !error && !reply && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted",
										children: "Start with “What do I do today.” If the EIN is still open, that is almost certainly the answer."
									}),
									!busy && reply && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
										className: "font-sans text-sm leading-relaxed whitespace-pre-wrap",
										children: reply
									})
								]
							}),
							reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: copyReply,
								className: "mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-pine",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy"]
							})
						]
					})
				]
			})]
		})
	});
}
var SplitComponent = BrassDesk;
//#endregion
export { SplitComponent as component };
