import React, { useState, useLayoutEffect, useEffect } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Link, LinkProps, useHistory, useLocation } from 'react-router-dom';
import { menus } from './menus';
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
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';

import MySwitch from 'components/Base/Switch';
import Banner from 'components/Base/Banner';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LogoImg from 'assets/images/logo.svg';
import LogoIcon from 'assets/images/logo-ic.svg';
import RefreshIcon from 'assets/images/refresh.svg';

interface Props {
  name?: string;
  children: React.ReactChild;
}

interface MainLayoutProps extends BoxProps {
  open: boolean;
}

interface ListItemCustomProps extends ListItemProps {
  active: boolean;
  open: boolean;
}

interface ListItemIconCustomProps extends ListItemIconProps {
  open: boolean;
}

interface ListCustomProps extends ListProps {
  open: boolean;
}

const drawerWidth = 224;
const drawerWidthMinus = 100;

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
  width: drawerWidthMinus,
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  [theme.breakpoints.up('sm')]: {
    width: drawerWidthMinus,
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
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',

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

const MenuCustom = styled(ListItem)<ListItemCustomProps>(({ active, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 18px',
  borderRadius: '14px',
  textTransform: 'capitalize',
  marginBottom: '10px',
  height: '56px',
  // overflow: 'hidden',
  backgroundColor: active ? '#dbecfd88' : '#fff',
  width: `${open ? '100%' : '56px'}`,

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

const SideMenus = styled(List)<ListCustomProps>(({ open }) => ({
  padding: `0 ${open ? 16 : 22}px`,
}));

const MenuIconCustom = styled(ListItemIcon)<ListItemIconCustomProps>(({ open }) => ({
  minWidth: 'auto',

  img: {
    width: '24px',
    height: '24px',
    marginRight: open ? '13px' : '0',
  },
}));

const MainLayout = styled(Box)<MainLayoutProps>(({ open }) => ({
  background: '#FAFBFE',
  // width: '100%',
  minHeight: '100vh',
  padding: '30px',
  boxSizing: 'border-box',
  width: `calc(100% - ${open ? drawerWidth : drawerWidthMinus}px)`,
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
  fontFamily: 'Poppins',
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

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: '#3864FF',
    color: '#fff',
    padding: '11px 26px',
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 'bold',
    boxShadow: '1px 5px 29px rgba(50, 71, 117, 0.2)',
    borderRadius: '18px',
    left: '15px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#3864FF',
  },
}));

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const Layout: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [lightMode, setLightMode] = React.useState(true);
  const [width] = useWindowSize();

  useEffect(() => {
    if (width < 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLightMode(event.target.checked);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const openMenu = (url: string) => {
    history.push(url);
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
        <SideMenus open={open}>
          {menus &&
            menus.map((item, i) => (
              <MenuCustom
                key={i}
                open={open}
                active={location.pathname === item.path}
                onClick={() => openMenu(item.path)}
              >
                <MenuIconCustom open={open}>
                  {!open ? (
                    <TooltipCustom title={item.name} arrow placement="right">
                      {location.pathname === item.path ? (
                        <img alt="" src={item.activeIcon} />
                      ) : (
                        <img alt="" src={item.icon} />
                      )}
                    </TooltipCustom>
                  ) : (
                    <>
                      {location.pathname === item.path ? (
                        <img alt="" src={item.activeIcon} />
                      ) : (
                        <img alt="" src={item.icon} />
                      )}
                    </>
                  )}
                </MenuIconCustom>
                {open && <ListItemText primary={item.name} />}
              </MenuCustom>
            ))}
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

      <MainLayout component="main" open={open}>
        <Banner isBg={location.pathname !== '/'} />
        {children}
      </MainLayout>
    </Box>
  );
};

export default Layout;
