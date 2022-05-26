export interface SendMailDTO {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailDTO) => void;
}
