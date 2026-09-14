interface IconProps {
  /** SVG-path (d-attribut) från `content.ts` */
  path: string;
}

export default function Icon({ path }: IconProps) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
