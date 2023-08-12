import Express from "express";

import { NextFunction, Request, Response } from "express";
import cors from "cors";

export class App {
  public app: Express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = Express();
    this.env = process.env.NODE_ENV || "development";
    this.port = process.env.PORT || 3000;

    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true }));

    this.app.use(cors({}));

    this.app.get("/", (_: Request, res: Response) => {
      res.send("Hello MERN!");
    });

    // Error Handler
    this.app.use(
      (
        error: Error & { status: number },
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const status: number = error.status || 500;
          const message: string = error.message || "Something went wrong";

          console.error(
            `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
          );
          res.status(status).json({ message });
        } catch (error) {
          next(error);
        }
      }
    );
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
