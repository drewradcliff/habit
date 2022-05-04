import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import moment from "moment";
import { prisma } from "../../../db";

// GET /api/habits/month
// Required fields in query: start
// Required fields in query: end
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { start, end },
  } = req;
  const session = await getSession({ req });

  async function getGroupHabits() {
    return await prisma.habit.groupBy({
      by: ["text"],
      where: {
        AND: [
          {
            user: {
              email: session?.user?.email,
            },
          },
          {
            createdAt: {
              gte: moment(start).format(),
              lt: moment(end).format(),
            },
          },
        ],
      },
    });
  }

  async function getHabits(habit) {
    return await prisma.habit.findMany({
      where: {
        AND: [
          {
            user: {
              email: session?.user?.email,
            },
          },
          {
            createdAt: {
              gte: moment(start).format(),
              lt: moment(end).format(),
            },
          },
          {
            text: habit.text,
          },
        ],
      },
    });
  }

  if (session) {
    if (method === "GET") {
      const groupHabits = await getGroupHabits();

      groupHabits.map(async (habit) => {
        for (let i = 0; i < moment().daysInMonth(); i++) {}
      });

      // const habits = await Promise.all(
      //   uniqueHabits.map(async (habit) => {

      //     return { [habit.text]: habits };
      //   })
      // );

      res.status(200).json(habits);
    }
  }
}
