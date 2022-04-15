import { XIcon } from "@heroicons/react/outline";
import { Habit } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { deleteHabit, updateHabit } from "../apis";

interface Props {
  habit: Habit;
}

export default function ListItem({ habit }: Props) {
  const queryClient = useQueryClient();
  const { mutate: handleDelete } = useMutation(deleteHabit, {
    onMutate: async (itemId) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<Habit[]>("habits");
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

  const { mutate: handleUpdate } = useMutation(updateHabit, {
    onMutate: async (habit) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<Habit[]>("habits");
      if (previousValue) {
        queryClient.setQueryData(
          "habits",
          previousValue.map((prevHabit) => {
            if (prevHabit.id === habit.id) return habit;
            return prevHabit;
          })
        );
      }
      return { previousValue };
    },
    onError: (err, habit, context: any) => {
      queryClient.setQueryData("habits", context.previousValue);
    },
    onSettled: (habit) => {
      queryClient.invalidateQueries(["habits", habit.id]);
    },
  });

  return (
    <div className="flex items-center p-2 text-3xl group relative">
      <p className="w-[36px] text-center mr-2">{habit.text}</p>
      <input
        className="w-6 h-6 mr-2"
        type="checkbox"
        checked={habit.checked}
        onChange={() => handleUpdate({ ...habit, checked: !habit.checked })}
      />
      <div
        className="w-6 h-6 absolute left-[85px]"
        onClick={() => handleDelete(habit.id)}
      >
        <XIcon className="group-hover:block hidden hover:cursor-pointer dark:text-gray-100 hover:text-green-300" />
      </div>
    </div>
  );
}
