import {
  Box,
  BoxProps,
  ButtonProps,
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
  IconButton,
  IconButtonProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { AllContract, AllDarkContract, CubeIcon, SquareIcon, TessIcon } from 'assets/images';
import CubeDarkIcon from 'assets/images/cube-dark.gif';
import CloseDarkImg from 'assets/images/ic-close-dark.svg';
import CloseImg from 'assets/images/ic-times.svg';
import SquareDarkIcon from 'assets/images/square-dark.gif';
import TessDarkIcon from 'assets/images/tess-dark.gif';
import { ClaimingType } from 'components/MyContract/TableContracts';
import { customToast } from 'helpers';
import {
  calculateMonthlyFee,
  calculatePendingFee,
  checkPendingContract,
  getNearestDateEntity,
} from 'helpers/myContract';
import { MineContract } from 'interfaces/MyContract';
import { errorMessage } from 'messages/errorMessages';
import moment from 'moment';
import React, { useState } from 'react';
import { useAppSelector } from 'stores/hooks';
import InputFeeItem from './InputFeeItem';
export type PopupType = 'pay_all' | 'pay_one';
interface Props {
  open: boolean;
  // icon: string;
  // name: string;
  type: PopupType;
  contracts: Array<MineContract>;
  allContracts: Array<MineContract>;
  onClose: () => void;
  onSubmit: (values: any, times: string[]) => void;
  onApproveToken: () => void;
}

const Wrapper = styled(Dialog)<DialogProps>(({ theme }) => ({
  background: 'rgba(12, 12, 12, 0.12)',
  zIndex: 1500,

  '.MuiDialog-container': {
    background: theme.palette.mode === 'light' ? 'rgba(12, 12, 12, 0.12)' : 'rgba(28, 28, 28, 0.36)',
    backdropFilter: `blur(${theme.palette.mode === 'light' ? '4px' : '13px'})`,
  },

  '.MuiPaper-root': {
    width: '437px',
    boxShadow: '0px 10px 36px rgba(38, 29, 77, 0.1)',
    borderRadius: '24px',
    padding: '0',
    margin: 0,
    boxSizing: 'border-box',
    border: theme.palette.mode === 'light' ? 'unset' : '1px solid #6F6F6F',
    background: theme.palette.mode === 'light' ? '#fff' : '#2C2C2C',
  },
}));

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

const Header = styled(DialogTitle)<DialogTitleProps>(({}) => ({
  display: 'flex',
  alignItems: 'center',
  // padding: '20px 21px',
  marginBottom: '20px',
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

// const BoxFeeDetail = styled(Box)<
//   BoxProps & {
//     type: PopupType;
//   }
// >(({ type, theme }) => ({
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: type !== 'pay_one' ? '14px 20px 14px 23px' : '14px 11px 14px 11px',
//   boxSizing: 'border-box',
//   border: '1px solid #3864FF',
//   borderRadius: '14px',
//   margin: type !== 'pay_one' ? '0 auto 40px' : 'unset',
//   fontFamily: 'Poppins',
//   fontStyle: 'normal',
//   fontWeight: '400',
//   fontSize: '14px',
//   lineHeight: '21px',
//   color: theme.palette.mode === 'light' ? '#293247' : '#fff',
// }));

const SubscriptionFeeBox = styled(Box)<
  BoxProps & {
    type: 'pay_one' | 'pay_all';
  }
>(({ type, theme }) => ({
  border:
    type === 'pay_one'
      ? theme.palette.mode === 'light'
        ? '1px solid rgba(41, 50, 71, 0.09)'
        : '1px solid rgba(255, 255, 255, 0.09)'
      : 'unset',
  borderRadius: '11px',
  padding: type === 'pay_one' ? '0 20px 20px 20px' : 'unset',
}));

const Divider = styled(Box)<BoxProps>(({ theme }) => ({
  border: theme.palette.mode === 'light' ? '1px solid rgba(41, 50, 71, 0.09)' : '1px solid rgba(255, 255, 255, 0.09)',
  margin: '46px 0',
}));

const Content = styled(DialogContent)<DialogContentProps>(({ theme }) => ({
  padding: '20px',
  // marginBottom: '21px',
  'p.MuiDialogContentText-root': {
    color: theme.palette.mode === 'light' ? '#828282' : 'rgba(255, 255, 255, 0.29)',
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
    color: theme.palette.mode === 'light' ? '#293247' : '#fff',
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
    maxHeight: '266px',
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
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
      padding: 0,
      // padding: '7px 20px',
      // border: '1px solid #BDBDBD',

      marginBottom: '8px',

      ['.MuiInput-root']: {
        padding: '7px 20px',
        border: theme.palette.mode === 'light' ? '1px solid #BDBDBD' : '1px solid transparent',
        boxSizing: 'border-box',
        borderRadius: '13px',
        background: theme.palette.mode === 'light' ? 'unset' : '#252525',

        [theme.breakpoints.down('sm')]: {
          padding: '12px 20px',
        },
      },
    },
  },
}));

const ButtonMint = styled('button')<ButtonProps>(({ theme, disabled }) => ({
  width: '100%',
  marginTop: '30px',
  padding: '10px 29px',
  height: '60px',
  textAlign: 'center',
  borderRadius: '14px',
  background: disabled
    ? 'rgba(0, 0, 0, 0.26)'
    : theme.palette.mode === 'light'
    ? theme.palette.primary.main
    : 'linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)',
  color: '#fff',
  display: 'inline-block',
  boxSizing: 'border-box',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '21px',
  cursor: disabled ? 'not-allowed !important' : 'pointer',
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

// const ViewHelp = styled(Box)<BoxProps>(() => ({
//   marginRight: '10px',
//   display: 'flex',
// }));

const PendingFeeBox = styled(Box)<BoxProps>(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: '120px',
  // maxWidth: '374px',
  border: theme.palette.mode === 'light' ? '1px solid rgba(15, 13, 13, 0.28)' : '1px solid rgba(255, 255, 255, 0.09)',
  borderRadius: '17px',
  padding: '10px 20px',
}));

const PayPendingFeeButton = styled('button')<ButtonProps>(() => ({
  border: ' 1px solid rgba(255, 0, 0, 0.26)',
  borderRadius: '11px',
  background: '#FF0000',
  width: '181px',
  height: '58px',
  fontSize: '18px',
  color: '#fff',
  fontWeight: '500',
  '&:hover': {
    opacity: 0.7,
    cursor: 'pointer',
  },
}));
const Text = styled(Typography)<TypographyProps>(() => ({
  margin: '3px',
  textAlign: 'center',
  fontWeight: '500',
  fontSize: '17px',
}));
const PendingFeeAmountBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const MyContractsPayFeeModal: React.FC<Props> = ({
  open,
  onClose,
  type,
  contracts,
  onSubmit,
  onApproveToken,
  // allContracts,
}) => {
  const theme = useTheme();

  const usdcTokenInfo = useAppSelector((state) => state.contract.usdcToken);
  // const isUsdcTokenLoaded = useAppSelector((state) => state.contract.isUsdcTokenLoaded);
  const monthlyFeeTimes = useAppSelector((state) => state.contract.monthlyFeeTimes);
  const monthlyFees = useAppSelector((state) => state.contract.monthlyFees);

  const [cubeMonths, setCubeMonths] = useState(1);
  const [tessMonths, setTessMonths] = useState(1);
  const [contMonths, setContMonths] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const getIconByMode = (type: ClaimingType | null, mode: string) => {
    if (type) {
      // TODO: return in if still need else statement?
      if (type === ClaimingType.AllContracts) return mode === 'light' ? AllContract : AllDarkContract;
      else if (type === ClaimingType.Square) return mode === 'light' ? SquareIcon : SquareDarkIcon;
      else if (type === ClaimingType.Cube) return mode === 'light' ? CubeIcon : CubeDarkIcon;
      else if (type === ClaimingType.Tesseract) return mode === 'light' ? TessIcon : TessDarkIcon;
    }
    return '';
  };
  const convertCType = (cType: string) => {
    if (cType === '') return ClaimingType.AllContracts;
    else if (cType === '0') return ClaimingType.Square;
    else if (cType === '1') return ClaimingType.Cube;
    else if (cType === '2') return ClaimingType.Tesseract;
    else return null;
  };
  const icon = contracts.length > 0 ? getIconByMode(convertCType(contracts[0].type), theme.palette.mode) : '';
  const name = contracts.length > 0 ? `${convertCType(contracts[0].type)} Contract` : '';

  const handleBackdropClick = () => {
    customToast({ message: errorMessage.FINISH_MINT_CONTRACT.message, type: 'error', toastId: 3 });
  };

  const getContTime = (contracts: MineContract[], months: number) => {
    return contracts.map((item) => {
      const totalPendingMonth = checkPendingContract(Number(item.expireIn), Number(monthlyFeeTimes.one), false, true);
      let returnMonth = monthlyFeeTimes.one;
      if (months === 1) {
        returnMonth = monthlyFeeTimes.one;
      } else if (months === 2) {
        returnMonth = monthlyFeeTimes.two;
      } else {
        returnMonth = monthlyFeeTimes.three;
      }
      return Number(totalPendingMonth) > 0
        ? String(Number(returnMonth) + Number(monthlyFeeTimes.one) * Number(totalPendingMonth))
        : returnMonth;
    });
  };

  const cubeContracts = contracts.filter((item) => item.type === '1');
  const tesseractContracts = contracts.filter((item) => item.type === '2');

  const cubeMonthlyFee = Number(monthlyFees.cube);
  const tessMonthlyFee = Number(monthlyFees.tesseract);

  const oneContractPayFee = calculateMonthlyFee(
    contracts,
    contracts[0].type === '1' ? cubeMonthlyFee : tessMonthlyFee,
    type,
  );

  const totalUsdcHaveToPay =
    type === 'pay_all'
      ? calculateMonthlyFee(cubeContracts, cubeMonthlyFee, type) * cubeMonths +
        calculateMonthlyFee(tesseractContracts, tessMonthlyFee, type) * tessMonths
      : oneContractPayFee * contMonths;

  const cubeContractsPendingFee = calculatePendingFee(cubeContracts, cubeMonthlyFee, Number(monthlyFeeTimes.one));

  const tessContractsPendingFee = calculatePendingFee(tesseractContracts, tessMonthlyFee, Number(monthlyFeeTimes.one));

  const isTokenAmountOverAllowance = Number(usdcTokenInfo.allowance) < totalUsdcHaveToPay;
  const isTokenAmountOverBalance = Number(usdcTokenInfo.balance) < totalUsdcHaveToPay;

  const totalPendingMonths = checkPendingContract(
    Number(contracts[0].expireIn),
    Number(monthlyFeeTimes.one),
    false,
    true,
  );

  const nearestExpiredTimeCont = getNearestDateEntity(contracts) || contracts[0];
  const nearestExpiredTimeCubeCont = getNearestDateEntity(contracts, '1') || contracts[0];
  const nearestExpiredTimeTessCont = getNearestDateEntity(contracts, '2') || contracts[0];
  const nearestExpiredCubeContractPendingMonth = checkPendingContract(
    Number(nearestExpiredTimeCubeCont.expireIn),
    Number(monthlyFeeTimes.one),
    false,
    true,
  );
  const nearestExpiredTessContractPendingMonth = checkPendingContract(
    Number(nearestExpiredTimeTessCont.expireIn),
    Number(monthlyFeeTimes.one),
    false,
    true,
  );

  const nearestContMonth =
    type === 'pay_all' ? (nearestExpiredTimeCont.type === '1' ? cubeMonths : tessMonths) : contMonths;

  return (
    <Wrapper
      open={open}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      onBackdropClick={handleBackdropClick}
    >
      <Header>
        {type === 'pay_one' && (
          <ViewIcon>
            <img alt="" src={icon} />
          </ViewIcon>
        )}

        <HeaderText
          sx={{
            maxWidth: type === 'pay_one' ? '105px' : '170px',
          }}
        >
          {type === 'pay_one' ? name : 'Monthly Subscription Fee'}
        </HeaderText>

        <CloseIcon onClick={onClose}>
          <img alt="" src={theme.palette.mode === 'light' ? CloseImg : CloseDarkImg} />
        </CloseIcon>
      </Header>

      <Content>
        {type === 'pay_one' && totalPendingMonths > 0 && (
          <>
            <PendingFeeBox>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <PendingFeeAmountBox>
                  <Text>Pending fee</Text>
                  <Text
                    style={{
                      color: '#FF0000',
                    }}
                  >
                    {oneContractPayFee * Number(totalPendingMonths)} USD
                  </Text>
                </PendingFeeAmountBox>
                <PayPendingFeeButton
                  disabled={!isFirstTime && isTokenAmountOverBalance}
                  onClick={() => {
                    if (isFirstTime) {
                      if (isTokenAmountOverAllowance || isTokenAmountOverBalance) {
                        setIsFirstTime(false);
                      } else {
                        const selectedContracts = [...contracts];
                        const times = [String(Number(monthlyFeeTimes.one) * Number(totalPendingMonths))];
                        onSubmit(selectedContracts, times);
                        setIsFirstTime(false);
                      }
                    } else {
                      if (isTokenAmountOverAllowance) {
                        onApproveToken();
                      } else {
                        const selectedContracts = [...contracts];
                        const times = [String(Number(monthlyFeeTimes.one) * Number(totalPendingMonths))];
                        onSubmit(selectedContracts, times);
                      }
                    }
                  }}
                >
                  {isFirstTime
                    ? 'Pay'
                    : isTokenAmountOverAllowance
                    ? 'Approve USDC'
                    : isTokenAmountOverBalance
                    ? 'Insufficient Tokens'
                    : 'Pay'}
                </PayPendingFeeButton>
              </div>
              <PaymentDueDate>
                Payment due date:{' '}
                <span>
                  {moment
                    .unix(
                      Number(Number(nearestExpiredTimeCont.expireIn) - Number(monthlyFeeTimes.one)) +
                        nearestContMonth * Number(monthlyFeeTimes.one),
                    )
                    .format('HH DD MMM YYYY')}
                </span>
              </PaymentDueDate>
            </PendingFeeBox>
            <Divider />
          </>
        )}
        <SubscriptionFeeBox type={type}>
          {type === 'pay_one' ? (
            <InputFeeItem
              months={contMonths}
              setMonths={setContMonths}
              defaultPayFee={oneContractPayFee}
              onChange={() => {}}
              icon={icon}
              widthIcon={false}
              name={'Subscription fee'}
            />
          ) : (
            <>
              {cubeContracts.length > 0 && (
                <InputFeeItem
                  months={cubeMonths}
                  setMonths={setCubeMonths}
                  pendingFee={cubeContractsPendingFee}
                  defaultPayFee={calculateMonthlyFee(cubeContracts, cubeMonthlyFee, type)}
                  onChange={() => {}}
                  icon={theme.palette.mode === 'light' ? CubeIcon : CubeDarkIcon}
                  widthIcon={true}
                  name={'Cube Contract'}
                  paymentDueDate={
                    Number(nearestExpiredTimeCubeCont.expireIn) +
                    Number(nearestExpiredCubeContractPendingMonth) * Number(monthlyFeeTimes.one) +
                    cubeMonths * Number(monthlyFeeTimes.one)
                  }
                />
              )}
              {tesseractContracts.length > 0 && (
                <InputFeeItem
                  months={tessMonths}
                  setMonths={setTessMonths}
                  pendingFee={tessContractsPendingFee}
                  onChange={() => {}}
                  defaultPayFee={calculateMonthlyFee(tesseractContracts, tessMonthlyFee, type)}
                  icon={theme.palette.mode === 'light' ? TessIcon : TessDarkIcon}
                  widthIcon={true}
                  name={'Tesseract Contract'}
                  paymentDueDate={
                    Number(nearestExpiredTimeTessCont.expireIn) +
                    Number(nearestExpiredTessContractPendingMonth) * Number(monthlyFeeTimes.one) +
                    tessMonths * Number(monthlyFeeTimes.one)
                  }
                />
              )}
            </>
          )}

          {type === 'pay_one' && (
            <PaymentDueDate>
              Payment due date:{' '}
              <span>
                {moment
                  .unix(Number(nearestExpiredTimeCont.expireIn) + nearestContMonth * Number(monthlyFeeTimes.one))
                  .format('HH DD MMM YYYY')}
              </span>
            </PaymentDueDate>
          )}
        </SubscriptionFeeBox>
        <ButtonMint
          variant="contained"
          color="primary"
          disabled={!isFirstTime && isTokenAmountOverBalance}
          onClick={() => {
            if (isFirstTime) {
              if (isTokenAmountOverAllowance || isTokenAmountOverBalance) {
                setIsFirstTime(false);
              } else {
                const selectedContracts =
                  type === 'pay_all' ? [...cubeContracts, ...tesseractContracts] : [...contracts];
                const cubeTimes = getContTime(cubeContracts, cubeMonths);
                const tessTimes = getContTime(tesseractContracts, tessMonths);
                const oneContTime = getContTime(contracts, contMonths);
                const times = type === 'pay_all' ? [...cubeTimes, ...tessTimes] : [...oneContTime];
                onSubmit(selectedContracts, times);
                setIsFirstTime(false);
              }
            } else {
              if (isTokenAmountOverAllowance) {
                onApproveToken();
              } else {
                const selectedContracts =
                  type === 'pay_all' ? [...cubeContracts, ...tesseractContracts] : [...contracts];
                const cubeTimes = getContTime(cubeContracts, cubeMonths);
                const tessTimes = getContTime(tesseractContracts, tessMonths);
                const oneContTime = getContTime(contracts, contMonths);
                const times = type === 'pay_all' ? [...cubeTimes, ...tessTimes] : [...oneContTime];
                onSubmit(selectedContracts, times);
              }
            }
          }}
        >
          {isFirstTime
            ? type === 'pay_all'
              ? 'Pay'
              : totalPendingMonths > 0
              ? 'Pay Both'
              : 'Pay'
            : isTokenAmountOverAllowance
            ? 'Approve USDC'
            : isTokenAmountOverBalance
            ? 'Insufficient Tokens'
            : type === 'pay_all'
            ? 'Pay'
            : totalPendingMonths > 0
            ? 'Pay Both'
            : 'Pay'}
        </ButtonMint>
      </Content>
    </Wrapper>
  );
};

export default MyContractsPayFeeModal;
