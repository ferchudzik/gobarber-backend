import IEmailTemplateProvider from '../models/IEmailTemplateProvider';

class FakeEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse(): Promise<string> {
    return 'email';
  }
}

export default FakeEmailTemplateProvider;
