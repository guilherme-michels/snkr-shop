import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";

interface LoginData {
  email: string;
  password: string;
}

export async function appRoutes(app: FastifyInstance) {
  app.post("/login", async (req, res) => {
    const { email, password } = req.body as LoginData;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return console.log({ error: "User not found" });
    }

    const match = await (password == user.password);

    if (!match) {
      return console.log({ error: "Invalid credentials" });
    }

    if (match || user) {
      let token = jwt.sign({ userId: user.id }, "mysecret");

      return res.send({
        token: token,
        email: user.email,
        name: user.firstName,
        id: user.id,
      });
    }
  });

  app.post("/products", async (request) => {
    const createProduct = z.object({
      name: z.string(),
      type: z.string(),
      price: z.number(),
      code: z.string(),
    });

    const { name, type, code, price } = createProduct.parse(request.body);

    await prisma.product.create({
      data: {
        name,
        type,
        code,
        price,
      },
    });
  });

  app.get("/products/all", async (_req, res) => {
    try {
      const products = await prisma.product.findMany();
      return res.send(products);
    } catch (error) {
      return res.status(500).send({ error: "Error searching people" });
    }
  });

  app.delete("/product/:id/delete", async (req: any, res) => {
    const { id } = req.params;

    try {
      const deletedProduct = await prisma.product.delete({
        where: {
          id: req.id,
        },
      });

      res.send(deletedProduct);
    } catch (error) {
      res.status(500).send({ error: "Error delete product" });
    }
  });

  app.put("/product/:id/edit", async (req: any, res) => {
    const { id } = req.params;

    try {
      const updatedPerson = await prisma.user.update({
        where: {
          id: req.id,
        },
        data: {
          firstName: req.firstName,
          lastName: req.lastName,
          email: req.email,
          password: req.password,
          position: req.position,
          phone: req.phone,
          cpf: req.cpf,
          dateBirth: req.dateBirth,
        },
      });

      res.send(updatedPerson);
    } catch (error) {
      res.status(500).send({ error: "Error edit product" });
    }
  });

  app.get("/product/:id/show", async (req, res) => {
    const id = req.params;

    try {
      const product = await prisma.product.findUnique({
        where: {
          id: req.id,
        },
      });

      if (!product) {
        return console.log({ error: "Product not found" });
      }

      return res.send(product);
    } catch (error) {
      return res.status(500).send({ error: "Error searching product" });
    }
  });

  app.post("/person/store", async (request, response) => {
    const createPerson = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      password: z.string(),
      position: z.string(),
      phone: z.string(),
      cpf: z.string(),
      dateBirth: z.string(),
    });

    const {
      firstName,
      lastName,
      email,
      password,
      position,
      phone,
      cpf,
      dateBirth,
    } = createPerson.parse(request.body);

    try {
      const accountAlreadyExists = await prisma.user.findFirst({
        where: { email },
      });

      if (accountAlreadyExists) {
        return response.status(409).send({ error: "E-mail already exists" });
      }

      const newPerson = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          position,
          phone,
          cpf,
          dateBirth,
        },
      });

      return response.send();
    } catch (error) {
      return response
        .status(500)
        .send({ error: "Error while creating account" });
    }
  });

  app.get("/person/all", async (req, res) => {
    try {
      const people = await prisma.user.findMany();
      return res.send(people);
    } catch (error) {
      return res.status(500).send({ error: "Error searching people" });
    }
  });
  app.delete("/persons/:id/delete", async (req: any, res) => {
    const { id } = req.params;

    try {
      const deletedPerson = await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });

      res.send(deletedPerson);
    } catch (error) {
      res.status(500).send({ error: "Error delete person" });
    }
  });

  app.put("/person/:id/update", async (req: any, res) => {
    const { id } = req.params;
    const {
      cpf,
      dateBirth,
      email,
      firstName,
      lastName,
      phone,
      password,
      position,
    } = req.body;

    console.log("req", req.body);

    try {
      const updatedPerson = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          cpf: cpf,
          dateBirth: dateBirth,
          email: email,
          firstName: firstName,
          phone: phone,
          lastName: lastName,
          password: password,
          position: position,
        },
      });
    } catch (error) {
      res.status(500).send({ error: "Error edit person" });
    }
  });

  app.get("/person/:id/show", async (req: any, res) => {
    const { id } = req.params;

    try {
      const person = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!person) {
        return console.log({ error: "Person not found" });
      }

      return res.send(person);
    } catch (error) {
      return res.status(500).send({ error: "Error searching person" });
    }
  });
}
