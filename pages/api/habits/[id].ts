import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

// PATCH /api/[id]
// Required fields in query: id
// Required fields in body: habit

// DELETE /api/[id]
// Required fields in query: id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    body: { habit },
    method,
  } = req;

  switch (method) {
    case "PATCH":
      res.status(200).json(
        await prisma.habit.update({
          where: {
            id: Number(id),
          },
          data: {
            ...habit,
          },
        })
      );
      break;
    case "DELETE":
      res.status(200).json(
        await prisma.habit.delete({
          where: {
            id: Number(id),
          },
        })
      );
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Methdo ${method} Not Allowed`);
  }
}
