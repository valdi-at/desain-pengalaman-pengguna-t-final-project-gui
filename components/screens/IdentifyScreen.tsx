"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { BigButton, ScreenHead } from "@/components/primitives";

export interface IdentifyScreenProps {
  onPick: () => void;
}

const DEVICES = [
  { id: "phone",      icon: "smartphone",      label: "Smartphone",  sub: "Any brand · cracked OK" },
  { id: "tablet",     icon: "hard-drive",       label: "Tablet",      sub: "Incl. e-readers" },
  { id: "smartwatch", icon: "battery-charging", label: "Smartwatch",  sub: "Apple · Samsung · Garmin" },
  { id: "earbuds",    icon: "coins",            label: "Earbuds",     sub: "In-ear · over-ear" },
];

export function IdentifyScreen({ onPick }: IdentifyScreenProps) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="screen-in">
      <ScreenHead tag="Step 1 · Identify" title="What are you recycling?"
        sub="Pick a category, then place the device on the tray. One device per session." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {DEVICES.map(d => (
          <button key={d.id} onClick={() => setSel(d.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14,
            padding: "22px 22px 20px", borderRadius: 10, cursor: "pointer", textAlign: "left",
            background: sel === d.id ? "var(--accent-light)" : "var(--bg-surface)",
            border: `1px solid ${sel === d.id ? "var(--accent-mid)" : "var(--border-subtle)"}`,
            transition: "border-color .14s ease, background .14s ease",
          }}>
            <Icon name={d.icon} size={38} color="var(--accent)" />
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 23, color: "var(--text-primary)" }}>{d.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, letterSpacing: .5,
                color: "var(--text-muted)", marginTop: 5 }}>{d.sub}</div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
        <BigButton icon="arrow-right" disabled={!sel} onClick={onPick}>Continue</BigButton>
      </div>
    </div>
  );
}
