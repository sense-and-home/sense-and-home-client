import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const ClockIcon: React.FC<IconProps> = ({
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
      d="M18.2698 8.81977V18.2698H27.7198M18.2698 35.2798C8.8754 35.2798 1.25977 27.6641 1.25977 18.2698C1.25977 8.8754 8.8754 1.25977 18.2698 1.25977C27.6641 1.25977 35.2798 8.8754 35.2798 18.2698C35.2798 27.6641 27.6641 35.2798 18.2698 35.2798Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
