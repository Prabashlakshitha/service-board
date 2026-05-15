import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "GlobalTNA — Service Request Board",
  description: "Post and browse trade service requests across Scotland",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            background: "rgba(247,246,243,0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--col-border)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "0 24px",
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <a
              href="/"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "var(--col-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  flexShrink: 0,
                }}
              >
                G
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 17,
                  color: "var(--col-text)",
                  letterSpacing: "-0.3px",
                }}
              >
                GlobalTNA
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--col-text-muted)",
                  fontWeight: 400,
                  display: "none",
                }}
                className="sm-show"
              >
                Service Board
              </span>
            </a>

            {/* Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a
                href="/"
                className="btn btn-secondary"
                style={{ fontSize: 13, padding: "6px 14px" }}
              >
                Browse jobs
              </a>
              <a href="/new" className="btn btn-primary">
                + Post a job
              </a>
            </div>
          </div>
        </header>

        <main
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "36px 24px 80px",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid var(--col-border)",
            padding: "24px",
            textAlign: "center",
            fontSize: 13,
            color: "var(--col-text-muted)",
          }}
        >
          GlobalTNA © {new Date().getFullYear()} — Service Request Board
        </footer>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "10px",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#f0fdf4",
                border: "1px solid #86efac",
                color: "#166534",
              },
              iconTheme: { primary: "#16a34a", secondary: "#f0fdf4" },
            },
            error: {
              style: {
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                color: "#991b1b",
              },
              iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
            },
          }}
        />
      </body>
    </html>
  );
}
