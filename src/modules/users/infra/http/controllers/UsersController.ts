import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAppointment = container.resolve(CreateUserService);

    const user = await createAppointment.execute({ name, email, password });

    return response.json(user);
  }
}