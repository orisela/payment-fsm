export enum PaymentStates {
  DRAFT = 'draft',
  SET_FUNDING_SOURCE = 'set_funding_source',
  SET_DELIVERY_METHOD = 'set_delivery_method',
  REVIEW = 'review',
  PAID = 'paid',
}

type TransitionHandlers = {
  nextState?: PaymentStates;
  prevState?: PaymentStates;
};

export type Transitions = Record<PaymentStates, TransitionHandlers>;
