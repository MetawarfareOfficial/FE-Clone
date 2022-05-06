/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Button, ButtonProps, IconButton, IconButtonProps, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useWindowSize } from 'hooks/useWindowSize';
import { MyStakeCard, TableMyStake, StakeStatusModal, ListMyStake } from './index';
import InputLP from './InputLP';

import animationData from 'lotties/loading-button.json';
import { PoolItem, StakeItem } from 'services/staking';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { useAppSelector } from 'stores/hooks';
import { formatPercent, truncateNumber } from 'helpers/formatPrice';
import { useSwapToken } from 'hooks/swap';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useHistory } from 'react-router-dom';

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
  onBack: () => void;
  data: PoolItem;
  tableData: StakeItem[];
  handleToggleClaimAll: () => void;
  handleToggleClaimOne: (index: number) => void;
  handleToggleUnstake: (index: number) => void;
  handleGetTokenBalances: () => void;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: '35px 0 44px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    padding: '44px 14px 37px',
  },
}));

const MyStakeHeader = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginBottom: '10px',
}));

const BackButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  width: '38px',
  height: '38px',
  padding: '10px',
  boxSizing: 'border-box',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  position: 'absolute',
  left: '3px',
  top: '0px',
  zIndex: 2000,

  '&:hover': {
    outline: 'none',
    background: 'none',
    opacity: 0.7,
  },
}));

const SwapBox = styled(Box)<BoxProps>(({ theme }) => ({
  // maxWidth: '484px',
  boxSizing: 'border-box',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.09)' : 'rgba(41, 50, 71, 0.09)'}`,
  boxShadow: '0px 2px 30px rgba(56, 100, 255, 0.03)',
  borderRadius: '14px',
  padding: '13px 20px 24px',

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
  marginBottom: '26px',

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

const ErrorText = styled(Box)<BoxProps>(() => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: '8px',
  color: '#FF0000',
  fontSize: '14px',
  lineHeight: '120x%',
  fontWeight: '400',
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

const ButtonGetLpToken = styled(Button)<
  ButtonProps & {
    isError: boolean;
  }
>(({ isError }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '16px',
  letterSpacing: '0.025em',
  color: '#3864FF',
  textTransform: 'capitalize',
  margin: !isError ? '17px auto 32px' : '17px auto 1px',
  display: 'block',

  '&:hover': {
    background: 'none',
    opacity: 0.7,
  },
}));

const ButtonSubmit = styled(Button)<
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
  color: theme.palette.mode === 'light' ? '#fff' : '#fff',
  cursor: unEnable ? 'not-allowed !important' : 'pointer',

  '&:hover': {
    background: unEnable ? 'rgba(0, 0, 0, 0.26)' : '#3864FF',
    border: '1px solid rgba(56, 100, 255, 0.26)',
    color: theme.palette.mode === 'light' ? '#fff' : '#fff',
    boxShadow: !unEnable && '0px 5px 11px rgba(0, 82, 255, 0.38)',
    outline: 'none',
  },

  '&:disabled': {
    background: 'rgba(56, 100, 255, 0.16)',
    border: 'none',
    color: '#fff',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

const MyStake: React.FC<Props> = ({
  onBack,
  data,
  tableData,
  handleToggleClaimAll,
  handleToggleClaimOne,
  handleToggleUnstake,
  handleGetTokenBalances,
}) => {
  const history = useHistory();

  const [width] = useWindowSize();
  const { approveToken } = useSwapToken(false);
  const { stakeLp } = useInteractiveContract();
  const [tokenApproved, setTokenApproved] = useState(false);
  const [isSwapMaxFromTokens, setIsSwapMaxFromToken] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [lpTokenInput, setLpTokenInput] = useState('');

  const [status, setStatus] = useState<'success' | 'error' | 'pending' | null>(null);

  const [currentAction, setCurrentAction] = useState('stake');

  const lpToken = useAppSelector((state) => state.stake.lpToken);

  const oxbToken = useAppSelector((state) => state.stake.oxbToken);

  const [isOxbPool, setIsOxbPool] = useState(
    data.lpAddress.toLocaleLowerCase() === String(process.env.REACT_APP_CONTRACT_ADDRESS).toLocaleLowerCase(),
  );

  const [currentTransactionId, setCurrenTransactionId] = useState({
    type: '',
    id: '',
  });
  const [txCompleted, setTxCompleted] = useState({
    type: '',
    id: '',
  });

  const handleChange = (event: { value: string; name: string; isOnblur?: boolean }) => {
    setIsSwapMaxFromToken(false);
    setLpTokenInput(event.value);
  };

  const handleMaxBtnClick = async () => {
    if (Number(isOxbPool ? oxbToken.balance : lpToken.balance) > 0) {
      setIsSwapMaxFromToken(true);
      setLpTokenInput(formatPercent(oxbToken ? oxbToken.balance : lpToken.balance, 10));
    }
  };

  const handleToggleStatus = () => {
    if (openStatus) {
      setStatus(null);
    }
    setOpenStatus(!openStatus);
  };

  const handleCloseStatusModal = () => {
    setOpenStatus(false);
  };

  const handleApproveToken = async () => {
    setIsSwapMaxFromToken(false);
    try {
      setCurrentAction('approve');
      handleToggleStatus();
      setStatus('pending');
      const response = await approveToken(
        isOxbPool ? String(process.env.REACT_APP_CONTRACT_ADDRESS) : String(process.env.REACT_APP_JOE_LP_TOKEN_ADDRESS),
        String(process.env.REACT_APP_STAKING_MANAGER),
      );
      if (response.hash) {
        setCurrenTransactionId({
          id: response.hash,
          type: 'approve',
        });
        await response.wait();
        setTxCompleted({
          type: 'approve',
          id: response.hash,
        });
        setTokenApproved(true);
        handleGetTokenBalances();
      }
    } catch (error: any) {
      setStatus('error');
    }
  };

  const handleStakeLp = async () => {
    if (lpTokenInput && lpTokenInput !== '' && Number(lpTokenInput) !== 0) {
      try {
        setCurrentAction('stake');
        handleToggleStatus();
        setStatus('pending');
        const maxBalance = isOxbPool ? oxbToken.balance : lpToken.balance;
        const valueToStake = isSwapMaxFromTokens ? maxBalance : lpTokenInput;
        const response = await stakeLp(data.id, valueToStake);
        if (response.hash) {
          setCurrenTransactionId({
            id: response.hash,
            type: 'stake',
          });
          await response.wait();
          setTxCompleted({
            type: 'stake',
            id: response.hash,
          });
          setTokenApproved(true);
          handleGetTokenBalances();
        }
      } catch (error: any) {
        setStatus('error');
      }
      setIsSwapMaxFromToken(false);
    }
  };

  const handleResetInputValue = () => {
    setLpTokenInput('');
  };

  useEffect(() => {
    if (currentTransactionId.id !== '' && currentTransactionId.id === txCompleted.id) {
      setStatus('success');
      setOpenStatus(true);
      if (txCompleted.type !== 'approve') {
        handleResetInputValue();
      }
      setTxCompleted({
        id: '',
        type: '',
      });
    }
  }, [currentTransactionId, txCompleted]);

  const handleCheckIsApproved = () => {
    const allowanceAmount = isOxbPool ? oxbToken.allowance : lpToken.allowance;
    if (isSwapMaxFromTokens) {
      if (Number(allowanceAmount) !== 0 && Number(allowanceAmount) >= Number(lpToken.balance)) {
        setTokenApproved(true);
      } else {
        setTokenApproved(false);
      }
    } else {
      if (Number(allowanceAmount) !== 0 && Number(allowanceAmount) >= Number(lpTokenInput)) {
        setTokenApproved(true);
      } else {
        setTokenApproved(false);
      }
    }
  };

  useEffect(() => {
    handleCheckIsApproved();
  }, [lpTokenInput, lpToken, oxbToken]);

  useEffect(() => {
    setIsOxbPool(
      data.lpAddress.toLocaleLowerCase() === String(process.env.REACT_APP_CONTRACT_ADDRESS).toLocaleLowerCase(),
    );
  }, [data]);

  const tokenBalance = isOxbPool ? oxbToken.balance : lpToken.balance;
  const isInsufficientError = Number(lpTokenInput) > Number(tokenBalance);
  const invalidInput = lpTokenInput.trim() === '';
  return (
    <Wrapper>
      <MyStakeHeader>
        <BackButton onClick={onBack}>
          <KeyboardArrowLeftIcon />
        </BackButton>
      </MyStakeHeader>

      <Box>
        <Grid container spacing={'27px'}>
          <Grid item xs={12} md={7}>
            <MyStakeCard data={data} onClaimAll={handleToggleClaimAll} />
          </Grid>
          <Grid item xs={12} md={5}>
            <SwapBox>
              <SwapHeader>
                <h4>Stake</h4>
              </SwapHeader>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>{isOxbPool ? '0xB' : 'LP'} Token Balance</h5>
                  <p>
                    {tokenBalance !== '0'
                      ? formatForNumberLessThanCondition({
                          value: tokenBalance,
                          addLessThanSymbol: true,
                          minValueCondition: '0.000001',
                          callback: formatPercent,
                          callBackParams: [6],
                        })
                      : '0.0'}{' '}
                    {isOxbPool ? '0xB' : 'LP'}
                  </p>
                </ExchangeHeader>

                <InputLP
                  disabled={false}
                  value={lpTokenInput}
                  onChange={handleChange}
                  onMax={handleMaxBtnClick}
                  name="to"
                />

                <ButtonGetLpToken
                  isError={false}
                  onClick={() => {
                    if (isOxbPool) {
                      history.push('/swap');
                    } else {
                      history.push('/zap');
                    }
                  }}
                  variant="text"
                >
                  {`Get ${isOxbPool ? 'OxB' : 'LP'} Token ->`}
                </ButtonGetLpToken>
                {/* {isInsufficientError && <ErrorText>Insufficient balance</ErrorText>} */}
                <ButtonSubmit
                  loading={false}
                  fullWidth
                  unEnable={false}
                  onClick={() => {
                    if (!invalidInput) {
                      if (tokenApproved && !isInsufficientError) {
                        handleStakeLp();
                      } else if (!tokenApproved) {
                        handleApproveToken();
                      }
                    }
                  }}
                  disabled={tokenApproved ? isInsufficientError : false}
                >
                  {invalidInput
                    ? 'Enter Amount'
                    : tokenApproved
                    ? isInsufficientError
                      ? 'Insufficient balance'
                      : 'Stake'
                    : 'Approve'}
                </ButtonSubmit>
              </ExchangeBox>
            </SwapBox>
          </Grid>
          {width > 768 ? (
            <Grid item xs={12}>
              <TableMyStake data={tableData} onClaim={handleToggleClaimOne} onUnstake={handleToggleUnstake} />
            </Grid>
          ) : tableData.length > 0 ? (
            <Grid item xs={12}>
              <ListMyStake data={tableData} onClaim={handleToggleClaimOne} onUnstake={handleToggleUnstake} />
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Box>

      <StakeStatusModal
        title={currentAction === 'approve' ? 'Approve Information' : 'Stake Information'}
        open={openStatus}
        onClose={handleCloseStatusModal}
        status={status}
        onNextStatus={() => {
          window.open(`${process.env.REACT_APP_EXPLORER_URLS}/tx/${currentTransactionId.id}`, '_blank');
        }}
      />
    </Wrapper>
  );
};

export default MyStake;
