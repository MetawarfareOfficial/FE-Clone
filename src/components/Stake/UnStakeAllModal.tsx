import React from 'react';
import { styled } from '@mui/material/styles';

import {
  Typography,
  TypographyProps,
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  IconButton,
  IconButtonProps,
  Button,
  ButtonProps,
  Box,
  BoxProps,
  TableContainer,
  Table,
  TableProps,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from '@mui/material';

import { ReactComponent as CloseImg } from 'assets/images/charm_cross.svg';

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
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    background: theme.palette.mode === 'light' ? '#fff' : '#171717',
    border: theme.palette.mode === 'light' ? 'unset' : 'unset',

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100%  - 36px)',
      borderRadius: '14px',
    },
  },
}));

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
  padding: '25px 21px',
}));

const Content = styled(DialogContent)<DialogContentCustomProps>(({}) => ({
  padding: '0px 20px 23px',
  overflow: 'hidden',

  '.MuiDialogContentText-root': {
    color: '#828282',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    marginBottom: '8px',
    textTransform: 'capitalize',
  },
}));

const Line = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',

  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '29px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    margin: 0,

    strong: {
      fontWeight: 600,
      color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.8)' : '#fff',
    },

    '&:last-child': {
      marginLeft: 'auto',
    },

    '&:first-child': {
      marginLeft: '0',
    },
  },

  [theme.breakpoints.down('sm')]: {
    display: 'inline-block',
    textAlign: 'center',
    width: '100%',
    marginBottom: '0',

    p: {
      marginBottom: '16px',
    },
  },
}));

const ButtonConfirm = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '33px',
  textAlign: 'center',
  background: '#3864FF',
  color: '#fff',
  textTransform: 'capitalize',
  height: '58px',
  borderRadius: '11px',
  boxShadow: 'none',
  padding: '10px 10px',
  minWidth: '122px',
  marginTop: '17px',

  '&:disabled': {
    background: 'rgba(56, 100, 255, 0.16)',
    color: '#fff',
  },

  '&:hover': {
    background: '#1239C4',
    color: '#fff',
    outline: 'none',
    boxShadow: 'none',
  },
}));

const TableCustom = styled(Table)<TableProps>(() => ({
  marginBottom: '35px',
  marginLeft: '-20px',
  marginRight: '-20px',
  width: 'calc(100% + 20px)',

  thead: {
    tr: {
      th: {
        padding: '9px 0',
        border: 'none',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '21px',
        textAlign: 'center',
        textTransform: 'capitalize',
        color: 'rgba(41, 50, 71, 0.8)',
      },
    },
  },
  tbody: {
    tr: {
      td: {
        padding: '11px 0',
        border: 'none',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '18px',
        lineHeight: '21px',
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#293247',
      },

      '.textRed': {
        color: '#FF1111',
      },
    },
  },
}));

const UnStakeAllModal: React.FC<Props> = ({ open, onClose }) => {
  const handleConfirm = () => {};

  return (
    <Wrapper
      className="swapDialog"
      open={open}
      // TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Header>
        <HeaderText>Unstake all</HeaderText>

        <CloseIcon onClick={onClose}>
          <CloseImg />
        </CloseIcon>
      </Header>

      <Content>
        <TableContainer>
          <TableCustom size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Stake Amount</TableCell>
                <TableCell align="center">Accrue day</TableCell>
                <TableCell align="center">Rewards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">50 0xb</TableCell>
                <TableCell align="center" className="textRed">
                  10 days
                </TableCell>
                <TableCell align="center">25 0xB</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">50 0xb</TableCell>
                <TableCell align="center">10 days</TableCell>
                <TableCell align="center">25 0xB</TableCell>
              </TableRow>
            </TableBody>
          </TableCustom>
        </TableContainer>

        <Line>
          <p>
            Total early unstake fee: <strong>3.75 LP</strong>
          </p>
        </Line>
        <Line>
          <p>
            Total Unstake amount: <strong>196.25 LP</strong>
          </p>
        </Line>
        <Line>
          <p>
            Total Earned reward: <strong>100 LP</strong>
          </p>
        </Line>

        <ButtonConfirm variant="contained" fullWidth onClick={handleConfirm}>
          Confirm
        </ButtonConfirm>
      </Content>
    </Wrapper>
  );
};

export default UnStakeAllModal;
