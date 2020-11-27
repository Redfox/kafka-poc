import { Router } from 'express';
import axios from 'axios';

const routes = Router();

routes.get('/', async (_, res) => {
  try {
    const response = await axios.post('http://localhost:8047/query.json', {
      'queryType': 'SQL',
      'query': "select Age, Gender from dfs.tmp.`survey.csv` where Age > '49'"
    });

    return res.json([...response.data.rows])
  } catch(error) {
    console.log('error', error);

    return res.status(500).json('ERROR');
  }
})


export default routes;