import { useState, useEffect } from "react";
import { getLeads, updateLeadStatus, deleteLead, exportLeadsCSV, Lead } from "@/lib/leads";
import { Download, Trash2, Shield, ArrowLeft } from "lucide-react";

const statusColors: Record<Lead["status"], string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  qualified: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

const statusOptions: Lead["status"][] = ["new", "contacted", "qualified", "closed"];

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const refresh = () => setLeads(getLeads());

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    updateLeadStatus(id, status);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this lead?")) {
      deleteLead(id);
      refresh();
    }
  };

  const handleExport = () => {
    const csv = exportLeadsCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cloud2pulse-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Cloud2Pulse" className="h-7 w-auto" />
              <span className="font-bold text-lg">Cloud2Pulse</span>
              <span className="text-muted-foreground text-sm ml-2">/ Leads</span>
            </div>
          </div>
          <button
            onClick={handleExport}
            disabled={leads.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {(["all", ...statusOptions] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-3 rounded-xl border text-center transition-all ${
                filter === s
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card/40 text-muted-foreground hover:border-primary/30"
              }`}
            >
              <div className="text-2xl font-bold">{counts[s]}</div>
              <div className="text-xs capitalize">{s}</div>
            </button>
          ))}
        </div>

        {/* Leads table */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Shield className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">
              {leads.length === 0 ? "No leads yet. They'll appear here when someone fills out the form." : "No leads match this filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className="glass-card overflow-hidden"
              >
                {/* Row summary */}
                <button
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                  className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-foreground truncate">{lead.name}</span>
                      {lead.company && (
                        <span className="text-muted-foreground text-sm truncate">@ {lead.company}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{lead.email}</span>
                      <span>{lead.phone}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusColors[lead.status]}`}>
                    {lead.status}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </button>

                {/* Expanded details */}
                {expandedId === lead.id && (
                  <div className="px-6 pb-5 border-t border-border pt-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Role</span>
                        <p className="text-foreground">{lead.role || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Employees</span>
                        <p className="text-foreground">{lead.employees || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Compliance Needs</span>
                        <p className="text-foreground">
                          {lead.compliance.length > 0 ? lead.compliance.join(", ") : "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Submitted</span>
                        <p className="text-foreground">
                          {new Date(lead.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {lead.concern && (
                      <div className="mb-4">
                        <span className="text-xs text-muted-foreground">Biggest Security Concern</span>
                        <p className="text-foreground mt-1">{lead.concern}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground mr-1">Status:</span>
                      {statusOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(lead.id, s)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize transition-all ${
                            lead.status === s
                              ? statusColors[s]
                              : "border-border text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <div className="flex-1" />
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-destructive/60 hover:text-destructive transition-colors p-1"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
