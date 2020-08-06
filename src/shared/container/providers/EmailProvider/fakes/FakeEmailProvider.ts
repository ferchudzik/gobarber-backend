import IEmailProvider from '../models/IEmailProvider';

interface IMail {
  to: string;
  body: string;
}

class FakeEmailProvider implements IEmailProvider {
  private mails: IMail[] = [];

  public async send(to: string, body: string): Promise<void> {
    this.mails.push({
      to,
      body,
    });
  }
}

export default FakeEmailProvider;
