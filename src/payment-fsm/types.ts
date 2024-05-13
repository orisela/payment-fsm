export enum PaymentStatesEnum {
  SET_PAYMENT_AMOUNT = 'set_payment_amount',
  SET_FUNDING_SOURCE = 'set_funding_source',
  SET_DELIVERY_METHOD = 'set_delivery_method',
  REVIEW = 'review',
  COMPLETED = 'completed',
}

type TransitionHandlers = {
  title: string;
  nextState?: PaymentStatesEnum;
  prevState?: PaymentStatesEnum;
  stateFieldKey?: string;
  saveValue?: (value?: string) => string;
};

export type Transitions = Record<PaymentStatesEnum, TransitionHandlers>;
