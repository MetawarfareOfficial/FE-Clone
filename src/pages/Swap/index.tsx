import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps, IconButton, IconButtonProps } from '@mui/material';

import { TokensList, recentData } from './data';

import InputSwap from 'components/Base/InputSwap';
import { SwapSettingModal, SwapTokensModal, SwapRecentTransactionsModal } from 'components/Swap';

import { ReactComponent as SettingIcon } from 'assets/images/setting-outlined.svg';
import { ReactComponent as SettingDarkIcon } from 'assets/images/setting-dark.svg';
import { ReactComponent as ReloadIcon } from 'assets/images/carbon_recently-viewed.svg';
import { ReactComponent as ReloadDarkIcon } from 'assets/images/reload-dark.svg';
import { ReactComponent as SwapIcon } from 'assets/images/swap-icon.svg';
import { ReactComponent as SwapDarkIcon } from 'assets/images/swap-dark.svg';

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

const TitleBlack = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '66px',
  lineHeight: '88px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
}));

const TitleWhite = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '80px',
  lineHeight: '147px',
  color: theme.palette.mode === 'light' ? '#0052FF' : '#0052FF',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  marginBottom: '21px',
}));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '29px',
  color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.57)' : 'rgba(255, 255, 255, 0.57)',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
}));

const SwapBox = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: '484px',
  boxSizing: 'border-box',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.12)' : 'rgba(255, 255, 255, 0.12)'}`,
  boxShadow: '0px 2px 30px rgba(56, 100, 255, 0.03)',
  borderRadius: '14px',
  padding: '35px 24px 51px',
}));

const SwapHeader = styled(Box)<BoxProps>(({ theme }) => ({
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
    color: theme.palette.mode === 'light' ? '#293247' : '#fff',
    margin: '0',
  },
}));

const IconButtonCustom = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  padding: '0',
  width: '20px',
  height: '20px',
  marginLeft: '25px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',

  svg: {
    stroke: theme.palette.mode === 'light' ? '#293247' : '#fff',
  },
}));

const ExchangeBox = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const ExchangeHeader = styled(Box)<BoxProps>(({ theme }) => ({
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
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.4)' : '#fff',
    margin: 0,
  },

  p: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.8)' : '#fff',
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
  const theme = useTheme();
  const [tokens] = useState(TokensList);
  const [exchange, setExchange] = useState({
    from: 0,
    fromValue: 0,
    fromBalance: 10,
    to: 1,
    toValue: 0,
    toBalance: 0,
  });
  const [selectedName, setSelectedName] = useState<any>(null);
  const [openSetting, setOpenSetting] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [openRecent, setOpenRecent] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === 'from') {
      setExchange({
        ...exchange,
        fromValue: Number(value),
      });
    } else {
      setExchange({
        ...exchange,
        toValue: Number(value),
      });
    }
  };

  const handleChangeToken = (name: string) => {
    setSelectedName(name);
    setOpenSelect(true);
  };

  const handleFromMax = () => {
    setExchange({
      ...exchange,
      fromValue: exchange.fromBalance,
    });
  };

  const handleToggleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleToggleSelect = () => {
    setOpenSelect(!openSelect);
  };

  const handelSelectToken = (index: number) => {
    setExchange({
      ...exchange,
      [selectedName]: index,
    });
  };

  const handleToggleRecent = () => {
    setOpenRecent(!openRecent);
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

                <IconButtonCustom onClick={handleToggleRecent} sx={{ marginLeft: 'auto' }}>
                  {theme.palette.mode === 'light' ? <ReloadIcon /> : <ReloadDarkIcon />}
                </IconButtonCustom>
                <IconButtonCustom onClick={handleToggleSetting}>
                  {theme.palette.mode === 'light' ? <SettingIcon /> : <SettingDarkIcon />}
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
                  onChange={handleChange}
                  onChangeToken={handleChangeToken}
                  onMax={handleFromMax}
                  isMax={true}
                  name="from"
                />
              </ExchangeBox>

              <ExchangeIcon>{theme.palette.mode === 'light' ? <SwapIcon /> : <SwapDarkIcon />}</ExchangeIcon>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>To(estimated)</h5>
                  <p>Balance: 0</p>
                </ExchangeHeader>

                <InputSwap
                  tokens={tokens}
                  value={exchange.toValue}
                  selected={exchange.to}
                  onChange={handleChange}
                  onChangeToken={handleChangeToken}
                  onMax={handleFromMax}
                  name="to"
                />
              </ExchangeBox>
            </SwapBox>
          </Grid>
        </Grid>
      </Box>

      <SwapSettingModal open={openSetting} onClose={handleToggleSetting} />
      <SwapTokensModal
        open={openSelect}
        onClose={handleToggleSelect}
        tokens={tokens}
        onSelect={handelSelectToken}
        active={selectedName === 'from' ? exchange.from : exchange.to}
      />
      <SwapRecentTransactionsModal open={openRecent} onClose={handleToggleRecent} data={recentData} />
    </Wrapper>
  );
};

export default SwapPage;
