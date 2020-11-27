import { Kafka as Kafkajs } from 'kafkajs'
import axios from 'axios'

class Kafka {
  private kafka: Kafkajs;
  
  constructor() {
    this.kafka = new Kafkajs({
      brokers: ['localhost:9092'],
      clientId: 'notificate'
    });
    
    this.consumer('notificate');
  }
  
  async consumer(topic: string) {
      const consumer = this.kafka.consumer({ groupId: 'notificate-group' });
      
      await consumer.connect();
      await consumer.subscribe({ topic: topic });
      
      await consumer.run({
        eachMessage: async ({ message, topic }): Promise<void> => {
          const payload: { id: number, message: string } = JSON.parse(message.value);

          try {
            const response = await axios.get(`http://localhost:9200/customerinfo/_doc/${payload.id}`);
            const data = response.data._source;
  
            console.log(`topic: ${topic} | Send notification to ${data.name}, token: ${data.push_token}`)
          } catch (err) {
            if(err.response.status === 404) {
              console.log(`topic: ${topic} | User not found`);
            } else {
              console.log('ERRROR');
              throw new Error(err);
            }
          }
        }
      })
  }

}

export default Kafka;
