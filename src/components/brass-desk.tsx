import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  ChevronDown,
  Route as RouteIcon,
  Layers,
  LayoutGrid,
  BriefcaseBusiness,
  CheckCheck,
  Check,
  Copy,
  MapPin,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { askCoach, type CoachKind } from "@/lib/coach";
import { PHASES, STEPS, type LeadStatus } from "@/lib/plan";
import { useDesk } from "@/lib/desk-store";

const COACH: { kind: CoachKind; label: string; hint: string }[] = [
  { kind: "today", label: "What do I do today", hint: "One action, sized for a single sitting." },
  { kind: "walkin", label: "Walk-in script", hint: "What to say when you step into an office." },
  { kind: "email", label: "Purchasing email", hint: "A short note you can send this afternoon." },
  { kind: "capability", label: "Capability page", hint: "A draft you edit. It will not invent clients." },
];

const STATUS: { id: LeadStatus; label: string }[] = [
  { id: "watching", label: "Watching" },
  { id: "talking", label: "Talking" },
  { id: "quoted", label: "Quoted" },
  { id: "won", label: "Won" },
  { id: "passed", label: "Passed" },
];

export function BrassDesk() {
  const done = useDesk((s) => s.done);
  const toggle = useDesk((s) => s.toggle);
  const leads = useDesk((s) => s.leads);
  const setStatus = useDesk((s) => s.setStatus);
  const addLead = useDesk((s) => s.addLead);
  const removeLead = useDesk((s) => s.removeLead);

  const [name, setName] = useState("My LLC");
  const [tab, setTab] = useState<"path" | "pipeline" | "coach">("path");
  const [openId, setOpenId] = useState(STEPS[0]?.id ?? "");
  const [kind, setKind] = useState<CoachKind>("today");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState({ name: "", where: "", size: "Under $10k", note: "" });

  const coach = useServerFn(askCoach);
  const finished = STEPS.filter((s) => done[s.id]).length;
  const next = STEPS.find((s) => !done[s.id]) ?? STEPS[STEPS.length - 1];
  const pct = Math.round((finished / STEPS.length) * 100);

  const grouped = useMemo(
    () => PHASES.map((phase) => ({ phase, steps: STEPS.filter((s) => s.phase === phase) })),
    [],
  );

  async function runCoach(nextKind: CoachKind) {
    setKind(nextKind);
    setTab("coach");
    setBusy(true);
    setError("");
    setCopied(false);
    try {
      const result = await coach({
        data: {
          kind: nextKind,
          businessName: name,
          doneTitles: STEPS.filter((s) => done[s.id]).map((s) => s.title),
          openTitles: STEPS.filter((s) => !done[s.id]).map((s) => s.title),
        },
      });
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

  return (
    <div className="desk-app min-h-screen text-ink">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[280px_1fr] md:px-6 md:py-10">
        <div className="icon-rail">
            <div className="rail-brand" aria-label="Brass Desk">B<span>.</span></div>
            <div className="rail-links">
              <button aria-label="The path" aria-pressed={tab === "path"} onClick={() => setTab("path")}><LayoutGrid /></button>
              <button aria-label="Pipeline" aria-pressed={tab === "pipeline"} onClick={() => setTab("pipeline")}><BriefcaseBusiness /></button>
              <button aria-label="Coach" aria-pressed={tab === "coach"} onClick={() => setTab("coach")}><Sparkles /></button>
            </div>
            <span className="rail-footer">BD</span>
          </div>
          <aside className="desk-sidebar flex flex-col gap-4">
          <header className="glass-panel brand-panel rounded-card p-5">
            <p className="text-xs font-semibold tracking-[0.18em] text-brass uppercase">
              Boston · 50 miles
            </p>
            <h1 className="mt-2 text-4xl leading-none text-ink">Brass Desk</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A hand-held path into small state and local software work. Check a box when it is actually done.
            </p>
            <label className="mt-4 block text-xs font-semibold tracking-wide text-muted uppercase">
              Business name on drafts
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-3 text-sm text-ink outline-none focus:border-pine"
              />
            </label>
          </header>

          <section className="next-panel rounded-card p-5 text-bg">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase opacity-80">Do this next</p>
            <h2 className="mt-2 text-2xl leading-tight">{next?.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-pine-soft">{next?.why}</p>
            <button
              type="button"
              onClick={() => {
                setOpenId(next?.id ?? "");
                setTab("path");
              }}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-bg px-4 text-sm font-semibold text-pine"
            >
              Open the steps <ArrowRight className="size-4" />
            </button>
          </section>

          <div className="glass-panel rounded-card p-5">
            <div className="flex items-end justify-between">
              <p className="font-display text-3xl tabular-nums leading-none">{pct}%</p>
              <p className="text-sm text-muted">
                {finished} of {STEPS.length}
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-brass-soft">
              <div className="h-full bg-brass" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Saved on this browser only. Nothing here is a live solicitation.
            </p>
          </div>
        </aside>

        <main className="desk-main min-w-0">
          <div className="workspace-heading"><p className="workspace-eyebrow">YOUR BUSINESS WORKSPACE</p><h2>Welcome to your desk</h2><p>A clear path from getting ready to getting your first contract.</p></div>
          <div className="desk-metrics">
            <div className="metric-card"><span>Checklist progress <CheckCheck className="size-4" /></span><strong>{pct}<small>%</small></strong><p>{finished} of {STEPS.length} steps completed</p></div>
            <div className="metric-card"><span>Your pipeline <BriefcaseBusiness className="size-4" /></span><strong>{leads.filter(lead => !lead.sample).length}<small> leads</small></strong><p>One conversation can open a door.</p></div>
          </div>
          <nav aria-label="Workspace" className="glass-nav mb-6 flex gap-2 overflow-x-auto">
            {(
              [
                ["path", "The path"],
                ["pipeline", "Pipeline"],
                ["coach", "Coach"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-current={tab === id ? "page" : undefined}
                onClick={() => setTab(id)}
                className={
                  "nav-tab min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold " +
                  (tab === id ? "bg-ink text-bg" : "border border-line bg-surface text-ink")
                }
              >
                {id === "path" ? <RouteIcon className="size-4" /> : id === "pipeline" ? <Layers className="size-4" /> : <Sparkles className="size-4" />} {label}
              </button>
            ))}
          </nav>

          {tab === "path" && (
            <div className="flex flex-col gap-6">
              {grouped.map(({ phase, steps }) => (
                <section key={phase} className="phase-section">
                  <h2 className="phase-title mb-3 text-xl">{phase}</h2>
                  <ol className="flex flex-col gap-3">
                    {steps.map((step) => {
                      const open = openId === step.id;
                      const checked = Boolean(done[step.id]);
                      return (
                        <li key={step.id} className={"glass-panel step-card rounded-card " + (open ? "step-open" : "")}>
                          <div className="flex items-start gap-3 p-4">
                            <button
                              type="button"
                              aria-pressed={checked}
                              aria-label={checked ? "Mark not done" : "Mark done"}
                              onClick={() => toggle(step.id)}
                              className={
                                "mt-0.5 grid size-11 shrink-0 place-items-center rounded-full border " +
                                (checked
                                  ? "border-pine bg-pine text-bg"
                                  : "border-line bg-bg text-transparent")
                              }
                            >
                              <Check className="size-5" />
                            </button>
                            <button
                              type="button"
                              aria-expanded={open}
                              onClick={() => setOpenId(open ? "" : step.id)}
                              className="min-w-0 flex-1 text-left"
                            >
                              <span className="flex items-baseline justify-between gap-3">
                                <span className="font-display text-xl leading-tight">{step.title}</span>
                                <span className="step-meta shrink-0 text-xs font-semibold text-brass">{step.minutes}<ChevronDown className={"size-4 " + (open ? "chevron-open" : "")} /></span>
                              </span>
                              <span className="mt-1 block text-sm text-muted">{step.why}</span>
                            </button>
                          </div>
                          {open && (
                            <div className="border-t border-line px-4 pt-1 pb-4 sm:pl-20">
                              <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed">
                                {step.how.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ol>
                              <button
                                type="button"
                                onClick={() => runCoach("today")}
                                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-pine"
                              >
                                <Sparkles className="size-4" /> Ask the coach to sharpen this
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </section>
              ))}
            </div>
          )}

          {tab === "pipeline" && (
            <section className="flex flex-col gap-4">
              <form
                className="glass-panel grid gap-3 rounded-card p-4 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!draft.name.trim() || !draft.where.trim()) return;
                  addLead(draft);
                  setDraft({ name: "", where: "", size: "Under $10k", note: "" });
                }}
              >
                <h2 className="md:col-span-2 text-xl">Add a real lead</h2>
                <input
                  required
                  placeholder="What they need"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
                />
                <input
                  required
                  placeholder="Town or agency"
                  value={draft.where}
                  onChange={(e) => setDraft({ ...draft, where: e.target.value })}
                  className="min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
                />
                <input
                  placeholder="Size, if you know it"
                  value={draft.size}
                  onChange={(e) => setDraft({ ...draft, size: e.target.value })}
                  className="min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
                />
                <input
                  placeholder="Note"
                  value={draft.note}
                  onChange={(e) => setDraft({ ...draft, note: e.target.value })}
                  className="min-h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-pine"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-pine px-4 text-sm font-semibold text-bg md:col-span-2 md:w-fit"
                >
                  <Plus className="size-4" /> Add to the desk
                </button>
              </form>

              <ul className="flex flex-col gap-3">
                {leads.map((lead) => (
                  <li key={lead.id} className="glass-panel rounded-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl leading-tight">{lead.name}</p>
                        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                          <MapPin className="size-3.5" /> {lead.where}
                          <span className="px-1">·</span>
                          <span className="tabular-nums">{lead.size}</span>
                        </p>
                      </div>
                      {!lead.sample && (
                        <button
                          type="button"
                          aria-label="Remove lead"
                          onClick={() => removeLead(lead.id)}
                          className="grid size-11 place-items-center rounded-full text-muted hover:text-danger"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{lead.note}</p>
                    {lead.sample && (
                      <p className="mt-2 text-xs font-semibold tracking-wide text-brass uppercase">
                        Practice card · not a live bid
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {STATUS.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setStatus(lead.id, s.id)}
                          className={
                            "min-h-11 rounded-full px-3 text-xs font-semibold " +
                            (lead.status === s.id
                              ? "bg-ink text-bg"
                              : "border border-line bg-bg text-ink")
                          }
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "coach" && (
            <section className="glass-panel rounded-card p-4 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl">The coach</h2>
                  <p className="mt-1 max-w-prose text-sm text-muted">
                    Press a button. It reads your checklist and writes the next concrete thing. It will not invent a contract.
                  </p>
                </div>
                <Sparkles className="mt-1 size-5 text-brass" />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {COACH.map((item) => (
                  <button
                    key={item.kind}
                    type="button"
                    disabled={busy}
                    onClick={() => runCoach(item.kind)}
                    className={
                      "min-h-16 rounded-2xl border px-4 py-3 text-left disabled:opacity-60 " +
                      (kind === item.kind ? "border-pine bg-pine-soft" : "border-line bg-bg")
                    }
                  >
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="mt-1 block text-xs text-muted">{item.hint}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 min-h-40 rounded-2xl border border-line bg-bg p-4">
                {busy && <p className="text-sm text-muted">Writing from your checklist…</p>}
                {!busy && error && <p className="text-sm text-danger">{error}</p>}
                {!busy && !error && !reply && (
                  <p className="text-sm leading-relaxed text-muted">
                    Start with “What do I do today.” If the EIN is still open, that is almost certainly the answer.
                  </p>
                )}
                {!busy && reply && (
                  <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap">{reply}</pre>
                )}
              </div>
              {reply && (
                <button
                  type="button"
                  onClick={copyReply}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-pine"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
