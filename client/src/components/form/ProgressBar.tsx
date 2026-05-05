/**
 * ProgressBar — Step progress indicator with dot navigation
 * Design: Structured Confidence — Sky/green dots, animated fill bar
 */

import { C } from "./shared";

const TOTAL = 13;

interface ProgressBarProps {
  currentScreen: number;
}

export default function ProgressBar({ currentScreen }: ProgressBarProps) {
  const pct = Math.round((currentScreen / TOTAL) * 100);

  let label = "Welcome";
  if (currentScreen > 0 && currentScreen <= 13) {
    label = currentScreen === 13 ? "Summary" : `Question ${currentScreen} of 13`;
  }

  return (
    <div style={{
      background: C.white,
      padding: "12px 20px",
      borderBottom: `1px solid ${C.border}`,
      position: "sticky",
      top: 88,
      zIndex: 99,
    }}>
      {/* Label + percentage */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.gray }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.sky }}>{pct}%</span>
      </div>

      {/* Progress fill bar */}
      <div style={{ height: 5, background: C.border, borderRadius: 99, overflow: "hidden", marginBottom: 10 }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${C.sky}, ${C.gold})`,
          borderRadius: 99,
          transition: "width 0.4s ease",
        }} />
      </div>

      {/* Step dots */}
      <div style={{ display: "flex", gap: 5, overflowX: "auto", scrollbarWidth: "none" }}>
        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => {
          const isDone = n < currentScreen;
          const isActive = n === currentScreen;
          return (
            <div
              key={n}
              style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `2px solid ${isDone ? C.green : isActive ? C.sky : C.border}`,
                background: isDone ? C.green : isActive ? C.sky : C.white,
                fontSize: 10,
                fontWeight: 700,
                color: isDone || isActive ? C.white : C.gray,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                cursor: "default",
              }}
            >
              {isDone ? "✓" : n}
            </div>
          );
        })}
      </div>
    </div>
  );
}
