import { Habit } from "@prisma/client";
import axios from "axios";

export const getHabits = async () => {
  const res = await axios.get("/api/habits");
  return res.data;
};

export const newHabit = async (habit: Partial<Habit>) => {
  const res = await axios.post("/api/habits", habit);
  return res.data;
};
