import { Avatar, Box, BoxProps, styled, useTheme } from '@mui/material';
import OxImg from 'assets/images/0x-token.png';
import AvaxImg from 'assets/images/avax-token.png';
import { ReactComponent as SwapConvertDarkIcon } from 'assets/images/ic_round-swap-vert-dark.svg';
import { ReactComponent as SwapConvertIcon } from 'assets/images/ic_round-swap-vert.svg';
import { limitedStringNumbers } from 'helpers/limitedStringNumbers';
import { TokenItem } from 'pages/Swap';
import React from 'react';
const ExchangeBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '33px 0',
}));

const ViewConvertIcon = styled(Box)<BoxProps>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  transform: 'rotate(90deg)',
}));

const TokenBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  h3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
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
    fontSize: '16px',
    lineHeight: '37px',
    textAlign: 'center',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: '#0052FF',
    marginLeft: '10px',
  },
}));

const AvatarBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
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

export const MobileExchangeBox = ({ exchange, fromTokenInfo, toTokenInfo }: Props) => {
  const theme = useTheme();
  return (
    <ExchangeBox>
      <TokenBox>
        <AvatarBox>
          <Avatar
            sx={{ width: '33px', height: '33px', margin: 0, display: 'inline-flex' }}
            src={fromTokenInfo ? fromTokenInfo.logo : AvaxImg}
          />

          <p>{limitedStringNumbers(exchange.fromValue)}</p>
        </AvatarBox>
        <h3>{fromTokenInfo ? fromTokenInfo.name : ''}</h3>
      </TokenBox>

      <ViewConvertIcon>
        {theme.palette.mode === 'light' ? <SwapConvertIcon /> : <SwapConvertDarkIcon />}
      </ViewConvertIcon>

      <TokenBox>
        <AvatarBox>
          <Avatar
            sx={{ width: '33px', height: '33px', margin: 0, display: 'inline-flex' }}
            src={toTokenInfo ? toTokenInfo.logo : OxImg}
          />

          <p>{limitedStringNumbers(exchange.toValue)}</p>
        </AvatarBox>
        <h3>{toTokenInfo ? toTokenInfo.name : ''}</h3>
      </TokenBox>
    </ExchangeBox>
  );
};
