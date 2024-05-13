import { FC } from 'react';
import { useFsm } from '../fsm/useFsm';
import { usePayment } from '../hooks/usePayment';
import { FundingSource, DeliveryMethod } from '../types';
import { Link, useNavigate } from 'react-router-dom';

enum PaymentState {
  SET_AMOUNT = 'setAmount',
  SET_FUNDING_SOURCE = 'setFundingSource',
  SET_DELIVERY_METHOD = 'setDeliveryMethod',
}

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
  const { state, transition, nextState, prevState } = useFsm(fsmConfig);

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
      <div>
        <Link to="/">Payments</Link> {' / '}{' '}
        <Link to={`/${paymentId}`}>{paymentId}</Link>
      </div>

      <h1>{state}</h1>
      <div>
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
      </div>
      <button onClick={() => transition.next()}>{nextState}</button>
      <button onClick={() => transition.prev()}>{prevState}</button>
      <button onClick={handleSaveClick}>Save & Exit</button>
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
  <input
    type="number"
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
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </select>
);

export default Payment;
