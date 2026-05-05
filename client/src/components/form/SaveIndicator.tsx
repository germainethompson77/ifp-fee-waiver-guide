/**
 * SaveIndicator — Shows auto-save status and last saved time
 * Design: Structured Confidence — subtle banner below progress bar
 */

import { C } from "./shared";

interface SaveIndicatorProps {
  saveStatus: "saved" | "saving" | "unsaved";
  lastSaved: string | null;
  hasProgress: boolean;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function SaveIndicator({ saveStatus, lastSaved, hasProgress }: SaveIndicatorProps) {
  if (!hasProgress && !lastSaved) return null;

  let icon = "✓";
  let text = "";
  let bg = "#dcfce7";
  let color = "#14532d";

  if (saveStatus === "saving") {
    icon = "⟳";
    text = "Saving...";
    bg = "#fef3c7";
    color = "#78350f";
  } else if (saveStatus === "saved" && lastSaved) {
    icon = "✓";
    text = `Progress saved — last saved at ${formatTime(lastSaved)}. You can safely close this page and return later.`;
    bg = "#dcfce7";
    color = "#14532d";
  } else if (saveStatus === "saved" && !lastSaved && hasProgress) {
    icon = "✓";
    text = "Progress will be saved automatically.";
    bg = "#dbeafe";
    color = "#1e3a8a";
  }

  return (
    <div style={{
      background: bg,
      color,
      fontSize: 11,
      fontWeight: 500,
      padding: "7px 20px",
      display: "flex",
      alignItems: "center",
      gap: 6,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <span style={{ fontSize: 13 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
