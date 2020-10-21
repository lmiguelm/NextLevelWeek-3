import { Router } from 'express';

import authMiddleware from './middlewares/auth';
import multer from 'multer';

import uploadConfig from './config/upload';
import AuthController from './controllers/AuthController';
import OrphanagesController from './controllers/OrphanagesController';
import UserController from './controllers/UserController';

const routes = Router();
routes.use(authMiddleware as any);
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.post('/login', AuthController.login);

export default routes;