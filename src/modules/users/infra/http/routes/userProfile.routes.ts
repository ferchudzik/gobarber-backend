import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';

import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(verifyAuthentication);

userProfileRouter.get('/', userProfileController.find);

userProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      newPassword: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('newPassword')),
    },
  }),
  userProfileController.update,
);

export default userProfileRouter;
