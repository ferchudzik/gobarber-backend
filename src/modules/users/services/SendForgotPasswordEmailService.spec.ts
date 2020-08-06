import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeEmailProvider: FakeEmailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeEmailProvider = new FakeEmailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeEmailProvider,
    );
  });

  it('should send an e-mail to user recover the password', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'send');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@email.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not send a recover e-mail to a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a token to forgot password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@email.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
