import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  variant: string;
};

export default function LandingPage({ variant }: Props) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Campaign Landing</h1>
        <p>Variant: {variant}</p>
        <p>This export includes a lightweight placeholder for campaign landing variants.</p>
      </main>
      <Footer />
    </div>
  );
}
