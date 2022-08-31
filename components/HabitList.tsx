import { useQuery } from "react-query";
import { getHabits } from "../apis";
import { HabitResponse } from "../types";
import ListItem from "./ListItem";

interface Props {
  date: string;
}

export default function HabitList({ date }: Props) {
  const { data } = useQuery<HabitResponse[]>("habits", () => getHabits(date));

  return (
    <>
      {data ? (
        data.map((habit) => (
          <ListItem key={habit.id} habit={habit} date={date} />
        ))
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
