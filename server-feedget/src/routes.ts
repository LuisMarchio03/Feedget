import express from "express";
import { SubmitFeedbackUseCase } from "./usecases/submit-feedback-usecase";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { RabbitMQServer } from "./services/rabbitmqserver";

export const routes = express.Router();

routes.post("/feedback", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  const rabbitMQServer = new RabbitMQServer();
  await rabbitMQServer.start();

  const obj = {
    type,
    comment,
    screenshot,
  };

  await rabbitMQServer.publish("feedback", JSON.stringify(obj));

  return res.status(201).send();
});
