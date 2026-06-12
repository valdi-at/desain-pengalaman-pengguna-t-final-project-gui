/* ============================================================
   DAUR icon set — inline Lucide paths (2px stroke, round caps).
   Usage: <Icon name="leaf" size={18} color="var(--accent)" />
   ============================================================ */

export const ICON_PATHS: Record<string, string> = {
  "arrow-right": `<path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path>`,
  banknote: `<rect width="20" height="12" x="2" y="6" rx="2"></rect> <circle cx="12" cy="12" r="2"></circle> <path d="M6 12h.01M18 12h.01"></path>`,
  "battery-charging": `<path d="m11 7-3 5h4l-3 5"></path> <path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935"></path> <path d="M22 14v-4"></path> <path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936"></path>`,
  "chevron-right": `<path d="m9 18 6-6-6-6"></path>`,
  "circle-check-big": `<path d="M21.801 10A10 10 0 1 1 17 3.335"></path> <path d="m9 11 3 3L22 4"></path>`,
  "circle-x": `<circle cx="12" cy="12" r="10"></circle> <path d="m15 9-6 6"></path> <path d="m9 9 6 6"></path>`,
  coins: `<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48"></path> <path d="M15 6h1v4"></path> <path d="m6.134 14.768.866-.5 2 3.464"></path> <circle cx="16" cy="8" r="6"></circle>`,
  cpu: `<path d="M12 20v2"></path> <path d="M12 2v2"></path> <path d="M17 20v2"></path> <path d="M17 2v2"></path> <path d="M2 12h2"></path> <path d="M2 17h2"></path> <path d="M2 7h2"></path> <path d="M20 12h2"></path> <path d="M20 17h2"></path> <path d="M20 7h2"></path> <path d="M7 20v2"></path> <path d="M7 2v2"></path> <rect x="4" y="4" width="16" height="16" rx="2"></rect> <rect x="8" y="8" width="8" height="8" rx="1"></rect>`,
  "hard-drive": `<path d="M10 16h.01"></path> <path d="M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path> <path d="M21.946 12.013H2.054"></path> <path d="M6 16h.01"></path>`,
  info: `<circle cx="12" cy="12" r="10"></circle> <path d="M12 16v-4"></path> <path d="M12 8h.01"></path>`,
  leaf: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path> <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>`,
  lock: `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>`,
  "map-pin": `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path> <circle cx="12" cy="10" r="3"></circle>`,
  moon: `<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>`,
  "qr-code": `<rect width="5" height="5" x="3" y="3" rx="1"></rect> <rect width="5" height="5" x="16" y="3" rx="1"></rect> <rect width="5" height="5" x="3" y="16" rx="1"></rect> <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path> <path d="M21 21v.01"></path> <path d="M12 7v3a2 2 0 0 1-2 2H7"></path> <path d="M3 12h.01"></path> <path d="M12 3h.01"></path> <path d="M12 16v.01"></path> <path d="M16 12h1"></path> <path d="M21 12v.01"></path> <path d="M12 21v-1"></path>`,
  recycle: `<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path> <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path> <path d="m14 16-3 3 3 3"></path> <path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path> <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path> <path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path>`,
  scale: `<path d="M12 3v18"></path> <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path> <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path> <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path> <path d="M7 21h10"></path>`,
  "shield-check": `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path>`,
  smartphone: `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect> <path d="M12 18h.01"></path>`,
  sprout: `<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"></path> <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"></path> <path d="M5 21h14"></path>`,
  sun: `<circle cx="12" cy="12" r="4"></circle> <path d="M12 2v2"></path> <path d="M12 20v2"></path> <path d="m4.93 4.93 1.41 1.41"></path> <path d="m17.66 17.66 1.41 1.41"></path> <path d="M2 12h2"></path> <path d="M20 12h2"></path> <path d="m6.34 17.66-1.41 1.41"></path> <path d="m19.07 4.93-1.41 1.41"></path>`,
  "trending-down": `<path d="M16 17h6v-6"></path> <path d="m22 17-8.5-8.5-5 5L2 7"></path>`,
  "triangle-alert": `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path> <path d="M12 9v4"></path> <path d="M12 17h.01"></path>`,
  weight: `<circle cx="12" cy="5" r="3"></circle> <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"></path>`,
};

export type IconName = keyof typeof ICON_PATHS;

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Icon({ name, size = 22, color, style, className }: IconProps) {
  const inner = ICON_PATHS[name] || "";
  return (
    <span
      className={className}
      style={{ display: "inline-flex", lineHeight: 0, color, ...style }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: inner }}
      />
    </span>
  );
}
