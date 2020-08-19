import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    let providers = await this.cacheProvider.get<User[]>(
      `providers-list:${userId}`,
    );

    if (!providers) {
      providers = await this.usersRepository.findProviders({
        exceptId: userId,
      });

      await this.cacheProvider.save(`providers-list:${userId}`, providers);
    }

    return providers;
  }
}

export default ListProvidersService;
