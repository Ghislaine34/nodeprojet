import { Router } from "express";
import amiiboControler, { addAmiiboController } from "./controllers/amiibo";
import typeControler, {addTypeController} from "./controllers/type";
import characterControler from './controllers/character';
import gameseriesControler from './controllers/gameseries';
import amiiboseriesControler from './controllers/amiiboseries';


const createRoutes = () => {
  const routes = Router();

  routes.post('/api/type', addTypeController);
  routes.post('/api/amiibo', addAmiiboController);

  routes.get('/api/amiibo', amiiboControler);
  routes.get('/api/type', typeControler);
  routes.get('/api/character', characterControler);
  routes.get('/api/gameseries', gameseriesControler);
  routes.get('/api/amiiboseries', amiiboseriesControler);

  return routes;
};

export default createRoutes;
