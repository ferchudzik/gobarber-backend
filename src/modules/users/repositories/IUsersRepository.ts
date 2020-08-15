import IFindProvidersDTO from '@modules/appointments/dtos/IFindProvidersDTO';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findProviders(data: IFindProvidersDTO): Promise<User[]>;
}
