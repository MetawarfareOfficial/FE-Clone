import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Link, LinkProps, useHistory, useLocation } from 'react-router-dom';

import MuiDrawer from '@mui/material/Drawer';
import { BoxProps } from '@mui/material/Box';
import {
  Box,
  IconButton,
  Button,
  ButtonProps,
  List,
  ListProps,
  ListItem,
  ListItemProps,
  ListItemText,
  ListItemIcon,
  ListItemIconProps,
} from '@mui/material';

import MySwitch from 'components/Base/Switch';
import Banner from 'components/Base/Banner';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LogoImg from 'assets/images/logo.svg';
import LogoIcon from 'assets/images/logo-ic.svg';
import HomeIcon from 'assets/images/home.svg';
import AddIcon from 'assets/images/add-circle.svg';
import SliderIcon from 'assets/images/slider.svg';
import HomeActIcon from 'assets/images/home-active.svg';
import AddActIcon from 'assets/images/add-active.svg';
import SliderActIcon from 'assets/images/slider-active.svg';
import RefreshIcon from 'assets/images/refresh.svg';

interface Props {
  name?: string;
  children: React.ReactChild;
}

interface ListItemCustomProps extends ListItemProps {
  active: boolean;
}

interface ListItemIconCustomProps extends ListItemIconProps {
  open: boolean;
}

const drawerWidth = 224;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'unset',
  border: 'none',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  border: 'none',
  overflow: 'unset',
  // width: `calc(${theme.spacing(7)} + 1px)`,
  width: '100px',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  [theme.breakpoints.up('sm')]: {
    width: '100px',
    // width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '38px 34px',
  position: 'relative',
  marginBottom: '22px',
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  width: '18px',
  height: '18px',
  backgroundColor: `${theme.palette.primary.light}`,
  borderRadius: '50%',
  zIndex: 200,
  position: 'absolute',
  right: '-9px',
  color: '#fff',
  fontSize: '10px',
  padding: '2px',

  svg: {
    width: '16px',
  },

  '&:hover': {
    backgroundColor: `${theme.palette.primary.light}`,
    color: '#fff',
  },
}));

const Logo = styled(Link)<LinkProps>(() => ({
  display: 'inline-flex',
  maxWidth: '155px',
  alignItem: 'center',
  justifyContent: 'center',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const MenuCustom = styled(ListItem)<ListItemCustomProps>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '16px 10px',
  borderRadius: '14px',
  textTransform: 'capitalize',
  marginBottom: '10px',
  backgroundColor: active ? '#dbecfd88' : '#fff',

  span: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '26px',
    fontFamily: 'Poppins',
    fontWeight: active ? 'bold' : 'normal',
    color: active ? '#293247' : '#A4A9B7',
  },

  svg: {
    marginRight: '13px',
    fontSize: '24px',
  },

  '&:hover': {
    cursor: 'pointer',
    color: '#293247',
    fontWeight: 'bold',
  },
}));

const SideMenus = styled(List)<ListProps>(() => ({
  padding: '0 16px',
}));

const MenuIconCustom = styled(ListItemIcon)<ListItemIconCustomProps>(({ open }) => ({
  minWidth: 'auto',

  img: {
    width: '24px',
    height: '24px',
    marginRight: open ? '13px' : '0',
  },
}));

const MainLayout = styled(Box)<BoxProps>(() => ({
  background: '#FAFBFE',
  width: '100%',
  minHeight: '100vh',
  padding: '30px',
  boxSizing: 'border-box',
  // height: '100vh',
  // overflow: 'hidden',
}));

const SideAction = styled(Box)<BoxProps>(() => ({
  marginTop: 'auto',
  marginBottom: '25px',
  textAlign: 'center',
}));

const ButtonRefresh = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'none',
  fontWeight: '700',
  color: theme.palette.primary.main,
  padding: '6px 35px',
  borderRadius: '8px',
  marginBottom: '20px',
  fontSize: '14px',
  lineHeight: '21px',
}));

const ButtonIconRefresh = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: '20px',
  minWidth: '34px',
  width: '34px',
  height: '34px',
  borderRadius: '10px',
  padding: '10px',

  img: {
    width: '13px',
  },
}));

const BoxSwitch = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  label: {
    fontSize: '10px',
    color: '#A4A9B7',
    lineHeight: '18px',
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
  },
}));

const Layout: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState(0);
  const [lightMode, setLightMode] = React.useState(true);

  React.useEffect(() => {
    const url = history.location.pathname;
    let i;
    if (url === '/') {
      i = 0;
    } else if (url === '/mint-contract') {
      i = 1;
    } else {
      i = 2;
    }
    setActive(i);
  }, []);

  const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLightMode(event.target.checked);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const openMenu = (url: string, index: number) => {
    history.push(url);
    setActive(index);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Logo to="/">{open ? <img alt="" src={LogoImg} /> : <img alt="" src={LogoIcon} />}</Logo>
          <ToggleButton onClick={handleToggle}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</ToggleButton>
        </DrawerHeader>
        <SideMenus>
          <MenuCustom active={active === 0 ? true : false} onClick={() => openMenu('/', 0)}>
            <MenuIconCustom open={open}>
              {active === 0 ? <img alt="" src={HomeActIcon} /> : <img alt="" src={HomeIcon} />}
            </MenuIconCustom>
            {open && <ListItemText primary="Dashboard" />}
          </MenuCustom>

          <MenuCustom active={active === 1 ? true : false} onClick={() => openMenu('/mint-contract', 1)}>
            <MenuIconCustom open={open}>
              {active === 1 ? <img alt="" src={AddActIcon} /> : <img alt="" src={AddIcon} />}
            </MenuIconCustom>
            {open && <ListItemText primary="Mint Contracts" />}
          </MenuCustom>

          <MenuCustom active={active === 2 ? true : false} onClick={() => openMenu('/my-contract', 2)}>
            <MenuIconCustom open={open}>
              {active === 2 ? <img alt="" src={SliderActIcon} /> : <img alt="" src={SliderIcon} />}
            </MenuIconCustom>
            {open && <ListItemText primary="My Contracts" />}
          </MenuCustom>
        </SideMenus>

        <SideAction>
          {open ? (
            <ButtonRefresh onClick={handleRefresh} variant="outlined" color="primary">
              Refresh
            </ButtonRefresh>
          ) : (
            <ButtonIconRefresh onClick={handleRefresh} variant="outlined" color="primary">
              <img alt="" src={RefreshIcon} />
            </ButtonIconRefresh>
          )}

          <BoxSwitch>
            {open && <label>Light</label>}
            <MySwitch checked={lightMode} onChange={handleChangeMode} />
            {open && <label>Dark</label>}
          </BoxSwitch>
        </SideAction>
      </Drawer>

      <MainLayout component="main">
        <Banner isBg={location.pathname !== '/'} />
        {children}
      </MainLayout>
    </Box>
  );
};

export default Layout;
