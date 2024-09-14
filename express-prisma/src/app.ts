import express, { Express, Request, Response } from "express";
import { AuthorRouter } from "./routers/author.router";

const PORT: number = 8000;

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
  }

  private configure(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    const authorRouter = new AuthorRouter();
    this.app.get("/api", (req: Request, res: Response) => {
      res.send("Hello World");
    });
    this.app.use("/api/author", authorRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/api`);
    });
  }
}
