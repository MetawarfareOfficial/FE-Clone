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
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import ErrorIcon from 'assets/images/clarity_error-line.svg';
import { ReactComponent as SettingDarkIcon } from 'assets/images/setting-dark.svg';
import { ReactComponent as SettingIcon } from 'assets/images/setting-outlined.svg';
import { ReactComponent as SwapDarkIcon } from 'assets/images/swap-dark.svg';
import { ReactComponent as SwapIcon } from 'assets/images/zap-convert.svg';
import BigNumber from 'bignumber.js';
import InputSwap from 'components/Base/InputSwap';
import { SwapSettingModal, SwapTokensModal } from 'components/Zap';
import InputLP from 'components/Zap/InputLP';
import ZapConfirmModal from 'components/Zap/ZapConfirmModal';
import { injected } from 'connectors';
import { addEthereumChain } from 'helpers';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatPercent, formatPrice } from 'helpers/formatPrice';
import { removeCharacterInString } from 'helpers/removeCharacterInString';
import { getMinAmountTokenToSwap } from 'helpers/swaps';
import { SwapTokenId, useSwapToken } from 'hooks/swap';
import { useLoadPairInfo } from 'hooks/swap/useLoadPairInfo';
import { useSwapHelpers } from 'hooks/swap/useSwapHelpers';
import { useToast } from 'hooks/useToast';
import { useEstimateLPTokenAmount } from 'hooks/zap/useEstimateLPtokenAmount';
import { useLoadTokensBalance } from 'hooks/zap/useLoadTokensBalance';
import animationData from 'lotties/loading-button.json';
import { errorMessage } from 'messages/errorMessages';
import React, { useEffect, useState } from 'react';
import { setIsOpenSelectWalletModal } from 'services/account';
import { setIsInsufficientError, setSelectedName } from 'services/swap';
import { useAppDispatch, useAppSelector } from 'stores/hooks';

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice',
//   },
// };

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
  const { error, connector, activate, account } = useWeb3React();
  const { checkSwapSetting } = useSwapHelpers();
  const { createToast } = useToast();

  const tokenList = useAppSelector((state) => state.swap.tokenList);
  const liquidityPoolData = useAppSelector((state) => state.zap.liquidityPoolData);

  const { handleGetTokenBalances } = useLoadTokensBalance(tokenList, account, true);
  useLoadPairInfo();
  const { handleEstimateZapInLpTokenAmount } = useEstimateLPTokenAmount();
  const { approveToken } = useSwapToken();

  const pairInfoLoaded = useAppSelector((state) => state.swap.pairInfoLoaded);
  const isLiquidityPoolLoaded = useAppSelector((state) => state.zap.isLiquidityPoolLoaded);

  const isInsufficientError = useAppSelector((state) => state.swap.isInsufficientError);
  const selectedName = useAppSelector((state) => state.swap.selectedName) as any;
  const isLoadEstimateToken = useAppSelector((state) => state.swap.isLoadEstimateToken);
  const isInsufficientLiquidityError = useAppSelector((state) => state.swap.isInsufficientLiquidityError);

  const dispatch = useAppDispatch();

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
    id: SwapTokenId.JOELP,
    value: '',
  });

  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isSwapMaxFromTokens, setIsSwapMaxFromToken] = useState(false);
  const [currentAction, setCurrentAction] = useState('zap');
  const [swapStatus, setZapStatus] = useState<'success' | 'error' | 'pending' | null>(null);
  const [slippage, setSlippage] = useState('0.5');
  const [deadline, setDeadline] = useState('10');

  const [currentTransactionId, setCurrenTransactionId] = useState({
    type: '',
    id: '',
  });
  const [zapCompleted, setZapCompleted] = useState({
    type: '',
    id: '',
  });

  const handleToggleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleToggleSelect = () => {
    setOpenSelect(!openSelect);
  };

  const handleToggleStatus = () => {
    setOpenStatus(!openStatus);
  };

  const handelSelectToken = (tokenId: SwapTokenId) => {
    if (isOpenSelectTokenFromModal) {
      setExchangeFrom({
        id: tokenId,
        value: exchangeFrom.value,
      });
      setExchangeTo({
        id: exchangeTo.id,
        value: String(handleEstimateZapInLpTokenAmount(tokenId, exchangeFrom.value || '0', liquidityPoolData)),
      });
    } else {
    }
    setIsSwapMaxFromToken(false);
  };

  const handleChangeToken = (name: string) => {
    if (name === 'from') {
      setIsOpenSelectTokenFromModal(true);
    } else {
      setIsOpenSelectTokenFromModal(false);
    }
    setOpenSelect(true);
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
      if (selectedName === 'from') {
        setExchangeFrom({
          id: exchangeFrom.id,
          value: value,
        });
        setExchangeTo({
          id: exchangeTo.id,
          value: String(handleEstimateZapInLpTokenAmount(exchangeFrom.id, value, liquidityPoolData)),
        });
      } else {
      }
    }
    setIsSwapMaxFromToken(false);
    setIsFirstTime(false);
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
        dispatch(setSelectedName('from'));
        setExchangeFrom({
          id: exchangeFrom.id,
          value: valueIn,
        });
        setExchangeTo({
          id: exchangeTo.id,
          value: String(handleEstimateZapInLpTokenAmount(exchangeFrom.id, valueIn, liquidityPoolData)),
        });
        setIsSwapMaxFromToken(true);
      }
      setIsFirstTime(false);
    }
  };

  const handleToggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleApproveToken = async (id: SwapTokenId) => {
    const tokenIn = tokenList.filter((item) => item.id === id);
    try {
      if (!tokenIn[0]) {
        throw new Error('Some thing wrong');
      }
      setCurrentAction('approve');
      handleToggleStatus();
      setZapStatus('pending');
      const response = await approveToken(tokenIn[0].address, String(process.env.REACT_APP_CONTRACT_ADDRESS));
      if (response.hash) {
        setCurrenTransactionId({
          id: response.hash,
          type: 'approve',
        });
        await response.wait();
        setZapCompleted({
          type: 'approve',
          id: response.hash,
        });
        handleGetTokenBalances();
      }
    } catch (error: any) {
      setZapStatus('error');
    }
  };

  const handleConnectWallet = async () => {
    if (error instanceof UnsupportedChainIdError) {
      try {
        if (connector instanceof WalletConnectConnector) {
          createToast({
            message: errorMessage.META_MASK_WRONG_NETWORK.message,
            type: 'error',
            toastId: 1,
          });
        } else {
          await addEthereumChain();
          await activate(injected);
        }
      } catch (ex: any) {
        createToast({
          message: ex.message,
          type: 'error',
        });
      }
    } else {
      dispatch(setIsOpenSelectWalletModal(true));
    }
  };
  const handleCheckIsApproved = () => {
    const tokenFrom = tokenList.filter((item) => item.id === exchangeFrom.id);
    if (tokenFrom[0]) {
      if (isSwapMaxFromTokens) {
        if (Number(tokenFrom[0].allowanceBalance) >= Number(tokenFrom[0].balance)) {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      } else {
        if (Number(tokenFrom[0].allowanceBalance) >= Number(exchangeFrom.value)) {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      }
    } else {
      setIsApproved(false);
    }
  };

  useEffect(() => {
    handleCheckIsApproved();
  }, [exchangeFrom, tokenList]);

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
    const response = checkSwapSetting();
    setSlippage(response.slippage);
    setDeadline(response.deadline);
  }, []);

  // const handleApprove = () => {
  //   setSubmitting(true);
  //   setTimeout(() => {
  //     setSubmitting(false);
  //     setStatusZap('error');
  //   }, 1000);
  // };
  const fromTokens = tokenList.filter((item) => item.id === exchangeFrom.id);

  const isInvalidInput =
    selectedName === 'from'
      ? exchangeFrom.value === null || Number(exchangeFrom.value) === 0
      : exchangeTo.value === null || Number(exchangeTo.value) === 0;

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
                  disabled={!pairInfoLoaded || !isLiquidityPoolLoaded}
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
                        // handleSwapIconClick();
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
                        // handleSwapIconClick();
                      }
                    }}
                  />
                )}
              </ExchangeIcon>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>To{selectedName === 'from' ? 'LP' : ''}</h5>
                  <p>Balance: {0}</p>
                </ExchangeHeader>

                <InputLP disabled={true} value={exchangeTo.value} onChange={() => {}} name="to" />
              </ExchangeBox>

              {!isFirstTime && isApproved && (
                <TextStatus status={isInsufficientError || isInsufficientLiquidityError ? 'error' : 'success'}>
                  {isInvalidInput ? (
                    '  '
                  ) : isInsufficientError ? (
                    <>
                      <img alt="" src={ErrorIcon} /> {`insufficient ${exchangeFrom.id.toUpperCase()} Balance`}
                    </>
                  ) : isInsufficientLiquidityError ? (
                    <>
                      <img alt="" src={ErrorIcon} /> {`Insufficient liquidity for this trade`}
                    </>
                  ) : (
                    'Approved'
                  )}
                </TextStatus>
              )}

              {/* <SwapSubmit fullWidth unEnable={false} loading={submitting} onClick={handleApprove}>
                {submitting ? <Lottie options={defaultOptions} height={33} width={33} /> : 'Approve'}
              </SwapSubmit> */}
              {!isFirstTime ? (
                !account ? (
                  <SwapSubmit fullWidth unEnable={false} onClick={handleConnectWallet}>
                    Connect Wallet
                  </SwapSubmit>
                ) : isApproved ? (
                  !isInvalidInput && (
                    <SwapSubmit
                      fullWidth
                      unEnable={false}
                      onClick={() => {
                        handleToggleConfirm();
                      }}
                    >
                      Zap
                    </SwapSubmit>
                  )
                ) : (
                  <SwapSubmit
                    fullWidth
                    unEnable={false}
                    onClick={() => {
                      handleApproveToken(exchangeFrom.id);
                    }}
                  >
                    Approve {exchangeFrom.id.toLocaleUpperCase()}
                  </SwapSubmit>
                )
              ) : (
                <></>
              )}
            </SwapBox>
          </Grid>
        </Grid>
      </Box>

      {openSetting && (
        <SwapSettingModal
          open={openSetting}
          setDeadline={setDeadline}
          setSlippage={setSlippage}
          onClose={handleToggleSetting}
        />
      )}
      <SwapTokensModal
        open={openSelect}
        onClose={handleToggleSelect}
        tokens={tokenList.filter((item) => item.id !== SwapTokenId.OXB && item.id !== SwapTokenId.JOELP)}
        onSelect={handelSelectToken}
        active={selectedName === 'from' ? exchangeFrom.id : exchangeTo.id}
      />
      <ZapConfirmModal
        priceImpactStatus={'0'}
        tradingFee={`${0} ${exchangeFrom.id.toLocaleUpperCase()}`}
        tokenList={tokenList}
        swapRate={''}
        exchange={{
          from: exchangeFrom.id,
          fromValue: exchangeFrom.value,
          to: exchangeTo.id,
          toValue: exchangeTo.value,
        }}
        slippage={slippage}
        isMinReceive={selectedName === 'from'}
        minReceive={''}
        open={openConfirm}
        onClose={handleToggleConfirm}
        onConfirm={() => {}}
        priceImpact={''}
      />
      {/* {openStatus && swapStatus != null && (
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
      )} */}
    </Wrapper>
  );
};

export default ZapPage;
