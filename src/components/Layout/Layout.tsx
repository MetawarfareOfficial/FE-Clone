import React, { useEffect, useRef } from 'react';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import { Link, LinkProps, useHistory, useLocation } from 'react-router-dom';
import { menus } from './menus';
import { ColorModeContext } from 'theme';
import { useWindowSize } from 'hooks/useWindowSize';
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
  ListItemTextProps,
  ListItemIcon,
  ListItemIconProps,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';

// import MySwitch from 'components/Base/Switch';
import SwitchMode from 'components/Base/SwitchMode';
import Banner from 'components/Base/Banner';
import Header from './Header';
import SliderScroll from 'components/Base/SliderScroll';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LogoImg from 'assets/images/logo.svg';
import LogoIcon from 'assets/images/logo-ic.svg';
import LogoDarkImg from 'assets/images/logo-dark.svg';
import RefreshIcon from 'assets/images/refresh.svg';
import useFetchInforContract from 'hooks/useFetchInforContract';

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

interface BoxMenuProps extends BoxProps {
  active: boolean;
}

interface ListItemTextCustomProps extends ListItemTextProps {
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
  background: theme.palette.mode === 'dark' ? '#171717' : '#fff',
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
  background:
    theme.palette.mode === 'light'
      ? theme.palette.primary.light
      : `linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)`,
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

const MenuCustom = styled(ListItem)<ListItemCustomProps>(({ active, open, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 18px',
  borderRadius: '14px',
  textTransform: 'capitalize',
  marginBottom: '10px',
  height: '56px',
  // overflow: 'hidden',
  backgroundColor: active ? (theme.palette.mode === 'light' ? '#dbecfd88' : '#212121') : 'unset',
  width: `${open ? '100%' : '56px'}`,

  span: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '26px',
    fontFamily: 'Poppins',
    fontWeight: active ? 'bold' : 'normal',
    color: active
      ? theme.palette.mode === 'light'
        ? '#293247'
        : '#fff'
      : theme.palette.mode === 'light'
      ? '#A4A9B7'
      : 'rgba(164, 169, 183, 0.56)',
  },

  svg: {
    marginRight: '13px',
    fontSize: '24px',
  },

  '&:hover': {
    cursor: 'pointer',
    color: '#293247',
    fontWeight: 'bold',
    background: '#dbecfd88',
    opacity: 0.8,
  },
}));

const SideMenus = styled(List)<ListCustomProps>(({ open, theme }) => ({
  padding: `0 ${open ? 16 : 22}px`,

  [theme.breakpoints.down('md')]: {
    // display: 'none',
  },
}));

const MenuIconCustom = styled(ListItemIcon)<ListItemIconCustomProps>(({ open }) => ({
  minWidth: 'auto',

  img: {
    width: '24px',
    height: '24px',
    marginRight: open ? '13px' : '0',
  },
}));

const MainLayout = styled(Box)<MainLayoutProps>(({ open, theme }) => ({
  background: theme.palette.mode === 'light' ? '#FAFBFE' : '#1e1e1e',
  // width: '100%',
  minHeight: '100vh',
  padding: '30px',
  boxSizing: 'border-box',
  width: `calc(100% - ${open ? drawerWidth : drawerWidthMinus}px)`,
  // height: '100vh',
  // overflow: 'hidden',

  [theme.breakpoints.down('lg')]: {
    padding: '24px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '96px 24px 24px',
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '96px 0 24px',
    width: '100%',
  },
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
  color: theme.palette.primary[theme.palette.mode],
  borderColor: theme.palette.mode === 'light' ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.43)',
  padding: '6px 35px',
  borderRadius: '8px',
  marginBottom: '20px',
  fontSize: '14px',
  lineHeight: '21px',
}));

const ButtonIconRefresh = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.primary[theme.palette.mode],
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

const BoxSwitch = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  label: {
    fontSize: '10px',
    color: theme.palette.mode === 'dark' ? '#A4A9B7' : '#A4A9B7',
    lineHeight: '18px',
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
  },
}));

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
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

  [theme.breakpoints.down('lg')]: {
    [`& .${tooltipClasses.tooltip}`]: {
      padding: '8px 20px',
      fontSize: '12px',
      lineHeight: '22px',
      borderRadius: '10px',
      left: '10px',
    },
  },
}));

const MenusMobile = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  marginBottom: '34px',

  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
  },
}));

const MenuItem = styled(Box)<BoxMenuProps>(({ active }) => ({
  border: `1px solid ${active ? '#3864FF' : '#A4A9B7'}`,
  boxSizing: 'border-box',
  borderRadius: '14px',
  background: active ? '#3864FF' : 'unset',
  padding: '10px 19px',
  minWidth: '135px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  a: {
    color: active ? '#fff' : '#A4A9B7',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '25px',
    textDecoration: 'none',
  },

  ['&:hover']: {
    opacity: '0.7',
    cursor: 'pointer',
  },
}));

const LinkCustom = styled(Link)<any>(({ active }) => ({
  color: active ? '#fff' : '#A4A9B7',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '25px',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '14px',
}));

const ListItemTextCustom = styled(ListItemText)<ListItemTextCustomProps>(({ open, theme }) => ({
  // transition: 'width 3s linear 1s',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: open ? '120px' : '0px',
  overflow: 'hidden',
}));

const Layout: React.FC<Props> = ({ children }) => {
  const sliderRef = useRef<any>(null);
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(true);
  const [width] = useWindowSize();
  const theme = useTheme();
  const colorMode = React.useContext<any>(ColorModeContext);

  // const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLightMode(event.target.checked);
  // };

  const handleChangeMode = () => {
    colorMode.toggleColorMode();
  };

  const settings = {
    className: 'slider variable-width',
    dots: false,
    arrows: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 300,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          className: 'slider variable-width',
          dots: false,
          arrows: false,
          infinite: false,
          centerMode: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: true,
          speed: 300,
        },
      },
      {
        breakpoint: 900,
        settings: {
          className: 'slider variable-width',
          dots: false,
          arrows: false,
          infinite: false,
          centerMode: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: true,
          speed: 300,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (width < 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const openMenu = (url: string) => {
    history.push(url);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (width < 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  useFetchInforContract();

  // const scroll = (e: any) => {
  //   if (sliderRef === null) {
  //     return 0;
  //   } else {
  //     if (e.wheelDelta > 0) {
  //       sliderRef.current.slickPrev();
  //     } else {
  //       sliderRef.current.slickNext();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('wheel', scroll, true);

  //   return () => {
  //     window.removeEventListener('wheel', scroll, true);
  //   };
  // }, []);

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
      <Header />

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: {
            md: 'block',
            xs: 'none',
          },
        }}
      >
        <DrawerHeader>
          <Logo to="/">
            {open ? (
              theme.palette.mode === 'light' ? (
                <img alt="" src={LogoImg} />
              ) : (
                <img alt="" src={LogoDarkImg} />
              )
            ) : (
              <img alt="" src={LogoIcon} />
            )}
          </Logo>
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
                <ListItemTextCustom
                  primary={item.name}
                  open={open}
                  // sx={{  }}
                />
                {/* {open && <ListItemText primary={item.name} />} */}
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
            {/* <MySwitch checked={lightMode} onChange={handleChangeMode} /> */}
            <SwitchMode mode={theme.palette.mode} onChange={handleChangeMode} />
            {open && <label>Dark</label>}
          </BoxSwitch>
        </SideAction>
      </Drawer>

      <MainLayout component="main" open={open}>
        <MenusMobile>
          <SliderScroll elRef={sliderRef} settings={settings}>
            {menus &&
              menus.map((item, i) => (
                <LinkCustom active={location.pathname === item.path} to={item.path} key={i}>
                  <MenuItem active={location.pathname === item.path}>{item.name}</MenuItem>
                </LinkCustom>
              ))}
          </SliderScroll>
        </MenusMobile>

        {
          // location.pathname !== '/treasury' &&
          width > 899 && (
            <Banner
              // text="Mint 0xBlock Reward Contracts (0xRC) and get steady stream of Rewards in 0xBlock (0xB) tokens"
              // walletId="0x33434dieoewo"
              // onConnect={handleConnect}
              // connected={false}
              isBg={location.pathname !== '/'}
            />
          )
        }

        {children}
      </MainLayout>
    </Box>
  );
};

export default Layout;
