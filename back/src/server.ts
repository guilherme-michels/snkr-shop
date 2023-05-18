import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(require("@fastify/formbody"));
app.register(require("@fastify/multipart"));

app.register(appRoutes);
app.register(cors);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server running!");
  });
