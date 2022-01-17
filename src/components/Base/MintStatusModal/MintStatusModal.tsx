import React from 'react';
import { styled } from '@mui/material/styles';

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
  IconButton,
  IconButtonProps,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import CloseImg from 'assets/images/ic-times.svg';
import SuccessGif from 'assets/images/success-white.gif';
import ErrorGif from 'assets/images/error-white.gif';
import PendingGif from 'assets/images/pending-white.gif';

interface Props {
  status: 'success' | 'error' | 'pending';
  open: boolean;
  text: string;
  icon: string;
  name: string;
  onClose: () => void;
}

const Wrapper = styled(Dialog)<DialogProps>(() => ({
  background: 'rgba(165, 199, 251, 0.38)',

  '.MuiPaper-root': {
    width: '317px',
    boxShadow: '0px 10px 36px rgba(38, 29, 77, 0.1)',
    borderRadius: '24px',
    padding: '0',
    margin: 0,
    boxSizing: 'border-box',
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

const HeaderText = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#293247',
  textTransform: 'uppercase',
  fontWeight: '600',
  maxWidth: '105px',
}));

const CloseIcon = styled(IconButton)<IconButtonProps>(() => ({
  width: '28px',
  height: '28px',
  padding: '0',
  border: 'none',
  marginLeft: '65px',

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

const StatusText = styled(Typography)<TypographyProps>(() => ({
  maxWidth: '221px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '27px',
  textAlign: 'center',
  margin: '23px auto 0',
}));

const MintStatusModal: React.FC<Props> = ({ status, text, open, icon, name, onClose }) => {
  return (
    <Wrapper
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Header>
        <ViewIcon>
          <img alt="" src={icon} />
        </ViewIcon>
        <HeaderText>{name}</HeaderText>

        <CloseIcon onClick={onClose}>
          <img alt="" src={CloseImg} />
        </CloseIcon>
      </Header>

      <Content>
        <ViewImage>
          {status === 'success' ? (
            <img alt="" src={SuccessGif} />
          ) : status === 'error' ? (
            <img alt="" src={ErrorGif} />
          ) : status === 'pending' ? (
            <img alt="" src={PendingGif} />
          ) : (
            ''
          )}
        </ViewImage>

        <StatusText color={{ color: status === 'success' ? '#119F19' : status === 'error' ? '#F62D33' : '#293247' }}>
          {text}
        </StatusText>
      </Content>
    </Wrapper>
  );
};

export default MintStatusModal;
