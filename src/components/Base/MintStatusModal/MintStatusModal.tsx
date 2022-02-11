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
  DialogTitleProps,
  DialogContent,
  DialogContentProps,
  Slide,
  // Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import CloseImg from 'assets/images/ic-times.svg';
import CloseDarkImg from 'assets/images/ic-close-dark.svg';
import SuccessGif from 'assets/images/success-white.gif';
import SuccessDarkGif from 'assets/images/success.gif';
import ErrorGif from 'assets/images/error-white.gif';
import ErrorDarkGif from 'assets/images/error.gif';
import PendingGif from 'assets/images/pending-white.gif';
import PendingDarkGif from 'assets/images/pending.gif';

import SquareDarkIcon from 'assets/images/square-dark1.gif';
import CubeDarkIcon from 'assets/images/cube-dark1.gif';
import TessDarkIcon from 'assets/images/tess-dark1.gif';

import { useLocation } from 'react-router-dom';
import { infoMessage } from 'messages/infoMessages';

interface Props {
  status: 'success' | 'error' | 'pending';
  open: boolean;
  text: string;
  icon?: string;
  name: string;
  onClose: () => void;
  onBackToMint?: () => void;
}

interface TypographyCustomProps {
  claimFailed: boolean;
}

const Wrapper = styled(Dialog)<DialogProps>(({ theme }) => ({
  background: 'rgba(165, 199, 251, 0.38)',

  '.MuiDialog-container': {
    background: theme.palette.mode === 'light' ? 'rgba(165, 199, 251, 0.38)' : 'rgba(28, 28, 28, 0.36)',
    backdropFilter: `blur(${theme.palette.mode === 'light' ? '4px' : '13px'})`,
  },

  '.MuiPaper-root': {
    width: '317px',
    boxShadow: '0px 10px 36px rgba(38, 29, 77, 0.1)',
    borderRadius: '24px',
    padding: '0',
    margin: 0,
    boxSizing: 'border-box',
    background: theme.palette.mode === 'light' ? '#fff' : '#2C2C2C',
    border: theme.palette.mode === 'light' ? 'unset' : '1px solid #6F6F6F',
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

const ViewIcon = styled(Box)<BoxProps>(() => ({
  width: '55px',
  height: '55px',
  marginRight: '10px',
  borderRadius: '7px',
  overflow: 'hidden',

  img: {
    width: '100%',
  },
}));

const HeaderText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '18px',
  lineHeight: '27px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  textTransform: 'uppercase',
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

const Header = styled(DialogTitle)<DialogTitleProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 21px',
  marginBottom: '20px',
}));

const Content = styled(DialogContent)<DialogContentProps>(() => ({
  padding: '20px 13px 20px 21px',
  // marginBottom: '21px',

  '.MuiDialogContentText-root': {
    color: '#828282',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
}));

const ViewImage = styled(Box)<BoxProps>(() => ({
  width: '84px',
  height: '84px',
  margin: '10px auto 0',

  img: {
    width: '100%',
  },
}));

const StatusText = styled(Typography)<TypographyCustomProps>(({ claimFailed }) => ({
  maxWidth: '221px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '27px',
  textAlign: 'center',
  margin: '23px auto 0',
  whiteSpace: claimFailed ? 'nowrap' : 'unset',
}));

const ButtonMint = styled('button')<ButtonProps>(({ theme, disabled }) => ({
  width: '180px',
  margin: '18px auto 0',
  padding: '10px 29px',
  height: '46px',
  textAlign: 'center',
  borderRadius: '14px',
  background: disabled
    ? 'rgba(0, 0, 0, 0.26)'
    : theme.palette.mode === 'light'
    ? theme.palette.primary.main
    : 'linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)',
  color: '#fff',
  display: 'block',
  boxSizing: 'border-box',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '21px',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  span: {
    fontWeight: 'normal',
    fontSize: '13px',
    opacity: '0.7',
  },

  '&:hover': {
    opacity: 0.7,
    cursor: 'pointer',
  },
}));

const MintStatusModal: React.FC<Props> = ({ status, text, open, icon, name, onClose, onBackToMint }) => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Wrapper
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Header>
        {icon && (
          <ViewIcon>
            <img
              alt=""
              src={
                theme.palette.mode === 'light'
                  ? icon
                  : name === 'Square Contract'
                  ? SquareDarkIcon
                  : name === 'Cube Contract'
                  ? CubeDarkIcon
                  : name === 'Tesseract Contract'
                  ? TessDarkIcon
                  : ''
              }
            />
          </ViewIcon>
        )}
        <HeaderText>{name}</HeaderText>

        <CloseIcon onClick={onClose}>
          <img alt="" src={theme.palette.mode === 'light' ? CloseImg : CloseDarkImg} />
        </CloseIcon>
      </Header>

      <Content>
        <ViewImage>
          {status === 'success' ? (
            <img alt="" src={theme.palette.mode === 'light' ? SuccessGif : SuccessDarkGif} />
          ) : status === 'error' ? (
            <img alt="" src={theme.palette.mode === 'light' ? ErrorGif : ErrorDarkGif} />
          ) : status === 'pending' ? (
            <img alt="" src={theme.palette.mode === 'light' ? PendingGif : PendingDarkGif} />
          ) : (
            <img alt="" src={theme.palette.mode === 'light' ? ErrorGif : ErrorDarkGif} />
          )}
        </ViewImage>

        <StatusText
          color={{
            color:
              status === 'success'
                ? '#119F19'
                : status === 'error'
                ? '#F62D33'
                : theme.palette.mode === 'light'
                ? '#293247'
                : '#fff',
          }}
          claimFailed={text === infoMessage.REWARD_CLAIM_FAILED.message}
        >
          {text}
        </StatusText>

        {status === 'error' && location.pathname === '/mint-contracts' && (
          <ButtonMint variant="contained" color="primary" onClick={onBackToMint}>
            Back to mint
          </ButtonMint>
        )}
      </Content>
    </Wrapper>
  );
};

export default MintStatusModal;
