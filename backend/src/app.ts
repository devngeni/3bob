import express from "express";
import morgan from "morgan";
import "express-async-errors";
import bodyParser from "body-parser";
import cors from "cors";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

// read the content of the .env file
app.use(express.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

/**
 * LOGGER IN Development ENV
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * ROUTES
 */
import "./routes/index";

/**API DOCUMENTATION */
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
