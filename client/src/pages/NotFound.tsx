import { Link } from "wouter";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: "7rem", textAlign: "center", paddingInline: "1rem" }}>
        <h1>404</h1>
        <p>The page you requested could not be found.</p>
        <Link href="/">Back to home</Link>
      </main>
    </div>
  );
}
