import { Kafka as Kafkajs, EachMessagePayload } from 'kafkajs'
import { Client } from '@elastic/elasticsearch';
import axios from 'axios'

const client = new Client({ node: 'http://localhost:9200' })
class Kafka {
  private kafka: Kafkajs;
  
  constructor() {
    this.kafka = new Kafkajs({
      brokers: ['localhost:9092'],
      clientId: 'notificate'
    });
    
    this.consumer('notificate');
  }
  
  async consumer(topic: string
    // eachMessage: (payload: EachMessagePayload) => Promise<void>
    ) {
      const consumer = this.kafka.consumer({ groupId: 'notificate-group' });
      
      await consumer.connect();
      await consumer.subscribe({ topic: topic });
      
      await consumer.run({
        eachMessage: async ({ message, topic, partition }): Promise<void> => {
          const payload: { id: number, message: string } = JSON.parse(message.value);
          console.log('payload', payload)
          
          // client.search({
          //   index: 'userinfo',
          //   body: {
          //     _id: payload.id.toString()
          //   }
          // }).then(e => {
          //   console.log(e)
          // }).catch(err => {
          //   console.log('error', err)
          // })

          const response = await axios.get(`http://localhost:9200/userinfo/_doc/${payload.id}`);
          const data = response.data._source;

          console.log(`topic: ${topic} | Send notification to ${data.name}, token: ${data.push_token}`)
        }
      })
  }

}

export default Kafka;
