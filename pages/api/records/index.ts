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
