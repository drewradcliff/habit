import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";
import moment from "moment";
import { HabitResponse } from "../../../types/indext";
import { Habit } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HabitResponse[] | HabitResponse>
) {
  const { method, body } = req;
  const session = await getSession({ req });

  if (session) {
    switch (method) {
      case "GET":
        const habits = await prisma.habit.findMany({
          where: {
            user: {
              email: session?.user?.email,
            },
          },
          include: {
            records: {
              where: {
                date: {
                  gte: moment().startOf("day").toDate(),
                  lt: moment().endOf("day").toDate(),
                },
              },
            },
          },
        });
        res.status(200).json([...habits]);
        break;
      case "POST":
        const { text } = body;
        const result = await prisma.habit.create({
          data: {
            text,
            user: {
              connect: {
                email: session?.user?.email!,
              },
            },
          },
        });
        res.status(200).json({ ...result, records: [] });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
