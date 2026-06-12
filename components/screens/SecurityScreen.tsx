"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";
import { Badge, BigButton, ScreenHead } from "@/components/primitives";

export interface SecurityScreenProps {
  bricked: boolean;
  onDone: () => void;
}

type Phase = "info" | "active" | "done";

const TRUST_POINTS = [
  { icon: "shield-check", title: "Certified data wipe",  sub: "DoD 5220.22-M · NIST 800-88 standard" },
  { icon: "lock",          title: "Verification & audit", sub: "Every sector confirmed overwritten" },
  { icon: "qr-code",       title: "Destruction certificate", sub: "Digital receipt, scannable QR" },
] as const;

export function SecurityScreen({ onDone, bricked }: SecurityScreenProps) {
  return bricked ? <SecurityBricked onDone={onDone} /> : <SecurityWorking onDone={onDone} />;
}

function SecurityWorking({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("info"); // info → active → done
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (phase !== "active") return;
    const t = setInterval(() => setPct(p => {
      if (p >= 100) { clearInterval(t); setPhase("done"); return 100; }
      return p + 3.5;
    }), 80);
    return () => clearInterval(t);
  }, [phase]);

  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 6 · Data security"
        title={phase === "done" ? "Data erased" : "Your data is erased first"}
        sub={phase === "info"
          ? "Before any payout, we permanently wipe all storage on your device. Your data never leaves this kiosk."
          : phase === "active" ? "Securely overwriting all storage. Do not remove the device."
          : "All sectors verified. Certificate KSK-07-38429 has been printed."}
      />

      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)",
        borderRadius: 10, padding: "28px 26px", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 22 }}>

        {phase === "info" && (
          <>
            <Icon name="shield-check" size={56} color="var(--accent)" />
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
              {TRUST_POINTS.map(tp => (
                <div key={tp.title} style={{ display: "flex", alignItems: "center", gap: 16,
                  padding: "12px 16px", background: "var(--accent-light)",
                  border: "1px solid var(--border-subtle)", borderRadius: 8 }}>
                  <Icon name={tp.icon} size={20} color="var(--accent)" style={{ flex: "none" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--text-primary)" }}>{tp.title}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
                      marginTop: 3, letterSpacing: .3 }}>{tp.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <BigButton icon="shield-check" onClick={() => setPhase("active")} full>
              Authorise secure wipe
            </BigButton>
          </>
        )}

        {phase === "active" && (
          <>
            <Icon name="lock" size={56} color="var(--accent)" style={{ opacity: .7 }} className="pulse-glow" />
            <div style={{ width: "100%", maxWidth: 460 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2,
                  textTransform: "uppercase", color: "var(--text-muted)" }}>Erasing storage</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>
                  {Math.min(100, Math.round(pct))}%
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "var(--bg-inset)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: Math.min(100, pct) + "%",
                  background: "var(--accent)", borderRadius: 999, transition: "width .08s linear" }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)",
                marginTop: 10, letterSpacing: .5, textAlign: "center" }}>
                {pct < 40 ? "Overwriting user partition…" : pct < 75 ? "Overwriting system partition…" : "Verifying sectors…"}
              </div>
            </div>
          </>
        )}

        {phase === "done" && (
          <>
            <Icon name="circle-check-big" size={56} color="var(--accent)" />
            <Badge tone="success" icon="circle-check-big">Wiped &amp; verified · NIST 800-88</Badge>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)",
              textAlign: "center", letterSpacing: .5 }}>
              Certificate KSK-07-38429 printed at this kiosk
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop: 26, display: "flex", justifyContent: "flex-end" }}>
        <BigButton icon="arrow-right" disabled={phase !== "done"} onClick={onDone}>Get paid</BigButton>
      </div>
    </div>
  );
}

interface SecurityBrickedProps {
  onDone: () => void;
}

const BRICKED_TRUST_POINTS = [
  { icon: "lock",          title: "Physical chip destruction", sub: "Storage chip mechanically shredded on-site" },
  { icon: "shield-check",  title: "Witnessed & recorded",       sub: "Destruction is filmed and logged to your receipt" },
  { icon: "qr-code",       title: "Destruction certificate",    sub: "Digital receipt, scannable QR" },
] as const;

function SecurityBricked({ onDone }: SecurityBrickedProps) {
  const [phase, setPhase] = useState<Phase>("info"); // info → active (shredding) → done
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (phase !== "active") return;
    const t = setInterval(() => setPct(p => {
      if (p >= 100) { clearInterval(t); setPhase("done"); return 100; }
      return p + 3.5;
    }), 80);
    return () => clearInterval(t);
  }, [phase]);

  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 6 · Data security"
        title={phase === "done" ? "Storage destroyed" : "We can't wipe it — so we destroy it"}
        sub={phase === "info"
          ? "Your device won't power on, so software erasure is impossible. Instead we physically shred the storage chip inside this kiosk. Your data can never be recovered."
          : phase === "active" ? "Extracting and destroying the storage module. Do not remove the device."
          : "The storage chip has been physically shredded. Certificate KSK-07-38431 has been printed."}
      />

      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)",
        borderRadius: 10, padding: "28px 26px", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 22 }}>

        {phase === "info" && (
          <>
            <Icon name="shield-check" size={56} color="var(--warning)" />
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
              {BRICKED_TRUST_POINTS.map(tp => (
                <div key={tp.title} style={{ display: "flex", alignItems: "center", gap: 16,
                  padding: "12px 16px", background: "var(--accent-light)",
                  border: "1px solid var(--border-subtle)", borderRadius: 8 }}>
                  <Icon name={tp.icon} size={20} color="var(--accent)" style={{ flex: "none" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--text-primary)" }}>{tp.title}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
                      marginTop: 3, letterSpacing: .3 }}>{tp.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <BigButton icon="shield-check" onClick={() => setPhase("active")} full>
              Authorise physical destruction
            </BigButton>
          </>
        )}

        {phase === "active" && (
          <>
            <Icon name="lock" size={56} color="var(--warning)" style={{ opacity: .8 }} className="pulse-glow" />
            <div style={{ width: "100%", maxWidth: 460 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2,
                  textTransform: "uppercase", color: "var(--text-muted)" }}>Destroying storage</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--warning)" }}>
                  {Math.min(100, Math.round(pct))}%
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "var(--bg-inset)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: Math.min(100, pct) + "%",
                  background: "var(--warning)", borderRadius: 999, transition: "width .08s linear" }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)",
                marginTop: 10, letterSpacing: .5, textAlign: "center" }}>
                {pct < 40 ? "Extracting storage module…" : pct < 75 ? "Shredding chip…" : "Confirming destruction…"}
              </div>
            </div>
          </>
        )}

        {phase === "done" && (
          <>
            <Icon name="circle-check-big" size={56} color="var(--accent)" />
            <Badge tone="success" icon="circle-check-big">Storage shredded · unrecoverable</Badge>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)",
              textAlign: "center", letterSpacing: .5 }}>
              Certificate KSK-07-38431 printed at this kiosk
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop: 26, display: "flex", justifyContent: "flex-end" }}>
        <BigButton icon="arrow-right" disabled={phase !== "done"} onClick={onDone}>Get paid</BigButton>
      </div>
    </div>
  );
}
