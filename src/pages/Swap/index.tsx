import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import { Box, BoxProps, Grid, Typography, TypographyProps, IconButton, IconButtonProps } from '@mui/material';

import { TokensList } from './data';

import InputSwap from 'components/Base/InputSwap';

import { ReactComponent as SettingIcon } from 'assets/images/setting-outlined.svg';
import { ReactComponent as ReloadIcon } from 'assets/images/carbon_recently-viewed.svg';
import { ReactComponent as SwapIcon } from 'assets/images/swap-icon.svg';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
}));

const TitleBlack = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '66px',
  lineHeight: '88px',
  color: '#293247',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
}));

const TitleWhite = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '80px',
  lineHeight: '147px',
  color: '#0052FF',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  marginBottom: '21px',
}));

const Text = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '29px',
  color: 'rgba(41, 50, 71, 0.57)',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
}));

const SwapBox = styled(Box)<BoxProps>(() => ({
  maxWidth: '484px',
  boxSizing: 'border-box',
  background: '#FFFFFF',
  border: '1px solid rgba(41, 50, 71, 0.12)',
  boxShadow: '0px 2px 30px rgba(56, 100, 255, 0.03)',
  borderRadius: '14px',
  padding: '35px 24px 51px',
}));

const SwapHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',

  h4: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '29px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: '#293247',
    margin: '0',
  },
}));

const IconButtonCustom = styled(IconButton)<IconButtonProps>(() => ({
  padding: '0',
  width: '20px',
  height: '20px',
  marginLeft: '25px',
}));

const ExchangeBox = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const ExchangeHeader = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '19px',

  h5: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: 'rgba(41, 50, 71, 0.4)',
    margin: 0,
  },

  p: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: 'rgba(41, 50, 71, 0.8)',
    margin: '0 0 0 auto',
  },
}));

const ExchangeIcon = styled(Box)<BoxProps>(() => ({
  width: '100%',
  margin: '36px 0 21px',
  textAlign: 'center',

  svg: {
    width: '38px',
    height: '38px',
  },
}));

const SwapPage: React.FC<Props> = () => {
  const [exchange, setExchange] = useState({
    from: 0,
    fromValue: 0,
    fromBalance: 10,
    to: 1,
    toValue: 0,
    toBalance: 0,
  });

  const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setExchange({
      ...exchange,
      fromValue: Number(value),
    });
  };

  const handleChangeTokenFrom = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setExchange({
      ...exchange,
      from: Number(value),
    });
  };

  const handleFromMax = () => {
    setExchange({
      ...exchange,
      fromValue: exchange.fromBalance,
    });
  };

  return (
    <Wrapper>
      <Box sx={{ marginBottom: '120px' }}>
        <Grid container spacing={'88px'}>
          <Grid item xs={12} md={6}>
            <TitleBlack>Swap</TitleBlack>
            <TitleWhite>Tokens</TitleWhite>
            <Text>
              {`Select the crypto you want to convert from and enter the amount of tokens you want to swap. Once the
              transaction is confirmed, the tokens on your account will be swapped. You'll see a receipt with all
              details.*`}
            </Text>
          </Grid>
          <Grid item xs={12} md={6}>
            <SwapBox>
              <SwapHeader>
                <h4>Swap</h4>

                <IconButtonCustom sx={{ marginLeft: 'auto' }}>
                  <ReloadIcon />
                </IconButtonCustom>
                <IconButtonCustom>
                  <SettingIcon />
                </IconButtonCustom>
              </SwapHeader>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>From</h5>
                  <p>Balance: 0</p>
                </ExchangeHeader>

                <InputSwap
                  tokens={TokensList}
                  value={exchange.fromValue}
                  selected={exchange.from}
                  onChange={handleChangeFrom}
                  onChangeToken={handleChangeTokenFrom}
                  onMax={handleFromMax}
                  isMax={true}
                />
              </ExchangeBox>

              <ExchangeIcon>
                <SwapIcon />
              </ExchangeIcon>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>To(estimated)</h5>
                  <p>Balance: 0</p>
                </ExchangeHeader>

                <InputSwap
                  tokens={TokensList}
                  value={exchange.toValue}
                  selected={exchange.to}
                  onChange={handleChangeFrom}
                  onChangeToken={handleChangeTokenFrom}
                  onMax={handleFromMax}
                />
              </ExchangeBox>
            </SwapBox>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default SwapPage;
