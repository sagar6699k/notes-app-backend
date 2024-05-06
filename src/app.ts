import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import "./config/mongoose";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middleware/index.middleware";
import { corsOptions } from "./config/corsOptions";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import 'express-async-errors'
import api from "./api/index.api";
import noteRouter from "./routes/note.route"
config();

const app = express();
if ((process.env.NODE_ENV = "development")) {
    app.use(morgan("dev"));
}

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use("/", api);
app.use("/api/", noteRouter);

app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;