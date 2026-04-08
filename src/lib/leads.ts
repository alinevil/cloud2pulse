export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  employees: string;
  compliance: string[];
  concern: string;
  status: "new" | "contacted" | "qualified" | "closed";
}

const STORAGE_KEY = "cloud2pulse_leads";

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Omit<Lead, "id" | "createdAt" | "status">): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  leads.unshift(newLead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"]) {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    leads[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }
}

export function deleteLead(id: string) {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function exportLeadsCSV(): string {
  const leads = getLeads();
  const headers = ["Date", "Name", "Email", "Phone", "Company", "Role", "Employees", "Compliance", "Concern", "Status"];
  const rows = leads.map((l) => [
    new Date(l.createdAt).toLocaleDateString(),
    l.name,
    l.email,
    l.phone,
    l.company,
    l.role,
    l.employees,
    l.compliance.join("; "),
    l.concern.replace(/,/g, " "),
    l.status,
  ]);
  return [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
}
