import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import IEmailProvider from '../models/IEmailProvider';
import ISendEmailDTO from '../dtos/ISendEmailDTO';
import IEmailTemplateProvider from '../../EmailTemplateProvider/models/IEmailTemplateProvider';

@injectable()
class FakeEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor(
    @inject('EmailTemplateProvider')
    private emailTemplateProvider: IEmailTemplateProvider,
  ) {
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

  public async send({
    to,
    from,
    subject,
    emailTemplate,
  }: ISendEmailDTO): Promise<void> {
    await this.client.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || 'Suporte GoBarber',
        address: from?.email || 'suporte@gobarber.com',
      },
      subject,
      html: await this.emailTemplateProvider.parse(emailTemplate),
    });
  }
}

export default FakeEmailProvider;
