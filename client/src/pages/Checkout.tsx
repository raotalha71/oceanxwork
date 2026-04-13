import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Checkout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Checkout</h1>
        <p>Checkout flow is placeholder-enabled in this recovered export build.</p>
      </main>
      <Footer />
    </div>
  );
}
