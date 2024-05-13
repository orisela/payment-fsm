import { useNavigate } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';

const Payments = () => {
  const navigate = useNavigate();
  const { isLoading, paymentList, createPayment } = usePayments();

  if (isLoading) {
    return <div>Loading payment list...</div>;
  }

  const handleCreateNewClick = async () => {
    const newPaymentId = await createPayment();
    navigate(`/${newPaymentId}`);
  };

  return (
    <div>
      <h1>Payments</h1>
      <button onClick={handleCreateNewClick}>Create New</button>
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
              <td>{payment['amount']}</td>
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

export default Payments;
