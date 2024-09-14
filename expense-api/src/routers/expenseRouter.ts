import { Router } from "express";
import { createExpense, delateExpense, editExpense, getExpense, getExpenseId } from "../controllers/expenseControllers";

const expenseRouter = Router();

expenseRouter.get("/", getExpense);
expenseRouter.get("/:id", getExpenseId);
expenseRouter.post("/", createExpense);
expenseRouter.patch("/:id", editExpense);
expenseRouter.delete("/:id", delateExpense);

export { expenseRouter };
