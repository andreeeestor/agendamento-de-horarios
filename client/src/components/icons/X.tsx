import * as React from "react";

interface XProps {
  onClick: () => void;
}

export default function X(props: XProps) {
  return (
    <div className="transition-all" onClick={props.onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#FFF"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
