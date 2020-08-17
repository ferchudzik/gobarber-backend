import { Router } from 'express';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(verifyAuthentication);

providersRouter.get('/', providersController.find);
providersRouter.get(
  '/:providerId/day-availability',
  providerDayAvailabilityController.find,
);
providersRouter.get(
  '/:providerId/month-availability',
  providerMonthAvailabilityController.find,
);

export default providersRouter;
