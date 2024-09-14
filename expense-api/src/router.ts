import { Router } from "express";
import { expenseRouter } from "./routers/expenseRouter";
import { expenseRouterV2 } from "./routers/expenseV2Router";

const router = Router();

router.use("/expenses", expenseRouter);
router.use("/v2/expanse", expenseRouterV2);

export default router;
