import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PaymentsRoute from './routes/PaymentsRoute';
import PaymentRoute from './routes/PaymentRoute';

import { makeServer } from './mock-api';

if (process.env.NODE_ENV !== 'production') {
  makeServer({ environment: process.env.NODE_ENV });
}

function App() {
  return (
    <div style={{ padding: '30px' }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<PaymentsRoute />} />
          <Route path="/:paymentId" element={<PaymentRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
