import { Router } from 'express';
import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const passwordController = new PasswordController();

passwordRouter.post('/forgot', passwordController.requestNewPassword);
passwordRouter.post('/reset', passwordController.resetPassword);

export default passwordRouter;
