import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 select-none justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-teal-800 text-white hover:bg-teal-700",
        blue: "bg-teal-800 text-white hover:bg-teal-700",
        red: "bg-neutral-900 text-white hover:bg-neutral-700",
        black: "bg-neutral-900 text-white hover:bg-neutral-700",
        gray: "bg-neutral-700 text-white hover:bg-neutral-600",
        teal: "bg-teal-800 text-white hover:bg-teal-700",
        lightgray: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
        lightgraybg: "bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-100",
        outline: "bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-100",
        secondary: "text-neutral-900",
        ghost: "hover:bg-neutral-200",
        link: "text-teal-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        minor: "py-1 px-3 has-[>svg]:px-3",
        sm: "h-9 px-3.5 py-1.5 has-[>svg]:px-3",
        lg: "h-11 px-6 py-2.5 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as any)}
      />
    );
  }

  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
