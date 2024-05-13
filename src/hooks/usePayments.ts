import { useEffect, useState } from 'react';
import { getApi, postApi } from '../api';
import { Payment } from '../types';

const usePayments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    getApi<Payment[]>('payments').then((payments) => {
      setIsLoading(false);
      setPayments(payments);
    });
  }, [setIsLoading, setPayments]);

  const createPayment = async () => {
    const payment = await postApi<Payment>('payments');
    return payment;
  };

  return { isLoading, payments, createPayment };
};

export { usePayments };
