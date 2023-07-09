import { Prisma } from "@prisma/client";

declare module "fastify" {
  interface FastifyRequest {
    user?: Prisma.User;
  }
}
