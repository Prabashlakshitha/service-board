"use client";

const STYLES = {
  Open: {
    background: "var(--col-success-bg)",
    color: "var(--col-success)",
    dot: "#16a34a",
  },
  "In Progress": {
    background: "var(--col-warning-bg)",
    color: "var(--col-warning)",
    dot: "#d97706",
  },
  Closed: {
    background: "var(--col-neutral-bg)",
    color: "var(--col-neutral)",
    dot: "#6b7280",
  },
};

export default function StatusBadge({ status, size = "sm" }) {
  const s = STYLES[status] || STYLES.Open;
  const fontSize = size === "lg" ? 13 : 11;
  const padding = size === "lg" ? "5px 12px" : "3px 9px";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: s.background,
        color: s.color,
        fontSize,
        fontWeight: 600,
        padding,
        borderRadius: 99,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}
