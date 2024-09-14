import { Router } from "express";
import { userRouter } from "./routers/user.router";

const router = Router();
router.use("/users", userRouter);
export default router;
