"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";
import {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Briefcase,
  MapPin
} from "lucide-react";

const ICONS = {
  Plumbing: Wrench,
  Electrical: Zap,
  Painting: Paintbrush,
  Joinery: Hammer,
  Other: Briefcase,
};

const CATEGORY_COLORS = {
  Plumbing: { bg: "#eff6ff", color: "#1d4ed8" },
  Electrical: { bg: "#fefce8", color: "#a16207" },
  Painting: { bg: "#fdf4ff", color: "#7e22ce" },
  Joinery: { bg: "#fff7ed", color: "#c2410c" },
  Other: { bg: "#f9fafb", color: "#374151" },
};

export default function JobCard({ job, index = 0 }) {
  const Icon = ICONS[job.category] || ICONS.Other;
  const catStyle = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.Other;
  const date = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",

  });



  return (
    <Link
      href={`/jobs/${job._id}`}
      style={{ textDecoration: "none", display: "block" }}
      className={`animate-slide-up stagger-${(index % 4) + 1}`}
    >
      <article
        className="card"
        style={{
          padding: "20px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          height: "100%",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div
            style={{
              borderRadius: 8,
              background: catStyle.bg,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: catStyle.color,
              flexShrink: 0,
              padding: "6px 10px",
            }}
          >

            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              {job.category}
            </span>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 16,
            color: "var(--col-text)",
            lineHeight: 1.35,
            letterSpacing: "-0.2px",
          }}
        >
          {job.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            color: "var(--col-text-muted)",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {job.description}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            paddingTop: 8,
            borderTop: "1px solid var(--col-border)",
          }}
        >
          {job.category && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                background: catStyle.bg,
                color: catStyle.color,
                padding: "2px 8px",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon size={12} strokeWidth={2.5} />

            </span>
          )}
          {job.location && (
            <span style={{ fontSize: 12, color: "var(--col-text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={12} strokeWidth={2.5} /> {job.location}
            </span>
          )}
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--col-text-muted)", fontFamily: "var(--font-mono)" }}>
            {date}
          </span>
        </div>
      </article>
    </Link>
  );
}
