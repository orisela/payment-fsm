import { Link } from 'react-router-dom';
import { TableProps, Tag } from 'antd';

import { RiBankFill } from 'react-icons/ri';
import { TbCashBanknote } from 'react-icons/tb';
import { RiBankCard2Line } from 'react-icons/ri';
import { GrStatusUnknown } from 'react-icons/gr';
import { DeliveryMethod, FundingSource, Payment, Status } from './types';

export const mapValueToText = {
  [Status.COMPLETED]: 'Completed',
  [Status.IN_PROGRESS]: 'In Progress',
};

export const mapStatusToColor = {
  [Status.IN_PROGRESS]: 'orange',
  [Status.COMPLETED]: 'green',
};

export const mapFundingSourceToIcon = {
  UNKNOWN: <GrStatusUnknown />,
  ACH: <RiBankFill />,
  PAPER_CHECK: <TbCashBanknote />,
  CREDIT_CARD: <RiBankCard2Line />,
};

export const paymentColumns: TableProps<Payment>['columns'] = [
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (value: number) => `${value.toLocaleString()} $`,
  },
  {
    title: 'Funding Source',
    dataIndex: 'fundingSource',
    render: (value: FundingSource) => mapFundingSourceToIcon[value],
  },
  {
    title: 'Delivery Method',
    dataIndex: 'deliveryMethod',
    render: (value: DeliveryMethod) => mapFundingSourceToIcon[value],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value: Status) => (
      <Tag color={mapStatusToColor[value]}>{mapValueToText[value]}</Tag>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (value: string) => <Link to={`/${value}`}>Edit</Link>,
  },
];
