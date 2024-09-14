import { Request, Response } from "express";
import fs from "fs";
import { IExpense } from "../type";

export const getExpense = (req: Request, res: Response) => {
  const expense: IExpense[] = JSON.parse(fs.readFileSync("./src/data/expense.json", "utf-8"));
  const { start, end } = req.query;

  const data = expense.filter((item) => {
    let isValid = true;
    if (start && end) {
      isValid = isValid && new Date(item.date) >= new Date(start as string) && new Date(item.date) <= new Date(end as string);
    }
    return isValid;
  });

  const totalExpense = data.filter((item) => item.type == "expense").reduce((prev, curr) => prev + curr.nominal, 0);
  const totalIncome = data.filter((item) => item.type == "income").reduce((prev, curr) => prev + curr.nominal, 0);

  res.status(200).send({
    status: "ok",
    totalExpense,
    totalIncome,
    data,
  });
};

export const getExpenseId = (req: Request, res: Response) => {
  const expense: IExpense[] = JSON.parse(fs.readFileSync("./src/data/expense.json", "utf-8"));
  const id = +req.params.id;
  const data = expense.find((item) => item.id == id);

  if (!data) {
    return res.status(404).send({
      status: "error",
      msg: "Expenses NOT Found!",
    });
  }

  res.status(200).send({
    status: "ok",
    expense: data,
  });
};

export const createExpense = (req: Request, res: Response) => {
  const expense: IExpense[] = JSON.parse(fs.readFileSync("./src/data/expense.json", "utf-8"));
  const id = Math.max(...expense.map((item) => item.id)) + 1;

  expense.push({ id, ...req.body });

  fs.writeFileSync("./src/data/expense.json", JSON.stringify(expense), "utf-8");

  res.status(200).send({
    status: "ok",
    expense,
  });
};

export const editExpense = (req: Request, res: Response) => {
  const expense: IExpense[] = JSON.parse(fs.readFileSync("./src/data/expense.json", "utf-8"));
  const id = +req.params.id;
  const idx = expense.findIndex((item) => item.id == id);

  if (idx == -1) {
    return res.status(400).send({
      status: "error",
      msg: "expense not found",
    });
  }

  expense[idx] = { ...expense[idx], ...req.body };

  fs.writeFileSync("./src/data/expense.json", JSON.stringify(expense), "utf-8");

  res.status(200).send({
    status: "ok",
    msg: "expense edit",
  });
};

export const delateExpense = (req: Request, res: Response) => {
  const expense: IExpense[] = JSON.parse(fs.readFileSync("./src/data/expense.json", "utf-8"));
  const id = +req.params.id;
  const data = expense.filter((item) => item.id !== id);

  fs.writeFileSync("./src/data/expense.json", JSON.stringify(data), "utf-8");

  res.status(200).send({
    status: "ok",
    msg: "expense delate",
  });
};
