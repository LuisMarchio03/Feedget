import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});

import express from "express";
import cors from "cors";
import { routes } from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
