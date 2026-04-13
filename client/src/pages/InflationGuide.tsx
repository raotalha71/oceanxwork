import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InflationGuide() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>How It Works</h1>
        <p>Oceanex systems are designed for rapid deployment and premium hospitality service workflows.</p>
      </main>
      <Footer />
    </div>
  );
}
