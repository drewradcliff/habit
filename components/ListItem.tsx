import { XIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "react-query";
import { deleteHabit, deleteRecord, newRecord } from "../apis";
import { HabitResponse } from "../types/indext";
import { Checkbox } from "./Checkbox";

interface Props {
  habit: HabitResponse;
}

export default function ListItem({ habit }: Props) {
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

  const { mutate: handleAddRecord } = useMutation(newRecord, {
    onMutate: async (record) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<HabitResponse[]>("habits");
      if (previousValue) {
        queryClient.setQueryData(
          "habits",
          previousValue.map((prevHabit) => {
            if (prevHabit.id === habit.id) {
              return { ...prevHabit, records: [...prevHabit.records, record] };
            }
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
      queryClient.invalidateQueries("habits");
    },
  });

  const { mutate: handleDeleteRecord } = useMutation(deleteRecord, {
    onMutate: async (id) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<HabitResponse[]>("habits");
      if (previousValue) {
        queryClient.setQueryData(
          "habits",
          previousValue.map((prevHabit) => {
            if (prevHabit.id === habit.id)
              return {
                ...prevHabit,
                records: prevHabit.records.filter((r) => r.id !== id),
              };
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
      queryClient.invalidateQueries("habits");
    },
  });

  return (
    <div
      key={habit.id}
      className="flex items-center p-2 text-3xl group relative"
    >
      <label className="w-[36px] text-center mr-2">{habit.text}</label>
      <Checkbox
        checked={!!habit.records.length}
        onChange={() => {
          if (!habit.records.length) {
            handleAddRecord({
              habitId: habit.id,
              date: new Date(),
            });
          } else {
            handleDeleteRecord(habit.records[0].id);
          }
        }}
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
