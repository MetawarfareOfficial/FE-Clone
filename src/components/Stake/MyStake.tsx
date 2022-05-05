/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Button, ButtonProps, IconButton, IconButtonProps, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useWindowSize } from 'hooks/useWindowSize';
import { MyStakeCard, TableMyStake, StakeSettingModal, StakeStatusModal, ListMyStake } from './index';
import InputLP from './InputLP';
import { ReactComponent as SettingDarkIcon } from 'assets/images/setting-dark.svg';
import { ReactComponent as SettingIcon } from 'assets/images/setting-outlined.svg';

import animationData from 'lotties/loading-button.json';
import { PoolItem, StakeItem } from 'services/staking';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { useAppSelector } from 'stores/hooks';
import { formatPercent } from 'helpers/formatPrice';
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
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.09)' : 'rgba(255, 255, 255, 0.12)'}`,
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
  color: theme.palette.mode === 'light' ? '#fff' : unEnable ? 'rgba(255, 255, 255, 0.3)' : '#171717',
  cursor: unEnable ? 'not-allowed !important' : 'pointer',

  '&:hover': {
    background: unEnable ? 'rgba(0, 0, 0, 0.26)' : '#3864FF',
    border: '1px solid rgba(56, 100, 255, 0.26)',
    color: theme.palette.mode === 'light' ? '#fff' : unEnable ? 'rgba(255, 255, 255, 0.3)' : '#171717',
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
  const theme = useTheme();
  const [openSetting, setOpenSetting] = useState(false);
  // const [openClaimAll, setOpenClaimAll] = useState(false);
  // const [disabledStake, setDisabledStake] = useState(false);
  const [tokenApproved, setTokenApproved] = useState(false);
  const [isSwapMaxFromTokens, setIsSwapMaxFromToken] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [lpTokenInput, setLpTokenInput] = useState('0');
  // const [isFirstTime, setIsFirstTime] = useState(true);

  // const [claimType, setClaimType] = useState<'claim_all' | 'claim' | 'unstake'>('claim_all');
  const [status, setStatus] = useState<'success' | 'error' | 'pending' | null>(null);

  const [deadline, setDeadline] = useState('10');
  const [currentAction, setCurrentAction] = useState('stake');

  const lpToken = useAppSelector((state: any) => state.stake.lpToken);

  const [currentTransactionId, setCurrenTransactionId] = useState({
    type: '',
    id: '',
  });
  const [zapCompleted, setZapCompleted] = useState({
    type: '',
    id: '',
  });

  const handleChange = (event: { value: string; name: string; isOnblur?: boolean }) => {
    setLpTokenInput(event.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSetSlippage = (value: string) => {};

  const handleToggleSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleToggleStatus = () => {
    if (openStatus) {
      setStatus(null);
    }
    setOpenStatus(!openStatus);
  };

  const handleApproveToken = async () => {
    try {
      setCurrentAction('approve');
      handleToggleStatus();
      setStatus('pending');
      const response = await approveToken(
        String(process.env.REACT_APP_JOE_LP_TOKEN_ADDRESS),
        String(process.env.REACT_APP_STAKING_MANAGER),
      );
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
        const response = await stakeLp(data.id, lpTokenInput);
        if (response.hash) {
          setCurrenTransactionId({
            id: response.hash,
            type: 'stake',
          });
          await response.wait();
          setZapCompleted({
            type: 'stake',
            id: response.hash,
          });
          setTokenApproved(true);
          handleGetTokenBalances();
        }
      } catch (error: any) {
        setStatus('error');
      }
    }
  };
  const handleResetInputValue = () => {
    setLpTokenInput('');
    // setIsFirstTime(true);
  };

  useEffect(() => {
    if (currentTransactionId.id !== '' && currentTransactionId.id === zapCompleted.id) {
      setStatus('success');
      setOpenStatus(true);
      if (zapCompleted.type !== 'approve') {
        handleResetInputValue();
      }
      setZapCompleted({
        id: '',
        type: '',
      });
    }
  }, [currentTransactionId, zapCompleted]);

  const handleCheckIsApproved = () => {
    if (isSwapMaxFromTokens) {
      if (Number(lpToken.allowance) !== 0 && Number(lpToken.allowance) >= Number(lpToken.balance)) {
        setTokenApproved(true);
      } else {
        setTokenApproved(false);
      }
    } else {
      if (Number(lpToken.allowance) !== 0 && Number(lpToken.allowance) >= Number(lpTokenInput)) {
        setTokenApproved(true);
      } else {
        setTokenApproved(false);
      }
    }
  };

  useEffect(() => {
    handleCheckIsApproved();
  }, [lpTokenInput, lpToken]);

  const isInsufficientError = Number(lpTokenInput) > Number(lpToken.balance);

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

                <IconButtonCustom onClick={handleToggleSetting}>
                  {theme.palette.mode === 'light' ? <SettingIcon /> : <SettingDarkIcon />}
                </IconButtonCustom>
              </SwapHeader>

              <ExchangeBox>
                <ExchangeHeader>
                  <h5>LP Token Balance</h5>
                  <p>
                    {formatForNumberLessThanCondition({
                      value: lpToken.balance,
                      addLessThanSymbol: true,
                      minValueCondition: '0.000001',
                      callback: formatPercent,
                      callBackParams: [6],
                    })}{' '}
                    LP
                  </p>
                </ExchangeHeader>

                <InputLP disabled={false} value={null} onChange={handleChange} name="to" />

                <ButtonGetLpToken
                  isError={isInsufficientError}
                  onClick={() => {
                    history.push('/zap');
                  }}
                  variant="text"
                >
                  {'Get LP Token ->'}
                </ButtonGetLpToken>
                {isInsufficientError && <ErrorText>Insufficient balance</ErrorText>}
                <ButtonSubmit
                  loading={false}
                  fullWidth
                  unEnable={false}
                  disabled={false}
                  onClick={tokenApproved ? handleStakeLp : handleApproveToken}
                >
                  {tokenApproved ? 'Stake' : 'Approve'}
                </ButtonSubmit>
              </ExchangeBox>
            </SwapBox>
          </Grid>
          <Grid item xs={12}>
            {width > 768 ? (
              <TableMyStake data={tableData} onClaim={handleToggleClaimOne} onUnstake={handleToggleUnstake} />
            ) : (
              <ListMyStake data={tableData} onClaim={handleToggleClaimOne} onUnstake={handleToggleUnstake} />
            )}
          </Grid>
        </Grid>
      </Box>

      <StakeSettingModal
        open={openSetting}
        setDeadline={setDeadline}
        setSlippage={handleSetSlippage}
        onClose={handleToggleSetting}
      />

      <StakeStatusModal
        title={currentAction === 'approve' ? 'Approve Information' : data.title}
        open={openStatus}
        onClose={handleToggleStatus}
        status={status}
        onNextStatus={() => {}}
      />
    </Wrapper>
  );
};

export default MyStake;
