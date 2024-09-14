import { Request, Response } from "express";
import prisma from "../prisma";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthorController {
  async createAuthor(req: Request, res: Response) {
    try {
      const { nome, email, password } = req.body;

      const existingAuthor = await prisma.autors.findUnique({
        where: {
          email: email,
        },
      });
      if (existingAuthor) throw "Author already";

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const author = await prisma.autors.create({
        data: {
          nome,
          email,
          password: hashedPassword,
        },
      });
      res.status(201).send({
        status: "success",
        msg: "Author created successfully",
        author,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        msg: err,
      });
    }
  }

  async loginAuthor(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const existingAuthor = await prisma.autors.findUnique({
        where: {
          email: email,
        },
      });
      if (!existingAuthor) throw "Author not found";

      const isValidPass = await compare(password, existingAuthor.password);
      if (!isValidPass) throw "Invalid password";
      const payload = { id: existingAuthor.id, role: existingAuthor.role };
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: "10m" });

      res.status(200).send({
        status: "success",
        msg: "Author logged in successfully",
        token,
        autors: existingAuthor,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        msg: err,
      });
    }
  }

  async getAuthors(req: Request, res: Response) {
    try {
      const authors = await prisma.autors.findMany();
      res.status(200).send({
        status: "success",
        authors,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        msg: err,
      });
    }
  }

  async getAuthorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const author = await prisma.autors.findUnique({
        where: {
          id: +req.params.id,
        },
      });

      if (!author) throw "Author not found";
      res.status(200).send({
        status: "success",
        author,
      });
    } catch (err) {
      res.status(400).send({
        status: "error",
        msg: err,
      });
    }
  }
}
