import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const passwordController = new PasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordController.requestNewPassword,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      newPassword: Joi.string().required(),
      passwordConfirmation: Joi.string()
        .required()
        .valid(Joi.ref('newPassword')),
    },
  }),
  passwordController.resetPassword,
);

export default passwordRouter;
