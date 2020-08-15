import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindProvidersDTO from '@modules/appointments/dtos/IFindProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async update(userData: User): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === userData.id);

    this.users[userIndex] = userData;

    return userData;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async findProviders({ exceptId }: IFindProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (exceptId) {
      users = users.filter(user => user.id !== exceptId);
    }

    return users;
  }
}

export default FakeUsersRepository;
