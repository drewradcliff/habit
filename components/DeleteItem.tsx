import { XIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "react-query";
import { deleteHabit } from "../apis";
import { HabitResponse } from "../types/indext";
import AlertDialog from "./AlertDialog";

export default function DeleteHabit({ habit }: { habit: HabitResponse }) {
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation(deleteHabit, {
    onMutate: async (itemId) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<HabitResponse[]>("habits");
      if (previousValue) {
        queryClient.setQueryData(
          "habits",
          previousValue.filter((item) => item.id !== itemId)
        );
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
    <AlertDialog
      onSubmit={() => handleDelete(habit.id)}
      description="This will delete the habit and all of its records."
      trigger={
        <button className="w-6 h-6 absolute left-[85px]">
          <XIcon className="group-hover:block hidden hover:cursor-pointer dark:text-gray-100 hover:text-green-300" />
        </button>
      }
    />
  );
}
