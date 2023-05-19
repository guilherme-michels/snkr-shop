import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import fs from "fs";
import { validateJwt } from "./middlewares/auth";
import multer from "fastify-multer";
import path from "path";
import mime from "mime-types";
import { v4 as uuid } from "uuid";

import util from "util";
import { pipeline } from "stream";
const pump = util.promisify(pipeline);

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

  app.post(
    "/products/store",
    { preHandler: [validateJwt] },
    async (request, response) => {
      const data = await (request as any).file();

      const body = {
        name: data.fields.name.value,
        type: data.fields.name.value,
        price: data.fields.name.value,
        code: data.fields.name.value,
        description: data.fields.name.value,
      };

      console.log(`data mime type`, data.mimetype);

      const filename = uuid() + `.` + mime.extension(data.mimetype);
      await pump(data.file, fs.createWriteStream(`./images/${filename}`));

      const createProduct = z.object({
        name: z.string(),
        type: z.string(),
        price: z.string(),
        code: z.string(),
        description: z.string(),
      });

      const { name, type, code, price, description } =
        createProduct.parse(body);

      try {
        const productAlreadyExists = await prisma.product.findFirst({
          where: { name },
        });

        if (productAlreadyExists) {
          return response.status(409).send({ error: "Product already exists" });
        }

        const codeAlreadyExists = await prisma.product.findFirst({
          where: { code },
        });

        if (codeAlreadyExists) {
          return response.status(409).send({ error: "Code already exists" });
        }

        const newProduct = await prisma.product.create({
          data: {
            code,
            name,
            type,
            price,
            description,
            image: filename,
          },
        });

        return newProduct;
      } catch (error) {
        return response
          .status(500)
          .send({ error: "Error while creating account" });
      }
    }
  );

  app.get("/products", { preHandler: [validateJwt] }, async (req, res) => {
    try {
      const products = await prisma.product.findMany();

      return res.send(products);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });

  app.delete(
    "/product/:id/delete",
    { preHandler: [validateJwt] },
    async (req: any, res) => {
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
    }
  );

  app.get(`/file`, async (request, reply) => {
    const file = fs.readFileSync(`./images/${(request.query as any).image}`);
    return (reply as any).sendFile((request.query as any).image);
  });

  // app.put(
  //   "/product/:id/edit",
  //   { preHandler: [validateJwt] },
  //   async (req: any, res) => {
  //     const { id } = req.params;

  //     try {
  //       const updatedProduct = await prisma.user.update({
  //         where: {
  //           id: req.id,
  //         },
  //         data: {
  //           firstName: req.firstName,
  //           lastName: req.lastName,
  //           email: req.email,
  //           password: req.password,
  //           position: req.position,
  //           phone: req.phone,
  //           cpf: req.cpf,
  //           dateBirth: req.dateBirth,
  //         },
  //       });

  //       res.send(updatedProduct);
  //     } catch (error) {
  //       res.status(500).send({ error: "Error edit product" });
  //     }
  //   }
  // );

  app.get("/products/:id/show", async (req: any, reply) => {
    const { id } = req.params;

    try {
      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });

      if (!product) {
        return reply.status(404).send({ error: "Product not found" });
      }

      return reply.send(product);
    } catch (error) {
      return reply.status(500).send({ error: "Error searching product" });
    }
  });

  app.get("/sales", async (request, response) => {
    try {
      const currentDate = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(currentDate.getDate() - 7);

      const sales = await prisma.sales.findMany({
        where: {
          data: {
            gte: lastWeek,
            lte: currentDate,
          },
        },
        include: {
          product: true,
        },
      });

      response.send(sales);
    } catch (error) {
      response.status(500).send("Error getting sales");
    }
  });

  app.post(
    "/person/store",
    { preHandler: [validateJwt] },
    async (request, response) => {
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
    }
  );

  app.get("/person/all", async (req, res) => {
    try {
      const people = await prisma.user.findMany();
      return res.send(people);
    } catch (error) {
      return res.status(500).send({ error: "Error searching people" });
    }
  });

  app.delete("/person/:id/delete", async (req: any, res) => {
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

  app.get("/person/cart", { preHandler: [validateJwt] }, async (req, res) => {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          userId: req.user.id,
        },
      });

      const cartItems = await prisma.cartItem.findMany({
        where: {
          cartId: cart?.id,
        },
        include: {
          product: true,
        },
      });

      res.send(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  });

  app.delete(
    "/person/cart/:id/delete",
    { preHandler: [validateJwt] },
    async (req: any, res) => {
      const { id } = req.params;
      try {
        const cart = await prisma.cart.findFirst({
          where: {
            userId: req.user.id,
          },
        });

        const cartItem = await prisma.cartItem.delete({
          where: {
            id: id,
          },
        });
        res.send(cartItem);
      } catch (error) {
        res.status(500).send({ error: "Internal server error" });
      }
    }
  );

  app.post(
    "/person/cart/:id/store",
    { preHandler: [validateJwt] },
    async (req: any, res) => {
      const productId = req.params.id;
      const userId = req.user.id;
      const size = req.body as number;

      try {
        const userCart = await prisma.cart.findFirst({
          where: {
            userId,
          },
        });

        if (!userCart) {
          return res.status(409).send({ error: "User cart not found" });
        }

        const productIsAlreadyInCart = await prisma.cartItem.findFirst({
          where: {
            cartId: userCart.id,
            productId,
          },
        });

        if (productIsAlreadyInCart) {
          return res.status(409).send({ error: "Product already in cart" });
        }

        const newCartItem = await prisma.cartItem.create({
          data: {
            quantity: 1,
            cartId: userCart.id,
            productId,
            size: size,
          },
        });

        return res.send(newCartItem);
      } catch (error) {
        return res.status(500).send({ error: "Error adding item to cart" });
      }
    }
  );
}
