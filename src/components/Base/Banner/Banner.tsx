import React from 'react';
import { styled } from '@mui/material/styles';
import ConnectWallet from 'components/ConnectWallet';
import { useAppSelector } from 'stores/hooks';
import { useLocation } from 'react-router-dom';
import { formatUserAddress } from 'helpers';
import { Box, BoxProps, Paper, PaperProps, Typography, TypographyProps } from '@mui/material';

interface Props {
  text?: string;
  walletId?: string;
  connected?: boolean;
  isBg: boolean;
  onConnect?: () => void;
}

interface PaperCustomProps extends PaperProps {
  isBg: boolean;
}

const BannerWrapper = styled(Paper)<PaperCustomProps>(({ isBg, theme }) => ({
  boxShadow: isBg ? '0px 0px 48px rgba(0, 0, 0, 0.06)' : 'none',
  borderRadius: '22px',
  background: isBg ? (theme.palette.mode === 'light' ? '#fff' : 'rgba(255, 255, 255, 0.03)') : 'unset',
  padding: isBg ? '30px 22px 30px 33px' : 0,
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minHeight: isBg ? '119px' : '50px',

  [theme.breakpoints.down('lg')]: {
    minHeight: isBg ? '90px' : '40px',
    padding: isBg ? '16px 22px 16px 24px' : 0,
  },
}));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.mode === 'light' ? '#293247' : '#BDBDBD',
  fontWeight: '600',
  lineHeight: '30px',
  fontFamily: 'Poppins',
  width: '479px',
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

const Banner: React.FC<Props> = ({ isBg }) => {
  const isMintContractLocation = useLocation().pathname === '/mint-contracts';

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const isLogin = useAppSelector((state) => state.user.isLogin);
  // const nativeBalance = useAppSelector((state) => state.user.nativeBalance);
  // const zeroXBlockBalance = useAppSelector((state) => state.user.zeroXBlockBalance);

  return (
    <BannerWrapper isBg={isBg}>
      {isMintContractLocation && (
        <Text>Mint 0xBlock Reward Contracts (0xRC) and get steady stream of Rewards in 0xBlock (0xB) tokens</Text>
      )}

      <BoxRight>
        {currentUserAddress && isLogin && (
          <Wallet>
            <span>Wallet</span>
            <Title>{formatUserAddress(currentUserAddress)}</Title>
          </Wallet>
        )}
        <ConnectWallet />
      </BoxRight>
    </BannerWrapper>
  );
};

export default Banner;
