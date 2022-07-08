import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { RabbitMQServer } from "../../services/rabbitmqserver";
import { PushFeedbackUseCase } from "../../use-cases/push-feedback-database/push-feedback-usecase";
import { app } from "./app";

async function main() {
  app.listen(3334, () => console.log("Server is running"));

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const pushFeedbackUseCase = new PushFeedbackUseCase(prismaFeedbackRepository);

  const rabbitMQServer = new RabbitMQServer();
  await rabbitMQServer.start();

  setTimeout(async () => {
    console.log("Evento iniciado!");
    let response;
    await rabbitMQServer.consumer("feedback", async (message) => {
      console.log("Message: ", message);
      response = message;
      await pushFeedbackUseCase.execute(JSON.parse(message));
    });
    console.log("MESSAGE => ", response);
  }, 5000);

  const stopTime = Date.now() + 2000;
  while (Date.now() < stopTime) {}
}
main();
