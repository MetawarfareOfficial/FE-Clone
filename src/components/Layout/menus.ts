import HomeIcon from 'assets/images/home.svg';
import AddIcon from 'assets/images/add-circle.svg';
import SliderIcon from 'assets/images/slider.svg';
import HomeActIcon from 'assets/images/home-active.svg';
import AddActIcon from 'assets/images/add-active.svg';
import SliderActIcon from 'assets/images/slider-active.svg';

export const menus = [
  {
    name: 'Dashboard',
    path: '/',
    icon: HomeIcon,
    activeIcon: HomeActIcon,
  },
  {
    name: 'Mint Contracts',
    path: '/mint-contracts',
    icon: AddIcon,
    activeIcon: AddActIcon,
  },
  {
    name: 'My Contracts',
    path: '/my-contracts',
    icon: SliderIcon,
    activeIcon: SliderActIcon,
  },
];
