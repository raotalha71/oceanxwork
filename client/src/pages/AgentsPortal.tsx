import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AgentsPortal() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Agents Portal</h1>
        <p>This portal is available for approved sales agents. Contact Oceanex to apply.</p>
      </main>
      <Footer />
    </div>
  );
}
