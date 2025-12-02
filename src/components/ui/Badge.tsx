import { cn } from "@/utils";
import { stringToColor } from "@/utils/hashColor";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const badgeVariants = cva(["rounded-lg px-2 py-1"], {
  variants: {
    tone: {
      light: "",
      dark: "",
    },
    color: {
      default: "",
      inverted: "invert",
    },
  },
  defaultVariants: {
    tone: "light",
    color: "default",
  },
});

interface BadgeProps {
  text: string;
  tone?: "light" | "dark";
}

export function Badge({
  color,
  text,
  tone,
  className,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof badgeVariants> & BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ color, tone }), className)}
      {...props}
      style={{
        backgroundColor: stringToColor(text, tone),
      }}
    >
      {text}
    </div>
  );
}
