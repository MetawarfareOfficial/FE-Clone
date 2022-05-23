import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  DialogTitle,
  DialogTitleProps,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CubeDarkIcon from 'assets/images/cube-dark.gif';
import SquareDarkIcon from 'assets/images/square-dark.gif';
import TessDarkIcon from 'assets/images/tess-dark.gif';
import React, { useState } from 'react';

interface Props {
  widthIcon: boolean;
  icon: string;
  name?: string;
  onChange: (value: number) => void;
}

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
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  textTransform: 'uppercase',
  fontWeight: '600',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '27px',
  },
}));

const Header = styled(DialogTitle)<DialogTitleProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 21px 20px 0',
  marginBottom: '20px',

  [theme.breakpoints.down('lg')]: {
    padding: '16px 21px',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '20px 21px',
  },
}));

// const TextSub = styled(Typography)<TypographyProps>(() => ({
//   fontFamily: 'Poppins',
//   fontStyle: 'normal',
//   fontWeight: '500',
//   fontSize: '17px',
//   lineHeight: '26px',
//   letterSpacing: '0.035em',
//   color: '#293247',
// }));

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
  padding: '6px',

  '&:hover': {
    opacity: 0.7,
    cursor: 'pointer',
  },
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
    width: '81px',
    height: '50px',
    textAlign: 'center',

    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '21px',
    display: 'inline-flex',
    alignItems: 'center',
    color: theme.palette.mode === 'light' ? '#3864FF' : '#fff',

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

    '&:hover': {
      opacity: 0.7,
      cursor: 'pointer',
    },

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

    '&:hover': {
      opacity: 0.7,
      cursor: 'pointer',
    },

    button: {
      color: '#fff',
      padding: 0,
    },
  },
}));

const Wrapper = styled(Box)<
  BoxProps & {
    showBorder: boolean;
  }
>(({ showBorder, theme }) => ({
  marginBottom: showBorder ? '30px' : 'unset',
  padding: showBorder ? '0  20px 20px 20px' : 'unset',
  border: showBorder
    ? theme.palette.mode === 'light'
      ? '1px solid rgba(41, 50, 71, 0.09)'
      : '1px solid rgba(255, 255, 255, .09)'
    : 'unset',
  borderRadius: showBorder ? '11px' : 'unset',
}));

const InputFeeItem: React.FC<Props> = ({ widthIcon, icon, name }) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState<number>(1);
  // eslint-disable-next-line
  const handleOnChange = (value: number) => {
    // console.log(value);
  };

  return (
    <Wrapper showBorder={widthIcon}>
      <Header>
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
        <HeaderText
          sx={{
            maxWidth: '105px',
            color: '#fff',
          }}
        >
          {name}
        </HeaderText>
      </Header>

      <BoxActions>
        <OutlinedInputCustom
          type="text"
          value={inputValue + ' month'}
          inputProps={{ 'aria-label': 'weight' }}
          startAdornment={
            <InputAdornment
              position="start"
              onClick={() => {
                if (inputValue > 1) {
                  setInputValue(inputValue - 1);
                  handleOnChange(inputValue - 1);
                }
              }}
            >
              <IconButton>
                <RemoveIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment
              position="end"
              onClick={() => {
                if (inputValue < 3) {
                  setInputValue(inputValue + 1);
                  handleOnChange(inputValue + 1);
                }
              }}
            >
              <IconButton>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
        />

        <ButtonMax variant="outlined" color="primary" onClick={() => {}}>
          4 USDC
        </ButtonMax>
      </BoxActions>
    </Wrapper>
  );
};

export default InputFeeItem;
