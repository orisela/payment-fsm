import { FC, useEffect } from 'react';
import { useFsm } from '../fsm/useFsm';
import { usePayment } from '../hooks/usePayment';
import { FundingSource, DeliveryMethod, PaymentState } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  Typography,
  Input,
  Select,
  Space,
  Button,
  Divider,
  Tag,
} from 'antd';
import { mapStatusToColor, mapValueToText } from '../utils';

const fsmConfig = {
  initial: PaymentState.SET_AMOUNT,
  states: {
    [PaymentState.SET_AMOUNT]: {
      prev: PaymentState.SET_DELIVERY_METHOD,
      next: PaymentState.SET_FUNDING_SOURCE,
    },
    [PaymentState.SET_FUNDING_SOURCE]: {
      prev: PaymentState.SET_AMOUNT,
      next: PaymentState.SET_DELIVERY_METHOD,
    },
    [PaymentState.SET_DELIVERY_METHOD]: {
      prev: PaymentState.SET_FUNDING_SOURCE,
      next: PaymentState.SET_AMOUNT,
    },
  },
};

type PaymentProps = { paymentId: string };

const Payment: FC<PaymentProps> = ({ paymentId }) => {
  const navigate = useNavigate();

  const { payment, isLoading, onChange, onSave } = usePayment(paymentId);
  const { state, transition } = useFsm(fsmConfig);

  if (isLoading) {
    return <div>Payment {paymentId} loading...</div>;
  }

  if (!payment) {
    return <div>Payment {paymentId} not found...</div>;
  }

  const handleSaveClick = async () => {
    await onSave();
    navigate('/');
  };

  return (
    <div>
      <Breadcrumb
        items={[{ title: <Link to="/">Payments</Link> }, { title: paymentId }]}
      />
      <Divider />

      <Tag color={mapStatusToColor[payment.status]}>
        {mapValueToText[payment.status]}
      </Tag>
      <Typography.Title>
        {mapValueToText[state as PaymentState]}
      </Typography.Title>

      <div>
        <Space.Compact>
          {state === PaymentState.SET_AMOUNT && (
            <PaymentFieldInputNumber
              value={payment.amount}
              onChange={(newValue) => onChange({ amount: newValue })}
            />
          )}

          {state === PaymentState.SET_FUNDING_SOURCE && (
            <PaymentFieldSelect
              value={payment.fundingSource}
              onChange={(newValue) =>
                onChange({ fundingSource: newValue as FundingSource })
              }
              options={Object.keys(FundingSource)}
            />
          )}

          {state === PaymentState.SET_DELIVERY_METHOD && (
            <PaymentFieldSelect
              value={payment.deliveryMethod}
              onChange={(newValue) =>
                onChange({ deliveryMethod: newValue as DeliveryMethod })
              }
              options={Object.keys(DeliveryMethod)}
            />
          )}
        </Space.Compact>
      </div>

      <Button onClick={() => transition.prev()}>{'<-'} Prev</Button>
      <Button type="primary" onClick={() => transition.next()}>
        Next {'->'}
      </Button>
      <Divider />

      <Button type="primary" onClick={handleSaveClick}>
        Save & Exit
      </Button>
    </div>
  );
};

type PaymentFieldInputNumberProps = {
  value: number;
  onChange: (newValue: number) => void;
};

const PaymentFieldInputNumber: FC<PaymentFieldInputNumberProps> = ({
  value,
  onChange,
}) => (
  <Input
    type="number"
    width={500}
    value={value}
    onChange={(e) => onChange(Number(e.target.value) ?? 0)}
  />
);

type PaymentFieldSelectProps = {
  value: string;
  onChange: (newValue: string) => void;
  options: string[];
};

const PaymentFieldSelect: FC<PaymentFieldSelectProps> = ({
  value,
  onChange,
  options,
}) => (
  <Select value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </Select>
);

export default Payment;
