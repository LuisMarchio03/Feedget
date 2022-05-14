import express from "express";
import nodemailer from "nodemailer";
import { SubmitFeedbackUseCase } from "./usecases/submit-feedback-usecase";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "75c3bb1418db01",
    pass: "567981367d13d7",
  },
});

routes.post("/feedback", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  // await transport.sendMail({
  //   from: "Equipe feedget <oi@feedback.com>",
  //   to: "Luís Gabriel <luisgabrielmarchio75@gmail.com>",
  //   subject: "Novo feedback",
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  //     `<p>Tipo: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `<img src="${screenshot}"/>`,
  //     `</div>`,
  //   ].join("\n"),
  // });

  return res.status(201).send();
});
