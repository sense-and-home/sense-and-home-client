import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import React from "react";

const inputVariants = cva(
  ["w-full text-base", "bg-surface-2 text-surface-2-foreground"],
  {
    variants: {
      shape: {
        soft: "rounded-lg",
        round: "rounded-primary px-4 py-3 md:px-8 md:text-lg",
      },

      intent: {
        normal: "",
        error: "border-2 border-red-500",
      },
    },

    defaultVariants: {
      shape: "soft",
      intent: "normal",
    },
  },
);

function InputImpl({
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

export const Input = React.memo(InputImpl);
Input.displayName = "Input";
