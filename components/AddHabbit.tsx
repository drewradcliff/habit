import { PlusIcon } from "@heroicons/react/outline";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function AddHabit() {
  return (
    <button className="hover:text-green-300">
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <PlusIcon className="w-6 h-6 m-4" />
          </Tooltip.Trigger>
          <Tooltip.Content
            sideOffset={20}
            className="bg-black text-gray-100 py-2 px-3 rounded-sm"
          >
            Add new habit
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </button>
  );
}
