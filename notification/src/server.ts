import Kafka from './kafka';

class Server {
  constructor() {
    new Kafka();
  }
}

export default new Server();
