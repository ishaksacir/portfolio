export interface ContactChannel {
  icon: string;
  label: string;
  href: string;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  { icon: "✉", label: "HELLO@ISHAK.DEV", href: "mailto:hello@ishak.dev" },
  { icon: "✳", label: "ISHAK.DEV", href: "#" },
  { icon: "⌖", label: "SARAJEVO, BOSNIA · CET", href: "" },
  { icon: "in", label: "LINKEDIN.COM/IN/ISHAK", href: "https://linkedin.com" },
];

export const CONTACT_NEED_OPTIONS = ["WEBSITE", "WEB APP", "BRANDING", "OTHER"];

export interface ContactStat {
  label: string;
  value: string;
  copy: string;
}

export const CONTACT_STATS: ContactStat[] = [
  {
    label: "RESPONSE TIME",
    value: "≤2 DAYS",
    copy: "Usually the same evening.",
  },
  {
    label: "FIRST CALL",
    value: "30 MIN",
    copy: "Free, no deck, just questions.",
  },
  { label: "WORKING WITH", value: "2 CLIENTS", copy: "At a time, never more." },
];
