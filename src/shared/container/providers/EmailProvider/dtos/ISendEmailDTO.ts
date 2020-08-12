import IParseEmailTemplateDTO from '../../EmailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface IEmailContact {
  name: string;
  email: string;
}

export default interface ISendEmailDTO {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  emailTemplate: IParseEmailTemplateDTO;
}
