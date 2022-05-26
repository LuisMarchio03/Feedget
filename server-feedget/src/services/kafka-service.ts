import { Kafka } from "kafkajs";

interface FeedbackDTO {
  id: string;
  type: string;
  comment: string;
  screenshot?: string;
}

export class KafkaService {
  public kafka = new Kafka({
    clientId: "my-app",
    brokers: [`${process.env.KAFKA_BROKERS}`],
  });

  async execute(data: FeedbackDTO) {
    const producer = this.kafka.producer();

    await producer.connect();
    await producer.send({
      topic: "submit-feedback",
      messages: [{ value: JSON.stringify(data) }],
    });

    await producer.disconnect();
  }
}
