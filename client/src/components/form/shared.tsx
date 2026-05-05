/**
 * shared.tsx — Reusable form UI primitives
 * Design: Structured Confidence (Legal Workspace)
 */

import React from "react";

// ─── Color tokens ───────────────────────────────────────────────────────────
export const C = {
  navy: "#0f2744",
  navyLight: "#1a4480",
  sky: "#2563eb",
  gold: "#f59e0b",
  green: "#16a34a",
  red: "#dc2626",
  bgLight: "#f0f4ff",
  border: "#cbd5e1",
  gray: "#64748b",
  white: "#ffffff",
};

// ─── Income thresholds (150% FPL, Georgia 2025) ──────────────────────────────
export const THRESHOLDS: Record<number, number> = {
  1: 1956,
  2: 2643,
  3: 3331,
  4: 4018,
  5: 4706,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function num(v: string | undefined): number {
  return parseFloat(v || "0") || 0;
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
export function QCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: C.white,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 20px rgba(15,39,68,0.1)",
      marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

// ─── Card header ──────────────────────────────────────────────────────────────
export function QHeader({ qNum, title, desc }: { qNum: string; title: string; desc?: string }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
      padding: "18px 22px",
      color: C.white,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.65, marginBottom: 4 }}>
        {qNum}
      </div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, lineHeight: 1.3 }}>
        {title}
      </div>
      {desc && (
        <div style={{ fontSize: 12, opacity: 0.78, marginTop: 6, lineHeight: 1.6 }}>
          {desc}
        </div>
      )}
    </div>
  );
}

// ─── Card body ────────────────────────────────────────────────────────────────
export function QBody({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "20px 22px" }}>{children}</div>;
}

// ─── Alert boxes ─────────────────────────────────────────────────────────────
type AlertType = "green" | "red" | "yellow" | "blue";
const alertStyles: Record<AlertType, { bg: string; border: string; text: string }> = {
  green: { bg: "#dcfce7", border: C.green, text: "#14532d" },
  red: { bg: "#fee2e2", border: C.red, text: "#7f1d1d" },
  yellow: { bg: "#fef3c7", border: C.gold, text: "#78350f" },
  blue: { bg: "#dbeafe", border: C.sky, text: "#1e3a8a" },
};

export function Alert({ type, children }: { type: AlertType; children: React.ReactNode }) {
  const s = alertStyles[type];
  return (
    <div style={{
      background: s.bg,
      borderLeft: `4px solid ${s.border}`,
      borderRadius: "0 10px 10px 0",
      padding: "11px 14px",
      fontSize: 12,
      lineHeight: 1.65,
      marginBottom: 14,
      color: s.text,
    }}>
      {children}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      color: C.gray,
      marginBottom: 10,
      marginTop: 4,
    }}>
      {children}
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────
interface FieldInputProps {
  label?: string;
  id?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  prefix?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

export function FieldInput({ label, id, type = "text", value, onChange, placeholder, hint, prefix, maxLength, inputMode }: FieldInputProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label htmlFor={id} style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.gray, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {prefix && (
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: C.gray, fontWeight: 600, pointerEvents: "none" }}>
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          min={type === "number" ? "0" : undefined}
          style={{
            width: "100%",
            padding: prefix ? "11px 13px 11px 26px" : "11px 13px",
            border: `2px solid ${C.border}`,
            borderRadius: 10,
            fontSize: 15,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: C.navy,
            background: "#f8faff",
            outline: "none",
            transition: "border-color 0.2s",
            WebkitAppearance: "none",
          }}
          onFocus={(e) => { e.target.style.borderColor = C.sky; e.target.style.background = C.white; }}
          onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.background = "#f8faff"; }}
        />
      </div>
      {hint && <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface FieldTextareaProps {
  label?: string;
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  minHeight?: number;
}

export function FieldTextarea({ label, id, value, onChange, placeholder, hint, minHeight = 110 }: FieldTextareaProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label htmlFor={id} style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.gray, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          minHeight,
          padding: "11px 13px",
          border: `2px solid ${C.border}`,
          borderRadius: 10,
          fontSize: 14,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: C.navy,
          background: "#f8faff",
          outline: "none",
          resize: "vertical",
          lineHeight: 1.6,
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => { e.target.style.borderColor = C.sky; e.target.style.background = C.white; }}
        onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.background = "#f8faff"; }}
      />
      {hint && <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

// ─── Radio toggle pair ────────────────────────────────────────────────────────
interface RadioToggleProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; colorClass?: "green" | "red" | "default" }[];
}

export function RadioToggle({ label, value, onChange, options }: RadioToggleProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <div style={{ fontSize: 11, fontWeight: 600, color: C.gray, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", gap: 10 }}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const colorClass = opt.colorClass || "default";
          let borderColor = C.border;
          let bgColor = "#f8faff";
          let textColor = C.gray;
          if (isSelected) {
            if (colorClass === "green") { borderColor = C.green; bgColor = "#dcfce7"; textColor = C.green; }
            else if (colorClass === "red") { borderColor = C.red; bgColor = "#fee2e2"; textColor = C.red; }
            else { borderColor = C.sky; bgColor = "#eff6ff"; textColor = C.sky; }
          }
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                flex: 1,
                padding: "11px 12px",
                border: `2px solid ${borderColor}`,
                borderRadius: 10,
                textAlign: "center",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
                color: textColor,
                background: bgColor,
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Income row ───────────────────────────────────────────────────────────────
interface IncomeRowProps {
  label: string;
  sub?: string;
  value: string;
  onChange: (v: string) => void;
}

export function IncomeRow({ label, sub, value, onChange }: IncomeRowProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f1f5f9" }}>
      <div>
        <div style={{ fontSize: 13, color: C.navy, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: C.gray, fontWeight: 600, pointerEvents: "none" }}>$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          min="0"
          inputMode="numeric"
          style={{
            width: "100%",
            padding: "9px 9px 9px 22px",
            border: `2px solid ${C.border}`,
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: C.navy,
            background: "#f8faff",
            outline: "none",
            WebkitAppearance: "none",
          }}
          onFocus={(e) => { e.target.style.borderColor = C.sky; e.target.style.background = C.white; }}
          onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.background = "#f8faff"; }}
        />
      </div>
    </div>
  );
}

// ─── Total row ────────────────────────────────────────────────────────────────
export function TotalRow({ label, amount, statusEl }: { label: string; amount: number; statusEl?: React.ReactNode }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ background: "#f0f4ff", borderRadius: 10, padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.sky }}>{fmt(amount)}</div>
      </div>
      {statusEl && <div style={{ marginTop: 8 }}>{statusEl}</div>}
    </div>
  );
}

// ─── Status chip ──────────────────────────────────────────────────────────────
type ChipType = "good" | "warn" | "bad" | "info";
const chipStyles: Record<ChipType, { bg: string; color: string }> = {
  good: { bg: "#dcfce7", color: C.green },
  warn: { bg: "#fef3c7", color: "#92400e" },
  bad: { bg: "#fee2e2", color: C.red },
  info: { bg: "#dbeafe", color: "#1e40af" },
};

export function StatusChip({ type, children }: { type: ChipType; children: React.ReactNode }) {
  const s = chipStyles[type];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 11px",
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 600,
      background: s.bg,
      color: s.color,
    }}>
      {children}
    </span>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider() {
  return <div style={{ height: 1, background: C.border, margin: "16px 0" }} />;
}

// ─── Navigation buttons ───────────────────────────────────────────────────────
interface NavBtnsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextVariant?: "primary" | "finish";
  hideBack?: boolean;
}

export function NavBtns({ onBack, onNext, nextLabel = "Next →", nextVariant = "primary", hideBack = false }: NavBtnsProps) {
  const nextBg = nextVariant === "finish"
    ? `linear-gradient(135deg, ${C.green}, #15803d)`
    : `linear-gradient(135deg, ${C.sky}, ${C.navyLight})`;
  const nextShadow = nextVariant === "finish"
    ? "0 4px 14px rgba(22,163,74,0.35)"
    : "0 4px 14px rgba(37,99,235,0.35)";

  return (
    <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
      {!hideBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: 12,
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: "pointer",
            background: C.border,
            color: C.gray,
            transition: "all 0.2s",
          }}
        >
          ← Back
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          style={{
            flex: hideBack ? "unset" : 1,
            width: hideBack ? "100%" : undefined,
            padding: "15px",
            borderRadius: 12,
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: "pointer",
            background: nextBg,
            color: C.white,
            boxShadow: nextShadow,
            transition: "all 0.2s",
          }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// Re-export FormData type from the hook for convenience
export type { FormData } from "@/hooks/useFormSave";
