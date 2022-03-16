import React from 'react';
import { styled } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  Select,
  SelectProps,
  MenuItem,
  MenuItemProps,
  Button,
  ButtonProps,
} from '@mui/material';

interface Props {
  value: number;
  isMax?: boolean;
  max?: number;
  min?: number;
  selected: number | any;
  tokens: Array<any>;
  onMax?: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToken: (event: SelectChangeEvent<any>) => void;
}

const TextFieldSwap = styled(TextField)<TextFieldProps>(() => ({
  borderRadius: '10px',
  input: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '33px',
    textAlign: 'right',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: '#293247',

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
    background: '#F9FAFF',

    '& fieldset': {
      borderColor: 'rgba(56, 100, 255, 0.26)',
      borderRadius: '9px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(56, 100, 255, 0.26)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(56, 100, 255, 0.26)',
    },
  },
}));

const SelectCustom = styled(Select)<SelectProps>(() => ({
  padding: '0',
  border: 'none !important',
  borderRadius: 0,
  borderRight: '1px solid rgba(56, 100, 255, 0.2) !important',
  marginRight: '9px',
  minWidth: '114px',

  '.MuiOutlinedInput-input': {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '29px',
    letterSpacing: '0.04em',
    textTransform: 'capitalize',
    color: '#293247',

    img: {
      marginRight: '9px',
    },
  },

  '& fieldset': {
    border: 'none',
  },
}));

const MenuItemCustom = styled(MenuItem)<MenuItemProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '6px 12px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '29px',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  color: '#293247',
}));

const ButtonMax = styled(Button)<ButtonProps>(() => ({
  background: '#E9EDFF',
  borderRadius: '6px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '26px',
  letterSpacing: '0.04em',
  color: '#293247',
  padding: '0px',
  minWidth: '51px',
}));

const InputSwap: React.FC<Props> = ({ value, max, min, selected, onMax, onChange, onChangeToken, tokens, isMax }) => {
  return (
    <TextFieldSwap
      placeholder="0.0"
      type="number"
      fullWidth
      value={value}
      onChange={onChange}
      InputProps={{
        inputProps: {
          max: max,
          min: min,
        },
        startAdornment: (
          <InputAdornment position="start">
            <SelectCustom value={selected} onChange={onChangeToken}>
              {tokens.map((item, i) => (
                <MenuItemCustom key={i} value={i}>
                  <img alt="" src={item.logo} width={27} style={{ marginRight: 9 }} /> {item.name}
                </MenuItemCustom>
              ))}
            </SelectCustom>

            {isMax && <ButtonMax onClick={onMax}>Max</ButtonMax>}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputSwap;
