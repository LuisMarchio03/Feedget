import express from "express";
import { GetFeedbacksApprovedFactory } from "../../use-cases/get-feedbacks-approved/get-feedbacks-approved-factory";
import { GetFeedbacksPendentFactory } from "../../use-cases/get-feedbacks-pendent/get-feedbacks-pendent-factory";
import { GetFeedbacksFactory } from "../../use-cases/get-feedbacks/get-feedbacks-factory";

export const routes = express.Router();

routes.get("/feedbacks", (req, res) => GetFeedbacksFactory().handle(req, res));
routes.get("/feedbacks/approved", (req, res) =>
  GetFeedbacksApprovedFactory().handle(req, res)
);
routes.get("/feedbacks/pendent", (req, res) =>
  GetFeedbacksPendentFactory().handle(req, res)
);
