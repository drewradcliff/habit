import * as RadixTooltip from "@radix-ui/react-tooltip";

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
}

export default function Tooltip({ children, content }: Props) {
  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Content
          sideOffset={20}
          className="bg-black text-gray-100 py-2 px-3 rounded-sm"
        >
          {content}
          <RadixTooltip.Arrow />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
