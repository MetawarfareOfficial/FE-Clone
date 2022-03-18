import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import {
  Typography,
  TypographyProps,
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton,
  IconButtonProps,
  Avatar,
  Box,
  BoxProps,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Button,
  ButtonProps,
  Divider,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { ReactComponent as CloseImg } from 'assets/images/charm_cross.svg';

import { ReactComponent as HelpCircleIcon } from 'assets/images/bx_help-circle.svg';
import { ReactComponent as HelpCircleDarkIcon } from 'assets/images/bx_help-circle-dark.svg';
import { ReactComponent as SwapConvertIcon } from 'assets/images/ic_round-swap-vert.svg';
import { ReactComponent as SwapConvertDarkIcon } from 'assets/images/ic_round-swap-vert-dark.svg';

import AvaxImg from 'assets/images/avax-token.png';
import OxImg from 'assets/images/0x-token.png';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface TooltipCustomProps extends TooltipProps {
  size?: string;
}

interface DialogTitleCustomProps {
  denied?: boolean;
}

interface DialogContentCustomProps {
  denied?: boolean;
}

const Wrapper = styled(Dialog)<DialogProps>(({ theme }) => ({
  background: 'rgba(165, 199, 251, 0.38)',
  zIndex: 1700,

  '.MuiDialog-container': {
    background: theme.palette.mode === 'light' ? 'rgba(165, 199, 251, 0.38)' : '#9f9f9f2f',
  },

  '.MuiPaper-root': {
    width: '505px',
    boxShadow: '0px 4px 67px rgba(0, 0, 0, 0.09)',
    borderRadius: '14px',
    padding: '25px 21px 38px',
    margin: '0',
    boxSizing: 'border-box',
    background: theme.palette.mode === 'light' ? '#fff' : '#171717',
    border: theme.palette.mode === 'light' ? 'unset' : 'unset',
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HeaderText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '20px',
  lineHeight: '37px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  textTransform: 'capitalize',
  fontWeight: '600',
}));

const CloseIcon = styled(IconButton)<IconButtonProps>(() => ({
  width: '28px',
  height: '28px',
  padding: '0',
  border: 'none',
  marginLeft: 'auto',

  img: {
    width: '100%',
  },
}));

const Header = styled(DialogTitle)<DialogTitleCustomProps>(({}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0px',
  marginBottom: '26px',
}));

const Content = styled(DialogContent)<DialogContentCustomProps>(({}) => ({
  padding: '0px',
  overflow: 'unset',

  '.MuiDialogContentText-root': {
    color: '#828282',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    marginBottom: '8px',
    textTransform: 'capitalize',
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

const SwapConfirmModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <Wrapper
      className="swapDialog"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Header>
        <HeaderText>Swap Information</HeaderText>

        <CloseIcon onClick={onClose}>
          <CloseImg />
        </CloseIcon>
      </Header>

      <Content>
        <ExchangeBox>
          <TokenBox>
            <Avatar sx={{ width: '53px', height: '53px', margin: 0, display: 'inline-flex' }} src={AvaxImg} />

            <h3>Avax</h3>
            <p>0.0003</p>
          </TokenBox>

          <ViewConvertIcon>
            {theme.palette.mode === 'light' ? <SwapConvertIcon /> : <SwapConvertDarkIcon />}
          </ViewConvertIcon>

          <TokenBox>
            <Avatar sx={{ width: '53px', height: '53px', margin: 0, display: 'inline-flex' }} src={OxImg} />

            <h3>Avax</h3>
            <p>0.0003</p>
          </TokenBox>
        </ExchangeBox>

        <BillingBox>
          <BillingLine>
            <h4>Rate</h4>
            <p>1 0xBlock per 0.0001 AVAX</p>
          </BillingLine>
          <BillingLine>
            <h4>Slippage tolerance</h4>
            <p>0.7%</p>
          </BillingLine>

          <Divider sx={{ borderColor: 'rgba(84, 91, 108, 0.2)', margin: '12px 0' }} />

          <BillingLine>
            <h4>
              Min receive{' '}
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
            <p>0.0001</p>
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
            <p>0.0001 0xBlock</p>
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
            <p>0.10%</p>
          </BillingLine>
        </BillingBox>

        <SwapSubmit fullWidth onClick={onConfirm}>
          Confirm Swap
        </SwapSubmit>
      </Content>
    </Wrapper>
  );
};

export default SwapConfirmModal;
