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

export const deleteHabit = async (id: number) => {
  const res = await axios.delete(`/api/habits/${id}`);
  return res.data;
};

export const updateHabit = async (habit: Habit) => {
  const res = await axios.patch(`/api/habits/${habit.id}`, { habit });
  return res.data;
};
