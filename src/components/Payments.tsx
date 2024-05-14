import { useNavigate } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';
import { Typography, Table, Button, Divider } from 'antd';
import { paymentColumns } from '../utils';

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
      <Typography.Title>Payments ({payments.length}) </Typography.Title>
      <Button type="primary" onClick={handleCreateNewClick}>
        Create New Payment
      </Button>
      <Divider />
      <Table columns={paymentColumns} dataSource={payments} />
    </div>
  );
};

export default Payments;
