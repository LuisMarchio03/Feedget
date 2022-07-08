import express from "express";
import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { RabbitMQServer } from "../../services/rabbitmqserver";

import { ChangeFeedbackStatus } from "../../use-cases/change-feedback-status/change-feedback-status-factory";
import { GetFeedbackFactory } from "../../use-cases/get-feedback/get-feedback-factory";
import { GetFeedbacksApprovedFactory } from "../../use-cases/get-feedbacks-approved/get-feedbacks-approved-factory";
import { GetFeedbacksPendentFactory } from "../../use-cases/get-feedbacks-pendent/get-feedbacks-pendent-factory";
import { GetFeedbacksRejectedFactory } from "../../use-cases/get-feedbacks-rejected/get-feedbacks-rejected-factory";
import { GetFeedbacksFactory } from "../../use-cases/get-feedbacks/get-feedbacks-factory";
import { PushFeedbackUseCase } from "../../use-cases/push-feedback-database/push-feedback-usecase";

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

routes.post("/feedback", async (req, res) => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const submitFeedbackUseCase = new PushFeedbackUseCase(
    prismaFeedbackRepository
  );

  const rabbitMQServer = new RabbitMQServer();
  await rabbitMQServer.start();

  let response;

  await rabbitMQServer.consumer("feedback", (message) => {
    response = message;
  });

  const feedback = await submitFeedbackUseCase.execute(JSON.parse(response));

  return res.status(201).json(feedback);
});
