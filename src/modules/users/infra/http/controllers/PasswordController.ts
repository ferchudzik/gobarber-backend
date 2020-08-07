import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class PasswordController {
  public async requestNewPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmailService.execute({ email });

    return response.status(204).json();
  }

  public async resetPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token, newPassword } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({ token, newPassword });

    return response.status(204).json();
  }
}
