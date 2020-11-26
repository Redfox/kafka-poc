import { Router } from 'express';
import Kafka from '../kafka';
import Schedule from './schedule';


const routes = Router();

routes.get('/', (_, res) => {
  return res.json({
    ok: true
  })
});


routes.put('/schedule', async (req, res) => {
  
  Schedule.reschedule();

  const kafka = new Kafka();

  await kafka.connect();
  await kafka.send(req.body.message);

  return res.json({
    ok: true
  })
});

export default routes;