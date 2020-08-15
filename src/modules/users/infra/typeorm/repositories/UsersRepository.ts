import { getRepository, Repository, Not } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindProvidersDTO from '@modules/appointments/dtos/IFindProvidersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = await this.ormRepository.findOne(id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return foundUser;
  }

  public async findProviders({ exceptId }: IFindProvidersDTO): Promise<User[]> {
    let users: User[] = [];
    let whereFilter = {};

    if (exceptId) {
      whereFilter = {
        where: {
          id: Not(exceptId),
        },
      };
    }

    users = await this.ormRepository.find(whereFilter);

    return users;
  }
}

export default UsersRepository;
