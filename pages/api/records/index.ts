import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const session = await getSession({ req });

  if (session) {
    if (method === "GET") {
      const lastYear = moment().subtract(1, "year").startOf("week");
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
                gte: lastYear.format(),
                lt: moment().format(),
              },
            },
          },
        },
      });
      let habitCounts: { [date: string]: number } = {};
      for (let i = 0; i < habits.length; i++) {
        for (let j = 0; j < habits[i].records.length; j++) {
          let formatDate = moment(habits[i].records[j].date).format(
            "YYYY-MM-DD"
          );
          if (habitCounts[formatDate]) {
            habitCounts[formatDate]++;
          } else {
            habitCounts[formatDate] = 1;
          }
        }
      }

      let activity = [];
      const daysLastYear = moment().diff(lastYear, "days");
      for (let i = daysLastYear; i >= 0; i--) {
        let formatDate = moment().subtract(i, "days").format("YYYY-MM-DD");
        activity.push({
          date: formatDate,
          count: habitCounts[formatDate] ?? 0,
        });
      }

      res.status(200).json(activity);
    }
    if (method === "POST") {
      const { record } = body;
      const result = await prisma.record.create({
        data: {
          ...record,
        },
      });
      res.status(200).json(result);
    }
  }
}
