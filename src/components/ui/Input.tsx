import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const inputVariants = cva([""], {
  variants: {
    shape: {
      soft: "rounded-lg",
      round: "rounded-primary",
    },
  },

  defaultVariants: {
    shape: "soft",
  },
});

export function Input({
  shape,
  className,
  type,
  ...props
}: ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ shape }), className)}
      {...props}
    />
  );
}
