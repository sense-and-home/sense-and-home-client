import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const LevelIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  strokeWidth = 2.8,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 41 37"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M14.0004 16.1004V35.0004M14.0004 16.1004H4.75957C3.58346 16.1004 2.99599 16.1004 2.54678 16.3293C2.15164 16.5306 1.83061 16.8516 1.62928 17.2468C1.40039 17.696 1.40039 18.2845 1.40039 19.4606V35.0004H14.0004M14.0004 16.1004V4.7606C14.0004 3.58448 14.0004 2.99599 14.2293 2.54678C14.4306 2.15164 14.7516 1.83061 15.1468 1.62928C15.596 1.40039 16.1835 1.40039 17.3596 1.40039H23.2396C24.4157 1.40039 25.005 1.40039 25.4542 1.62928C25.8493 1.83061 26.1694 2.15164 26.3707 2.54678C26.5996 2.99599 26.6004 3.58449 26.6004 4.7606V9.80039M14.0004 35.0004H26.6004M26.6004 35.0004L39.2004 35.0006V13.1606C39.2004 11.9845 39.1996 11.396 38.9707 10.9468C38.7694 10.5516 38.4506 10.2306 38.0554 10.0293C37.6062 9.80039 37.0165 9.80039 35.8404 9.80039H26.6004M26.6004 35.0004V9.80039"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
