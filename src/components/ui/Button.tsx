import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const buttonVariants = cva(["py-2 px-12 font-bold hover:cursor-pointer"], {
  variants: {
    shape: {
      soft: "rounded-lg",
      round: "rounded-[50px]",
    },
  },

  defaultVariants: {
    shape: "soft",
  },
});

export function Button({
  shape,
  children,
  className,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ shape }), className)} {...props}>
      {children}
    </button>
  );
}
