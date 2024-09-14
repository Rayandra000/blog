import express, { Application, Request, Response } from "express";
import router from "./router";
import db from "./config/db";

const PORT: Number = 8000;

const app: Application = express();

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({
    status: "ok",
    msg: "welcom to may api",
  });
});

app.use("/api", router);

db.getConnection((err, connection) => {
  if (err) {
    return console.log(err);
  }
  console.log("success connect", connection.threadId);
});

app.listen(PORT, () => {
  console.log(` [API] : http://localhost:${PORT}/api`);
});
