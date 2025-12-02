import React from "react";
import { NavLink } from "react-router";

const isExternalLink = (href: string) =>
  /^([a-z][a-z0-9+.-]*:)/i.test(href) && !href.startsWith("/");

const isHashAnchor = (href: string) => href.startsWith("#");

const isInternalRoute = (href: string) =>
  href.startsWith("/") && !isExternalLink(href);

type SmartLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
};

export function SmartLink({
  to,
  children,
  className,
  activeClassName,
  onClick,
  ...rest
}: SmartLinkProps) {
  if (isExternalLink(to)) {
    return (
      <a
        href={to}
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (isHashAnchor(to)) {
    return (
      <a href={to} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (isInternalRoute(to)) {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `${className ?? ""} ${isActive && activeClassName ? activeClassName : ""}`.trim()
        }
        {...(rest as any)}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <a href={to} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
