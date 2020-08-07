import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  newPassword: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IUserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('IHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, newPassword }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token does not exists');

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exists');

    const tokenCreationDate = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreationDate) > 2)
      throw new AppError('Token expired');

    user.password = await this.hashProvider.generateHash(newPassword);

    await this.usersRepository.update(user);
  }
}

export default ResetPasswordService;
