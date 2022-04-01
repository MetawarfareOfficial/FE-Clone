import { Avatar, Box, BoxProps, styled, useTheme } from '@mui/material';
import { ReactComponent as SwapConvertIcon } from 'assets/images/ic_round-swap-vert.svg';
import { ReactComponent as SwapConvertDarkIcon } from 'assets/images/ic_round-swap-vert-dark.svg';
import AvaxImg from 'assets/images/avax-token.png';
import OxImg from 'assets/images/0x-token.png';
import { TokenItem } from 'pages/Swap';
import React from 'react';
const ExchangeBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '33px 0',
}));

const ViewConvertIcon = styled(Box)<BoxProps>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 63px',
  width: '37px',
}));

const TokenBox = styled(Box)<BoxProps>(({ theme }) => ({
  textAlign: 'center',

  h3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '37px',
    textAlign: 'center',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: theme.palette.mode === 'light' ? '#293247' : '#fff',
    margin: '0 0',
  },

  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '37px',
    textAlign: 'center',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: '#0052FF',
    margin: 0,
  },
}));

interface Props {
  fromTokenInfo: TokenItem;
  toTokenInfo: TokenItem;
  exchange: {
    from: String;
    fromValue: string | null;
    to: String;
    toValue: String | null;
  };
}

export const DesktopExchangeBox = ({ exchange, fromTokenInfo, toTokenInfo }: Props) => {
  const theme = useTheme();

  return (
    <ExchangeBox>
      <TokenBox>
        <Avatar
          sx={{ width: '53px', height: '53px', margin: 0, display: 'inline-flex' }}
          src={fromTokenInfo ? fromTokenInfo.logo : AvaxImg}
        />

        <h3>{fromTokenInfo ? fromTokenInfo.name : ''}</h3>
        <p>{exchange.fromValue}</p>
      </TokenBox>

      <ViewConvertIcon>
        {theme.palette.mode === 'light' ? <SwapConvertIcon /> : <SwapConvertDarkIcon />}
      </ViewConvertIcon>

      <TokenBox>
        <Avatar
          sx={{ width: '53px', height: '53px', margin: 0, display: 'inline-flex' }}
          src={toTokenInfo ? toTokenInfo.logo : OxImg}
        />

        <h3>{toTokenInfo ? toTokenInfo.name : ''}</h3>
        <p>{exchange.toValue}</p>
      </TokenBox>
    </ExchangeBox>
  );
};
