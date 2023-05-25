import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import fsPromises from "fs/promises";
import fs from "fs";
import { validateJwt } from "./middlewares/auth";
import mime from "mime-types";
import { v4 as uuid } from "uuid";
import util from "util";
import { pipeline } from "stream";
const pump = util.promisify(pipeline);
import path from "path";
import { CartItem } from "@prisma/client";

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
        type: data.fields.type.value,
        price: data.fields.price.value,
        code: data.fields.code.value,
        description: data.fields.description.value,
      };

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
            bestSeller: false,
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

  app.get("/products/best-sellers", async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        where: {
          bestSeller: true,
        },
      });

      res.send(products);
    } catch (error) {
      res.status(500).send({ error: "Error retrieving best-selling products" });
    }
  });

  app.put("/products/:id/set-best-seller", async (req: any, res) => {
    const { id } = req.params;

    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          bestSeller: true,
        },
      });

      res.send(updatedProduct);
    } catch (error) {
      res.status(500).send({ error: "Error updating product" });
    }
  });

  app.put("/products/:id/unset-best-seller", async (req: any, res) => {
    const { id } = req.params;

    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          bestSeller: false,
        },
      });

      res.send(updatedProduct);
    } catch (error) {
      res.status(500).send({ error: "Error updating product" });
    }
  });

  app.get("/shoe-sizes/:productId", async (request: any, response) => {
    const { productId } = request.params;

    try {
      const productExists = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!productExists) {
        return response.status(404).send({ error: "Product not found" });
      }

      const sizes = await prisma.shoeSize.findMany({
        where: { productId },
      });

      return { sizes };
    } catch (error) {
      return response
        .status(500)
        .send({ error: "Error while retrieving shoe size" });
    }
  });

  app.delete(
    "/shoe-sizes/:productId/:size",
    { preHandler: [validateJwt] },
    async (req: any, response) => {
      const productId = req.params.productId;
      const size = req.params.size;

      try {
        const productExists = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!productExists) {
          return response.status(404).send({ error: "Product not found" });
        }

        const existingShoeSize = await prisma.shoeSize.findFirst({
          where: {
            productId: productId,
            size: Number(size),
          },
        });

        if (!existingShoeSize) {
          return response.status(404).send({ error: "Shoe size not found" });
        }

        await prisma.shoeSize.delete({
          where: { id: existingShoeSize.id },
        });

        return response.send({ message: "Shoe size deleted successfully" });
      } catch (error) {
        return response
          .status(500)
          .send({ error: "Error while deleting shoe size" });
      }
    }
  );

  app.post(
    "/shoe-sizes",
    { preHandler: [validateJwt] },
    async (request: any, response) => {
      const createShoeSize = z.object({
        productId: z.string(),
        size: z.number(),
      });

      const { productId, size } = createShoeSize.parse(request.body);

      try {
        const productExists = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!productExists) {
          return response.status(404).send({ error: "Product not found" });
        }

        const existingShoeSize = await prisma.shoeSize.findFirst({
          where: { productId, size },
        });

        if (existingShoeSize) {
          return response
            .status(409)
            .send({ error: "Shoe size already exists for the product" });
        }

        const newShoeSize = await prisma.shoeSize.create({
          data: {
            productId,
            size,
            quantity: 1,
          },
        });

        return newShoeSize;
      } catch (error) {
        return response
          .status(500)
          .send({ error: "Error while creating shoe size" });
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

  app.get(
    "/file/:image",
    { preHandler: [validateJwt] },
    async (req: any, res) => {
      const { image } = req.params;
      const file = await fsPromises.readFile(path.join("images", image));
      return res.type("image/jpeg").send(file);
    }
  );

  app.put(
    "/products/:productId/update",
    { preHandler: [validateJwt] },
    async (request: any, response) => {
      const { productId } = request.params;
      const data = await (request as any).file();

      const body = {
        name: data.fields.name.value,
        type: data.fields.type.value,
        price: data.fields.price.value,
        code: data.fields.code.value,
        description: data.fields.description.value,
      };

      console.log(body, "teste");

      const filename = uuid() + `.` + mime.extension(data.mimetype);
      console.log(filename, "teste");
      await pump(data.file, fs.createWriteStream(`./images/${filename}`));

      const updateProduct = z.object({
        name: z.string().optional(),
        type: z.string().optional(),
        price: z.string().optional(),
        code: z.string().optional(),
        description: z.string().optional(),
      });

      const { name, type, code, price, description } =
        updateProduct.parse(body);

      try {
        const existingProduct = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!existingProduct) {
          return response.status(404).send({ error: "Product not found" });
        }

        const updatedProduct = await prisma.product.update({
          where: { id: productId },
          data: {
            code: code || existingProduct.code,
            name: name || existingProduct.name,
            type: type || existingProduct.type,
            price: price || existingProduct.price,
            description: description || existingProduct.description,
            image: filename || existingProduct.image,
          },
        });

        return updatedProduct;
      } catch (error) {
        return response
          .status(500)
          .send({ error: "Error while updating product" });
      }
    }
  );

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

  app.put(
    "/product/:id/edit-bestseller",
    { preHandler: [validateJwt] },
    async (req: any, res) => {
      const { id } = req.params;

      try {
        const updatedProduct = await prisma.product.update({
          where: {
            id: id,
          },
          data: {
            bestSeller: true,
          },
        });

        res.send(updatedProduct);
      } catch (error) {
        res.status(500).send({ error: "Error updating product" });
      }
    }
  );

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

        await prisma.cart.create({
          data: {
            user: {
              connect: {
                id: newPerson.id,
              },
            },
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

  app.delete(
    "/person/cart/:productId/delete/:size",
    { preHandler: [validateJwt] },
    async (req: any, res) => {
      const productId = req.params.productId;
      const size = req.params.size;
      const userId = req.user.id;

      try {
        const userCart = await prisma.cart.findFirst({
          where: {
            userId,
          },
        });

        if (!userCart) {
          return res.status(409).send({ error: "User cart not found" });
        }

        const productItem = await prisma.cartItem.findFirst({
          where: {
            cartId: userCart.id,
            productId: productId,
            size: Number(size),
          },
        });

        if (!productItem) {
          return res.status(404).send({ error: "Item not found in cart" });
        }

        const deleteCartItem = await prisma.cartItem.delete({
          where: {
            id: productItem.id,
          },
        });

        return res.send(deleteCartItem);
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Error deleting item" });
      }
    }
  );

  app.post(
    "/person/finish-buy",
    { preHandler: [validateJwt] },
    async (req: any, res: any) => {
      const userId: string = req.user.id;
      const cartItems = req.body.products;
      console.log(cartItems);

      try {
        const salesPromises = cartItems.map(async (cartItem: CartItem) => {
          const { productId }: { productId: string } = cartItem;

          const itemCart = await prisma.cartItem.findFirst({
            where: {
              productId,
              size: cartItem.size,
            },
            include: {
              cart: {
                include: {
                  user: true,
                },
              },
            },
          });

          if (!itemCart || !itemCart.cart || itemCart.cart.userId !== userId) {
            return res.status(404).send({ error: "Item not found in cart" });
          }

          const product = await prisma.product.findUnique({
            where: {
              id: productId,
            },
          });

          if (!product) {
            return res.status(404).send({ error: "Product not found" });
          }

          const size: any = itemCart.size;
          const valor: any = Number(product.price);

          const newSale = await prisma.sales.create({
            data: {
              valor,
              productId: productId,
              userId: userId,
              size,
            },
          });

          await prisma.cartItem.delete({
            where: {
              id: itemCart.id,
            },
          });

          return newSale;
        });

        const sales = await Promise.all(salesPromises);

        return res.send({ sales });
      } catch (error) {
        return res.status(500).send({ error: "Error finishing the purchase" });
      }
    }
  );

  app.get("/sales/week-sales", async (req, res) => {
    try {
      const currentDate = new Date();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);

      const recentSales = await prisma.sales.findMany({
        where: {
          data: {
            gte: sevenDaysAgo,
            lte: currentDate,
          },
        },
        include: {
          product: true,
          user: true,
        },
      });

      return res.send({ sales: recentSales });
    } catch (error) {
      return res.status(500).send({ error: "Error retrieving recent sales" });
    }
  });

  app.get("/sales/month-sales", async (req, res) => {
    try {
      const currentDate = new Date();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 30);

      const recentSales = await prisma.sales.findMany({
        where: {
          data: {
            gte: sevenDaysAgo,
            lte: currentDate,
          },
        },
        include: {
          product: true,
          user: true,
        },
      });

      return res.send({ sales: recentSales });
    } catch (error) {
      return res.status(500).send({ error: "Error retrieving recent sales" });
    }
  });

  app.post(
    "/person/cart/:id/store",
    { preHandler: [validateJwt] },
    async (req: any, res) => {
      const productId = req.params.id;
      const userId = req.user.id;
      const size = req.body;
      const keys = Object.keys(size);
      const valueSize = keys[0];

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
            size: Number(valueSize),
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
            size: Number(valueSize),
          },
        });

        return res.send(newCartItem);
      } catch (error) {
        return res.status(500).send({ error: "Error adding item to cart" });
      }
    }
  );
}
