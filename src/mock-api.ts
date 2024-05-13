import { createServer, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

const paymentsId = [
  '9647e181-7de1-4e07-aa89-727934b82313',
  '3e367c4c-1500-4d72-b65d-8db6b91c83a7',
  'da87791a-4c2c-4548-87f7-016526dd57bc',
  '4ba1d8c4-bec4-46e4-b80c-28a8ef446f0a',
  'ea90694e-f078-4882-a494-79d09838996d',
  '97305020-0eeb-42dc-b05e-8427b69a658d',
  'b23fd7ab-3694-42de-9533-125e2538a4ba',
  '04e978e9-ea6a-4ab0-a4d0-d2e8543a3388',
  '73145f4e-7e58-4077-ba02-fd7501bfec60',
  '0bc7040b-b71b-4bf9-a752-3b4619c7aa48',
  'a54fe988-9b09-4c06-8c31-78e55f78d121',
  '32071758-18d2-42ad-b4ff-8a3473b39a2b',
  'd3bb8324-a5c4-44ce-b0f4-cfbf7961f83c',
  '9bd2cfee-90d9-446d-8ea0-98dd03bf9bdd',
  '625ed51a-09df-4545-a6c9-3c3e12d419e1',
  '660f6d92-47a1-47c1-a91c-1e4d61c339c3',
  '4a059bbe-c364-4916-be9d-3023ea1b256e',
  '874e88cc-1b93-4eb6-96f3-4a145179418a',
  '23e65a5e-b22a-4c00-890b-dc9143ddc457',
  '95b3995a-040b-44ce-b6dc-59cc3bb30bde',
];

const payments: any[] = [];

for (let i = 0; i < 20; i++) {
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
