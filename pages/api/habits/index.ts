import type { NextApiRequest, NextApiResponse } from "next";
import { Habit } from "@prisma/client";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Habit[] | Habit>
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      const habits = await prisma.habit.findMany();
      res.status(200).json([...habits]);
      break;
    case "POST":
      const { text, checked } = body;
      const result = await prisma.habit.create({
        data: {
          text,
          checked,
        },
      });
      res.status(200).json(result);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Methdo ${method} Not Allowed`);
  }
}
