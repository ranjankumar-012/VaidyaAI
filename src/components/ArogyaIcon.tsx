import type { SVGProps } from "react";

export function ArogyaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Medical cross shape */}
      <rect x="9" y="2" width="6" height="20" rx="2" fill="currentColor" opacity="0.9" stroke="none"/>
      <rect x="2" y="9" width="20" height="6" rx="2" fill="currentColor" opacity="0.9" stroke="none"/>
    </svg>
  );
}