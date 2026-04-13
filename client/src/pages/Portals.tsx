import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Portals() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", paddingInline: "1rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Business Portals</h1>
        <p>Choose the route that matches your business model.</p>
        <ul>
          <li><Link href="/trade-portal">Trade Portal</Link></li>
          <li><Link href="/agents-portal">Agents Portal</Link></li>
          <li><Link href="/dashboard">Operator Dashboard</Link></li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
