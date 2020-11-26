import { CompressionTypes, Kafka as Kafkajs, Producer, ProducerRecord } from 'kafkajs';

class Kafka {
  private kafka: Kafkajs;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafkajs({
      brokers: ['localhost:9092'],
      clientId: 'notificate',
    });

    this.producer = this.kafka.producer();
  }

  async send(messages: any) {
    const producerConfig: ProducerRecord = {
      messages: [ { value: JSON.stringify(messages) } ],
      topic: 'notificate',
      compression: CompressionTypes.GZIP,
    }

    await this.producer.send(producerConfig);
  }

  async connect() {
    await this.producer.connect();
  }
}

export default Kafka;