export default function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px 20px",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "var(--col-accent)",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 36,
          fontWeight: 400,
          letterSpacing: "-0.5px",
          marginBottom: 12,
        }}
      >
        Page not found
      </h1>
      <p style={{ color: "var(--col-text-muted)", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
        This page doesn't exist or may have been removed.
      </p>
      <a href="/" className="btn btn-primary">
        ← Back to board
      </a>
    </div>
  );
}
