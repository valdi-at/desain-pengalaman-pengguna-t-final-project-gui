import Image from "next/image";
import { BigButton } from "@/components/primitives";

export interface WelcomeScreenProps {
  onStart: () => void;
}

const STATS = [
  { k: "14.200", l: "Devices recycled" },
  { k: "Rp 2.1 M", l: "Avg payout" },
  { k: "8.4 t", l: "CO₂ avoided" },
];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%",
      justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <Image src="/logo-mark.svg" alt="Daur" width={80} height={80} />
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 72, fontWeight: 400,
        letterSpacing: "-1.5px", color: "var(--text-primary)", margin: "20px 0 6px", lineHeight: 1 }}>
        Daur
      </h1>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 3,
        textTransform: "uppercase", color: "var(--text-muted)", margin: 0 }}>
        Recycle your device · get paid instantly
      </p>
      <div style={{ display: "flex", width: "100%", maxWidth: 640, margin: "40px 0 34px",
        border: "1px solid var(--border-subtle)", borderRadius: 10, overflow: "hidden",
        background: "var(--bg-surface)" }}>
        {STATS.map((s, i) => (
          <div key={s.l} style={{ flex: 1, padding: "20px 12px", textAlign: "center",
            borderLeft: i ? "1px solid var(--border-subtle)" : "none" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "var(--accent)" }}>{s.k}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.2,
              textTransform: "uppercase", color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <BigButton icon="recycle" onClick={onStart} style={{ minHeight: 76, fontSize: 18, padding: "0 52px" }}>
        Start — recycle a device
      </BigButton>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2,
        color: "var(--text-dim)", marginTop: 26 }}>
        KSK-07 · KEBAYORAN BARU · OPEN 06:00–22:00
      </p>
    </div>
  );
}
