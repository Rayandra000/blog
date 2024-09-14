import { getExpenseId } from "./expenseControllers";
import { Request, Response } from "express";
import db from "../config/db";

import { QueryError, QueryResult } from "mysql2";
import { IExpense } from "../type";

export const getExpanseV2 = (req: Request, res: Response) => {
  db.query("SELECT * FROM expanse", (err: QueryResult, resul: IExpense[]) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        msg: err,
      });
    }
    return res.status(200).send({
      status: "ok",
      expenses: resul,
    });
  });
};

export const getExpanseByIdV2 = (req: Request, res: Response) => {
  db.query(`SELECT * FROM expanse WHERE id = ${req.params.id}`, (err: QueryResult, resul: IExpense[]) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        msg: err,
      });
    }
    if (resul.length === 0) {
      return res.status(404).send({
        status: "error",
        msg: "expanse not found",
      });
    }
    return res.status(200).send({
      status: "ok",
      expenses: resul[0],
    });
  });
};

export const createExpanseV2 = (req: Request, res: Response) => {
  const { title, type, category, nominal, date } = req.body;
  db.query(
    `insert into expanse(title, type, category, nominal, date) 
value 
("${title}", "${type}", "${category}", ${nominal}, "${date}" );`,

    (err: QueryError) => {
      if (err) {
        return res.status(400).send({
          status: "error",
          msg: err,
        });
      }
    }
  );

  return res.status(201).send({
    status: "ok",
    msg: "success create new expanse",
  });
};

export const updateExpanseV2 = (req: Request, res: Response) => {
  const query = [];
  for (let key in req.body) {
    query.push(`${key} = "${req.body[key]}"`);
  }
  db.query(`UPDATE expanse SET ${query.join(",")} WHERE id = ${req.params.id}`, (err: QueryError) => {
    if (err) {
      return res.status(400).send({
        status: "error",
        msg: err,
      });
    }
  });
  return res.status(200).send({
    status: "ok",
    msg: "success update expanse",
  });
};

export const deleteExpanseV2 = (req: Request, res: Response) => {
  db.query(`DELETE FROM expanse WHERE id = ${req.params.id}`, (err: QueryError) => {
    if (err) {
      return res.status(400).send({
        status: "error",
        msg: err,
      });
    }
  });
  return res.status(200).send({
    status: "ok",
    msg: "success update expanse",
  });
};
