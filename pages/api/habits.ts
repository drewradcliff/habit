import type { NextApiRequest, NextApiResponse } from "next";
import { Habit } from "@prisma/client";
import { prisma } from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Habit[] | Habit>
) {
  if (req.method == "POST") {
    const { text, checked } = req.body;
    const result = await prisma.habit.create({
      data: {
        text,
        checked,
      },
    });
    res.json(result);
  } else {
    const habits = await prisma.habit.findMany();
    res.status(200).json([...habits]);
  }
}
