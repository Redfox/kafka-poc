import { Router } from 'express';
import Kafka from '../kafka';
import Schedule from './schedule';


const routes = Router();

routes.get('/', (_, res) => {
  return res.json({
    ok: true
  })
});


routes.put('/schedule/:userId', async (req, res) => {
  const { userId } = req.params;
  const { message } = req.body;

  Schedule.reschedule();

  const kafka = new Kafka();

  await kafka.connect();
  await kafka.send({
    id: userId,
    message
  });

  return res.json({
    ok: true
  })
});

export default routes;