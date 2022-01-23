import React, { useState } from 'react';
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
  DialogContentText,
  Button,
  ButtonProps,
  Slide,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import CloseImg from 'assets/images/ic-times.svg';
import MinusImg from 'assets/images/minus.svg';
import AddImg from 'assets/images/plus.svg';

interface Props {
  open: boolean;
  icon: string;
  name: string;
  maxMint: number;
  contracts: Array<any>;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const Wrapper = styled(Dialog)<DialogProps>(({ theme }) => ({
  background: 'rgba(165, 199, 251, 0.38)',

  '.MuiPaper-root': {
    width: '309px',
    boxShadow: '0px 10px 36px rgba(38, 29, 77, 0.1)',
    borderRadius: '24px',
    padding: '0',
    margin: 0,
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      width: '317px',
    },
    '@media (max-width: 320px)': {
      width: '300px',
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

const ViewIcon = styled(Box)<BoxProps>(({ theme }) => ({
  width: '55px',
  height: '55px',
  marginRight: '10px',
  borderRadius: '7px',
  overflow: 'hidden',

  img: {
    width: '100%',
  },

  [theme.breakpoints.down('lg')]: {
    width: '42px',
    height: '42px',
  },
  [theme.breakpoints.down('lg')]: {
    width: '55px',
    height: '55px',
  },
}));

const HeaderText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#293247',
  textTransform: 'uppercase',
  fontWeight: '600',
  maxWidth: '105px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '27px',
  },
}));

const CloseIcon = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  width: '28px',
  height: '28px',
  padding: '0',
  border: 'none',
  marginLeft: 'auto',

  img: {
    width: '100%',
  },

  [theme.breakpoints.down('lg')]: {
    width: '20px',
    height: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '28px',
    height: '28px',
  },
}));

const Header = styled(DialogTitle)<DialogTitleProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 21px',
  marginBottom: '20px',

  [theme.breakpoints.down('lg')]: {
    padding: '16px 21px',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '20px 21px',
  },
}));

const Content = styled(DialogContent)<DialogContentProps>(({ theme }) => ({
  padding: '20px 13px 20px 21px',
  // marginBottom: '21px',

  'p.MuiDialogContentText-root': {
    color: '#828282',
    fontFamily: 'Poppins',
    fontSize: '12px',
    lineHeight: '18px',
    marginBottom: '8px',
    textTransform: 'capitalize',

    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      lineHeight: '18px',
    },
  },

  '.MuiListItemText-root': {
    margin: 0,
  },

  '.MuiTypography-root': {
    color: '#293247',
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '21px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '21px',
    },
  },

  ul: {
    padding: '0 8px 0 0',
    maxHeight: '235px',
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'none',
      webkitBoxShadow: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#3864FF',
      outline: 'none',
      borderRadius: '10px',
    },

    li: {
      padding: '8px 20px',
      border: '1px solid #BDBDBD',
      boxSizing: 'border-box',
      borderRadius: '13px',
      marginBottom: '8px',

      [theme.breakpoints.down('sm')]: {
        padding: '12px 20px',
      },
    },
  },
}));

const ButtonMax = styled(Button)<ButtonProps>(() => ({
  width: '79px',
  height: '50px',
  boxSizing: 'border-box',
  border: '1px solid #3864FF',
  borderRadius: '14px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '21px',
  textTransform: 'capitalize',
  marginLeft: 'auto',
}));

const BoxActions = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '30px',
  paddingRight: '8px',
}));

const OutlinedInputCustom = styled(OutlinedInput)<OutlinedInputProps>(({ theme }) => ({
  padding: 0,
  border: '1px solid #3864FF',
  borderLeft: 'none',
  borderRight: 'none',
  borderRadius: '14px',
  lineHeight: '24px',
  fontSize: '16px',
  height: '50px',

  fieldset: {
    border: 'none',
  },

  input: {
    width: '65px',
    height: '50px',
    textAlign: 'center',

    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: ' #293247',

    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },

  '.MuiOutlinedInput-root': {},

  '.MuiInputAdornment-positionStart': {
    border: `1px solid  ${theme.palette.primary.main}`,
    boxSizing: 'border-box',
    borderRadius: '14px',
    width: '50px',
    height: '50px',
    fontSize: '18px',
    maxWidth: '50px',
    maxHeight: '50px',
    margin: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    button: {
      color: `${theme.palette.primary.main}`,
      padding: 0,
    },
  },

  '.MuiInputAdornment-positionEnd': {
    border: `1px solid  ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    boxSizing: 'border-box',
    borderRadius: '14px',
    width: '50px',
    height: '50px',
    fontSize: '18px',
    maxWidth: '50px',
    maxHeight: '50px',
    margin: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    button: {
      color: '#fff',
      padding: 0,
    },
  },
}));

const ButtonMint = styled('a')<any>(({ theme }) => ({
  width: '100%',
  marginTop: '21px',
  padding: '10px 29px',
  height: '60px',
  textAlign: 'center',
  borderRadius: '14px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  display: 'inline-block',
  boxSizing: 'border-box',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '21px',

  span: {
    // color: '#c7c7c7',
    opacity: '0.7',
    fontWeight: 'normal',
    fontSize: '13px',
  },
}));

const MintContractModal: React.FC<Props> = ({ open, icon, name, maxMint, onClose, onSubmit }) => {
  const [value, setValue] = useState<any>(1);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const renderItems = () => {
    const results = [];
    for (let i = 0; i < value; i++) {
      results.push(
        <ListItem key={i}>
          <ListItemText primary="Name" />
        </ListItem>,
      );
    }

    return results;
  };

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
        <DialogContentText>Contract Name</DialogContentText>

        <List>{renderItems()}</List>

        <BoxActions>
          <OutlinedInputCustom
            type="number"
            value={value}
            onChange={handleChangeInput}
            inputProps={{ 'aria-label': 'weight' }}
            startAdornment={
              <InputAdornment position="start" onClick={() => setValue(Number(value) - 1)}>
                <IconButton>
                  <img width={18} alt="" src={MinusImg} />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end" onClick={() => setValue(Number(value) + 1)}>
                <IconButton>
                  <img width={18} alt="" src={AddImg} />
                </IconButton>
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />

          <ButtonMax variant="outlined" color="primary" onClick={() => setValue(maxMint)}>
            Max
          </ButtonMax>
        </BoxActions>

        <ButtonMint variant="contained" color="primary" onClick={onSubmit}>
          Mint <br />
          <span>(15 0xB required)</span>
        </ButtonMint>
      </Content>
    </Wrapper>
  );
};

export default MintContractModal;
