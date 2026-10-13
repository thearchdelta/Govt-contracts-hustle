import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SAMPLE_LEADS, type Lead, type LeadStatus } from "@/lib/plan";

type DeskState = {
  done: Record<string, boolean>;
  leads: Lead[];
  toggle: (id: string) => void;
  setStatus: (id: string, status: LeadStatus) => void;
  addLead: (lead: Omit<Lead, "id" | "sample" | "status">) => void;
  removeLead: (id: string) => void;
};

export const useDesk = create<DeskState>()(
  persist(
    (set) => ({
      done: {},
      leads: SAMPLE_LEADS,
      toggle: (id) =>
        set((s) => ({ done: { ...s.done, [id]: !s.done[id] } })),
      setStatus: (id, status) =>
        set((s) => ({
          leads: s.leads.map((l) => (l.id === id ? { ...l, status } : l)),
        })),
      addLead: (lead) =>
        set((s) => ({
          leads: [
            {
              ...lead,
              id: crypto.randomUUID(),
              sample: false,
              status: "watching",
            },
            ...s.leads,
          ],
        })),
      removeLead: (id) =>
        set((s) => ({ leads: s.leads.filter((l) => l.id !== id) })),
    }),
    { name: "brass-desk-v1" },
  ),
);
