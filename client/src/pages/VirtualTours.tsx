import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function VirtualTours() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Virtual Tours</h1>
        <p>Interactive 360-degree tours are being prepared for this export build.</p>
      </main>
      <Footer />
    </div>
  );
}
