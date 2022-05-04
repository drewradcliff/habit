import { Habit } from "@prisma/client";
import axios from "axios";

export const getHabits = async (start: Date, end: Date) => {
  const res = await axios.get(`/api/habits?start=${start}&end=${end}`);
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

export const getYearHabits = async () => {
  const res = await axios.get("/api/habits/year");
  return res.data;
};

export const getMonthHabits = async (start: Date, end: Date) => {
  const res = await axios.get(`/api/habits/month?start=${start}&end=${end}`);
  return res.data;
};
