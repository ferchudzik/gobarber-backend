import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(verifyAuthentication);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      providerId: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/schedule', providerAppointmentsController.find);

export default appointmentsRouter;
