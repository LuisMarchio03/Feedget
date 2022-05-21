import express from "express";
import { GetFeedbacksFactory } from "../../use-cases/get-feedbacks/get-feedbacks-factory";

export const routes = express.Router();

routes.get("/feedbacks", (req, res) => GetFeedbacksFactory().handle(req, res));
