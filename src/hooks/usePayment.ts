import { useEffect, useState } from 'react';
import { getApi, patchApi } from '../api';
import { Payment } from '../types';

const usePayment = (paymentId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState<Payment>();

  useEffect(() => {
    getApi<Payment>(`payments/${paymentId}`).then((payment) => {
      setIsLoading(false);
      setPayment(payment);
    });
  }, [paymentId]);

  const savePayment = async (payment: any) =>
    patchApi(`payments/${paymentId}`, payment);

  return { isLoading, payment, savePayment };
};

export { usePayment };
