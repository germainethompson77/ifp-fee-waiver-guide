/**
 * AppHeader — Sticky header with form branding
 * Design: Structured Confidence — Navy gradient, DM Serif Display, gold badge
 */

import { C } from "./shared";

export default function AppHeader() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
      color: "#fff",
      padding: "22px 20px 18px",
      textAlign: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 4px 24px rgba(15,39,68,0.35)",
    }}>
      <div style={{
        display: "inline-block",
        background: C.gold,
        color: C.navy,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "3px 12px",
        borderRadius: 20,
        marginBottom: 8,
      }}>
        Form 239 — IFP Guide
      </div>
      <h1 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        letterSpacing: "-0.3px",
        marginBottom: 4,
        color: "#fff",
      }}>
        Fee Waiver Application
      </h1>
      <p style={{ fontSize: 12, opacity: 0.72 }}>
        Application to Proceed Without Prepaying Fees
      </p>
    </div>
  );
}
