type Status = 'in_progress' | 'completed';

type FundingSource = 'ach' | 'credit_card' | 'paper_check';

type DeliveryMethod = 'ach' | 'paper_check';

export type Payment = {
  id: string;
  status: Status;
  amount: number;
  fundingSource: FundingSource;
  deliveryMethod: DeliveryMethod;
};
