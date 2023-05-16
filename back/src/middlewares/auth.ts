import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const validateJwt = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return reply.status(401).send({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, "mysecret") as { userId: string };

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return reply.status(401).send({ error: "User not found" });
    }

    req.user = user;
  } catch (error) {
    return reply.status(401).send({ error: "Token not valid" });
  }
};
