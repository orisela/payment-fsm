export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum FundingSource {
  UNKNOWN = 'UNKNOWN',
  ACH = 'ACH',
  CREDIT_CARD = 'CREDIT_CARD',
  PAPER_CHECK = 'PAPER_CHECK',
}

export enum DeliveryMethod {
  UNKNOWN = 'UNKNOWN',
  ACH = 'ACH',
  PAPER_CHECK = 'PAPER_CHECK',
}

export type Payment = {
  id: string;
  status: Status;
  amount: number;
  fundingSource: FundingSource;
  deliveryMethod: DeliveryMethod;
};

export enum PaymentState {
  SET_AMOUNT = 'setAmount',
  SET_FUNDING_SOURCE = 'setFundingSource',
  SET_DELIVERY_METHOD = 'setDeliveryMethod',
}
