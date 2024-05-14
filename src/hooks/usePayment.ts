import { useEffect, useState } from 'react';
import { getApi, patchApi } from '../api';
import { DeliveryMethod, FundingSource, Payment, Status } from '../types';

const getPaymentStatus = (payment: Payment) => {
  if (payment.amount === 0) {
    return Status.IN_PROGRESS;
  }

  if (payment.fundingSource === FundingSource.UNKNOWN) {
    return Status.IN_PROGRESS;
  }

  if (payment.deliveryMethod === DeliveryMethod.UNKNOWN) {
    return Status.IN_PROGRESS;
  }

  return Status.COMPLETED;
};

const usePayment = (paymentId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState<Payment>();

  useEffect(() => {
    getApi<Payment>(`payments/${paymentId}`).then((payment) => {
      setIsLoading(false);
      setPayment(payment);
    });
  }, [paymentId]);

  const onChange = (newPaymentAttr: Partial<Payment>) => {
    if (payment) {
      const newPayment = { ...payment, ...newPaymentAttr };
      setPayment({ ...newPayment, status: getPaymentStatus(newPayment) });
    }
  };

  const onSave = async () => {
    if (payment) {
      await patchApi(`payments/${paymentId}`, payment);
    }
  };

  return { isLoading, payment, onChange, onSave };
};

export { usePayment };
