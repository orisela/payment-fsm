import { useState } from 'react';
import { PaymentStates, Transitions } from './types';

const transitions: Transitions = {
  [PaymentStates.DRAFT]: { nextState: PaymentStates.SET_FUNDING_SOURCE },
  [PaymentStates.SET_FUNDING_SOURCE]: {
    nextState: PaymentStates.SET_DELIVERY_METHOD,
    prevState: PaymentStates.DRAFT,
  },
  [PaymentStates.SET_DELIVERY_METHOD]: {
    nextState: PaymentStates.REVIEW,
    prevState: PaymentStates.SET_FUNDING_SOURCE,
  },
  [PaymentStates.REVIEW]: {
    nextState: PaymentStates.PAID,
    prevState: PaymentStates.SET_DELIVERY_METHOD,
  },
  [PaymentStates.PAID]: {},
};

const usePayment = (initialState: PaymentStates = PaymentStates.DRAFT) => {
  const [state, setState] = useState<PaymentStates>(initialState);

  const { nextState, prevState } = transitions[state];

  const setNextState = nextState ? () => setState(nextState) : null;
  const setPrevState = prevState ? () => setState(prevState) : null;

  return { state, setNextState, setPrevState };
};

export { usePayment };
