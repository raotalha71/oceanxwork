import { useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Legal() {
  const { tab } = useParams<{ tab?: string }>();

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Legal</h1>
        <p>Current section: {tab ?? "overview"}</p>
        <p>This local export contains a minimal legal page placeholder.</p>
      </main>
      <Footer />
    </div>
  );
}
