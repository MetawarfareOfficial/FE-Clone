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
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import CloseImg from 'assets/images/ic-times.svg';
import {
  deleteArrayElementByIndex,
  generateContractName,
  handleContractNameErrors,
  replaceArrayElementByIndex,
} from 'helpers';

interface Props {
  open: boolean;
  icon: string;
  name: string;
  maxMint: number;
  contracts: Array<any>;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

interface Contract {
  name: string;
  error: string | null;
}

const Wrapper = styled(Dialog)<DialogProps>(() => ({
  background: 'rgba(165, 199, 251, 0.38)',

  '.MuiPaper-root': {
    width: '309px',
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

  '.MuiListItemText-root': {
    margin: 0,
  },

  '.MuiTypography-root': {
    color: '#293247',
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '21px',
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
      padding: 'unset',
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

const ButtonMint = styled('button')<ButtonProps>(({ theme }) => ({
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
  cursor: 'pointer',
  span: {
    color: '#BDBDBD',
    fontWeight: 'normal',
  },
  outline: 'none',
  border: 'none',
}));

const CssTextField = styled(TextField, { shouldForwardProp: (prop) => prop !== 'error' })<TextFieldProps>(
  ({ error }) => ({
    '.MuiInput-input': {
      padding: '8px 20px',
      border: `1px solid ${error ? 'red' : '#BDBDBD'}`,
      borderRadius: '13px',
      OutlinedInput: 'none',
      boxSizing: 'border-box',
      height: '39px',
      color: '#293247',
      marginBottom: error ? '2px' : '8px',
    },
    '.MuiFormHelperText-root': {
      color: error ? 'red' : 'rgba(0, 0, 0, 0.6)',
      marginBottom: '4px',
    },
    '.MuiInput-root': {
      '&::before': {
        borderBottom: 'unset !important',
      },
      '&::after': {
        borderBottom: 'unset !important',
      },
    },
  }),
);

const MintContractModal: React.FC<Props> = ({ open, icon, name, maxMint, onClose, onSubmit }) => {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      name: generateContractName(),
      error: null,
    },
  ]);

  const handleAddContract = (numberContracts = 1) => {
    const newContracts = [];
    for (let i = 0; i < numberContracts; i++) {
      newContracts.push({
        name: generateContractName(),
        error: null,
      });
    }
    setContracts([...contracts, ...newContracts]);
  };

  const handleDeleteContract = () => {
    // prevent from deleting contract if contracts length = 1
    if (contracts.length >= 2) {
      const newContract = [...contracts];
      newContract.splice(-1);
      setContracts(newContract);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberOfContracts = Number(event.target.value) <= maxMint ? Number(event.target.value) : maxMint;

    let newContracts = [...contracts];
    if (contracts.length < numberOfContracts) {
      for (let i = contracts.length; i < numberOfContracts; i++) {
        newContracts.push({
          name: generateContractName(),
          error: null,
        });
      }
    } else {
      for (let i = contracts.length; i > numberOfContracts; i--) {
        newContracts = deleteArrayElementByIndex(newContracts, newContracts.length - 1);
      }
    }
    setContracts([...newContracts]);
  };

  const handleContractNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const newName = event.target.value;
    const error = handleContractNameErrors(newName);

    const newContract = replaceArrayElementByIndex(contracts, index, {
      name: newName,
      error,
    });
    setContracts(newContract);
  };

  const renderItems = () => {
    return contracts.map((item, index) => {
      return (
        <ListItem key={index}>
          <CssTextField
            onChange={(event) => handleContractNameChange(event, index)}
            error={!!item.error}
            helperText={item.error}
            value={item.name}
            variant="standard"
            fullWidth
          />
        </ListItem>
      );
    });
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
            value={contracts.length}
            onChange={handleChangeInput}
            inputProps={{ 'aria-label': 'weight' }}
            startAdornment={
              <InputAdornment position="start" onClick={() => handleDeleteContract()}>
                <IconButton>
                  <RemoveIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end" onClick={() => handleAddContract(1)}>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />

          <ButtonMax variant="outlined" color="primary" onClick={() => handleAddContract(maxMint)}>
            Max
          </ButtonMax>
        </BoxActions>

        <ButtonMint
          disabled={contracts.filter((item) => item.error).length > 0}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Mint <br />
          <span>(15 0xB required)</span>
        </ButtonMint>
      </Content>
    </Wrapper>
  );
};

export default MintContractModal;
