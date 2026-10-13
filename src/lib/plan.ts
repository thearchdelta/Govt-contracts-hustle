export type Step = {
  id: string;
  phase: string;
  title: string;
  why: string;
  minutes: string;
  how: string[];
};

export const STEPS: Step[] = [
  {
    id: "ein",
    phase: "This week",
    title: "Get the EIN before anything else",
    why: "Almost every portal asks for a tax ID. The IRS issues an EIN online, free, usually in the same sitting.",
    minutes: "15 min",
    how: [
      "Open IRS.gov and search “apply for an EIN online.” Do not pay a third-party site.",
      "Use the LLC’s legal name exactly as the state has it. You are the responsible party.",
      "Download the confirmation letter and store it with the LLC papers.",
    ],
  },
  {
    id: "bank",
    phase: "This week",
    title: "Put a business bank account under the LLC",
    why: "Agencies pay the entity, not you personally. A matching name avoids rejected deposits later.",
    minutes: "1 visit",
    how: [
      "Bring the LLC formation documents and the EIN letter.",
      "Use this account on every W-9 and vendor form.",
    ],
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
      "Use the coach on this desk to draft it, then edit in your own voice.",
    ],
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
      "Host both so a link works without installing anything.",
    ],
  },
  {
    id: "insurance",
    phase: "This week",
    title: "Get a quote for general liability",
    why: "Many towns will not issue a purchase order without a certificate. Get the quote now so you are not stalled later.",
    minutes: "30 min",
    how: [
      "Ask for $1 million per occurrence as a starting point. That is a common local requirement, not a universal one.",
      "Tell the broker you do custom software for municipalities, not construction.",
    ],
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
      "Turn on email notices. Check the site twice a week anyway.",
    ],
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
      "Subscribe to software and professional-services categories.",
    ],
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
      "Do not register in fifty states this week. Depth near Boston beats a thin national list.",
    ],
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
      "Log every real lead on the Pipeline tab. Mark practice cards so you never quote a sample.",
    ],
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
      "Write down the name of whoever you met the same day.",
    ],
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
      "Send it as a PDF they can attach to their file.",
    ],
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
      "Ask for one written line you may show the next town.",
    ],
  },
];

export const PHASES = ["This week", "Registers", "Hunt", "Get paid"] as const;

export type LeadStatus = "watching" | "talking" | "quoted" | "won" | "passed";

export type Lead = {
  id: string;
  name: string;
  where: string;
  size: string;
  note: string;
  status: LeadStatus;
  sample: boolean;
};

export const SAMPLE_LEADS: Lead[] = [
  {
    id: "sample-1",
    name: "Permit status board",
    where: "Sample · mid-size MA town",
    size: "Under $10k",
    note: "Practice card. Clerks still email PDF updates. A public status page is a classic small buy. Confirm any real posting yourself.",
    status: "watching",
    sample: true,
  },
  {
    id: "sample-2",
    name: "Council packet assembler",
    where: "Sample · nearby city",
    size: "Quote range",
    note: "Practice card. Staff merge Word files by hand every meeting cycle. Narrow scope: upload, order, export one PDF.",
    status: "watching",
    sample: true,
  },
  {
    id: "sample-3",
    name: "Vendor intake form",
    where: "Sample · school district",
    size: "Under $10k",
    note: "Practice card. They collect W-9s in a shared inbox. A form plus a checklist is small enough to start a relationship.",
    status: "watching",
    sample: true,
  },
];
