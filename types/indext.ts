import { Habit, Record } from "@prisma/client";

export interface HabitResponse extends Habit {
  records: Record[];
}
