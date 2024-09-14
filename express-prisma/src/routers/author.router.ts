import { Router } from "express";
import { AuthorController } from "../controllers/author.controller";
import { checkadmin, verifyToken } from "../middlewares/token";

export class AuthorRouter {
  private router: Router;
  private authorController: AuthorController;

  constructor() {
    this.router = Router();
    this.authorController = new AuthorController();
    this.instalizeRoutes();
  }

  private instalizeRoutes(): void {
    this.router.get("/", verifyToken, checkadmin, this.authorController.getAuthors);
    this.router.get("/:id", this.authorController.getAuthorId);
    this.router.post("/", this.authorController.createAuthor);
    this.router.post("/login", this.authorController.loginAuthor);
  }

  getRouter(): Router {
    return this.router;
  }
}
