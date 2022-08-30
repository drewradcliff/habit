import moment from "moment";
import { useMutation, useQueryClient } from "react-query";
import { deleteRecord, newRecord } from "../apis";
import { HabitResponse } from "../types";
import { Checkbox } from "./Checkbox";
import DeleteHabit from "./DeleteItem";
import ListItemEmoji from "./ListItemEmoji";

interface Props {
  habit: HabitResponse;
  date: string;
}

export default function ListItem({ habit, date }: Props) {
  const queryClient = useQueryClient();

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
    onSettled: () => {
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
    onSettled: () => {
      queryClient.invalidateQueries("habits");
    },
  });

  return (
    <div
      key={habit.id}
      className="flex items-center p-2 text-3xl group relative"
    >
      <ListItemEmoji habit={habit} />
      <Checkbox
        checked={!!habit.records?.length}
        onChange={() => {
          if (!habit.records.length) {
            handleAddRecord({
              habitId: habit.id,
              date: moment(date).toDate(),
            });
          } else {
            handleDeleteRecord(habit.records[0].id);
          }
        }}
      />
      <DeleteHabit habit={habit} />
    </div>
  );
}
