import express from "express";
import { ChangeFeedbackStatus } from "../../use-cases/change-feedback-status/change-feedback-status-factory";
import { GetFeedbackFactory } from "../../use-cases/get-feedback/get-feedback-factory";
import { GetFeedbacksApprovedFactory } from "../../use-cases/get-feedbacks-approved/get-feedbacks-approved-factory";
import { GetFeedbacksPendentFactory } from "../../use-cases/get-feedbacks-pendent/get-feedbacks-pendent-factory";
import { GetFeedbacksRejectedFactory } from "../../use-cases/get-feedbacks-rejected/get-feedbacks-rejected-factory";
import { GetFeedbacksFactory } from "../../use-cases/get-feedbacks/get-feedbacks-factory";

export const routes = express.Router();

routes.get("/feedbacks", (req, res) => GetFeedbacksFactory().handle(req, res));
routes.get("/feedbacks/approved", (req, res) =>
  GetFeedbacksApprovedFactory().handle(req, res)
);
routes.get("/feedbacks/pendent", (req, res) =>
  GetFeedbacksPendentFactory().handle(req, res)
);
routes.get("/feedbacks/rejected", (req, res) =>
  GetFeedbacksRejectedFactory().handle(req, res)
);
routes.get("/feedback/:id", (req, res) =>
  GetFeedbackFactory().handle(req, res)
);
routes.put("/feedback/:id", (req, res) =>
  ChangeFeedbackStatus().handle(req, res)
);
