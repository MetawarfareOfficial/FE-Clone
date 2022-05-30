import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  BoxProps,
  DialogTitle,
  DialogTitleProps,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material';
import { ReactComponent as WarnIcon } from 'assets/images/ic-warn-blue.svg';
import { ReactComponent as WarnDarkIcon } from 'assets/images/ic-warn-circle-dark.svg';
import { styled } from '@mui/material/styles';
import { formatPercent } from 'helpers/formatPrice';
import moment from 'moment';
import React from 'react';
import { useTooltip } from 'hooks/swap';

interface Props {
  widthIcon: boolean;
  icon: string;
  name?: string;
  defaultPayFee?: number;
  pendingFee?: number;
  months: number;
  paymentDueDate?: number;
  setMonths: (value: number) => void;
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
  lineHeight: '27px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',

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
  marginBottom: '15px',

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

const ButtonMax = styled(Box)<
  BoxProps & {
    type: 'pay_one' | 'pay_all';
  }
>(({ theme, type }) => ({
  width: '100px',
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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('xss')]: {
    marginLeft: type === 'pay_all' ? '10px' : 'auto',
    // marginRight: '10px'
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
const PaymentDueDate = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '17px',
  lineHeight: '26px',
  textAlign: 'center',
  letterSpacing: '0.035em',
  color: '#293247',
  marginTop: '20px',

  span: {
    color: '#3864FF',
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

const ViewHelp = styled(Box)<BoxProps>(({ theme }) => ({
  marginLeft: '40px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '60px',
  },
  [theme.breakpoints.down('xss')]: {
    marginLeft: 'auto',
    // marginRight: '10px'
  },
}));

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === 'light' ? '#e4e4e4' : '#000',
    top: '5px !important',

    ['&::before']: {
      boxShadow: '0px 1px 7px rgba(0, 0, 0, 0.08)',
      backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#3E3E3E',
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#3E3E3E',
    boxShadow: '0px 1px 7px rgba(0, 0, 0, 0.08)',
    color: theme.palette.mode === 'light' ? '#293247' : '#fff',
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '22px',
    borderRadius: '7px',
    padding: '2px 10px',
  },
  zIndex: 2000,
}));

const InputFeeItem: React.FC<Props> = ({
  widthIcon,
  icon,
  name,
  defaultPayFee = 0,
  months,
  setMonths,
  pendingFee = 0,
  paymentDueDate = 0,
}) => {
  const theme = useTheme();
  const { open, handleCloseTooltip, handleOpenTooltip } = useTooltip();

  return (
    <Wrapper showBorder={widthIcon}>
      <Header>
        {widthIcon && (
          <ViewIcon>
            <img alt="" src={icon} />
          </ViewIcon>
        )}
        <HeaderText
          sx={{
            maxWidth: widthIcon ? '105px' : 'unset',
            color: '#fff',
            fontWeight: widthIcon ? '600' : '500',
            textTransform: widthIcon ? 'uppercase' : 'unset',
            fontSize: widthIcon ? '14px' : '17px !important',
          }}
        >
          {name}
        </HeaderText>
      </Header>

      <BoxActions>
        <OutlinedInputCustom
          type="text"
          value={months + ' month'}
          inputProps={{ 'aria-label': 'weight' }}
          startAdornment={
            <InputAdornment
              position="start"
              onClick={() => {
                if (months > 1) {
                  setMonths(months - 1);
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
                if (months < 3) {
                  setMonths(months + 1);
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
        {widthIcon && (
          <TooltipCustom
            open={open}
            onMouseEnter={handleOpenTooltip}
            onMouseLeave={handleCloseTooltip}
            title={
              <div>
                <p style={{ margin: 0 }}> This amount is included unpaid fees </p>
              </div>
            }
            arrow
            placement="top-end"
          >
            {theme.palette.mode === 'light' ? (
              <ViewHelp>
                <WarnIcon width={16} />
              </ViewHelp>
            ) : (
              <ViewHelp
                sx={{
                  marginTop: '5px',
                }}
              >
                <WarnDarkIcon width={16} />
              </ViewHelp>
            )}
          </TooltipCustom>
        )}
        <ButtonMax type={widthIcon ? 'pay_all' : 'pay_one'} color="primary" onClick={() => {}}>
          {formatPercent(String(defaultPayFee * months + pendingFee), 2)} USDC
        </ButtonMax>
      </BoxActions>
      {widthIcon && (
        <PaymentDueDate>
          Payment due date: <span>{moment.unix(paymentDueDate).format('HH DD MMM YYYY')}</span>
        </PaymentDueDate>
      )}
    </Wrapper>
  );
};

export default InputFeeItem;
