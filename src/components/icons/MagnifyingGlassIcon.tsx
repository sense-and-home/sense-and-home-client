import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const MagnifyingGlassIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  strokeWidth = 2.52,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 37 37"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M23.9398 23.9398L35.2798 35.2798M14.4898 27.7198C7.18304 27.7198 1.25977 21.7965 1.25977 14.4898C1.25977 7.18304 7.18304 1.25977 14.4898 1.25977C21.7965 1.25977 27.7198 7.18304 27.7198 14.4898C27.7198 21.7965 21.7965 27.7198 14.4898 27.7198Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
