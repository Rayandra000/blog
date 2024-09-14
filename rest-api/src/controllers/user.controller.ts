import { Request, Response } from "express";
import fs from "fs";

interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

export const getUser = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(fs.readFileSync("./src/data/users.json", "utf-8"));

  res.status(200).send({
    status: "ok",
    users,
  });
};

export const getUserId = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(fs.readFileSync("./src/data/users.json", "utf-8"));
  const id = +req.params.id;
  const data = users.find((item) => item.id == id);

  if (!data) {
    return res.status(400).send({
      status: "eror",
      msg: "user not found!",
    });
  }

  res.status(200).send({
    status: "ok",
    users: data,
  });
};

export const createUser = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(fs.readFileSync("./src/data/users.json", "utf-8"));
  const id = Math.max(...users.map((item) => item.id)) + 1;

  users.push({
    id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  fs.writeFileSync("./src/data/users.json", JSON.stringify(users), "utf-8");

  res.status(200).send({
    status: "ok",
    msg: "user created",
  });
};
