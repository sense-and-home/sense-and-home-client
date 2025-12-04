import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const StarIcon: React.FC<IconProps> = ({
  className = "",
  size,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39 41"
      fill="currentColor"
      stroke="currentColor"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path d="M19.5 0L22.9471 16.8761L39 20.5L22.9471 24.1239L19.5 41L16.0529 24.1239L0 20.5L16.0529 16.8761L19.5 0Z" />
    </svg>
  );
};
