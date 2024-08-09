import express from "express";
import { envs } from "../../adapters/envs";
import { AppRoutes } from "./app.routes";

export class Server {
  static start() {
    const app = express();

    const port = envs.PORT;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(AppRoutes.routes);

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }
}
