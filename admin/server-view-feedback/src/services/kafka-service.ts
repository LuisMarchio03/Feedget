import { Kafka } from "kafkajs";

export class KafkaService {
  public kafka = new Kafka({
    clientId: "my-app",
    brokers: [`${process.env.KAFKA_BROKERS}`],
  });

  async execute() {
    const consumer = this.kafka.consumer({ groupId: "test-group" });

    await consumer.connect();
    await consumer.subscribe({ topic: "submit-feedback", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const feedback = JSON.parse(message.value.toString());
        return feedback;
      },
    });
  }
}
