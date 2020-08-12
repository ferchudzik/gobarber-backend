import handlebars from 'handlebars';

import IEmailTemplateProvider from '../models/IEmailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class HandlebarsEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseEmailTemplateDTO): Promise<string> {
    const parsedTemplate = handlebars.compile(template);

    return parsedTemplate(variables);
  }
}

export default HandlebarsEmailTemplateProvider;
