import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    body,
    method,
  } = req;

  switch (method) {
    case "PATCH":
      const updatedHabit = await prisma.habit.update({
        where: { id: Number(id) },
        data: {
          ...body,
        },
      });
      res.status(200).json(updatedHabit);
      break;
    case "DELETE":
      await prisma.habit.update({
        where: {
          id: Number(id),
        },
        data: {
          records: {
            deleteMany: {},
          },
        },
      });
      const result = await prisma.habit.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(result);
      break;
    default:
      res.setHeader("Allow", ["DELETE", "PATCH"]);
      res.status(405).end(`Methdo ${method} Not Allowed`);
  }
}
