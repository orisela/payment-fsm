import { createServer } from 'miragejs';
import payments from './payments.json';

const initServer = () =>
  createServer({
    routes() {
      this.get('/api/payments', () => payments);

      this.put('/api/payments', (_, request) => {
        const payment = {
          id: crypto.randomUUID(),
          status: 'IN_PROGRESS',
          amount: '',
          fundingSource: '',
          deliveryMethod: '',
        };

        payments.push(payment);

        return payment;
      });

      this.get('/api/payments/:id', (_, request) => {
        const { id } = request.params;

        const paymentIndex = payments.findIndex((payment) => payment.id === id);

        if (paymentIndex !== -1) {
          return payments[paymentIndex];
        }

        return null;
      });

      this.post('/api/payments/:id', (_, request) => {
        const body = JSON.parse(request.requestBody);
        const { id } = request.params;

        const paymentIndex = payments.findIndex((payment) => payment.id === id);

        if (paymentIndex !== -1) {
          payments[paymentIndex] = { ...payments[paymentIndex], ...body };
          return payments[paymentIndex];
        }

        return null;
      });
    },
  });

export { initServer };
