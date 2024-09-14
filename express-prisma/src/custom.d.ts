type Author = {
  id: number;
  role: string;
};

declare namespace Express {
  export interface Request {
    author?: Author;
  }
}
