import { Habit, Record } from "@prisma/client";
import axios from "axios";

export const getHabits = async () => {
  const res = await axios.get(`/api/habits`);
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

export const getRecords = async () => {
  const res = await axios.get(`/api/records`);
  return res.data;
};

export const newRecord = async (record: Partial<Record>) => {
  const res = await axios.post(`/api/records`, {
    record,
  });
  return res.data;
};

export const deleteRecord = async (id: number) => {
  const res = await axios.delete(`/api/records/${id}`);
  return res.data;
};
