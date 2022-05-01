/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Button, ButtonProps, IconButton, IconButtonProps, Grid } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useWindowSize } from 'hooks/useWindowSize';
import { MyStakeCard, TableMyStake, StakeSettingModal, StakeStatusModal, ClaimModal, ListMyStake } from './index';
import InputLP from './InputLP';
import { ReactComponent as SettingDarkIcon } from 'assets/images/setting-dark.svg';
import { ReactComponent as SettingIcon } from 'assets/images/setting-outlined.svg';

import Lottie from 'react-lottie';

import animationData from 'lotties/loading-button.json';

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
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  position: 'relative',
  padding: '35px 0 44px',
  boxSizing: 'border-box',
}));

const MyStakeHeader = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginBottom: '10px',
}));

const BackButton = styled(IconButton)<IconButtonProps>(() => ({
  width: '38px',
  height: '38px',
  padding: '10px',
  boxSizing: 'border-box',
  color: '#293247',
  position: 'absolute',
  left: '-13px',
  top: '-10px',
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

const ButtonGetLpToken = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '16px',
  letterSpacing: '0.025em',
  color: '#3864FF',
  textTransform: 'capitalize',
  margin: '17px auto 32px',
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

const MyStake: React.FC<Props> = ({ onBack }) => {
  const [width] = useWindowSize();
  const theme = useTheme();
  const [openSetting, setOpenSetting] = useState(false);
  const [openClaimAll, setOpenClaimAll] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [disabledStake, setDisabledStake] = useState(false);
  const [claimType, setClaimType] = useState<'claim_all' | 'claim' | 'unstake'>('claim_all');
  const [status, setStatus] = useState<any>(null);
  const [deadline, setDeadline] = useState('10');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'pending') {
      setTimeout(() => {
        setStatus('success');
      }, 3000);
    }
  }, [status]);

  useEffect(() => {
    if (submitting) {
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    }
  }, [submitting]);

  const handleChange = (event: { value: string; name: string; isOnblur?: boolean }) => {};

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

  const handleToggleClaimAll = () => {
    setClaimType('claim_all');
    setOpenClaimAll(!openClaimAll);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggleClaim = (id: any) => {
    setClaimType('claim');
    setOpenClaimAll(!openClaimAll);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggleUnstake = (id: any) => {
    setClaimType('unstake');
    setOpenClaimAll(!openClaimAll);
  };

  const handleConfirmClaim = () => {
    setOpenClaimAll(false);
    setStatus('pending');
    setOpenStatus(true);
  };

  const handleNextStatus = () => {
    if (!status) {
      setStatus('pending');
    } else if (status === 'pending') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  const handleApprove = () => {
    setSubmitting(true);
  };

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
            <MyStakeCard onClaimAll={handleToggleClaimAll} />
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
                  <p>500 LP</p>
                </ExchangeHeader>

                <InputLP disabled={false} value={null} onChange={handleChange} name="to" />

                <ButtonGetLpToken variant="text">{'Get LP Token ->'}</ButtonGetLpToken>

                <ButtonSubmit
                  loading={submitting}
                  fullWidth
                  unEnable={false}
                  disabled={disabledStake}
                  onClick={handleApprove}
                >
                  {submitting ? (
                    <Lottie options={defaultOptions} height={33} width={33} />
                  ) : disabledStake ? (
                    'Enter Amount'
                  ) : (
                    'Approve'
                  )}
                </ButtonSubmit>
              </ExchangeBox>
            </SwapBox>
          </Grid>
          <Grid item xs={12}>
            {width > 768 ? (
              <TableMyStake
                onClaimAll={handleToggleClaimAll}
                onClaim={handleToggleClaim}
                onUnstake={handleToggleUnstake}
              />
            ) : (
              <ListMyStake
                onClaimAll={handleToggleClaimAll}
                onClaim={handleToggleClaim}
                onUnstake={handleToggleUnstake}
              />
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

      <ClaimModal type={claimType} open={openClaimAll} onClose={handleToggleClaimAll} onConfirm={handleConfirmClaim} />

      <StakeStatusModal
        open={openStatus}
        onClose={handleToggleStatus}
        status={status}
        onNextStatus={handleNextStatus}
      />
    </Wrapper>
  );
};

export default MyStake;
