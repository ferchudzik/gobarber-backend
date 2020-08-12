import IEmailProvider from '../models/IEmailProvider';
import ISendEmailDTO from '../dtos/ISendEmailDTO';

class FakeEmailProvider implements IEmailProvider {
  private mails: ISendEmailDTO[] = [];

  public async send(data: ISendEmailDTO): Promise<void> {
    this.mails.push(data);
  }
}

export default FakeEmailProvider;
