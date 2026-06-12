"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";
import { Badge, BigButton, CheckRow, ScreenHead } from "@/components/primitives";

export interface ConditionScreenProps {
  bricked: boolean;
  onNext: () => void;
}

const CHECKS = [
  { label: "Screen",          detail: "Minor surface scratches — light use" },
  { label: "Touchscreen",     detail: "All zones fully responsive" },
  { label: "Cameras",         detail: "Front & rear functional · no issues" },
  { label: "Battery",         detail: "85% capacity — slight degradation" },
  { label: "Charging port",   detail: "Functional · no debris detected" },
];

export function ConditionScreen({ onNext, bricked }: ConditionScreenProps) {
  return bricked ? <ConditionBricked onNext={onNext} /> : <ConditionWorking onNext={onNext} />;
}

function ConditionWorking({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (revealed >= CHECKS.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 660);
    return () => clearTimeout(t);
  }, [revealed]);
  const allDone = revealed >= CHECKS.length;

  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 4 · Condition"
        title={allDone ? "Assessment complete" : "Checking your device"}
        sub={allDone
          ? "All tests passed. Your device is in Good condition."
          : "Running diagnostics. Keep the device on the tray."}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CHECKS.map((c, i) => (
          <CheckRow key={c.label} label={c.label} detail={c.detail} done={i < revealed} />
        ))}
      </div>
      {allDone && (
        <div className="anim-up" style={{ marginTop: 22, display: "flex",
          alignItems: "center", justifyContent: "space-between" }}>
          <Badge tone="success" icon="circle-check-big">Condition: Good</Badge>
          <BigButton icon="arrow-right" onClick={onNext}>See valuation</BigButton>
        </div>
      )}
    </div>
  );
}

interface ConditionBrickedProps {
  onNext: () => void;
}

const BRICKED_ROWS = [
  { icon: "circle-x",         tone: "warn", label: "Power",                detail: "No response — device does not boot" },
  { icon: "circle-x",         tone: "warn", label: "Electronic tests",     detail: "Unavailable — can't check screen, battery or cameras" },
  { icon: "circle-check-big", tone: "ok",   label: "Physical condition",   detail: "Housing intact · glass cracked · assessed by camera" },
  { icon: "scale",            tone: "ok",   label: "Recoverable materials", detail: "0.19 kg est. — copper, gold, aluminium, cobalt" },
] as const;

function ConditionBricked({ onNext }: ConditionBrickedProps) {
  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 4 · Condition"
        title="Diagnostics unavailable"
        sub="This device won't power on, so we can't run electronic tests. We assess it visually and value it for parts and recoverable materials."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {BRICKED_ROWS.map(r => {
          const warn = r.tone === "warn";
          return (
            <div key={r.label} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 8,
              background: warn ? "#f4e9d2" : "var(--accent-light)",
              border: `1px solid ${warn ? "#e3cfa0" : "var(--border-subtle)"}`,
            }}>
              <Icon name={r.icon} size={19} color={warn ? "var(--warning)" : "var(--accent)"} style={{ flex: "none" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--text-primary)" }}>{r.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: .3, marginTop: 3,
                  color: warn ? "var(--warning)" : "var(--accent)" }}>{r.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="anim-up" style={{ marginTop: 22, display: "flex",
        alignItems: "center", justifyContent: "space-between" }}>
        <Badge tone="warning" icon="triangle-alert">Condition: Non-functional</Badge>
        <BigButton icon="arrow-right" onClick={onNext}>See valuation</BigButton>
      </div>
    </div>
  );
}
