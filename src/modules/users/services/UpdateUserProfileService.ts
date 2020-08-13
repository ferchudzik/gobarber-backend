import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    oldPassword,
    newPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== userId) {
      throw new AppError('Users email already exists');
    }

    if (newPassword) {
      if (!oldPassword) {
        throw new AppError('Old password is required');
      }

      const passwordMatch = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!passwordMatch) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    Object.assign(user, { name, email });

    return this.usersRepository.update(user);
  }
}

export default UpdateUserProfileService;
