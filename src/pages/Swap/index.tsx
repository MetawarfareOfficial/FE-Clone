import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  BoxProps,
  Grid,
  Typography,
  TypographyProps,
  IconButton,
  IconButtonProps,
  Divider,
  tooltipClasses,
  Tooltip,
  TooltipProps,
  Button,
  ButtonProps,
} from '@mui/material';

import { TokensList } from './data';

import InputSwap from 'components/Base/InputSwap';
import {
  SwapSettingModal,
  SwapTokensModal,
  SwapRecentTransactionsModal,
  SwapConfirmModal,
  SwapStatusModal,
} from 'components/Swap';

import { ReactComponent as SettingIcon } from 'assets/images/setting-outlined.svg';
import { ReactComponent as SettingDarkIcon } from 'assets/images/setting-dark.svg';
import { ReactComponent as ReloadIcon } from 'assets/images/carbon_recently-viewed.svg';
import { ReactComponent as ReloadDarkIcon } from 'assets/images/reload-dark.svg';
import { ReactComponent as SwapIcon } from 'assets/images/swap-icon.svg';
import { ReactComponent as SwapDarkIcon } from 'assets/images/swap-dark.svg';
import { SwapTokenId, useSwapToken } from 'hooks/swap';

import { ReactComponent as HelpCircleIcon } from 'assets/images/bx_help-circle.svg';
import { ReactComponent as HelpCircleDarkIcon } from 'assets/images/bx_help-circle-dark.svg';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import get from 'lodash/get';
import { handleDisableToken, handleSetTokenBalances, setIsInsufficientError, setSelectedName } from 'services/swap';
import { defaultSettingData, intervalTime } from 'consts/swap';
import { useSwapHelpers } from 'hooks/swap/useSwapHelpers';
import { getSwapSettingData } from 'helpers';
import { removeCharacterInString } from 'helpers/removeCharacterInString';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatPrice } from 'helpers/formatPrice';

interface Props {
  title?: string;
}

interface TooltipCustomProps extends TooltipProps {
  size?: string;
}

export interface TokenItem {
  id: SwapTokenId;
  logo: string;
  name: string;
  balance: number | string;
  disabled: boolean;
  isNative?: boolean;
}

export interface Exchange {
  fromId: SwapTokenId;
  fromValue: number | null;
  fromRawValue: number | null;
  toId: SwapTokenId;
  toValue: number | null;
  toRawValue: number | null;
}
export interface ExchangeItem {
  id: SwapTokenId;
  value: string | null;
  rawValue: string | null;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  // alignItems: 'center',
  paddingTop: '150px',
  paddingBottom: '100px',

  [theme.breakpoints.down('lg')]: {
    paddingTop: '90px',
    paddingBottom: '70px',
  },

  [theme.breakpoints.down('md')]: {
    paddingTop: '0',
    paddingBottom: '70px',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '0 18px 100px',
  },
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
  marginTop: '68px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '58px',
    lineHeight: '64px',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '43px',
    lineHeight: '59px',
    marginTop: '30px',
  },

  [theme.breakpoints.down('sm')]: {
    marginTop: '20px',
  },
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

  [theme.breakpoints.down('lg')]: {
    fontSize: '68px',
    lineHeight: '88px',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '52px',
    lineHeight: '96px',
    marginBottom: '33px',
  },
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

  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '24px',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SwapBox = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: '484px',
  boxSizing: 'border-box',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.12)' : 'rgba(255, 255, 255, 0.12)'}`,
  boxShadow: '0px 2px 30px rgba(56, 100, 255, 0.03)',
  borderRadius: '14px',
  padding: '35px 24px 35px',

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '35px 18px',
    borderRadius: '9px',
  },
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

  [theme.breakpoints.down('sm')]: {
    width: '17px',
    height: '17px',
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

const BillingBox = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginTop: '32px',
}));

const BillingLine = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',

  h4: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    margin: 0,
    display: 'inline-flex',
    alignItems: 'center',
  },

  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.8)' : 'rgba(255, 255, 255, 0.8)',
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

const SwapSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
  background: '#3864FF',
  border: '1px solid rgba(56, 100, 255, 0.26)',
  boxSizing: 'border-box',
  borderRadius: '7px',
  padding: '11px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '33px',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  color: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  marginTop: '23px',

  '&:hover': {
    background: '#3864FF',
    border: '1px solid rgba(56, 100, 255, 0.26)',
    color: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
    boxShadow: '0px 5px 11px rgba(0, 82, 255, 0.38)',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

const TooltipCustom = styled(({ className, ...props }: TooltipCustomProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, size }) => ({
  zIndex: '2000',
  filter: 'drop-shadow(0px 0px 5px rgba(56, 100, 255, 0.19))',

  [`& .${tooltipClasses.tooltip}`]: {
    background: theme.palette.mode === 'light' ? '#fff' : '#171717',
    color: theme.palette.mode === 'light' ? 'rgba(49, 72, 98, 0.69)' : 'rgba(255, 255, 255, 0.69)',
    padding: '11px 16px',
    fontFamily: 'Poppins',
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: '500',
    boxShadow: '1px 5px 29px rgba(50, 71, 117, 0.2)',
    borderRadius: '10px',
    left: '15px',
    top: '15px',
    maxWidth: size || '246px',
    minWidth: '206px',
    boxSizing: 'border-box',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === 'light' ? '#fff' : '#171717',
    top: '-15px !important',
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

const SwapPage: React.FC<Props> = () => {
  const theme = useTheme();
  const {
    getSwappaleTokens,
    getSwapTokenBalances,
    account,
    TokenAddressesLoading,
    handleSwapToken,
    loadEstimateToken,
  } = useSwapToken();
  const {
    handleConvertRecentTransactionData,
    checkSwapSetting,
    calculateSwapTokenRate,
    calculateTradingFee,
    getMinReceiveSwapToken,
    calculatePriceImpact,
  } = useSwapHelpers();

  const tokenList = useAppSelector((state) => state.swap.tokenList);
  const recentTransactions = useAppSelector((state) => state.swap.recentTransactions);
  const isInsufficientError = useAppSelector((state) => state.swap.isInsufficientError);
  const isInsufficientLiquidityError = useAppSelector((state) => state.swap.isInsufficientLiquidityError);
  const selectedName = useAppSelector((state) => state.swap.selectedName) as any;
  const isLoadEstimateToken = useAppSelector((state) => state.swap.isLoadEstimateToken);
  const exchange = useAppSelector((state) => state.swap.exchange);
  const dispatch = useAppDispatch();
  const isEstimateFrom = useAppSelector((state) => state.swap.isEstimateFrom);
  const swapTokenRates = useAppSelector((state) => state.swap.swapTokenRates);
  const [swapStatus, setSwapStatus] = useState<'success' | 'error' | 'pending' | null>(null);

  const [openSetting, setOpenSetting] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [isSelectedFrom, setIsSelectedFrom] = useState(false);
  const [openRecent, setOpenRecent] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const inputValue = value !== null && value.trim() === '' ? null : value;
    if (name === 'from') {
      dispatch(setSelectedName('from'));
      loadEstimateToken({
        _selectedName: 'from',
        _exchangeFrom: {
          id: exchange.fromId,
          value: inputValue,
          rawValue: inputValue,
        },
        _exchangeTo: {
          id: exchange.toId,
          value: exchange.toValue,
          rawValue: exchange.toRawValue,
        },
        _tokenList: tokenList,
        _isSwap: false,
        _isEstimateFrom: isEstimateFrom,
        _changeEstimateFrom: name !== selectedName,
      });
    } else {
      dispatch(setSelectedName('to'));
      loadEstimateToken({
        _selectedName: 'to',
        _exchangeFrom: {
          id: exchange.fromId,
          value: exchange.fromValue,
          rawValue: exchange.fromRawValue,
        },
        _exchangeTo: {
          id: exchange.toId,
          value: inputValue,
          rawValue: inputValue,
        },
        _tokenList: tokenList,
        _isSwap: false,
        _isEstimateFrom: isEstimateFrom,
        _changeEstimateFrom: name !== selectedName,
      });
    }
  };

  const handleChangeToken = (name: string) => {
    if (name === 'from') {
      setIsSelectedFrom(true);
    } else {
      setIsSelectedFrom(false);
    }
    setOpenSelect(true);
  };

  const handleSwapIconClick = () => {
    try {
      if (selectedName && !isLoadEstimateToken) {
        if (selectedName === 'from') {
          dispatch(setSelectedName('swap'));
          loadEstimateToken({
            _selectedName: 'to',
            _exchangeFrom: {
              id: exchange.toId,
              value: exchange.toValue,
              rawValue: exchange.toRawValue,
            },
            _exchangeTo: {
              id: exchange.fromId,
              value: exchange.fromValue,
              rawValue: exchange.fromRawValue,
            },
            _tokenList: tokenList,
            _isSwap: true,
            _isEstimateFrom: isEstimateFrom,
            _changeEstimateFrom: true,
          });
          return;
        }
      }
      if (selectedName === 'to') {
        dispatch(setSelectedName('swap'));

        loadEstimateToken({
          _selectedName: 'from',
          _exchangeFrom: {
            id: exchange.toId,
            value: exchange.toValue,
            rawValue: exchange.toRawValue,
          },
          _exchangeTo: {
            id: exchange.fromId,
            value: exchange.fromValue,
            rawValue: exchange.fromRawValue,
          },
          _tokenList: tokenList,
          _isSwap: true,
          _isEstimateFrom: isEstimateFrom,
          _changeEstimateFrom: true,
        });
        return;
      }
    } catch (error) {}
  };

  const handleFromMax = () => {
    // setExchange({
    //   ...exchange,
    //   fromValue: exchange.fromBalance,
    // });
  };

  const handleToggleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleToggleSelect = () => {
    setOpenSelect(!openSelect);
  };

  const handelSelectToken = (tokenId: SwapTokenId) => {
    if (isSelectedFrom) {
      dispatch(setSelectedName('swap'));
      loadEstimateToken({
        _selectedName: selectedName,
        _exchangeFrom: {
          id: tokenId,
          value: exchange.fromValue,
          rawValue: exchange.fromRawValue,
        },
        _exchangeTo: {
          id: exchange.toId,
          value: exchange.toValue,
          rawValue: exchange.toRawValue,
        },
        _tokenList: tokenList,
        _isSwap: true,
        _isEstimateFrom: isEstimateFrom,
      });
    } else if (!isSelectedFrom) {
      dispatch(setSelectedName('swap'));
      loadEstimateToken({
        _selectedName: selectedName,
        _exchangeFrom: {
          id: exchange.fromId,
          value: exchange.fromValue,
          rawValue: exchange.fromRawValue,
        },
        _exchangeTo: {
          id: tokenId,
          value: exchange.toValue,
          rawValue: exchange.toRawValue,
        },
        _tokenList: tokenList,
        _isSwap: true,
        _isEstimateFrom: isEstimateFrom,
      });
    }
  };

  const handleToggleRecent = () => {
    setOpenRecent(!openRecent);
  };

  const handleToggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleToggleStatus = () => {
    setOpenStatus(!openStatus);
  };

  const handleConfirm = async () => {
    handleToggleConfirm();
    handleToggleStatus();
    try {
      setSwapStatus('pending');
      const transaction = await handleSwapToken(exchange, selectedName === 'to');
      if (transaction.hash) {
        await transaction.wait();
        setSwapStatus('success');
      }
    } catch (error: any) {
      setSwapStatus('error');
    }
  };

  useEffect(() => {
    if (openSelect && isSelectedFrom) {
      const selectableTokens = getSwappaleTokens(exchange.fromId);
      dispatch(handleDisableToken(selectableTokens));
    } else if (openSelect && !isSelectedFrom) {
      const selectableTokens = getSwappaleTokens(exchange.toId);
      dispatch(handleDisableToken(selectableTokens));
    }
  }, [openSelect, selectedName, exchange.toId, exchange.fromId, isSelectedFrom]);

  useEffect(() => {
    const selectedTokenId = exchange.fromId;
    const selectedTokenValue = exchange.fromValue;
    const selectedToken = tokenList.filter((item) => item.id === selectedTokenId);
    if (selectedToken[0]) {
      if (
        selectedToken[0].balance === 0 ||
        Number(removeCharacterInString(String(selectedToken[0].balance), ',')) < (selectedTokenValue || 0)
      ) {
        dispatch(setIsInsufficientError(true));
      } else {
        dispatch(setIsInsufficientError(false));
      }
    }
  }, [exchange.fromId, exchange.fromValue, tokenList]);

  const handleGetTokenBalances = async () => {
    const newTokens = await getSwapTokenBalances(tokenList);
    dispatch(handleSetTokenBalances(newTokens));
  };

  useEffect(() => {
    let getTokenBalancesInterval: NodeJS.Timer;
    if (!TokenAddressesLoading && account) {
      handleGetTokenBalances();
      getTokenBalancesInterval = setInterval(handleGetTokenBalances, intervalTime);
    }
    return () => {
      if (getTokenBalancesInterval) {
        clearInterval(getTokenBalancesInterval);
      }
    };
  }, [account, TokenAddressesLoading]);

  useEffect(() => {
    checkSwapSetting();
  }, []);
  const fromTokens = tokenList.filter((item) => item.id === exchange.fromId);
  const toTokens = tokenList.filter((item) => item.id === exchange.toId);

  const isInvalidInput =
    selectedName === 'from'
      ? exchange.fromValue === null || Number(exchange.fromValue) === 0
      : exchange.toValue === null || Number(exchange.toValue) === 0;

  const settingData = getSwapSettingData() ? getSwapSettingData() : {};
  return (
    <Wrapper>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={{ xs: 0, lg: '88px' }}>
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
                  <h5>From{isEstimateFrom ? '(estimated)' : ''}</h5>
                  <p>
                    Balance:{' '}
                    {fromTokens.length > 0
                      ? Number(fromTokens[0].balance) > 0
                        ? formatForNumberLessThanCondition({
                            value: fromTokens[0].balance,
                            minValueCondition: 0.000001,
                            callback: formatPrice,
                            callBackParams: [6],
                            addLessThanSymbol: true,
                          })
                        : 0.0
                      : 0.0}
                  </p>
                </ExchangeHeader>

                <InputSwap
                  tokenIds={[exchange.fromId, exchange.toId]}
                  tokens={TokensList}
                  value={exchange.fromValue}
                  selected={exchange.fromId}
                  onChange={handleChange}
                  onChangeToken={handleChangeToken}
                  onMax={handleFromMax}
                  isMax={true}
                  name="from"
                />
              </ExchangeBox>

              <ExchangeIcon>
                {theme.palette.mode === 'light' ? (
                  <SwapIcon
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (!isLoadEstimateToken) {
                        handleSwapIconClick();
                      }
                    }}
                  />
                ) : (
                  <SwapDarkIcon
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (!isLoadEstimateToken) {
                        handleSwapIconClick();
                      }
                    }}
                  />
                )}
              </ExchangeIcon>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>To{!isEstimateFrom ? '(estimated)' : ''}</h5>
                  <p>
                    Balance:{' '}
                    {toTokens.length > 0
                      ? Number(toTokens[0].balance) > 0
                        ? formatForNumberLessThanCondition({
                            value: toTokens[0].balance,
                            minValueCondition: 0.000001,
                            callback: formatPrice,
                            callBackParams: [6],
                            addLessThanSymbol: true,
                          })
                        : 0.0
                      : 0.0}
                  </p>
                </ExchangeHeader>

                <InputSwap
                  tokenIds={[exchange.fromId, exchange.toId]}
                  tokens={tokenList}
                  value={exchange.toValue}
                  selected={exchange.toId}
                  onChange={handleChange}
                  onChangeToken={handleChangeToken}
                  onMax={handleFromMax}
                  name="to"
                />
              </ExchangeBox>

              {!isInsufficientError &&
              exchange.fromValue &&
              Number(exchange.fromValue) !== 0 &&
              exchange.toValue &&
              Number(exchange.toValue) !== 0 ? (
                <>
                  <BillingBox>
                    <BillingLine>
                      <h4>Rate</h4>
                      <p>
                        {`${calculateSwapTokenRate(Number(exchange.fromRawValue), Number(exchange.toRawValue))} 
                        ${exchange.fromId.toUpperCase()} Per ${exchange.toId.toUpperCase()}`}
                      </p>
                    </BillingLine>
                    <BillingLine>
                      <h4>Slippage tolerance</h4>
                      <p>{get(settingData, 'slippage', 0)}%</p>
                    </BillingLine>

                    <Divider sx={{ borderColor: 'rgba(84, 91, 108, 0.2)', margin: '12px 0' }} />

                    <BillingLine>
                      <h4>
                        {!isEstimateFrom ? 'Min Receive' : 'Max Sold'}
                        <TooltipCustom
                          title={`Your transaction will revert if there is a large, unfavorable 
                          price movement before it is confirmed`}
                          arrow
                          placement="right"
                          size="218px"
                        >
                          {theme.palette.mode === 'light' ? (
                            <HelpCircleIcon style={{ marginLeft: '6px' }} />
                          ) : (
                            <HelpCircleDarkIcon style={{ marginLeft: '6px' }} />
                          )}
                        </TooltipCustom>
                      </h4>
                      <p>
                        {getMinReceiveSwapToken(
                          Number(get(getSwapSettingData(), 'slippage') || defaultSettingData.slippage),
                          isEstimateFrom ? exchange.fromValue : exchange.toValue,
                          isEstimateFrom,
                        )}
                      </p>
                    </BillingLine>

                    <BillingLine>
                      <h4>
                        Trading fee{' '}
                        <TooltipCustom
                          title={`A portion of each trade which
                      80% will go to liquidity providers (LPs) and 20% will go to platfrom`}
                          arrow
                          placement="right"
                          size="230px"
                        >
                          {theme.palette.mode === 'light' ? (
                            <HelpCircleIcon style={{ marginLeft: '6px' }} />
                          ) : (
                            <HelpCircleDarkIcon style={{ marginLeft: '6px' }} />
                          )}
                        </TooltipCustom>
                      </h4>
                      <p>
                        {`${calculateTradingFee(exchange.fromValue)} 
                        ${exchange.fromId.toLocaleUpperCase()}`}
                      </p>
                    </BillingLine>

                    <BillingLine>
                      <h4>
                        Price impact{' '}
                        <TooltipCustom
                          title={`The difference between the market price and estimated price due to trade size`}
                          arrow
                          placement="right"
                          size="218px"
                        >
                          {theme.palette.mode === 'light' ? (
                            <HelpCircleIcon style={{ marginLeft: '6px' }} />
                          ) : (
                            <HelpCircleDarkIcon style={{ marginLeft: '6px' }} />
                          )}
                        </TooltipCustom>
                      </h4>
                      <p>{calculatePriceImpact(swapTokenRates.current, swapTokenRates.afterSwap)}%</p>
                    </BillingLine>
                  </BillingBox>
                </>
              ) : (
                ''
              )}
              <SwapSubmit
                fullWidth
                onClick={() => {
                  if (isInvalidInput || isInsufficientError || isInsufficientLiquidityError) {
                    return;
                  }
                  handleToggleConfirm();
                }}
              >
                {isInvalidInput
                  ? 'Please enter a valid amount'
                  : isInsufficientLiquidityError
                  ? 'Insufficient liquidity for this trade'
                  : isInsufficientError
                  ? `Insufficient ${exchange.fromId} balance`
                  : 'Swap'}
              </SwapSubmit>
            </SwapBox>
          </Grid>
        </Grid>
      </Box>

      {openSetting && <SwapSettingModal open={openSetting} onClose={handleToggleSetting} />}
      <SwapTokensModal
        open={openSelect}
        onClose={handleToggleSelect}
        tokens={tokenList}
        onSelect={handelSelectToken}
        active={selectedName === 'from' ? exchange.fromId : exchange.toId}
      />
      <SwapRecentTransactionsModal
        open={openRecent}
        onClose={handleToggleRecent}
        data={handleConvertRecentTransactionData(recentTransactions, tokenList)}
      />
      <SwapConfirmModal
        tradingFee={`${calculateTradingFee(Number(exchange.fromValue))} 
        ${exchange.fromId.toLocaleUpperCase()}`}
        tokenList={tokenList}
        swapRate={`${calculateSwapTokenRate(Number(exchange.fromRawValue), Number(exchange.toRawValue))} 
        ${exchange.fromId.toUpperCase()} Per ${exchange.toId.toUpperCase()}`}
        exchange={{
          from: exchange.fromId,
          fromValue: String(exchange.fromValue),
          to: exchange.toId,
          toValue: String(exchange.toValue),
        }}
        slippage={(settingData as any).slippage}
        minReceive={getMinReceiveSwapToken(
          Number(get(getSwapSettingData(), 'slippage') || defaultSettingData.slippage),
          isEstimateFrom ? Number(exchange.fromValue) : Number(exchange.toValue),
          isEstimateFrom,
        )}
        open={openConfirm}
        onClose={handleToggleConfirm}
        onConfirm={handleConfirm}
      />
      {openStatus && swapStatus != null && (
        <SwapStatusModal status={swapStatus} open={openStatus} onClose={handleToggleStatus} />
      )}
    </Wrapper>
  );
};

export default SwapPage;
