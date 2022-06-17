import { prisma } from "../../../db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const session = await getSession({ req });

  if (method === "POST") {
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
  }
}
