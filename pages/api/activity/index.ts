import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log("test");
  const session = await getSession({ req });

  if (session) {
    if (method === "GET") {
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
                gte: moment().subtract(1, "year").startOf("week").format(),
                lt: moment().format(),
              },
            },
            {
              checked: true,
            },
          ],
        },
      });

      let habitCounts: { [date: string]: number } = {};
      for (let i = 0; i < habits.length; i++) {
        let formatDate = moment(habits[i].createdAt).format("YYYY-MM-DD");
        if (habitCounts[formatDate]) {
          habitCounts[formatDate]++;
        } else {
          habitCounts[formatDate] = 1;
        }
      }

      let activity = [];
      for (let i = 364; i >= 0; i--) {
        let formatDate = moment().subtract(i, "days").format("YYYY-MM-DD");
        activity.push({
          date: formatDate,
          count: habitCounts[formatDate] ?? 0,
        });
      }
      res.status(200).json(activity);
    }
  }
}
