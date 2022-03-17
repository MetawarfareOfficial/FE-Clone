import AvaxImg from 'assets/images/avax-token.png';
import OxImg from 'assets/images/0x-token.png';

export const TokensList = [
  {
    logo: AvaxImg,
    name: 'AVAX',
    balance: 5643.3432,
    active: true,
  },
  {
    logo: OxImg,
    name: '0xB',
    balance: 7453.7436,
    active: false,
  },
];

export const recentData = [
  {
    from: AvaxImg,
    to: OxImg,
    title: 'Swap 2 0xB for 0.06 AVAX',
    date: '10/2/2022',
    time: '10:21',
  },
  {
    from: OxImg,
    to: AvaxImg,
    title: 'Swap 0.06 AVAX for 2 0xB',
    date: '9/2/2022',
    time: '05:47',
  },
];
