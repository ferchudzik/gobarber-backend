export default interface IEmailProvider {
  send(to: string, body: string): Promise<void>;
}
