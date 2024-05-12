export enum PaymentStatesEnum {
  SET_PAYMENT_AMOUNT = 'set_payment_amount',
  SET_FUNDING_SOURCE = 'set_funding_source',
  SET_DELIVERY_METHOD = 'set_delivery_method',
  REVIEW = 'review',
  PAID = 'paid',
}

type TransitionHandlers = {
  nextState?: PaymentStatesEnum;
  prevState?: PaymentStatesEnum;
  onSave?: (value: string) => Promise<void>;
};

export type Transitions = Record<PaymentStatesEnum, TransitionHandlers>;
