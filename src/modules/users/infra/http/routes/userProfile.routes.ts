import { Router } from 'express';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';

import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.use(verifyAuthentication);

userProfileRouter.get('/', userProfileController.find);
userProfileRouter.put('/', userProfileController.update);

export default userProfileRouter;
