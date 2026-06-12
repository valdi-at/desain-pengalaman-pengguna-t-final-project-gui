"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";
import { BigButton, Field, ScreenHead } from "@/components/primitives";

export interface ScanScreenProps {
  bricked: boolean;
  onConfirm: () => void;
  onWrong: () => void;
  onRecheck: () => void;
}

type Phase = "scanning" | "detecting" | "detected";

export function ScanScreen({ onConfirm, onWrong, onRecheck, bricked }: ScanScreenProps) {
  const [phase, setPhase] = useState<Phase>("scanning"); // scanning → (detecting) → detected
  useEffect(() => {
    if (phase === "scanning") {
      const t = setTimeout(() => setPhase(bricked ? "detected" : "detecting"), bricked ? 1700 : 2400);
      return () => clearTimeout(t);
    }
    if (phase === "detecting") {
      const t = setTimeout(() => setPhase("detected"), 1600);
      return () => clearTimeout(t);
    }
  }, [phase, bricked]);

  const detected = phase === "detected";
  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 3 · Scan"
        title={bricked
          ? (detected ? "Device logged" : "Reading your device")
          : (detected ? "Device found" : "Place your device on the tray")}
        sub={bricked
          ? (detected
              ? "Identified visually — it'll be valued for parts and recoverable materials."
              : "It won't power on, so we identify it from the housing and label using the camera.")
          : (detected
              ? "Check the details below. If anything looks wrong, tap Wrong device."
              : "Keep the device still. Our sensors read the model, storage, and IMEI.")}
      />
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)",
        borderRadius: 10, padding: "32px 30px", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 26 }}>
        <div style={{ position: "relative", width: 160, height: 160, display: "grid", placeItems: "center" }}>
          {!detected && (
            <>
              <div className="kiosk-scan-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%",
                border: `2px solid ${bricked ? "#e3cfa0" : "var(--accent-mid)"}` }} />
              <div className="kiosk-scan-ring-slow" style={{ position: "absolute", inset: "18px", borderRadius: "50%",
                border: "2px solid var(--border-subtle)" }} />
            </>
          )}
          {detected && bricked && (
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
              border: "2px solid var(--warning)", opacity: .4 }} />
          )}
          <Icon name={bricked ? "triangle-alert" : detected ? "circle-check-big" : "smartphone"} size={68}
            color={bricked ? "var(--warning)" : detected ? "var(--accent)" : "var(--accent-mid)"} />
        </div>

        {!detected && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 2.5,
            textTransform: "uppercase", color: bricked ? "var(--warning)" : "var(--text-muted)" }}>
            {bricked ? "Reading housing & label…" : phase === "detecting" ? "Identifying device…" : "Scanning…"}
          </div>
        )}
        {detected && !bricked && (
          <div className="anim-up" style={{ display: "flex", gap: 44, justifyContent: "center" }}>
            <Field label="Device" align="center">Samsung Galaxy S23</Field>
            <Field label="Storage" align="center">128 GB</Field>
            <Field label="Year" align="center">2023</Field>
          </div>
        )}
        {detected && bricked && (
          <div className="anim-up" style={{ display: "flex", gap: 44, justifyContent: "center" }}>
            <Field label="Identified by" align="center">Camera · housing</Field>
            <Field label="Power" align="center">No response</Field>
            <Field label="On-board data" align="center">Unreadable</Field>
          </div>
        )}
      </div>

      {detected && !bricked && (
        <div className="anim-up-delay" style={{ marginTop: 26, display: "flex", gap: 14,
          justifyContent: "space-between" }}>
          <BigButton variant="ghost" icon="circle-x" onClick={onWrong}>Wrong device</BigButton>
          <BigButton icon="arrow-right" onClick={onConfirm}>Confirm — that&apos;s mine</BigButton>
        </div>
      )}
      {detected && bricked && (
        <div className="anim-up-delay" style={{ marginTop: 26, display: "flex", gap: 14,
          justifyContent: "space-between" }}>
          <BigButton variant="ghost" icon="battery-charging" onClick={onRecheck}>It does power on</BigButton>
          <BigButton icon="arrow-right" onClick={onConfirm}>Continue with valuation</BigButton>
        </div>
      )}
    </div>
  );
}
