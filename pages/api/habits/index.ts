import type { NextApiRequest, NextApiResponse } from "next";
import { Habit } from "@prisma/client";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Habit[] | Habit>
) {
  const {
    method,
    body,
    query: { start, end },
  } = req;
  const session = await getSession({ req });

  if (session) {
    switch (method) {
      case "GET":
        const habits = await prisma.habit.findMany({
          where: {
            AND: [
              {
                user: {
                  email: session?.user?.email,
                },
              },
              {
                createdAt: {
                  gte: new Date(start as string),
                  lt: new Date(end as string),
                },
              },
            ],
          },
        });
        res.status(200).json([...habits]);
        break;
      case "POST":
        const { text, checked } = body;
        const result = await prisma.habit.create({
          data: {
            text,
            checked,
            user: {
              connect: {
                email: session?.user?.email!,
              },
            },
          },
        });
        res.status(200).json(result);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Methdo ${method} Not Allowed`);
    }
  }
}
