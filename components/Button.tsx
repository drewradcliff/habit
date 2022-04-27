import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "bg-gray-300",
        "rounded-lg",
        "hover:text-green-300",
        "hover:bg-gray-800",
        "transition",
        "duration-200",
      ],
    },
    size: {
      normal: ["px-6", "py-2"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "normal",
  },
});

interface ElementProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export interface ButtonProps
  extends VariantProps<typeof button>,
    ElementProps {}

export const Button = ({
  intent,
  size,
  children,
  leftIcon,
  ...props
}: ButtonProps) => (
  <button className={button({ intent, size })} {...props}>
    <div className="flex">
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </div>
  </button>
);
