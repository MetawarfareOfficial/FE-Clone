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
import { useLocation } from 'react-router-dom';
import { infoMessage } from 'messages/infoMessages';
import moment from 'moment';

type ModalMode = 'claim_status' | 'pay_fee_status';
interface Props {
  status: 'success' | 'error' | 'pending';
  open: boolean;
  text: string;
  icon?: string;
  name: string;
  mode: ModalMode;
  onClose: () => void;
  onBackToMint?: () => void;
  nextDueDate?: number;
}

interface TypographyCustomProps {
  claimFailed: boolean;
  permissionDenied: boolean;
}

interface DialogTitleCustomProps {
  denied: boolean;
}

interface DialogContentCustomProps {
  denied: boolean;
}

interface BoxCustomProps {
  denied: boolean;
}

const Wrapper = styled(Dialog)<
  DialogProps & {
    mode: ModalMode;
  }
>(({ theme, mode }) => ({
  background: 'rgba(165, 199, 251, 0.38)',
  zIndex: 1700,

  '.MuiDialog-container': {
    background: theme.palette.mode === 'light' ? 'rgba(165, 199, 251, 0.38)' : 'rgba(28, 28, 28, 0.36)',
    backdropFilter: `blur(${theme.palette.mode === 'light' ? '4px' : '13px'})`,
  },

  '.MuiPaper-root': {
    minWidth: '317px',
    boxShadow: '0px 10px 36px rgba(38, 29, 77, 0.1)',
    borderRadius: '24px',
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    background: theme.palette.mode === 'light' ? '#fff' : '#2C2C2C',
    border: theme.palette.mode === 'light' ? 'unset' : '1px solid #6F6F6F',
    [theme.breakpoints.down('sm')]: {
      minWidth: mode === 'claim_status' ? '317px' : '317px',
    },
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

const ViewIcon = styled(Box)<BoxCustomProps>(({ denied }) => ({
  width: '55px',
  height: '55px',
  marginRight: '10px',
  borderRadius: '7px',
  overflow: 'hidden',
  visibility: denied ? 'hidden' : 'visible',

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
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
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

const Header = styled(DialogTitle)<DialogTitleCustomProps>(({ denied }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: denied ? '0px 21px' : '20px 21px',
  marginBottom: denied ? '0' : '20px',
}));

const Content = styled(DialogContent)<
  DialogContentCustomProps & {
    mode: ModalMode;
  }
>(({ denied, mode, theme }) => ({
  padding: denied ? `0px 0px 20px 0px` : `20px 13px 20px 21px`,

  '.MuiDialogContentText-root': {
    color: '#828282',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
  [theme.breakpoints.down('sm')]: {
    padding: denied ? `0px 0px 20px 0px` : `20px 13px 20px 21px`,
  },
}));

const ViewImage = styled(Box)<
  BoxProps & {
    mode: ModalMode;
  }
>(({ mode, theme }) => ({
  width: '84px',
  height: '84px',
  margin: '10px auto 0',

  img: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '84px',
    height: '84px',
  },
}));

const StatusText = styled(Typography)<
  TypographyCustomProps & {
    mode: ModalMode;
  }
>(({ claimFailed, permissionDenied, mode }) => ({
  maxWidth: permissionDenied ? '250px' : mode === 'claim_status' ? '221px' : 'unset',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: mode === 'claim_status' ? '18px' : '20px',
  lineHeight: '27px',
  textAlign: 'center',
  margin: mode === 'claim_status' ? '23px auto 0' : '52px auto 0',
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

const MintStatusModal: React.FC<Props> = ({
  status,
  text,
  open,
  icon,
  name,
  onClose,
  onBackToMint,
  mode,
  nextDueDate,
}) => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Wrapper
      mode={mode}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Header denied={text === infoMessage.PERMISSION_DENIED.message}>
        {icon && (
          <ViewIcon denied={text === infoMessage.PERMISSION_DENIED.message}>
            <img alt="" src={icon} />
          </ViewIcon>
        )}
        <HeaderText>{name}</HeaderText>

        <CloseIcon onClick={onClose}>
          <img alt="" src={theme.palette.mode === 'light' ? CloseImg : CloseDarkImg} />
        </CloseIcon>
      </Header>

      <Content mode={mode} denied={text === infoMessage.PERMISSION_DENIED.message}>
        <ViewImage mode={mode}>
          {status === 'success' ? (
            <img alt="" src={theme.palette.mode === 'light' ? SuccessGif : SuccessDarkGif} />
          ) : ['error', 'permission denied'].includes(status) ? (
            <img alt="" src={theme.palette.mode === 'light' ? ErrorGif : ErrorDarkGif} />
          ) : (
            <img alt="" src={theme.palette.mode === 'light' ? PendingGif : PendingDarkGif} />
          )}
        </ViewImage>

        <StatusText
          mode={mode}
          color={{
            color:
              status === 'success'
                ? mode === 'claim_status'
                  ? '#119F19'
                  : theme.palette.mode === 'light'
                  ? '#293247'
                  : '#fff'
                : ['error', 'permission denied'].includes(status)
                ? theme.palette.mode === 'light'
                  ? '#F62D33'
                  : '#BB363A'
                : theme.palette.mode === 'light'
                ? '#293247'
                : '#fff',
          }}
          claimFailed={text === infoMessage.REWARD_CLAIM_FAILED.message}
          permissionDenied={text === infoMessage.PERMISSION_DENIED.message}
        >
          {text}
        </StatusText>
        {mode === 'pay_fee_status' && status === 'success' && name !== 'Approving' && (
          <StatusText
            mode={mode}
            style={{
              color: '#0052FF',
              fontWeight: '400',
              maxWidth: 'unset',
              margin: '7px auto 0',
            }}
            claimFailed={true}
            permissionDenied={true}
          >
            {`Next payment date: ${moment.unix(nextDueDate || 0).format('DD MMM YYYY')}`}
          </StatusText>
        )}
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
