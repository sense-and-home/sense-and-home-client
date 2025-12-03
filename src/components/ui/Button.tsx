import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const buttonVariants = cva(["py-2 px-12 font-bold hover:cursor-pointer"], {
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

interface ButtonProps {
  asChild?: boolean;
}

export function Button({
  shape,
  children,
  className,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ shape }), className)} {...props}>
      {children}
    </Comp>
  );
}
