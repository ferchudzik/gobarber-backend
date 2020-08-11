import nodemailer, { Transporter } from 'nodemailer';

import IEmailProvider from '../models/IEmailProvider';

class FakeEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async send(to: string, body: string): Promise<void> {
    await this.client.sendMail({
      from: 'support@gobarber.com',
      to,
      subject: 'Recovering password',
      text: body,
    });
  }
}

export default FakeEmailProvider;
