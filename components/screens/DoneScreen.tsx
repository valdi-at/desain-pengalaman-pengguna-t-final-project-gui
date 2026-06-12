import { Icon } from "@/lib/icons";
import { Badge, BigButton, Callout, ImpactStat, JourneyStep, QRPlaceholder } from "@/components/primitives";

export interface DoneScreenProps {
  bricked: boolean;
  onRestart: () => void;
}

export function DoneScreen({ onRestart, bricked }: DoneScreenProps) {
  const amount = bricked ? "Rp 460.000" : "Rp 2.950.000";
  const ref = bricked ? "KSK-07-38431" : "KSK-07-38429";
  return (
    <div className="screen-in" style={{ display: "flex", flexDirection: "column",
      height: "100%", padding: "48px 56px", boxSizing: "border-box" }}>
      {/* Success banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, flex: "none",
        paddingBottom: 26, borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", flex: "none",
          background: "var(--accent-light)", border: "2px solid var(--accent-mid)",
          display: "grid", placeItems: "center" }}>
          <Icon name="circle-check-big" size={34} color="var(--accent)" />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 52, fontWeight: 400,
            letterSpacing: "-0.5px", color: "var(--text-primary)", margin: 0, lineHeight: 1 }}>
            {amount} sent
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 1,
            color: "var(--text-muted)", margin: "10px 0 0" }}>
            To your GoPay · ref {ref} · Jun 11, 2026
          </p>
        </div>
        <Badge tone="success" icon="circle-check-big">Payout complete</Badge>
      </div>

      {/* Two-column body */}
      <div style={{ flex: 1, minHeight: 0, display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: 34, paddingTop: 28 }}>

        {/* Left — environmental impact */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2,
            textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
            Your environmental impact
          </div>
          <div style={{ display: "flex", background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)", borderRadius: 10, overflow: "hidden" }}>
            {bricked ? (
              <>
                <ImpactStat value="4.1" unit="kg CO₂" label={"Avoided vs.\nlandfill"} icon="trending-down" />
                <div style={{ width: 1, background: "var(--border-subtle)", alignSelf: "stretch" }} />
                <ImpactStat value="0.19" unit="kg e-waste" label={"Diverted from\nlandfill"} icon="recycle" />
                <div style={{ width: 1, background: "var(--border-subtle)", alignSelf: "stretch" }} />
                <ImpactStat value="5 g" unit="metals" label={"Copper & gold\nrecovered"} icon="coins" />
              </>
            ) : (
              <>
                <ImpactStat value="7.2" unit="kg CO₂" label={"Avoided vs.\nlandfill"} icon="trending-down" />
                <div style={{ width: 1, background: "var(--border-subtle)", alignSelf: "stretch" }} />
                <ImpactStat value="0.18" unit="kg e-waste" label={"Diverted from\nlandfill"} icon="recycle" />
                <div style={{ width: 1, background: "var(--border-subtle)", alignSelf: "stretch" }} />
                <ImpactStat value="3 g" unit="metals" label={"Copper & gold\nrecovered"} icon="coins" />
              </>
            )}
          </div>
          <div style={{ marginTop: 18 }}>
            <Callout icon="leaf" tone="success">
              {bricked
                ? <>Even a dead phone is full of value — its metals re-enter the supply chain instead of leaching into a landfill. It joins <strong style={{ color: "var(--text-primary)" }}>14.200+</strong> devices recovered at Daur kiosks.</>
                : <>That&apos;s like taking a petrol car off the road for <strong style={{ color: "var(--text-primary)" }}>29 km</strong>. Your device joins <strong style={{ color: "var(--text-primary)" }}>14.200+</strong> recycled at Daur kiosks.</>}
            </Callout>
          </div>
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <BigButton variant="outline" icon="recycle" onClick={onRestart} full>Recycle another device</BigButton>
          </div>
        </div>

        {/* Right — device journey */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2,
            textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
            Track your device
          </div>
          <div style={{ display: "flex", gap: 26, background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)", borderRadius: 10, padding: "24px 24px", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, flex: "none" }}>
              <QRPlaceholder size={130} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1.2,
                textTransform: "uppercase", color: "var(--text-muted)" }}>Scan to track</div>
            </div>
            <div style={{ flex: 1, alignSelf: "center" }}>
              <JourneyStep label="Collected" sub="KSK-07 · Jun 11, 2026" done={true} />
              {bricked
                ? <JourneyStep label="Storage destroyed" sub={`Chip shredded · cert ${ref}`} done={true} />
                : <JourneyStep label="Data wiped" sub={`NIST 800-88 · cert ${ref}`} done={true} />}
              <JourneyStep label={bricked ? "Material recovery" : "Refurbishment"}
                sub={bricked ? "Parts & metals reclaimed" : "Assessment scheduled"} active={true} />
              <JourneyStep label="Resold or recovered" last={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
