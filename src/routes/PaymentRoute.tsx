import { useParams } from 'react-router-dom';
import PaymentItem from '../components/PaymentItem';

const PaymentRoute = () => {
  const { paymentId } = useParams();

  if (!paymentId) {
    return <div>Loading payment route...</div>;
  }

  return <PaymentItem paymentId={paymentId} />;
};

export default PaymentRoute;
