import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton,
  IconButtonProps,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  InputAdornment,
  TextField,
  TextFieldProps,
  Button,
  ButtonProps,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { ReactComponent as HelpCircleIcon } from 'assets/images/bx_help-circle.svg';
import { ReactComponent as HelpCircleDarkIcon } from 'assets/images/help-dark.svg';

import { ReactComponent as CloseImg } from 'assets/images/charm_cross.svg';
// import CloseDarkImg from 'assets/images/ic-close-dark.svg';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface DialogTitleCustomProps {
  denied?: boolean;
}

interface DialogContentCustomProps {
  denied?: boolean;
}

interface ButtonPercentProps extends ButtonProps {
  active?: boolean;
}

const Wrapper = styled(Dialog)<DialogProps>(({ theme }) => ({
  background: 'rgba(165, 199, 251, 0.38)',
  zIndex: 1700,

  '.MuiDialog-container': {
    background: theme.palette.mode === 'light' ? 'rgba(165, 199, 251, 0.38)' : '#9f9f9f2f',
  },

  '.MuiPaper-root': {
    width: '437px',
    boxShadow: '0px 4px 67px rgba(0, 0, 0, 0.09)',
    borderRadius: '11px',
    padding: '25px 21px 22px',
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
  maxWidth: '105px',
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

  '.MuiDialogContentText-root': {
    color: '#828282',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
}));

const FormBox = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginBottom: '37px',
}));

const Description = styled(Typography)<TypographyProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '26px',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.4)' : 'rgba(255, 255, 255, 0.4)',
  marginBottom: '19px',
}));

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
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
    maxWidth: '214px',
    minWidth: '204px',
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

const TextFieldSwap = styled(TextField)<TextFieldProps>(({ theme }) => ({
  borderRadius: '16px',

  input: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '30px',
    textAlign: 'left',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: theme.palette.mode === 'light' ? '#293247' : '#fff',
    padding: '17px 23px',

    '&:placeholder': {
      color: '#BEBFCF',
    },

    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  '& label.Mui-focused': {
    color: 'rgba(56, 100, 255, 0.26)',
  },

  '& .MuiOutlinedInput-root': {
    background: theme.palette.mode === 'light' ? '#F9FAFF' : '#252525',
    borderRadius: '16px',

    '& fieldset': {
      borderColor: 'rgba(56, 100, 255, 0.26)',
      borderRadius: '16px',
      padding: 0,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(56, 100, 255, 0.26)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(56, 100, 255, 0.26)',
    },
  },
}));

const EndAdornmentText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '30px',
  textAlign: 'right',
  letterSpacing: '0.04em',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
}));

const ButtonPerCent = styled(Button)<ButtonPercentProps>(({ active, theme }) => ({
  background: active
    ? theme.palette.mode === 'light'
      ? '#3864FF'
      : ' #3864FF'
    : theme.palette.mode === 'light'
    ? '#E9EDFF'
    : '#171717',
  borderRadius: '6px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '26px',
  letterSpacing: '0.04em',
  color: theme.palette.mode === 'light' ? (active ? '#fff' : '#293247') : active ? '#171717' : '#fff',
  padding: '0px',
  minWidth: '51px',
  marginLeft: '15px',
  height: '30px',
}));

const PercentText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '33px',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  paddingRight: '17px',
  borderRight: '1px solid rgba(56, 100, 255, 0.2)',
}));

const SwapSettingModal: React.FC<Props> = ({ open, onClose }) => {
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
        <HeaderText>Settings</HeaderText>

        <CloseIcon onClick={onClose}>
          <CloseImg />
        </CloseIcon>
      </Header>

      <Content>
        <FormBox>
          <Description>
            Slippage tolerance{' '}
            <TooltipCustom title={`The % slippage could range from 0.1% to 49.99%`} arrow placement="right">
              {theme.palette.mode === 'light' ? (
                <HelpCircleIcon style={{ marginLeft: '6px' }} />
              ) : (
                <HelpCircleDarkIcon style={{ marginLeft: '6px' }} />
              )}
            </TooltipCustom>
          </Description>

          <TextFieldSwap
            placeholder="0.0"
            type="number"
            fullWidth
            // value={value}
            // onChange={onChange}
            InputProps={{
              inputProps: {
                // max: max,
                min: 0,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <PercentText>%</PercentText>
                  <ButtonPerCent>0.1%</ButtonPerCent>
                  <ButtonPerCent active={true}>0.5%</ButtonPerCent>
                  <ButtonPerCent>1%</ButtonPerCent>
                </InputAdornment>
              ),
            }}
          />
        </FormBox>
        <FormBox>
          <Description>
            Transaction Deadline{' '}
            <TooltipCustom
              title={`Your transaction will revert if it is spending more than this long`}
              arrow
              placement="right"
            >
              {theme.palette.mode === 'light' ? (
                <HelpCircleIcon style={{ marginLeft: '6px' }} />
              ) : (
                <HelpCircleDarkIcon style={{ marginLeft: '6px' }} />
              )}
            </TooltipCustom>
          </Description>

          <TextFieldSwap
            placeholder="0.0"
            type="number"
            fullWidth
            // value={value}
            // onChange={onChange}
            InputProps={{
              inputProps: {
                // max: max,
                min: 0,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <EndAdornmentText>minute(s)</EndAdornmentText>
                </InputAdornment>
              ),
            }}
          />
        </FormBox>
      </Content>
    </Wrapper>
  );
};

export default SwapSettingModal;
