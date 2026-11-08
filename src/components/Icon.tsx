import type { SVGProps } from "react";

const paths: Record<string, string> = {
  check: "M5 12.5l4.2 4.2L19 7",
  arrow: "M5 12h14M13 6l6 6-6 6",
  phone: "M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 005.3 5.3l1.4-2.2L19 14.5V18a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z",
  chat: "M4 5h16v11H9l-5 4V5z",
  doc: "M7 3h7l5 5v13H7V3zm7 0v5h5M10 13h6M10 17h6",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3zm-3.5 9l2.5 2.5 4.5-5",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  users: "M8.5 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6M16 4.5a3.5 3.5 0 010 6.5M18 14c2.4.6 4 2.8 4 6",
  camera: "M4 8h3l2-3h6l2 3h3v11H4V8zm8 9a4 4 0 100-8 4 4 0 000 8z",
  hammer: "M14 4l6 6-2.5 2.5-6-6L14 4zM11.5 6.5L3 15l3 3 8.5-8.5",
  home: "M3 11l9-7 9 7v9h-6v-6H9v6H3v-9z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3.5 2",
  info: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-11v6m0-9h.01",
  upload: "M12 16V4m0 0L7 9m5-5l5 5M4 16v4h16v-4",
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
