import { Router } from 'express';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(verifyAuthentication);

providersRouter.get('/', providersController.find);

export default providersRouter;
