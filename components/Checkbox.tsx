import { Root, Indicator } from "@radix-ui/react-checkbox";
import { Check } from "iconoir-react";
import { cva, cx } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const checkbox = cva(
  [
    "checkbox",
    "flex",
    "justify-center",
    "items-center",
    "transition",
    "duration-200",
  ],
  {
    variants: {
      intent: {
        primary: ["rounded-md", "text-black"],
      },
      size: {
        normal: ["w-6", "h-6", "text-lg"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "normal",
    },
  }
);

interface ElementProps {
  onChange?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  checked: boolean;
}

export interface CheckboxProps
  extends VariantProps<typeof checkbox>,
    ElementProps {}

export const Checkbox = ({
  intent,
  size,
  onChange,
  checked,
}: CheckboxProps) => {
  return (
    <Root
      checked={checked}
      onCheckedChange={onChange}
      className={cx(
        checkbox({ intent, size }),
        checked
          ? "bg-green-200 hover:bg-green-300"
          : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-900 dark:hover:bg-black"
      )}
    >
      <Indicator>
        <Check className="text-xs" />
      </Indicator>
    </Root>
  );
};
