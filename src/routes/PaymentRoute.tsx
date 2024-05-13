import { useParams } from 'react-router-dom';
import Payment from '../components/Payment';

const PaymentRoute = () => {
  const { paymentId } = useParams();

  if (!paymentId) {
    return <div>Loading payment route...</div>;
  }

  return <Payment paymentId={paymentId} />;
};

export default PaymentRoute;
