import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-sweep inline-flex items-center gap-2 select-none justify-center whitespace-nowrap rounded-none border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600 aria-invalid:border-destructive disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-teal-800 text-neutral-50 border-teal-800 hover:text-teal-800 [--sweep:#faf7f2]",
        blue: "bg-teal-800 text-neutral-50 border-teal-800 hover:text-teal-800 [--sweep:#faf7f2]",
        red: "bg-neutral-900 text-neutral-50 border-neutral-900 hover:text-neutral-900 [--sweep:#faf7f2]",
        black:
          "bg-neutral-900 text-neutral-50 border-neutral-900 hover:text-neutral-900 [--sweep:#faf7f2]",
        gray: "bg-neutral-700 text-neutral-50 border-neutral-700 hover:text-neutral-700 [--sweep:#faf7f2]",
        teal: "bg-teal-800 text-neutral-50 border-teal-800 hover:text-teal-800 [--sweep:#faf7f2]",
        lightgray:
          "bg-neutral-200 text-neutral-900 border-neutral-200 hover:text-neutral-50 [--sweep:#22301b]",
        lightgraybg:
          "bg-transparent text-neutral-900 border-neutral-900/70 hover:text-neutral-50 hover:border-teal-800 [--sweep:#22301b]",
        outline:
          "bg-transparent text-neutral-900 border-neutral-900/40 hover:text-neutral-50 hover:border-teal-800 [--sweep:#22301b]",
        secondary: "text-neutral-900",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-teal-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-5",
        minor: "py-2 px-4 has-[>svg]:px-3",
        sm: "h-10 px-5 py-2 has-[>svg]:px-4",
        lg: "h-12 px-8 py-3 has-[>svg]:px-6",
        icon: "size-10",
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
