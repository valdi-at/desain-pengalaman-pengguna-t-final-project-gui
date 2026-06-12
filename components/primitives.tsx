/* ============================================================
   DAUR KIOSK PROTOTYPE — primitives.tsx
   Shared low-level presentational components.
   ============================================================ */
import { ReactNode, CSSProperties } from "react";
import { Icon } from "@/lib/icons";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export interface BigButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  icon?: string;
  disabled?: boolean;
  full?: boolean;
  style?: CSSProperties;
}

export function BigButton({ children, onClick, variant = "primary", icon, disabled, full, style }: BigButtonProps) {
  const base: CSSProperties = {
    fontFamily: "var(--font-mono)", fontSize: 17, fontWeight: 700, letterSpacing: 1.2,
    textTransform: "uppercase", display: "inline-flex", alignItems: "center",
    justifyContent: "center", gap: 12, minHeight: 70, padding: "0 34px",
    borderRadius: 9, border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color .13s ease, border-color .13s ease, color .13s ease",
    width: full ? "100%" : "auto", ...style,
  };
  const skins: Record<Variant, CSSProperties> = {
    primary:  { background: disabled ? "var(--bg-inset)" : "var(--accent)", color: disabled ? "var(--text-dim)" : "#fff" },
    secondary:{ background: "var(--accent-teal)", color: "#fff" },
    outline:  { background: "var(--bg-surface)", color: "var(--accent)", borderColor: "var(--border-mid)" },
    ghost:    { background: "transparent", color: "var(--text-muted)" },
    danger:   { background: "var(--bg-surface)", color: "var(--danger)", borderColor: "var(--border-mid)" },
  };
  return (
    <button style={{ ...base, ...skins[variant] }} onClick={disabled ? undefined : onClick}>
      {icon && <Icon name={icon} size={20} />}
      {children}
    </button>
  );
}

type BadgeTone = "accent" | "success" | "warning" | "neutral";

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: string;
}

export function Badge({ children, tone = "accent", icon }: BadgeProps) {
  const tones: Record<BadgeTone, CSSProperties> = {
    accent:  { background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--border-subtle)" },
    success: { background: "#e3efd5", color: "var(--success)", border: "1px solid #c5dba6" },
    warning: { background: "#f4e9d2", color: "var(--warning)", border: "1px solid #e3cfa0" },
    neutral: { background: "var(--bg-inset)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" },
  };
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: .6,
      textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 12px", borderRadius: 999, ...tones[tone],
    }}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

type CalloutTone = "default" | "success" | "warning";

export interface CalloutProps {
  icon?: string;
  children: ReactNode;
  tone?: CalloutTone;
}

export function Callout({ icon = "leaf", children, tone = "default" }: CalloutProps) {
  const bg = tone === "success" ? "#e3efd5" : tone === "warning" ? "#f4e9d2" : "var(--accent-light)";
  const bo = tone === "success" ? "1px solid #c5dba6" : tone === "warning" ? "1px solid #e3cfa0" : "1px solid var(--border-subtle)";
  const ic = tone === "success" ? "var(--success)" : tone === "warning" ? "var(--warning)" : "var(--accent)";
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 14,
      background: bg, border: bo, borderRadius: 8, padding: "15px 18px",
      fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.65, color: "var(--text-body)",
    }}>
      <Icon name={icon} size={18} color={ic} style={{ flex: "none", marginTop: 1 }} />
      <span>{children}</span>
    </div>
  );
}

export interface FieldProps {
  label: string;
  children: ReactNode;
  align?: CSSProperties["textAlign"];
}

export function Field({ label, children, align = "left" }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, textAlign: align }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--text-primary)", lineHeight: 1.2 }}>{children}</span>
    </div>
  );
}

export interface StepRailProps {
  steps: string[];
  current: number;
}

export function StepRail({ steps, current }: StepRailProps) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        return (
          <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ height: 3, borderRadius: 999, transition: "background .3s ease",
              background: done ? "var(--accent-mid)" : active ? "var(--accent)" : "var(--border-subtle)" }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase",
              transition: "color .3s ease",
              color: active ? "var(--accent)" : done ? "var(--text-muted)" : "var(--text-dim)",
              fontWeight: active ? 700 : 400,
            }}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

export interface ScreenHeadProps {
  tag: string;
  title: string;
  sub?: string;
}

export function ScreenHead({ tag, title, sub }: ScreenHeadProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 2.8,
        textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{tag}</div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 42, fontWeight: 400,
        letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0, lineHeight: 1.12 }}>{title}</h1>
      {sub && <p style={{ fontFamily: "var(--font-mono)", fontSize: 15, lineHeight: 1.65,
        color: "var(--text-muted)", marginTop: 12, maxWidth: "52ch" }}>{sub}</p>}
    </div>
  );
}

export interface CheckRowProps {
  label: string;
  detail: string;
  done: boolean;
}

export function CheckRow({ label, detail, done }: CheckRowProps) {
  return (
    <div className={done ? "check-pop" : ""} style={{
      display: "flex", alignItems: "center", gap: 16, padding: "12px 18px", borderRadius: 8,
      background: done ? "var(--accent-light)" : "var(--bg-inset)",
      border: `1px solid ${done ? "var(--border-subtle)" : "transparent"}`,
      opacity: done ? 1 : 0.32,
      transition: "background .25s ease, opacity .25s ease, border-color .25s ease",
    }}>
      <Icon name={done ? "circle-check-big" : "recycle"} size={19}
        color={done ? "var(--accent)" : "var(--text-dim)"} style={{ flex: "none" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: .3, marginTop: 3,
          color: done ? "var(--accent)" : "var(--text-muted)" }}>{detail}</div>
      </div>
    </div>
  );
}

export type ValRowType = "base" | "deduct" | "neutral" | "final";

export interface ValRowProps {
  label: string;
  detail?: string;
  amount: string;
  type?: ValRowType;
}

export function ValRow({ label, detail, amount, type }: ValRowProps) {
  const isFinal = type === "final";
  const isDeduct = type === "deduct";
  const isBase = type === "base";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: isFinal ? "18px 0 0" : "13px 0",
      borderBottom: !isFinal ? "1px solid var(--border-subtle)" : "none",
      borderTop: isFinal ? "2px solid var(--border-mid)" : "none",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 1.5,
          textTransform: "uppercase", color: isFinal ? "var(--text-muted)" : "var(--text-body)" }}>{label}</div>
        {detail && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-dim)",
          marginTop: 3, letterSpacing: .3 }}>{detail}</div>}
      </div>
      <div style={{
        fontFamily: isFinal ? "var(--font-serif)" : "var(--font-mono)",
        fontSize: isFinal ? 54 : 20,
        whiteSpace: "nowrap", flex: "none",
        letterSpacing: isFinal ? "-0.5px" : 0,
        color: isFinal ? "var(--accent)" : isDeduct ? "var(--warning)" : isBase ? "var(--text-primary)" : "var(--text-muted)",
      }}>{amount}</div>
    </div>
  );
}

export interface ImpactStatProps {
  value: string;
  unit: string;
  label: string;
  icon: string;
}

export function ImpactStat({ value, unit, label, icon }: ImpactStatProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
      padding: "20px 10px", flex: 1, textAlign: "center" }}>
      <Icon name={icon} size={26} color="var(--accent)" />
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--accent)" }}>{unit}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: .4, color: "var(--text-muted)", lineHeight: 1.5, whiteSpace: "pre-line" }}>{label}</div>
    </div>
  );
}

export interface JourneyStepProps {
  label: string;
  sub?: string;
  done?: boolean;
  active?: boolean;
  last?: boolean;
}

export function JourneyStep({ label, sub, done, active, last }: JourneyStepProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
        <div style={{
          width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center",
          background: done ? "var(--accent)" : active ? "var(--accent-light)" : "var(--bg-inset)",
          border: `2px solid ${done ? "var(--accent)" : active ? "var(--accent-mid)" : "var(--border-subtle)"}`,
          transition: "background .3s, border-color .3s",
        }}>
          {done && <Icon name="circle-check-big" size={13} color="#fff" />}
          {!done && active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />}
        </div>
        {!last && <div style={{ width: 2, height: 28, background: done ? "var(--accent-mid)" : "var(--border-subtle)", marginTop: 3, transition: "background .3s" }} />}
      </div>
      <div style={{ paddingTop: 3, paddingBottom: last ? 0 : 28 }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase",
          color: done || active ? "var(--text-primary)" : "var(--text-dim)",
          fontWeight: done || active ? 700 : 400,
        }}>{label}</div>
        {sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-muted)", marginTop: 2, letterSpacing: .3 }}>{sub}</div>}
      </div>
    </div>
  );
}

export interface QRPlaceholderProps {
  size?: number;
}

export function QRPlaceholder({ size = 112 }: QRPlaceholderProps) {
  const c = Math.floor(size / 14);
  const data: [number, number][] = [
    [0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[4,1],[0,2],[2,2],[4,2],[0,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4],
    [6,0],[8,0],[6,1],[7,1],[6,2],[8,2],[6,3],[7,3],[8,3],[0,6],[1,6],[3,6],[4,6],[6,6],[8,6],[1,7],[3,7],
    [5,7],[7,7],[0,8],[2,8],[4,8],[6,8],[1,9],[2,9],[4,9],[7,9],[8,9],[0,10],[3,10],[5,10],[6,10],[8,10],
    [0,12],[2,12],[3,12],[5,12],[7,12],[8,12],[1,13],[4,13],[6,13],[8,13],
  ];
  const finders: [number, number][] = [[0,0],[7,0],[0,7]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: 6, border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
      {/* Finder patterns */}
      {finders.map(([fx, fy]) => (
        <g key={`${fx}-${fy}`} transform={`translate(${fx*c},${fy*c})`}>
          <rect width={c*7} height={c*7} rx="3" fill="var(--text-primary)" />
          <rect x={c} y={c} width={c*5} height={c*5} rx="2" fill="var(--bg-surface)" />
          <rect x={c*2} y={c*2} width={c*3} height={c*3} rx="1" fill="var(--text-primary)" />
        </g>
      ))}
      {/* Data cells */}
      {data.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x*c + c*0.08} y={y*c + c*0.08}
          width={c*0.84} height={c*0.84} rx="1" fill="var(--text-primary)" />
      ))}
    </svg>
  );
}
