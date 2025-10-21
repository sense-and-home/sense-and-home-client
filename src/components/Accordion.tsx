import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export type AccordionItem = {
  id: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
};

type Props = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
};

export function Accordion({
  items,
  allowMultiple = false,
  className = "",
}: Props) {
  const [openIds, setOpenIds] = useState<Array<string | number>>([]);
  const headersRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    headersRef.current = headersRef.current.slice(0, items.length);
  }, [items.length]);

  function isOpen(id: string | number) {
    return openIds.includes(id);
  }

  function toggle(id: string | number) {
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (allowMultiple) return [...prev, id];
      return [id];
    });
  }

  function onHeaderKeyDown(
    e: React.KeyboardEvent,
    idx: number,
    id: string | number,
  ) {
    const key = e.key;
    const max = items.length - 1;
    if (key === "ArrowDown") {
      e.preventDefault();
      headersRef.current[Math.min(max, idx + 1)]?.focus();
    } else if (key === "ArrowUp") {
      e.preventDefault();
      headersRef.current[Math.max(0, idx - 1)]?.focus();
    } else if (key === "Home") {
      e.preventDefault();
      headersRef.current[0]?.focus();
    } else if (key === "End") {
      e.preventDefault();
      headersRef.current[max]?.focus();
    } else if (key === "Enter" || key === " ") {
      e.preventDefault();
      toggle(id);
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => (
        <AccordionPanel
          key={item.id}
          id={item.id}
          count={idx}
          title={item.title}
          content={item.content}
          open={isOpen(item.id)}
          onToggle={() => toggle(item.id)}
          headerRef={(el) => (headersRef.current[idx] = el)}
          onHeaderKeyDown={(e) => onHeaderKeyDown(e, idx, item.id)}
        />
      ))}
    </div>
  );
}

function AccordionPanel({
  id,
  title,
  content,
  count,
  open,
  onToggle,
  headerRef,
  onHeaderKeyDown,
}: {
  id: string | number;
  title: React.ReactNode;
  count: number;
  content: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  headerRef: (el: HTMLButtonElement | null) => void;
  onHeaderKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | undefined>(
    open ? undefined : 0,
  );

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (open) {
      const h = el.scrollHeight;
      setHeight(h);
      const id = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(id);
    } else {
      const h = el.scrollHeight;
      flushSync(() => setHeight(h));
      requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
    }
  }, [open]);

  return (
    <div className="text-background bg-foreground rounded-secondary w-full border">
      <h3>
        <button
          ref={headerRef}
          aria-expanded={open}
          aria-controls={`panel-${id}`}
          id={`accordion-${id}`}
          onClick={onToggle}
          onKeyDown={onHeaderKeyDown}
          className={`focus-visible:ring-accent rounded-secondary flex w-full items-center justify-between gap-4 px-6 py-3 text-left hover:cursor-pointer focus:outline-none focus-visible:ring-2`}
        >
          <span className="text-lg font-semibold">
            <span className="mr-4">{count + 1}.</span>
            <span>{title}</span>
          </span>

          <svg
            className={`h-8 w-8 transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h3>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`accordion-${id}`}
        ref={contentRef}
        style={{
          height: height === undefined ? undefined : `${height}px`,
          overflow: "hidden",
          transition: "height 300ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="px-6 pb-6">{content}</div>
      </div>
    </div>
  );
}
