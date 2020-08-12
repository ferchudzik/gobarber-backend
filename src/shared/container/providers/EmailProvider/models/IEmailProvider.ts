import ISendEmailDTO from '../dtos/ISendEmailDTO';

export default interface IEmailProvider {
  send(data: ISendEmailDTO): Promise<void>;
}
