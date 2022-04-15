import { PlusIcon } from "@heroicons/react/outline";
import { Habit } from "@prisma/client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useMutation, useQueryClient } from "react-query";
import { newHabit } from "../apis";

export default function AddHabit() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(newHabit, {
    onMutate: async (habit) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<Habit[]>("habits");
      if (previousValue) {
        queryClient.setQueryData("habits", [...previousValue, habit]);
      }
      return { previousValue };
    },
    onError: (err, newHabit, context: any) => {
      queryClient.setQueryData("habits", context.previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries("habits");
    },
  });

  return (
    <button
      onClick={() => mutate({ text: "🤷‍♂️", checked: false })}
      className="hover:text-green-300"
    >
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
