import { useState } from 'react';
import { PaymentStatesEnum, Transitions } from './types';

const transitions: Transitions = {
  [PaymentStatesEnum.SET_PAYMENT_AMOUNT]: {
    nextState: PaymentStatesEnum.SET_FUNDING_SOURCE,
    onSave: async (value: string) => console.log(value),
  },
  [PaymentStatesEnum.SET_FUNDING_SOURCE]: {
    nextState: PaymentStatesEnum.SET_DELIVERY_METHOD,
    prevState: PaymentStatesEnum.SET_PAYMENT_AMOUNT,
    onSave: async (value: string) => console.log(value),
  },
  [PaymentStatesEnum.SET_DELIVERY_METHOD]: {
    nextState: PaymentStatesEnum.REVIEW,
    prevState: PaymentStatesEnum.SET_FUNDING_SOURCE,
    onSave: async (value: string) => console.log(value),
  },
  [PaymentStatesEnum.REVIEW]: {
    nextState: PaymentStatesEnum.PAID,
    prevState: PaymentStatesEnum.SET_DELIVERY_METHOD,
    onSave: async (value: string) => console.log(value),
  },
  [PaymentStatesEnum.PAID]: {},
};

const usePayment = () => {
  const [state, setState] = useState<PaymentStatesEnum>(
    PaymentStatesEnum.SET_PAYMENT_AMOUNT
  );

  const { nextState, prevState, onSave } = transitions[state];

  const onSaveClick = onSave ? (value: string) => onSave(value) : null;
  const onNextClick = nextState ? () => setState(nextState) : null;
  const onPrevClick = prevState ? () => setState(prevState) : null;

  return { state, onSaveClick, onNextClick, onPrevClick };
};

export { usePayment };
