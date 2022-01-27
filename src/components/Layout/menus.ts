import HomeIcon from 'assets/images/home.svg';
import AddIcon from 'assets/images/add-circle.svg';
import SliderIcon from 'assets/images/slider.svg';
import HomeActIcon from 'assets/images/home-active.svg';
import HomeDarkIcon from 'assets/images/home-dark.svg';
import AddActIcon from 'assets/images/add-active.svg';
import AddDarkIcon from 'assets/images/plus-dark.svg';
import SliderActIcon from 'assets/images/slider-active.svg';
import SliderDarkIcon from 'assets/images/slider-dark.svg';
import BankIcon from 'assets/images/bank.svg';
import BankActIcon from 'assets/images/bank-active.svg';
import BankDarkIcon from 'assets/images/bank-dark.svg';

export const menus = [
  {
    name: 'Dashboard',
    path: '/',
    icon: HomeIcon,
    activeIcon: HomeActIcon,
    darkIcon: HomeDarkIcon,
  },
  {
    name: 'Mint Contracts',
    path: '/mint-contracts',
    icon: AddIcon,
    activeIcon: AddActIcon,
    darkIcon: AddDarkIcon,
  },
  {
    name: 'My Contracts',
    path: '/my-contracts',
    icon: SliderIcon,
    activeIcon: SliderActIcon,
    darkIcon: SliderDarkIcon,
  },
  {
    name: 'Treasury',
    path: '/treasury',
    icon: BankIcon,
    activeIcon: BankActIcon,
    darkIcon: BankDarkIcon,
  },
];
