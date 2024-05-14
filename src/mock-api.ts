import { createServer, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

const paymentsId = [
  '9647e181-7de1-4e07-aa89-727934b82313',
  '3e367c4c-1500-4d72-b65d-8db6b91c83a7',
  'da87791a-4c2c-4548-87f7-016526dd57bc',
  '4ba1d8c4-bec4-46e4-b80c-28a8ef446f0a',
  'ea90694e-f078-4882-a494-79d09838996d',
];

const payments: any[] = [];

for (let i = 0; i < paymentsId.length; i++) {
  payments.push({
    id: paymentsId[i],
    status: 'COMPLETED',
    amount: faker.number.int({ min: 100, max: 20000 }),
    fundingSource: faker.helpers.arrayElement([
      'ACH',
      'CREDIT_CARD',
      'PAPER_CHECK',
    ]),
    deliveryMethod: faker.helpers.arrayElement(['ACH', 'PAPER_CHECK']),
  });
}

const createPayment = () => {
  return {
    id: crypto.randomUUID(),
    status: 'IN_PROGRESS',
    amount: 0,
    fundingSource: 'UNKNOWN',
    deliveryMethod: 'UNKNOWN',
  };
};

export function makeServer({ environment }: { environment: string }) {
  let server = createServer({
    environment,
    models: {
      payments: Model,
    },
    seeds(server) {
      payments.forEach((payment) => server.create('payment', payment));
    },
    routes() {
      this.namespace = 'api/payments';

      this.get('/', (schema) => schema.all('payments').models);

      this.get('/:id', (schema, request) => {
        const payment = schema.find('payments', request.params.id);

        if (payment) {
          return payment.attrs;
        }

        return null;
      });

      this.post(
        '/',
        (schema) => schema.create('payments', createPayment()).attrs
      );

      this.patch('/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const id = request.params.id;
        const payment = schema.find('payments', id);

        if (payment) {
          payment.update(newAttrs);
          return payment.attrs;
        }

        return null;
      });
    },
  });
  return server;
}
