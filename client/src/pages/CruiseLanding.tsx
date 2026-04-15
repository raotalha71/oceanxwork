import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CruiseLanding() {
  const brochureUrl = "/brochures/cruise-line-brochure-mta.pdf";

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Cruise Solutions</h1>
        <p>Oceanex cruise-specific landing content is stubbed for this recovered workspace build.</p>

        <section
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            border: "1px solid #d7dbe1",
            borderRadius: "12px",
            background: "#f8fafc",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Cruise Line Brochure</h2>
          <p style={{ marginTop: 0 }}>View the brochure directly below or download it for offline use.</p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <a
              href={brochureUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
                textDecoration: "none",
                fontWeight: 600,
                background: "#0f172a",
                color: "#ffffff",
              }}
            >
              Open brochure
            </a>
            <a
              href={brochureUrl}
              download="Cruise Line brochure MTA.pdf"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
                textDecoration: "none",
                fontWeight: 600,
                border: "1px solid #0f172a",
                color: "#0f172a",
                background: "#ffffff",
              }}
            >
              Download brochure
            </a>
          </div>

          <iframe
            title="Cruise line brochure preview"
            src={brochureUrl}
            style={{
              width: "100%",
              minHeight: "70vh",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              background: "#ffffff",
            }}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
