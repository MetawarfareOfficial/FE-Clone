import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Paper, PaperProps, Typography, TypographyProps } from '@mui/material';
import ConnectWallet from 'components/ConnectWallet';
import { useAppSelector } from 'stores/hooks';
import { useLocation } from 'react-router-dom';

interface Props {
  text?: string;
  walletId?: string;
  connected?: boolean;
  onConnect?: () => void;
}

const BannerWrapper = styled(Paper)<PaperProps>(() => ({
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  borderRadius: '22px',
  backgroundColor: '#fff',
  padding: '30px 22px 30px 33px',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minHeight: '119px',
}));

const Text = styled(Typography)<TypographyProps>(() => ({
  fontSize: '16px',
  color: '#293247',
  fontWeight: '600',
  lineHeight: '30px',
  fontFamily: 'Poppins',
  width: '479px',
}));

const BoxRight = styled(Box)<BoxProps>(() => ({
  width: 'calc(100% - 479px)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const Wallet = styled(Box)<BoxProps>(() => ({
  maxWidth: '126px',
  marginRight: '30px',
  overflow: 'hidden',

  span: {
    color: '#BDBDBD',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  overflow: 'hidden',
  width: '100%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const Banner: React.FC<Props> = () => {
  const isMintContractLocation = useLocation().pathname === '/mint-contract';

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  return (
    <BannerWrapper>
      {isMintContractLocation && (
        <Text>Mint 0xBlock Reward Contracts (0xRC) and get steady stream of Rewards in 0xBlock (0xB) tokens</Text>
      )}

      <BoxRight>
        {currentUserAddress && isLogin && (
          <Wallet>
            <span>Wallet</span>
            <Title>{currentUserAddress}</Title>
          </Wallet>
        )}
        <ConnectWallet />
      </BoxRight>
    </BannerWrapper>
  );
};

export default Banner;
