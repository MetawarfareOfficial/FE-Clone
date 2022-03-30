import UsdcIcon from 'assets/images/coin-usd1.svg';
import OxblockIcon from 'assets/images/coin-usd.svg';
import DefaultIcon from 'assets/images/coin-default.svg';
import DollarIcon from 'assets/images/coin_dollar-circle-filled.svg';
import DocIcon from 'assets/images/fluent_document.svg';
import ClaimedIcon from 'assets/images/clarity_coin-bag-solid.svg';
import MoneyIcon from 'assets/images/healthicons_money-bag.svg';

export const dataTokens = [
  {
    title: 'Development/ Marketing',
    background: '#EBF1FF',
    color: '#3575FF',
    data: [
      {
        coin: UsdcIcon,
        name: 'USDC',
        value: '5643.3432',
      },
      {
        coin: OxblockIcon,
        name: '0xB',
        value: '7453.7436',
      },
    ],
  },
  {
    title: 'Liquidity pool',
    background: '#FEF0EC',
    color: '#F36643',
    data: [
      {
        coin: OxblockIcon,
        name: '0xB',
        value: '7453.7436',
      },
    ],
  },
  {
    title: 'Treasury',
    background: '#ECE9FE',
    color: '#4524F8',
    data: [
      {
        coin: OxblockIcon,
        name: '0xB',
        value: '7453.7436',
      },
    ],
  },
  {
    title: 'Reward',
    background: '#E9FBF6',
    color: '#05B786',
    data: [
      {
        coin: OxblockIcon,
        name: '0xB',
        value: '7453.7436',
      },
    ],
  },
];

export const statisticData = [
  {
    icon: DefaultIcon,
    name: 'Contracts Minted',
    value: 3050,
    color: '#EBF1FF',
  },
  {
    icon: DollarIcon,
    name: 'Token Received',
    value: 1500,
    color: '#FEECEC',
  },
  {
    icon: DocIcon,
    name: 'Breakeven Contract',
    value: 1500,
    color: '#FFE6FD',
  },
  {
    icon: ClaimedIcon,
    name: 'Claimed Reward',
    value: 4500,
    color: '#FEF0EC',
  },
  {
    icon: MoneyIcon,
    name: 'Rewards  Wallet Balance',
    value: 7000,
    color: '#E9FBF6',
  },
];

const dateData = [
  {
    date: '2022/02/20',
    value: 160,
  },
  {
    date: '2023/01/12',
    value: 200,
  },
  {
    date: '2024/09/23',
    value: 120,
  },
  {
    date: '2025/04/23',
    value: 140,
  },
  {
    date: '2026/06/18',
    value: 90,
  },
  {
    date: '2027/11/12',
    value: 120,
  },
  {
    date: '2028/02/22',
    value: 70,
  },
  {
    date: '2029/05/05',
    value: 100,
  },
  {
    date: '2030/09/09',
    value: 80,
  },
  {
    date: '2031/10/10',
    value: 70,
  },
];

export const statisticChartsData = [
  {
    title: 'Total Contracts Minted',
    label: 'Current Period',
    color: '#3864FF',
    gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(23, 185, 140, 0.08) 100%)',
    chartData: dateData,
  },
  {
    title: 'Claimed Reward',
    label: 'Current Period',
    color: '#F36643',
    gradient: 'linear-gradient(180deg, rgba(243, 102, 67, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
    chartData: dateData,
  },
  {
    title: 'Reward Wallet Balance',
    label: 'Current Period',
    color: '#05B786',
    gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(23, 185, 140, 0.08) 100%)',
    chartData: dateData,
  },
];
