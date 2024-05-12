import axios from 'axios';
import { useEffect, useState } from 'react';

const usePaymentList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentList, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/api/payments').then((response) => {
      setPayments(response.data);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, paymentList };
};

const PaymentList = () => {
  const { isLoading, paymentList } = usePaymentList();

  if (isLoading) {
    return <div>Loading payment list...</div>;
  }

  return (
    <div>
      <h1>Payments</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Amount</th>
            <th>Funding Source</th>
            <th>Delivery Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentList.map((payment, index) => (
            <tr key={payment['id']}>
              <td>#{index + 1}</td>
              <td>{payment['amount']}$</td>
              <td>{payment['fundingSource']}</td>
              <td>{payment['deliveryMethod']}</td>
              <td>{payment['status']}</td>
              <td>
                <a href={`/${payment['id']}`}>View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
