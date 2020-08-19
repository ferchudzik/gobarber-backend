import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

export default class UserProfileController {
  public async find(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showUserProfileService = container.resolve(ShowUserProfileService);

    const user = await showUserProfileService.execute({
      userId,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { name, email, oldPassword, newPassword } = request.body;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const user = await updateUserProfile.execute({
      userId,
      name,
      email,
      oldPassword,
      newPassword,
    });

    return response.json(classToClass(user));
  }
}
