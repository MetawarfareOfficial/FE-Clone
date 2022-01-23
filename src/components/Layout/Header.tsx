import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useWindowSize } from 'hooks/useWindowSize';
import { Box, BoxProps } from '@mui/material';

import SwitchMode from 'components/Base/SwitchMode';
// import WalletButton from 'components/Base/WalletButton';

import LogoImg from 'assets/images/logo.svg';
import ConnectWallet from '../ConnectWallet';

interface Props {
  title?: string;
}

const WrapperHeader = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'none',
  alignItems: 'center',
  position: 'fixed',
  zIndex: '1000',
  padding: '18px 14px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const ViewLogo = styled(Box)<BoxProps>(() => ({
  width: '136px',

  img: {
    width: '100%',
  },
}));

const Menus = styled(Box)<BoxProps>(() => ({
  marginLeft: 'auto',
  display: 'inline-flex',
  alignItems: 'center',
}));

const Header: React.FC<Props> = () => {
  const [width] = useWindowSize();
  const [isBackground, setIsBackground] = useState(false);

  const onScroll = () => {
    const minHeight = width > 480 ? 30 : 10;
    setIsBackground(window.pageYOffset > minHeight ? true : false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleChangeMode = () => {};

  // const handleWallet = () => {};

  return (
    <WrapperHeader
      sx={{
        background: isBackground ? '#fff' : 'unset',
        boxShadow: isBackground ? '0px 2px 5px 0px rgba(181,181,181,1)' : 'unset',
      }}
    >
      <Link to="/">
        <ViewLogo>
          <img alt="" src={LogoImg} />
        </ViewLogo>
      </Link>

      <Menus>
        <SwitchMode mode="light" onChange={handleChangeMode} />
        <ConnectWallet />
      </Menus>
    </WrapperHeader>
  );
};

export default Header;
