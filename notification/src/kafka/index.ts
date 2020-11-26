import { Kafka as Kafkajs, EachMessagePayload } from 'kafkajs'

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
        console.log(`topic:${topic} | ${JSON.parse(message.value)}`)
      }
    })
  }

}

export default Kafka;
