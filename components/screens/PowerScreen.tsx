import { Icon } from "@/lib/icons";
import { Badge, BigButton, ScreenHead } from "@/components/primitives";

export interface PowerScreenProps {
  onYes: () => void;
  onNo: () => void;
  onBack: () => void;
}

interface PowerCardProps {
  onClick: () => void;
  icon: string;
  iconColor: string;
  bg: string;
  border: string;
  title: string;
  sub: string;
  tag: string;
  tagTone: "accent" | "warning";
}

function Card({ onClick, icon, iconColor, bg, border, title, sub, tag, tagTone }: PowerCardProps) {
  return (
    <button onClick={onClick} style={{
      display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18,
      padding: "32px 30px", borderRadius: 12, cursor: "pointer", textAlign: "left",
      background: bg, border: `1.5px solid ${border}`, minHeight: 256,
      transition: "border-color .14s ease, background .14s ease",
    }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", display: "grid", placeItems: "center",
        background: "var(--bg-base)", border: `1.5px solid ${border}` }}>
        <Icon name={icon} size={38} color={iconColor} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "var(--text-primary)", lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: .4, lineHeight: 1.6,
          color: "var(--text-muted)", marginTop: 10 }}>{sub}</div>
      </div>
      <Badge tone={tagTone} icon={icon}>{tag}</Badge>
    </button>
  );
}

export function PowerScreen({ onYes, onNo, onBack }: PowerScreenProps) {
  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 2 · Power"
        title="Does your device turn on?"
        sub="This decides how we protect your data. If it won't power on, we can't erase it with software — so we physically destroy the storage chip instead."
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card
          onClick={onYes}
          icon="battery-charging" iconColor="var(--accent)"
          bg="var(--accent-light)" border="var(--accent-mid)"
          title="Yes, it powers on"
          sub="We'll scan the model and run full diagnostics, then wipe your data to NIST 800-88 standard."
          tag="Full diagnostics" tagTone="accent"
        />
        <Card
          onClick={onNo}
          icon="triangle-alert" iconColor="var(--warning)"
          bg="#f4e9d2" border="#e3cfa0"
          title="No, it won't turn on"
          sub="We'll value it for parts and recoverable materials, and physically destroy the storage chip."
          tag="Storage destroyed" tagTone="warning"
        />
      </div>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-start" }}>
        <BigButton variant="ghost" onClick={onBack}>Back</BigButton>
      </div>
    </div>
  );
}
