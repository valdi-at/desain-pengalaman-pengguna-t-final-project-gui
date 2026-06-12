"use client";

/* ============================================================
   DAUR KIOSK PROTOTYPE — KioskApp
   State machine, landscape two-pane kiosk shell, auto-scaling stage.
   ============================================================ */
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/lib/icons";
import type { ScreenId, SessionContext } from "@/lib/types";
import {
  WelcomeScreen, IdentifyScreen, PowerScreen, ScanScreen, ConditionScreen,
  ValuationScreen, SecurityScreen, PaymentScreen, DoneScreen,
} from "@/components/screens";

const STEPS = ["Identify", "Power", "Scan", "Condition", "Value", "Security", "Pay"];

const RAIL_INDEX: Partial<Record<ScreenId, number>> = {
  identify:  0,
  power:     1,
  scan:      2,
  condition: 3,
  valuation: 4,
  security:  5,
  payment:   6,
};

const KIOSK_W = 1280;
const KIOSK_H = 800;

/* ---- Vertical step rail (left sidebar) ---- */
function VStepRail({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {STEPS.map((s, i) => {
        const done = i < current, active = i === current, last = i === STEPS.length - 1;
        return (
          <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "grid", placeItems: "center",
                fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                background: done ? "var(--accent)" : active ? "var(--accent-light)" : "transparent",
                color: done ? "#fff" : active ? "var(--accent)" : "var(--text-dim)",
                border: `2px solid ${done ? "var(--accent)" : active ? "var(--accent-mid)" : "var(--border-subtle)"}`,
                transition: "background .3s, border-color .3s, color .3s",
              }}>
                {done ? <Icon name="circle-check-big" size={14} color="#fff" /> : i + 1}
              </div>
              {!last && <div style={{ width: 2, height: 26,
                background: done ? "var(--accent-mid)" : "var(--border-subtle)",
                marginTop: 4, transition: "background .3s" }} />}
            </div>
            <div style={{ paddingTop: 5, paddingBottom: last ? 0 : 22 }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 1.6, textTransform: "uppercase",
                color: active ? "var(--accent)" : done ? "var(--text-body)" : "var(--text-dim)",
                fontWeight: active ? 700 : 400, transition: "color .3s",
              }}>{s}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Session context card (left sidebar) ---- */
function SessionPanel({ ctx }: { ctx: SessionContext }) {
  const rows = [
    { label: "Device",    value: ctx.device },
    { label: "Condition", value: ctx.condition },
    { label: "Offer",     value: ctx.offer },
  ];
  return (
    <div style={{
      background: "var(--bg-surface)", border: "1px solid var(--border-subtle)",
      borderRadius: 10, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: 2,
        textTransform: "uppercase", color: "var(--text-muted)" }}>This session</div>
      {rows.map(r => (
        <div key={r.label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.5,
            textTransform: "uppercase", color: "var(--text-dim)" }}>{r.label}</span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 19,
            color: r.value ? (r.label === "Offer" ? "var(--accent)" : "var(--text-primary)") : "var(--text-dim)" }}>
            {r.value || "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---- Landscape two-pane kiosk shell ---- */
type KioskMode = "flow" | "full";

function KioskShell({ stepIndex, mode, ctx, children }: {
  stepIndex: number; mode: KioskMode; ctx: SessionContext; children: ReactNode;
}) {
  return (
    <div style={{
      width: KIOSK_W, height: KIOSK_H,
      background: "var(--bg-base)",
      borderRadius: 24,
      border: "1px solid var(--border-subtle)",
      overflow: "hidden",
      display: "flex",
      position: "relative",
    }}>
      {mode === "flow" && (
        <aside style={{
          width: 360, flex: "none",
          background: "var(--bg-raised)",
          borderRight: "1px solid var(--border-subtle)",
          padding: "34px 34px 30px",
          display: "flex", flexDirection: "column",
        }}>
          <Image src="/logo.svg" alt="Daur" width={130} height={34} style={{ alignSelf: "flex-start", width: "auto" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14,
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "var(--text-muted)" }}>
            <Icon name="map-pin" size={14} color="var(--accent)" />
            KSK-07 · KEBAYORAN BARU
          </div>

          <div style={{ marginTop: 40, flex: 1 }}>
            <VStepRail current={stepIndex} />
          </div>

          <SessionPanel ctx={ctx} />
        </aside>
      )}

      {/* Content pane */}
      <main style={{
        flex: 1, minWidth: 0,
        padding: mode === "flow" ? "48px 56px" : "0",
        overflowY: "auto",
        display: "flex", flexDirection: "column",
      }}>
        {children}
      </main>
    </div>
  );
}

/* ---- Auto-scaling stage (letterboxes kiosk on any viewport) ---- */
function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const pad = 24;
      const sw = (window.innerWidth  - pad) / KIOSK_W;
      const sh = (window.innerHeight - pad) / KIOSK_H;
      setScale(Math.min(sw, sh, 1.6));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  const stageStyle: CSSProperties = {
    position: "absolute", top: "50%", left: "50%",
    width: KIOSK_W, height: KIOSK_H,
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: "center center",
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "#141d10", overflow: "hidden" }}>
      <div style={stageStyle}>
        {children}
      </div>
    </div>
  );
}

const SCREEN_KEY = "daur-screen";
const CTX_KEY = "daur-ctx";

/* ---- Main state machine ---- */
export function KioskApp() {
  const [screen, setScreen] = useState<ScreenId>("welcome");
  const [ctx, setCtx] = useState<SessionContext>({});

  // Hydrate from localStorage on mount (kiosk session persists across refresh).
  // One-time sync from browser storage, which is unavailable during SSR.
  useEffect(() => {
    const storedScreen = localStorage.getItem(SCREEN_KEY) as ScreenId | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedScreen) setScreen(storedScreen);
    try {
      const storedCtx = JSON.parse(localStorage.getItem(CTX_KEY) || "{}");
      setCtx(storedCtx);
    } catch {
      setCtx({});
    }
  }, []);

  useEffect(() => { localStorage.setItem(SCREEN_KEY, screen); }, [screen]);
  useEffect(() => { localStorage.setItem(CTX_KEY, JSON.stringify(ctx)); }, [ctx]);

  const go = (s: ScreenId) => setScreen(s);
  const patch = (p: Partial<SessionContext>) => setCtx(c => ({ ...c, ...p }));
  const reset = () => { setCtx({}); go("welcome"); };

  const mode: KioskMode = (screen === "welcome" || screen === "done") ? "full" : "flow";
  const stepIndex = RAIL_INDEX[screen] ?? 0;
  const bricked = !!ctx.bricked;
  const payAmount = bricked ? "Rp 460.000" : "Rp 2.950.000";

  let body: ReactNode;
  switch (screen) {
    case "welcome":
      body = <WelcomeScreen onStart={() => go("identify")} />;
      break;
    case "identify":
      body = <IdentifyScreen onPick={() => go("power")} />;
      break;
    case "power":
      body = <PowerScreen
        onYes={() => { patch({ bricked: false, power: "Powers on" }); go("scan"); }}
        onNo={() => { patch({ bricked: true, power: "Won't power on" }); go("scan"); }}
        onBack={() => go("identify")}
      />;
      break;
    case "scan":
      body = <ScanScreen
        bricked={bricked}
        onConfirm={() => {
          patch({ device: bricked ? "Galaxy-class · won't power on" : "Galaxy S23 · 128GB" });
          go("condition");
        }}
        onWrong={() => go("identify")}
        onRecheck={() => go("power")}
      />;
      break;
    case "condition":
      body = <ConditionScreen bricked={bricked}
        onNext={() => {
          if (bricked) patch({ condition: "Non-functional", offer: "Rp 460.000" });
          else patch({ condition: "Good", offer: "Rp 2.950.000" });
          go("valuation");
        }} />;
      break;
    case "valuation":
      body = <ValuationScreen bricked={bricked}
        onAccept={() => go("security")}
        onDecline={reset}
      />;
      break;
    case "security":
      body = <SecurityScreen bricked={bricked} onDone={() => go("payment")} />;
      break;
    case "payment":
      body = <PaymentScreen amount={payAmount} onConfirm={() => go("done")} />;
      break;
    case "done":
      body = <DoneScreen bricked={bricked} onRestart={reset} />;
      break;
    default:
      body = null;
  }

  return (
    <Stage>
      <KioskShell stepIndex={stepIndex} mode={mode} ctx={ctx}>
        {body}
      </KioskShell>
    </Stage>
  );
}
