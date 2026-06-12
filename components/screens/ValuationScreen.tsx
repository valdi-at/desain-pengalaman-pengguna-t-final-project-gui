"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { BigButton, Callout, ScreenHead, ValRow } from "@/components/primitives";

export interface ValuationScreenProps {
  bricked: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function ValuationScreen({ onAccept, onDecline, bricked }: ValuationScreenProps) {
  const [expanded, setExpanded] = useState(false);
  const offer = bricked ? "Rp 460.000" : "Rp 2.950.000";
  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 5 · Valuation"
        title="Here's what your device is worth"
        sub={bricked
          ? "Because this device won't power on, it's valued bottom-up from salvageable parts and recoverable materials — no hidden fees."
          : "A transparent breakdown — no hidden fees. The figure below is exactly what you will be paid."}
      />

      {bricked ? (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)",
          borderRadius: 10, padding: "4px 22px 6px" }}>
          <ValRow label="Salvageable parts" detail="Display & camera modules · graded for refurb stock"
            amount="Rp 320.000" type="base" />
          <ValRow label="Recoverable materials" detail="0.19 kg · copper, gold, aluminium, cobalt"
            amount="+ Rp 140.000" type="neutral" />
          <ValRow label="Resale value" detail="Non-functional · cannot be resold as a working device"
            amount="—" type="neutral" />
          <ValRow label="Final offer" amount="Rp 460.000" type="final" />
        </div>
      ) : (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)",
          borderRadius: 10, padding: "4px 22px 6px" }}>
          <ValRow label="Base market value" detail="Samsung Galaxy S23 128GB · secondary device market · Jun 2026"
            amount="Rp 3.200.000" type="base" />
          <ValRow label="Screen condition" detail="Surface scratches detected — light use"
            amount="− Rp 150.000" type="deduct" />
          <ValRow label="Battery health" detail="85% capacity — slight degradation"
            amount="− Rp 100.000" type="deduct" />
          <ValRow label="Camera & sensors" detail="All cameras functional · no deduction"
            amount="—" type="neutral" />
          <ValRow label="Market demand" detail="Galaxy S23 · strong secondary market in Indonesia"
            amount="—" type="neutral" />
          <ValRow label="Final offer" amount="Rp 2.950.000" type="final" />
        </div>
      )}

      {/* Why this price */}
      <button onClick={() => setExpanded(e => !e)} style={{
        display: "flex", alignItems: "center", gap: 8, marginTop: 14, padding: "10px 0",
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.2,
        textTransform: "uppercase", color: "var(--accent)",
      }}>
        <Icon name="info" size={14} color="var(--accent)" />
        {expanded ? "Hide explanation" : "Why this price?"}
      </button>
      {expanded && (
        <div className="anim-up" style={{ background: "var(--bg-inset)", border: "1px solid var(--border-subtle)",
          borderRadius: 8, padding: "14px 18px", marginBottom: 10 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.75,
            color: "var(--text-body)", margin: 0 }}>
            {bricked
              ? "A non-functional device can't be resold whole, so it's valued from the bottom up. Salvageable parts are graded against current refurb-stock demand; recoverable materials are priced by weight against the USGS urban mining dataset. No commission is deducted."
              : "Base value is sourced from the Indonesian secondary device market index (updated weekly). Condition deductions reflect repair cost estimates for the defects detected — screen scratch repair: Rp 150.000; battery replacement at 85% threshold: Rp 100.000. Market demand adjusts for local resale velocity. No commission is deducted."}
          </p>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-dim)",
            marginTop: 10, letterSpacing: .3 }}>
            {bricked
              ? "Source: USGS · urban mining dataset 2024 · refurb parts index Q2 2026"
              : "Source: IDX secondary device index · repair cost survey Q2 2026"}
          </div>
        </div>
      )}

      <div style={{ marginTop: expanded ? 6 : 4 }}>
        {bricked ? (
          <Callout icon="shield-check" tone="warning">
            This device can&apos;t be wiped by software. We&apos;ll <strong style={{ color: "var(--text-primary)" }}>physically
            destroy the storage chip</strong> on-site and issue a destruction certificate.
          </Callout>
        ) : (
          <Callout icon="shield-check">
            Your data will be securely erased to <strong style={{ color: "var(--text-primary)" }}>NIST 800-88 standard</strong> before
            payout. A destruction certificate is issued.
          </Callout>
        )}
      </div>

      <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", gap: 14 }}>
        <BigButton variant="ghost" icon="circle-x" onClick={onDecline}>Return my device</BigButton>
        <BigButton icon="arrow-right" onClick={onAccept}>Accept {offer}</BigButton>
      </div>
    </div>
  );
}
