import { createServer, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

const payments: any[] = [];

for (let i = 0; i < 20; i++) {
  payments.push({
    id: crypto.randomUUID(),
    status: 'completed',
    amount: faker.number.int({ min: 100, max: 20000 }),
    fundingSource: faker.helpers.arrayElement(['ach', 'credit', 'check']),
    deliveryMethod: faker.helpers.arrayElement(['ach', 'check']),
  });
}

const createPayment = () => {
  return {
    id: crypto.randomUUID(),
    status: 'in_progress',
    amount: '',
    fundingSource: '',
    deliveryMethod: '',
  };
};

export function makeServer({ environment }: { environment: string }) {
  let server = createServer({
    environment,
    models: {
      payments: Model,
    },
    seeds(server) {
      payments.forEach((payment) => server.create('payment', { ...payment }));
    },
    routes() {
      this.namespace = 'api/payments';

      this.get('/', (schema) => schema.all('payments'));

      this.get('/:id', (schema, request) =>
        schema.find('payments', request.params.id)
      );

      this.post('/', (schema) => schema.create('payments', createPayment()));

      this.patch('/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const id = request.params.id;
        const payment = schema.find('payments', id);

        if (payment) {
          payment.update(newAttrs);
        }

        return payment;
      });
    },
  });
  return server;
}
