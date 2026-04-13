import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BROCHURES = [
  {
    label: "Resort Collection 2025-2026",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/OCEANEXRESORTCOLLECTION2025-2026(1)_002ec483.pdf",
  },
  {
    label: "Cruise Line Brochure",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/CruiseLineBrochure_1598d880.pdf",
  },
  {
    label: "Themed Collection 2026",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/OceanexThemedBrochure2026_b288b4c1.pdf",
  },
];

export default function Press() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Press & Downloads</h1>
        <ul>
          {BROCHURES.map(item => (
            <li key={item.label}>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
