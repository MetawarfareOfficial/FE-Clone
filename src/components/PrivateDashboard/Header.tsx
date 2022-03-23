import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps, Tabs, TabsProps, Tab } from '@mui/material';

import { useAppSelector } from 'stores/hooks';
import { formatUserAddress } from 'helpers';

import ConnectWallet from 'components/ConnectWallet';

import LogoImg from 'assets/images/logo.svg';
import LogoDarkImg from 'assets/images/logo-dark.svg';

interface Props {
  tab: 'square' | 'cube' | 'tesseract' | 'all';
  filter: 'all' | 'd' | 'w' | 'y';
  connected?: boolean;
  wallet?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  padding: '37px 25px 49px 20px',
  boxSizing: 'border-box',
  display: 'flex',
}));

const BoxContent = styled(Box)<BoxProps>(() => ({
  background: '#FFFFFF',
  boxShadow: '0px 20px 45px #F0EDF7',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  padding: '20px 20px',

  '> a': {
    width: '155px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ViewLogo = styled(Box)<BoxProps>(() => ({
  width: '155px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    width: '100%',
  },
}));

const Wallet = styled(Box)<BoxProps>(() => ({
  maxWidth: '126px',
  marginRight: '23px',
  overflow: 'hidden',

  span: {
    color: '#BDBDBD',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const TitleWallet = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  lineHeight: '20px',
  fontFamily: 'Poppins',
  overflow: 'hidden',
  width: '100%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  minWidth: '114px',
}));

const TabsCustom = styled(Tabs)<TabsProps>(() => ({
  '.MuiTab-root': {
    padding: '9px 0px',
    minWidth: 'auto',
    marginRight: '24px',
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.045em',
    textTransform: 'capitalize',
    color: 'rgba(35, 40, 89, 0.53)',

    '&:last-child': {
      margin: 0,
    },

    '&::before': {
      content: '""',
      width: '27px',
      height: '2px',
      background: '#fff',
      position: 'absolute',
      bottom: 0,
      zIndex: '2',
    },
  },

  '.Mui-selected': {
    color: '#232859',

    '&::before': {
      background: '#0052FF',
    },
  },

  '.MuiTabs-indicator': {
    width: '0 !important',
    display: 'none',
  },
}));

const Header: React.FC<Props> = () => {
  const theme = useTheme();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const [filter, setFilter] = useState({
    time: 4,
    contract: 0,
  });

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChangeContract = (event: React.SyntheticEvent, newValue: number) => {
    setFilter({
      ...filter,
      contract: newValue,
    });
  };

  const handleChangeTime = (event: React.SyntheticEvent, newValue: number) => {
    setFilter({
      ...filter,
      time: newValue,
    });
  };

  return (
    <Wrapper>
      <BoxContent width={'291px'}>
        <Link to="/">
          <ViewLogo>
            <img alt="" src={theme.palette.mode === 'light' ? LogoImg : LogoDarkImg} />
          </ViewLogo>
        </Link>
      </BoxContent>

      <BoxContent width={'calc(100% - 291px - 345px - 60px)'} sx={{ margin: '0 30px' }}>
        <Box sx={{ marginRight: 'auto' }}>
          <TabsCustom value={filter.contract} onChange={handleChangeContract} aria-label="basic tabs example">
            <Tab label="Square" {...a11yProps(0)} />
            <Tab label="Cube" {...a11yProps(1)} />
            <Tab label="Tesseract" {...a11yProps(2)} />
            <Tab label="All" {...a11yProps(3)} />
          </TabsCustom>
        </Box>

        <Box sx={{ marginLeft: 'auto' }}>
          <TabsCustom value={filter.time} onChange={handleChangeTime} aria-label="basic tabs example">
            <Tab label="D" {...a11yProps(0)} />
            <Tab label="W" {...a11yProps(1)} />
            <Tab label="M" {...a11yProps(2)} />
            <Tab label="Y" {...a11yProps(3)} />
            <Tab label="All" {...a11yProps(4)} />
          </TabsCustom>
        </Box>
      </BoxContent>

      <BoxContent width={'345px'} style={{ justifyContent: 'flex-end' }}>
        {currentUserAddress && isLogin && (
          <Wallet>
            <span>Wallet</span>
            <TitleWallet>{formatUserAddress(currentUserAddress)}</TitleWallet>
          </Wallet>
        )}
        <ConnectWallet />
      </BoxContent>
    </Wrapper>
  );
};

export default Header;
