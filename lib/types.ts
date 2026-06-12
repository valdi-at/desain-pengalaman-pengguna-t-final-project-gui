export type ScreenId =
  | "welcome"
  | "identify"
  | "power"
  | "scan"
  | "condition"
  | "valuation"
  | "security"
  | "payment"
  | "done";

export interface SessionContext {
  device?: string;
  condition?: string;
  offer?: string;
  power?: string;
  bricked?: boolean;
}
