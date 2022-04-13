import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Grid,
  IconButton,
  IconButtonProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ReactComponent as SettingDarkIcon } from 'assets/images/setting-dark.svg';
import { ReactComponent as SettingIcon } from 'assets/images/setting-outlined.svg';
import { ReactComponent as SwapDarkIcon } from 'assets/images/swap-dark.svg';
import { ReactComponent as SwapIcon } from 'assets/images/zap-convert.svg';
import BigNumber from 'bignumber.js';
import InputSwap from 'components/Base/InputSwap';
import InputLP from 'components/Zap/InputLP';
import { SwapSettingModal, SwapStatusModal, SwapTokensModal } from 'components/Zap';
import { SwapConfirmModal } from 'components/Swap';
import { getBalanceIntervalTime } from 'consts/swap';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatPercent, formatPrice } from 'helpers/formatPrice';
import { removeCharacterInString } from 'helpers/removeCharacterInString';
import { getMinAmountTokenToSwap } from 'helpers/swaps';
import { SwapTokenId, useSwapToken } from 'hooks/swap';
import { useSwapHelpers } from 'hooks/swap/useSwapHelpers';
import React, { useEffect, useState } from 'react';
import { handleDisableToken, handleSetTokenBalances, setIsInsufficientError, setSelectedName } from 'services/swap';
import { useAppDispatch, useAppSelector } from 'stores/hooks';

import Lottie from 'react-lottie';

import animationData from 'lotties/loading-button.json';
import ErrorIcon from 'assets/images/clarity_error-line.svg';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

interface Props {
  title?: string;
}

interface TextStatusProps extends TypographyProps {
  status: 'error' | 'success' | null;
}

BigNumber.config({
  EXPONENTIAL_AT: 100,
});
export interface TokenItem {
  id: SwapTokenId;
  logo: string;
  name: string;
  balance: string;
  disabled: boolean;
  isNative?: boolean;
  decimal: string;
  address: string;
  allowanceBalance: string;
}

export interface Exchange {
  fromId: SwapTokenId;
  fromValue: string | null;
  toId: SwapTokenId;
  toValue: string | null;
}
export interface ExchangeItem {
  id: SwapTokenId;
  value: string | null;
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
  fontWeight: '700',
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
  marginLeft: 'auto',
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
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.4)' : 'rgba(255, 255, 255, 0.4)',
    margin: 0,
  },

  p: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.8)' : 'rgba(255, 255, 255, 0.8)',
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

    '&:hover': {
      opacity: 0.7,
    },
  },
}));

const SwapSubmit = styled(Button)<
  ButtonProps & {
    unEnable: boolean;
    loading: boolean;
  }
>(({ theme, unEnable }) => ({
  background: unEnable ? 'rgba(0, 0, 0, 0.26)' : '#3864FF',
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
  color: theme.palette.mode === 'light' ? '#fff' : unEnable ? 'rgba(255, 255, 255, 0.3)' : '#171717',
  marginTop: '23px',
  cursor: unEnable ? 'not-allowed !important' : 'pointer',

  '&:hover': {
    background: unEnable ? 'rgba(0, 0, 0, 0.26)' : '#3864FF',
    border: '1px solid rgba(56, 100, 255, 0.26)',
    color: theme.palette.mode === 'light' ? '#fff' : unEnable ? 'rgba(255, 255, 255, 0.3)' : '#171717',
    boxShadow: !unEnable && '0px 5px 11px rgba(0, 82, 255, 0.38)',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

interface SetExchangeParams {
  selectedName: string;
  estimatedAmountToken: string | null;
  minReceive: string | null;
  maxSold: string | null;
  tradingFee: string;
  priceImpact: string;
  isSwap?: boolean;
  exchangeId?: SwapTokenId;
}

const TextStatus = styled(Typography)<TextStatusProps>(({ status }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '26px',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  justifyContent: 'center',
  color: status === 'error' ? '#FF0E0E' : '#0ADB12',
}));

const ZapPage: React.FC<Props> = () => {
  const theme = useTheme();
  const { getSwappaleTokens, getSwapTokenBalances, account, handleSwapToken, loadEstimateToken } = useSwapToken();
  const { checkSwapSetting, calculateSwapTokenRate } = useSwapHelpers();

  const tokenList = useAppSelector((state) => state.swap.tokenList);
  const isInsufficientError = useAppSelector((state) => state.swap.isInsufficientError);
  const selectedName = useAppSelector((state) => state.swap.selectedName) as any;
  const isLoadEstimateToken = useAppSelector((state) => state.swap.isLoadEstimateToken);
  const dispatch = useAppDispatch();
  const pairInfoLoaded = useAppSelector((state) => state.swap.pairInfoLoaded);
  const [slippage, setSlippage] = useState('0.5');
  const [deadline, setDeadline] = useState('10');
  const [swapStatus, setSwapStatus] = useState<'success' | 'error' | 'pending' | null>(null);
  const [currentAction, setCurrentAction] = useState('swap');
  const [priceImpactStatus, setPriceImpactStatus] = useState<'green' | 'black' | 'orange' | 'pink' | 'red'>('black');
  const [currentTransactionId, setCurrenTransactionId] = useState({
    type: '',
    id: '',
  });
  const [tokenSwapCompleted, setTokenSwapCompleted] = useState({
    type: '',
    id: '',
  });
  const [isSwapMaxFromTokens, setIsSwapMaxFromToken] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [isOpenSelectTokenFromModal, setIsOpenSelectTokenFromModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [exchangeFrom, setExchangeFrom] = useState<ExchangeItem>({
    id: SwapTokenId.AVAX,
    value: '',
  });
  const [exchangeTo, setExchangeTo] = useState<ExchangeItem>({
    id: SwapTokenId.OXB,
    value: '',
  });
  const [minReceive, setMinReceive] = useState<null | string>('0');
  const [tradingFee, setTradingFee] = useState('0');
  const [priceImpact, setPriceImpact] = useState('0');
  const [submitting, setSubmitting] = useState(false);
  const [statusZap, setStatusZap] = useState<any>(null);

  const handleChangeSwapData = ({
    selectedName,
    estimatedAmountToken,
    minReceive,
    maxSold,
    tradingFee,
    priceImpact,
    isSwap = false,
    exchangeId,
  }: SetExchangeParams) => {
    if (selectedName === 'from') {
      if (isSwap) {
        setExchangeTo({
          id: exchangeFrom.id,
          value: estimatedAmountToken,
        });
      } else {
        if (exchangeId) {
          setExchangeTo({
            id: exchangeId,
            value: estimatedAmountToken,
          });
        } else {
          setExchangeTo({
            id: exchangeTo.id,
            value: estimatedAmountToken,
          });
        }
      }
      setMinReceive(minReceive);
    } else {
      if (isSwap) {
        setExchangeFrom({
          id: exchangeTo.id,
          value: estimatedAmountToken,
        });
      } else {
        if (exchangeId) {
          setExchangeFrom({
            id: exchangeId,
            value: estimatedAmountToken,
          });
        } else {
          setExchangeFrom({
            id: exchangeFrom.id,
            value: estimatedAmountToken,
          });
        }
      }
      setMinReceive(maxSold);
    }
    setTradingFee(tradingFee);
    setPriceImpact(priceImpact);
  };

  const handleChange = (event: { value: string; name: string; isOnblur?: boolean }) => {
    const { value, name, isOnblur } = event;
    if (value === '0' && isOnblur) {
      return;
    }
    if (isOnblur) {
      if (name === 'from') {
        setExchangeFrom({
          id: exchangeFrom.id,
          value,
        });
      } else if (name === 'to') {
        setExchangeTo({
          id: exchangeTo.id,
          value,
        });
      }
    } else {
      if (name === 'from') {
        setExchangeFrom({
          id: exchangeFrom.id,
          value,
        });
        dispatch(setSelectedName('from'));
        const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
          isExactInput: true,
          tokenIn: exchangeFrom.id,
          tokenOut: exchangeTo.id,
          amount: value,
        });
        handleChangeSwapData({
          estimatedAmountToken,
          selectedName: 'from',
          maxSold,
          minReceive,
          tradingFee,
          priceImpact,
        });
      } else if (name === 'to') {
        !isOnblur && dispatch(setSelectedName('to'));
        setExchangeTo({
          id: exchangeTo.id,
          value,
        });
        const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
          isExactInput: false,
          tokenIn: exchangeFrom.id,
          tokenOut: exchangeTo.id,
          amount: value,
        });
        handleChangeSwapData({
          estimatedAmountToken,
          selectedName: 'to',
          maxSold,
          minReceive,
          tradingFee,
          priceImpact,
        });
      }
      setIsSwapMaxFromToken(false);
    }
  };

  const handleChangeToken = (name: string) => {
    if (name === 'from') {
      setIsOpenSelectTokenFromModal(true);
    } else {
      setIsOpenSelectTokenFromModal(false);
    }
    setOpenSelect(true);
  };

  const handleSwapIconClick = () => {
    if (selectedName === 'from') {
      dispatch(setSelectedName('to'));
      const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
        isExactInput: false,
        tokenIn: exchangeTo.id,
        tokenOut: exchangeFrom.id,
        amount: exchangeFrom.value || '0',
      });
      handleChangeSwapData({
        estimatedAmountToken,
        selectedName: 'to',
        maxSold,
        minReceive,
        tradingFee,
        priceImpact,
        isSwap: true,
      });
      setExchangeTo({
        id: exchangeFrom.id,
        value: exchangeFrom.value,
      });
    } else {
      dispatch(setSelectedName('from'));
      const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
        isExactInput: true,
        tokenIn: exchangeTo.id,
        tokenOut: exchangeFrom.id,
        amount: exchangeTo.value || '0',
      });
      handleChangeSwapData({
        estimatedAmountToken,
        selectedName: 'from',
        maxSold,
        minReceive,
        tradingFee,
        priceImpact,
        isSwap: true,
      });
      setExchangeFrom({
        id: exchangeTo.id,
        value: exchangeTo.value,
      });
    }
    setIsSwapMaxFromToken(false);
  };

  const handleFromMax = () => {
    if (account) {
      const currentToken = tokenList.filter((item) => item.id === exchangeFrom.id);
      if (currentToken[0]) {
        let valueIn = '0';
        if (currentToken[0].id === SwapTokenId.AVAX) {
          valueIn =
            Number(currentToken[0].balance) <= 0.01
              ? '0'
              : formatPercent(new BigNumber(currentToken[0].balance).minus(0.01).toString(), 10);
        } else {
          valueIn = formatPercent(new BigNumber(currentToken[0].balance).toString(), 10);
        }
        setExchangeFrom({
          id: exchangeFrom.id,
          value: valueIn,
        });
        dispatch(setSelectedName('from'));
        const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
          isExactInput: true,
          tokenIn: exchangeFrom.id,
          tokenOut: exchangeTo.id,
          amount:
            currentToken[0].id === SwapTokenId.AVAX
              ? new BigNumber(currentToken[0].balance).minus(0.01).toString()
              : new BigNumber(currentToken[0].balance).toString(),
        });
        handleChangeSwapData({
          estimatedAmountToken,
          selectedName: 'from',
          maxSold,
          minReceive,
          tradingFee,
          priceImpact,
        });
        setIsSwapMaxFromToken(true);
      }
    }
  };

  const handleToggleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleToggleSelect = () => {
    setOpenSelect(!openSelect);
  };

  const handleToggleStatus = () => {
    setOpenStatus(!openStatus);
  };

  const handleGetTokenBalances = async () => {
    const newTokens = await getSwapTokenBalances(tokenList);
    dispatch(handleSetTokenBalances(newTokens));
  };

  const handelSelectToken = (tokenId: SwapTokenId) => {
    if (isOpenSelectTokenFromModal) {
      setExchangeFrom({
        id: tokenId,
        value: exchangeFrom.value,
      });
      if (selectedName === 'from') {
        const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
          isExactInput: true,
          tokenIn: tokenId,
          tokenOut: exchangeTo.id,
          amount: exchangeFrom.value || '0',
        });
        handleChangeSwapData({
          estimatedAmountToken,
          selectedName: 'from',
          maxSold,
          minReceive,
          tradingFee,
          priceImpact,
        });
      } else {
        const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
          isExactInput: false,
          tokenIn: tokenId,
          tokenOut: exchangeTo.id,
          amount: exchangeTo.value || '0',
        });
        handleChangeSwapData({
          estimatedAmountToken,
          selectedName: 'to',
          maxSold,
          minReceive,
          tradingFee,
          priceImpact,
          exchangeId: tokenId,
        });
      }
    } else {
      setExchangeTo({
        id: tokenId,
        value: exchangeTo.value,
      });
      if (selectedName === 'from') {
        const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
          isExactInput: true,
          tokenIn: exchangeFrom.id,
          tokenOut: tokenId,
          amount: exchangeFrom.value || '0',
        });
        handleChangeSwapData({
          estimatedAmountToken,
          selectedName: 'from',
          maxSold,
          minReceive,
          tradingFee,
          priceImpact,
          exchangeId: tokenId,
        });
      } else {
        const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
          isExactInput: false,
          tokenIn: exchangeFrom.id,
          tokenOut: tokenId,
          amount: exchangeTo.value || '0',
        });
        handleChangeSwapData({
          estimatedAmountToken,
          selectedName: 'to',
          maxSold,
          minReceive,
          tradingFee,
          priceImpact,
        });
      }
    }
    setIsSwapMaxFromToken(false);
  };

  const handleToggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleConfirm = async () => {
    handleToggleConfirm();
    setCurrentAction('swap');
    handleToggleStatus();
    try {
      setSwapStatus('pending');
      const fromToken = tokenList.filter((item) => item.id === exchangeFrom.id);
      let fromValue = '0';
      if (isSwapMaxFromTokens && fromToken[0]) {
        if (fromToken[0].id === SwapTokenId.AVAX) {
          fromValue = new BigNumber(fromToken[0].balance).minus(0.01).toString();
        } else {
          fromValue = new BigNumber(fromToken[0].balance).toString();
        }
      } else {
        fromValue = new BigNumber(exchangeFrom.value || 0).toString();
      }
      const transaction = await handleSwapToken(
        {
          fromId: exchangeFrom.id,
          fromValue: fromValue,
          toId: exchangeTo.id,
          toValue: exchangeTo.value,
        },
        selectedName === 'to',
        {
          slippage,
          deadline,
        },
      );
      if (transaction.hash) {
        setCurrenTransactionId({
          id: transaction.hash,
          type: 'swap',
        });
        await transaction.wait();
        setTokenSwapCompleted({
          id: transaction.hash,
          type: 'swap',
        });
        handleGetTokenBalances();
      }
    } catch (error: any) {
      setSwapStatus('error');
    }
  };

  const handleSetPriceImpactWarningColor = (_priceImpact: string) => {
    const clonedPriceImpact = Number(_priceImpact);
    if (Number(clonedPriceImpact) < 0.01) {
      setPriceImpactStatus('green');
    } else if (clonedPriceImpact >= 0.01 && clonedPriceImpact < 1) {
      setPriceImpactStatus('green');
    } else if (clonedPriceImpact >= 1 && clonedPriceImpact < 3) {
      setPriceImpactStatus('black');
    } else if (clonedPriceImpact >= 3 && clonedPriceImpact < 5) {
      setPriceImpactStatus('orange');
    } else if (clonedPriceImpact >= 5 && clonedPriceImpact < 15) {
      setPriceImpactStatus('pink');
    } else {
      setPriceImpactStatus('red');
    }
  };
  const handleSetSlippage = (value: string) => {
    if (selectedName === 'from') {
      const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
        isExactInput: true,
        tokenIn: exchangeFrom.id,
        tokenOut: exchangeTo.id,
        amount: exchangeFrom.value || '0',
      });
      handleChangeSwapData({
        estimatedAmountToken,
        selectedName: 'from',
        maxSold,
        minReceive,
        tradingFee,
        priceImpact,
      });
    } else {
      const { estimatedAmountToken, maxSold, minReceive, tradingFee, priceImpact } = loadEstimateToken({
        isExactInput: false,
        tokenIn: exchangeFrom.id,
        tokenOut: exchangeTo.id,
        amount: exchangeTo.value || '0',
      });
      handleChangeSwapData({
        estimatedAmountToken,
        selectedName: 'to',
        maxSold,
        minReceive,
        tradingFee,
        priceImpact,
      });
    }
    setSlippage(value);
  };

  useEffect(() => {
    handleGetTokenBalances();
    let getTokenBalancesInterval: NodeJS.Timer;
    if (account) {
      getTokenBalancesInterval = setInterval(handleGetTokenBalances, getBalanceIntervalTime);
    }
    return () => {
      if (getTokenBalancesInterval) {
        clearInterval(getTokenBalancesInterval);
      }
    };
  }, [account]);

  useEffect(() => {
    const response = checkSwapSetting();
    setSlippage(response.slippage);
    setDeadline(response.deadline);
  }, []);

  useEffect(() => {
    handleSetPriceImpactWarningColor(priceImpact);
  }, [priceImpact]);

  useEffect(() => {
    if (openSelect && isOpenSelectTokenFromModal) {
      const selectableTokens = getSwappaleTokens(exchangeTo.id, exchangeFrom.id);
      dispatch(handleDisableToken(selectableTokens));
    } else if (openSelect && !isOpenSelectTokenFromModal) {
      const selectableTokens = getSwappaleTokens(exchangeFrom.id, exchangeTo.id);
      dispatch(handleDisableToken(selectableTokens));
    }
  }, [openSelect, selectedName, exchangeTo.id, exchangeFrom.id, isOpenSelectTokenFromModal]);

  useEffect(() => {
    const selectedTokenId = exchangeFrom.id;
    const selectedTokenValue = exchangeFrom.value;
    const selectedToken = tokenList.filter((item) => item.id === selectedTokenId);
    if (selectedToken[0]) {
      const inputValue = new BigNumber(selectedTokenValue || 0).toNumber();
      const slippageValue = getMinAmountTokenToSwap(selectedTokenValue, slippage);
      if (
        selectedToken[0].balance === '0' ||
        Number(formatPercent(removeCharacterInString(String(selectedToken[0].balance), ','), 10)) <
          (selectedName === 'to' ? slippageValue : inputValue)
      ) {
        dispatch(setIsInsufficientError(true));
      } else {
        dispatch(setIsInsufficientError(false));
      }
    }
  }, [exchangeFrom.id, exchangeTo.value, tokenList, selectedName, slippage]);

  useEffect(() => {
    if (currentTransactionId.id !== '' && currentTransactionId.id === tokenSwapCompleted.id) {
      setSwapStatus('success');
      setOpenStatus(true);

      setTokenSwapCompleted({
        id: '',
        type: '',
      });
    }
  }, [currentTransactionId, tokenSwapCompleted]);

  useEffect(() => {
    const nativeToken = tokenList.filter((item) => item.id === SwapTokenId.AVAX);
    const OxbToken = tokenList.filter((item) => item.id === SwapTokenId.OXB);
    const usdcToken = tokenList.filter((item) => item.id === SwapTokenId.USDC);
    const usdtToken = tokenList.filter((item) => item.id === SwapTokenId.USDT);
    if (
      !account &&
      (Number(nativeToken[0].balance) > 0 ||
        Number(OxbToken[0].balance) > 0 ||
        Number(usdcToken[0].balance) > 0 ||
        Number(usdtToken[0].balance) > 0)
    ) {
      handleGetTokenBalances();
    }
  }, [tokenList, account]);

  const fromTokens = tokenList.filter((item) => item.id === exchangeFrom.id);
  const toTokens = tokenList.filter((item) => item.id === exchangeTo.id);

  const handleApprove = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStatusZap('error');
    }, 1000);
  };

  return (
    <Wrapper>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={{ xs: 0, lg: '88px' }}>
          <Grid item xs={12} md={6}>
            <TitleBlack>Zap</TitleBlack>
            <TitleWhite>Tokens</TitleWhite>
            <Text>
              {`Select the crypto you want to convert from and enter the amount of 
              tokens you want to swap. Once the transaction is confirmed, the tokens on your account will be swapped. 
              You'll see a receipt with all details.*`}
            </Text>
          </Grid>
          <Grid item xs={12} md={6}>
            <SwapBox>
              <SwapHeader>
                <h4>Zap</h4>

                <IconButtonCustom onClick={handleToggleSetting}>
                  {theme.palette.mode === 'light' ? <SettingIcon /> : <SettingDarkIcon />}
                </IconButtonCustom>
              </SwapHeader>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>From Token{selectedName === 'to' ? '(estimated)' : ''}</h5>
                  <p>
                    Balance:{' '}
                    {fromTokens.length > 0
                      ? Number(fromTokens[0].balance) > 0
                        ? formatForNumberLessThanCondition({
                            value: fromTokens[0].balance,
                            minValueCondition: 0.000001,
                            callback: formatPrice,
                            callBackParams: [6, 0],
                            addLessThanSymbol: true,
                          })
                        : '0.0'
                      : '0.0'}
                  </p>
                </ExchangeHeader>

                <InputSwap
                  disabled={!pairInfoLoaded}
                  tokens={tokenList}
                  value={exchangeFrom.value}
                  selected={exchangeFrom.id}
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
                  <h5>To{selectedName === 'from' ? 'LP' : ''}</h5>
                  <p>
                    Balance:{' '}
                    {toTokens.length > 0
                      ? Number(toTokens[0].balance) > 0
                        ? formatForNumberLessThanCondition({
                            value: toTokens[0].balance,
                            minValueCondition: 0.000001,
                            callback: formatPrice,
                            callBackParams: [6, 0],
                            addLessThanSymbol: true,
                          })
                        : '0.0'
                      : '0.0'}
                  </p>
                </ExchangeHeader>

                <InputLP disabled={!pairInfoLoaded} value={exchangeTo.value} onChange={handleChange} name="to" />
              </ExchangeBox>

              {!isInsufficientError &&
                exchangeFrom.value &&
                Number(exchangeFrom.value) !== 0 &&
                exchangeTo.value &&
                Number(exchangeTo.value) !== 0 && (
                  <>
                    <BillingBox>
                      <BillingLine>
                        <h4>Exchange Rate</h4>
                        <p>1 0xB = Xxxx 0xB/AVAX</p>
                      </BillingLine>
                      <BillingLine>
                        <h4>Minimum You Get</h4>
                        <p>Xxxx 0xB/ AVAX</p>
                      </BillingLine>
                    </BillingBox>
                  </>
                )}

              {statusZap && (
                <TextStatus status={statusZap}>
                  {statusZap === 'error' && <img alt="" src={ErrorIcon} />}{' '}
                  {statusZap == 'error' ? 'insufficient AVAX Balance' : 'Approved'}
                </TextStatus>
              )}

              <SwapSubmit fullWidth unEnable={false} loading={submitting} onClick={handleApprove}>
                {submitting ? <Lottie options={defaultOptions} height={33} width={33} /> : 'Approve'}
              </SwapSubmit>
            </SwapBox>
          </Grid>
        </Grid>
      </Box>

      {openSetting && (
        <SwapSettingModal
          open={openSetting}
          setDeadline={setDeadline}
          setSlippage={handleSetSlippage}
          onClose={handleToggleSetting}
        />
      )}
      <SwapTokensModal
        open={openSelect}
        onClose={handleToggleSelect}
        tokens={tokenList}
        onSelect={handelSelectToken}
        active={selectedName === 'from' ? exchangeFrom.id : exchangeTo.id}
      />
      <SwapConfirmModal
        priceImpactStatus={priceImpactStatus}
        tradingFee={`${tradingFee} ${exchangeFrom.id.toLocaleUpperCase()}`}
        tokenList={tokenList}
        swapRate={`${calculateSwapTokenRate(Number(exchangeFrom.value), Number(exchangeTo.value))} 
        ${exchangeFrom.id.toUpperCase()} Per ${exchangeTo.id.toUpperCase()}`}
        exchange={{
          from: exchangeFrom.id,
          fromValue: exchangeFrom.value,
          to: exchangeTo.id,
          toValue: exchangeTo.value,
        }}
        slippage={slippage}
        isMinReceive={selectedName === 'from'}
        minReceive={minReceive!}
        open={openConfirm}
        onClose={handleToggleConfirm}
        onConfirm={handleConfirm}
        priceImpact={priceImpact}
      />
      {openStatus && swapStatus != null && (
        <SwapStatusModal
          status={swapStatus}
          open={openStatus}
          transactionId={currentTransactionId.id}
          action={currentAction === 'swap' ? 'swap' : 'approve'}
          onClose={() => {
            handleToggleStatus();
            setCurrenTransactionId({
              type: '',
              id: '',
            });
          }}
        />
      )}
    </Wrapper>
  );
};

export default ZapPage;
