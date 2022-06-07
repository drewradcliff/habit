import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const session = await getSession({ req });

  if (session) {
    if (method === "DELETE") {
      const { id } = query;
      const result = await prisma.record.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(result);
    }
  }
}
