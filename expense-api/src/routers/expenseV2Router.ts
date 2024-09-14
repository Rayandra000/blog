import { Router } from "express";
import { createExpanseV2, deleteExpanseV2, getExpanseByIdV2, getExpanseV2, updateExpanseV2 } from "../controllers/expanseV2Controller";

const expenseRouterV2 = Router();

expenseRouterV2.get("/", getExpanseV2);
expenseRouterV2.get("/:id", getExpanseByIdV2);
expenseRouterV2.post("/", createExpanseV2);
expenseRouterV2.patch("/:id", updateExpanseV2);
expenseRouterV2.delete("/:id", deleteExpanseV2);

export { expenseRouterV2 };
