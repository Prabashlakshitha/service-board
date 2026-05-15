"use client";

import { useState, useEffect, useCallback } from "react";
import { getJobs } from "@/lib/api";
import JobCard from "@/components/JobCard";

const CATEGORIES = ["All", "Plumbing", "Electrical", "Painting", "Joinery", "Other"];
const STATUSES = ["All", "Open", "In Progress", "Closed"];

function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 8 }} />
        <div className="skeleton" style={{ width: 72, height: 22, borderRadius: 99 }} />
      </div>
      <div className="skeleton" style={{ height: 18, width: "80%" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="skeleton" style={{ height: 13, width: "100%" }} />
        <div className="skeleton" style={{ height: 13, width: "65%" }} />
      </div>
      <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: "1px solid var(--col-border)" }}>
        <div className="skeleton" style={{ height: 18, width: 60, borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 18, width: 80, borderRadius: 6 }} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobs({ category, status, search });
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, status, search]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const hasFilters = category !== "All" || status !== "All" || searchInput;
  const clearFilters = () => { setCategory("All"); setStatus("All"); setSearchInput(""); };

  // Stats
  const openCount = jobs.filter((j) => j.status === "Open").length;
  const inProgressCount = jobs.filter((j) => j.status === "In Progress").length;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--col-accent)", marginBottom: 8 }}>
          Scotland's Trade Network
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 42px)",
            color: "var(--col-text)",
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          Service Request Board
        </h1>
        <p style={{ color: "var(--col-text-muted)", fontSize: 15, maxWidth: 500 }}>
          Browse open requests from homeowners. Find work that matches your trade.
        </p>
      </div>

      {/* Stats bar */}
      {!loading && !error && (
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
          className="animate-slide-up stagger-1"
        >
          {[
            { label: "Total", value: jobs.length, color: "var(--col-text)" },
            { label: "Open", value: openCount, color: "#16a34a" },
            { label: "In Progress", value: inProgressCount, color: "#d97706" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--col-surface)",
                border: "1px solid var(--col-border)",
                borderRadius: 10,
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: stat.color }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 13, color: "var(--col-text-muted)" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filter bar */}
      <div
        style={{
          background: "var(--col-surface)",
          border: "1px solid var(--col-border)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 28,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "flex-end",
        }}
        className="animate-slide-up stagger-2"
      >
        {/* Search */}
        <div style={{ flex: "1 1 200px" }}>
          <label className="form-label" htmlFor="search">
            Search
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14,
                color: "var(--col-text-muted)",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              id="search"
              type="text"
              className="form-input"
              style={{ paddingLeft: 32 }}
              placeholder="e.g. boiler, Glasgow, tap..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div style={{ flex: "0 0 auto" }}>
          <label className="form-label" htmlFor="category">Category</label>
          <select
            id="category"
            className="form-input"
            style={{ minWidth: 150 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Status */}
        <div style={{ flex: "0 0 auto" }}>
          <label className="form-label" htmlFor="status">Status</label>
          <select
            id="status"
            className="form-input"
            style={{ minWidth: 140 }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button className="btn btn-secondary" onClick={clearFilters} style={{ alignSelf: "flex-end" }}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* Result count */}
      {!loading && !error && (
        <p style={{ fontSize: 12, color: "var(--col-text-muted)", marginBottom: 20, fontFamily: "var(--font-mono)" }}>
          {jobs.length === 0 ? "No results" : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} found`}
          {hasFilters && " · filtered"}
        </p>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            background: "var(--col-danger-bg)",
            border: "1px solid #fca5a5",
            borderRadius: 12,
            padding: "20px 24px",
            color: "var(--col-danger)",
            fontSize: 14,
          }}
        >
          <strong>Could not load jobs.</strong> {error}
          <button
            style={{ marginLeft: 12, textDecoration: "underline", background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "inherit" }}
            onClick={fetchJobs}
          >
            Try again
          </button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : !error && jobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--col-text-muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--col-text)", marginBottom: 6 }}>
            No jobs found
          </p>
          <p style={{ fontSize: 14 }}>Try adjusting your search or filters.</p>
          {hasFilters && (
            <button className="btn btn-secondary" style={{ marginTop: 20 }} onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {jobs.map((job, i) => <JobCard key={job._id} job={job} index={i} />)}
        </div>
      )}
    </div>
  );
}
