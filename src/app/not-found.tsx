import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "var(--space-3xl) 0"
    }}>
      {/* Background decoration */}
      <div className="blob blob-primary" style={{ width: "300px", height: "300px", top: "10%", left: "-10%" }}></div>
      <div className="blob blob-secondary" style={{ width: "250px", height: "250px", bottom: "10%", right: "-10%" }}></div>

      <div className="container" style={{
        maxWidth: "600px",
        textAlign: "center",
        zIndex: 2,
        position: "relative"
      }}>
        <div style={{
          fontSize: "6rem",
          marginBottom: "var(--space-md)",
          animation: "float 4s ease-in-out infinite"
        }}>
          🌸
        </div>
        <h1 style={{
          fontFamily: "var(--ff-heading)",
          fontSize: "var(--fs-hero)",
          fontWeight: 800,
          background: "var(--grad-accent)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "var(--space-sm)"
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: "var(--fs-h2)",
          marginBottom: "var(--space-md)",
          color: "var(--clr-text)"
        }}>
          Page Not Found
        </h2>
        <p style={{
          fontSize: "var(--fs-body)",
          color: "var(--clr-text-muted)",
          marginBottom: "var(--space-xl)",
          lineHeight: 1.7
        }}>
          It seems you've wandered off the track. Let's get you back to understanding your body and checking your risk factors.
        </p>
        <div style={{
          display: "flex",
          gap: "var(--space-md)",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <Link href="/" className="btn btn-primary btn-lg">
            Go Home →
          </Link>
          <Link href="/questionnaire" className="btn btn-secondary btn-lg">
            Check Your Risk
          </Link>
        </div>
      </div>
    </main>
  );
}
