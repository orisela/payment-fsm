import { useEffect, useState } from 'react';
import { PaymentStatesEnum, Transitions } from './types';

const transitions: Transitions = {
  [PaymentStatesEnum.SET_PAYMENT_AMOUNT]: {
    title: 'Set Payment Amount',
    nextState: PaymentStatesEnum.SET_FUNDING_SOURCE,
    stateFieldKey: 'amount',
  },
  [PaymentStatesEnum.SET_FUNDING_SOURCE]: {
    title: 'Set Funding Source',
    nextState: PaymentStatesEnum.SET_DELIVERY_METHOD,
    prevState: PaymentStatesEnum.SET_PAYMENT_AMOUNT,
    stateFieldKey: 'fundingSource',
  },
  [PaymentStatesEnum.SET_DELIVERY_METHOD]: {
    title: 'Set Delivery Method',
    nextState: PaymentStatesEnum.REVIEW,
    prevState: PaymentStatesEnum.SET_FUNDING_SOURCE,
    stateFieldKey: 'deliveryMethod',
  },
  [PaymentStatesEnum.REVIEW]: {
    title: 'Review',
    nextState: PaymentStatesEnum.COMPLETED,
    prevState: PaymentStatesEnum.SET_DELIVERY_METHOD,
  },
  [PaymentStatesEnum.COMPLETED]: {
    title: 'Completed',
    nextState: PaymentStatesEnum.COMPLETED,
    prevState: PaymentStatesEnum.REVIEW,
  },
};

const usePaymentFSM = (payment: any) => {
  const [state, setState] = useState<PaymentStatesEnum>(
    PaymentStatesEnum.SET_PAYMENT_AMOUNT
  );

  useEffect(() => {
    if (payment && payment['status'] === PaymentStatesEnum.COMPLETED) {
      setState(PaymentStatesEnum.COMPLETED);
    }
  }, [payment]);

  const { title, stateFieldKey, nextState, prevState } = transitions[state];

  const onNextClick = nextState ? () => setState(nextState) : null;
  const onPrevClick = prevState ? () => setState(prevState) : null;

  return {
    title,
    stateFieldKey,
    onNextClick,
    onPrevClick,
    nextState,
  };
};

export { usePaymentFSM };
