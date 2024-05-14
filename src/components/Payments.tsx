import { useNavigate } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';
import { Typography, Table, Button, Divider, Breadcrumb, Spin } from 'antd';
import { paymentColumns } from '../utils';

const Payments = () => {
  const navigate = useNavigate();
  const { isLoading, payments, createPayment } = usePayments();

  if (isLoading) {
    return <Spin />;
  }

  const handleCreateNewClick = async () => {
    const payment = await createPayment();
    navigate(`/${payment.id}`);
  };

  return (
    <div>
      <Breadcrumb items={[{ title: 'Payments' }]} />
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
