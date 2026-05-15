"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getJob, updateJobStatus, deleteJob } from "@/lib/api";
import StatusBadge from "@/components/StatusBadge";
import {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Briefcase,
} from "lucide-react";

const STATUSES = ["Open", "In Progress", "Closed"];

const CATEGORY_ICONS = {
  Plumbing: Wrench, Electrical: Zap, Painting: Paintbrush, Joinery: Hammer, Other: Briefcase,
};

function DetailRow({ label, value, mono = false }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--col-text-muted)" }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 14,
          color: "var(--col-text)",
          fontFamily: mono ? "var(--font-mono)" : "inherit",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getJob(id);
        setJob(data);
        setNewStatus(data.status);
      } catch (err) {
        setError(err.status === 404 ? "This job doesn't exist." : err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (newStatus === job.status) return;
    setUpdatingStatus(true);
    setStatusError(null);
    try {
      const updated = await updateJobStatus(id, newStatus);
      setJob(updated);
    } catch (err) {
      setStatusError(err.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteJob(id);
      router.push("/");
    } catch (err) {
      setDeleting(false);
      setShowDeleteConfirm(false);
      setStatusError(err.message);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="skeleton" style={{ height: 14, width: 100, marginBottom: 32 }} />
        <div className="skeleton" style={{ height: 36, width: "60%", marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 18, width: 90, borderRadius: 99, marginBottom: 32 }} />
        <div className="card" style={{ padding: 32 }}>
          {[80, 65, 45, 55].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 14, width: `${w}%`, marginBottom: 12 }} />
          ))}
        </div>
      </div>
    );
  }

  /* ── Error / 404 ── */
  if (error) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, marginBottom: 8 }}>Job not found</h1>
        <p style={{ color: "var(--col-text-muted)", fontSize: 14, marginBottom: 28 }}>{error}</p>
        <a href="/" className="btn btn-primary">← Back to board</a>
      </div>
    );
  }

  const Icon = CATEGORY_ICONS[job.category] || CATEGORY_ICONS.Other;
  const createdDate = new Date(job.createdAt).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const statusChanged = newStatus !== job.status;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Back */}
      <a
        href="/"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: "var(--col-text-muted)", textDecoration: "none", marginBottom: 28,
        }}
      >
        ← Back to board
      </a>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span
            style={{
              width: 44, height: 44, borderRadius: 10,
              background: "#f3f4f6", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 22, flexShrink: 0,
            }}
          >
            {Icon && <Icon size={22} strokeWidth={1.7} />}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--col-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {job.category}
          </span>
          <StatusBadge status={job.status} size="lg" />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 400,
            letterSpacing: "-0.4px",
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {job.title}
        </h1>
        <p style={{ fontSize: 12, color: "var(--col-text-muted)", fontFamily: "var(--font-mono)" }}>
          Posted on {createdDate}
        </p>
      </div>

      {/* Main content card */}
      <div
        className="card"
        style={{ padding: "28px 32px", marginBottom: 20, display: "flex", flexDirection: "column", gap: 24 }}
      >
        {/* Description */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--col-text-muted)", marginBottom: 10 }}>
            Description
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--col-text)" }}>
            {job.description}
          </p>
        </div>

        {/* Details grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 20,
            paddingTop: 20,
            borderTop: "1px solid var(--col-border)",
          }}
        >
          <DetailRow label="Category" value={job.category} />
          <DetailRow label="Location" value={job.location} />
          <DetailRow label="Contact" value={job.contactName} />
          <DetailRow label="Email" value={job.contactEmail} mono />
        </div>
      </div>

      {/* Status + Actions card */}
      <div
        className="card"
        style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--col-accent)" }}>
          Manage this job
        </p>

        {/* Status update */}
        <div>
          <label className="form-label" htmlFor="status-select">Update status</label>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
            <select
              id="status-select"
              className="form-input"
              style={{ maxWidth: 200 }}
              value={newStatus}
              onChange={(e) => { setNewStatus(e.target.value); setStatusError(null); }}
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button
              className="btn btn-primary"
              onClick={handleStatusUpdate}
              disabled={!statusChanged || updatingStatus}
            >
              {updatingStatus ? "Saving…" : "Save status"}
            </button>
          </div>
          {statusError && (
            <p className="form-error" style={{ marginTop: 8 }}>{statusError}</p>
          )}
          {!statusChanged && (
            <p style={{ fontSize: 12, color: "var(--col-text-muted)", marginTop: 6 }}>
              Current status: <strong>{job.status}</strong>
            </p>
          )}
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid var(--col-border)" }} />

        {/* Delete */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Danger zone</p>
          <p style={{ fontSize: 13, color: "var(--col-text-muted)", marginBottom: 12 }}>
            Deleting this job request is permanent and cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete job
            </button>
          ) : (
            <div
              style={{
                background: "var(--col-danger-bg)",
                border: "1px solid #fca5a5",
                borderRadius: 10,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 500, color: "var(--col-danger)" }}>
                Are you sure? This cannot be undone.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting…" : "Yes, delete"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
