import { MailAdapter, SendMailDTO } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_AUTH_USER,
    pass: process.env.MAILTRAP_AUTH_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailDTO) {
    await transport.sendMail({
      from: "Equipe feedget <oi@feedback.com>",
      to: "Luís Gabriel <luisgabrielmarchio75@gmail.com>",
      subject,
      html: body,
    });
  }
}
