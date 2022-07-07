import { connect, Channel, Connection } from "amqplib";

export class RabbitMQServer {
  private connection: Connection | undefined;
  private channel: Channel | undefined;

  async start() {
    const url = process.env.RABBITMQ_URL || "";

    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();

    console.log("Connected to RabbitMQ");
  }

  async publish(queue: string, message: string) {
    const channel = this.channel as Channel;
    return channel.sendToQueue(queue, Buffer.from(message));
  }
}
