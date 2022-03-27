import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';

import { useAppSelector } from 'stores/hooks';
import { formatUserAddress } from 'helpers';

import ConnectWallet from 'components/ConnectWallet';
import Filters from './Filters';

import LogoImg from 'assets/images/logo.svg';
import LogoDarkImg from 'assets/images/logo-dark.svg';

interface Props {
  tab: 'square' | 'cube' | 'tesseract' | 'all';
  filter: 'all' | 'd' | 'w' | 'y';
  connected?: boolean;
  wallet?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: '37px 25px 49px 20px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('lg')]: {
    padding: '20px',
  },
}));

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
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

  [theme.breakpoints.down('lg')]: {
    background: 'none',
    boxShadow: 'unset',
    padding: 0,
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

const Wallet = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: '126px',
  marginRight: '23px',
  overflow: 'hidden',

  span: {
    color: '#BDBDBD',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
  },

  [theme.breakpoints.down('md')]: {
    display: 'none',
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

const Header: React.FC<Props> = () => {
  const theme = useTheme();
  const [width] = useWindowSize();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  return (
    <Wrapper>
      {width > 1024 ? (
        <BoxContent width={'291px'}>
          <Link to="/">
            <ViewLogo>
              <img alt="" src={theme.palette.mode === 'light' ? LogoImg : LogoDarkImg} />
            </ViewLogo>
          </Link>
        </BoxContent>
      ) : (
        <Link to="/">
          <ViewLogo>
            <img alt="" src={theme.palette.mode === 'light' ? LogoImg : LogoDarkImg} />
          </ViewLogo>
        </Link>
      )}

      {width > 1024 && <Filters />}

      <BoxContent width={'345px'} style={{ justifyContent: 'flex-end', marginLeft: 'auto' }}>
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
