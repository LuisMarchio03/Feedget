import { connect, Channel, Connection } from "amqplib";

export class RabbitMQServer {
  private connection: Connection;
  private channel: Channel;

  async start() {
    const url = process.env.RABBITMQ_URL || "";

    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();

    console.log("Connected to RabbitMQ");
  }

  async consumer(queue: string, callback: (message: string) => void) {
    return this.channel.consume(queue, (message: any | null) => {
      if (message) {
        callback(message.content.toString());
        this.channel.ack(message);
      }
    });
  }
}
