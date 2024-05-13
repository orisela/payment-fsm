import { Link, useNavigate } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';

const Payments = () => {
  const navigate = useNavigate();
  const { isLoading, payments, createPayment } = usePayments();

  if (isLoading) {
    return <div>Loading payment list...</div>;
  }

  const handleCreateNewClick = async () => {
    const payment = await createPayment();
    navigate(`/${payment.id}`);
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
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td>#{index + 1}</td>
              <td>{payment.amount}</td>
              <td>{payment.fundingSource}</td>
              <td>{payment.deliveryMethod}</td>
              <td>{payment.status}</td>
              <td>
                <Link to={`/${payment.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
