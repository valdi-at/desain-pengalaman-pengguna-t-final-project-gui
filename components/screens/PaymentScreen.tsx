"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { BigButton, ScreenHead } from "@/components/primitives";

export interface PaymentScreenProps {
  amount?: string;
  onConfirm: () => void;
}

const METHODS = [
  { id: "ewallet", icon: "smartphone", label: "E-wallet",      sub: "GoPay · OVO · DANA · ShopeePay" },
  { id: "bank",    icon: "banknote",   label: "Bank transfer", sub: "Any bank · BI-FAST instant transfer" },
  { id: "cash",    icon: "coins",      label: "Cash voucher",  sub: "Redeem at partner counter within 30 days" },
];

export function PaymentScreen({ onConfirm, amount = "Rp 2.950.000" }: PaymentScreenProps) {
  const [method, setMethod] = useState("ewallet");
  return (
    <div className="screen-in">
      <ScreenHead
        tag="Step 7 · Payment"
        title="How would you like to be paid?"
        sub={`Choose a payout method for your ${amount}. E-wallet and bank transfers are processed instantly.`}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {METHODS.map(m => (
          <button key={m.id} onClick={() => setMethod(m.id)} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
            borderRadius: 10, cursor: "pointer", textAlign: "left",
            background: method === m.id ? "var(--accent-light)" : "var(--bg-surface)",
            border: `1px solid ${method === m.id ? "var(--accent-mid)" : "var(--border-subtle)"}`,
            transition: "border-color .13s ease, background .13s ease",
          }}>
            <Icon name={m.icon} size={28} color="var(--accent)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--text-primary)" }}>{m.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, letterSpacing: .5,
                color: "var(--text-muted)", marginTop: 4 }}>{m.sub}</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: "50%", flex: "none",
              border: `2px solid ${method === m.id ? "var(--accent)" : "var(--border-mid)"}`,
              display: "grid", placeItems: "center" }}>
              {method === m.id && <div style={{ width: 10, height: 10, borderRadius: "50%",
                background: "var(--accent)" }} />}
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
        <BigButton icon="banknote" onClick={onConfirm}>Send {amount}</BigButton>
      </div>
    </div>
  );
}
