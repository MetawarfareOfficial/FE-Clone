import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  BoxProps,
  Table,
  TableHead,
  TableRow,
  TableRowProps,
  TableCell,
  TableCellProps,
  TableBody,
  TableBodyProps,
  TableContainer,
  TableContainerProps,
  Button,
  ButtonProps,
  TableProps,
} from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { formatTimestampV2 } from 'helpers/formatTimestamp';
import { formatCType } from 'helpers/formatCType';
import { bigNumber2NumberV3 } from 'helpers/formatNumber';
import MintStatusModal from 'components/Base/MintStatusModal';
import MyContractsPayFeeModal from 'components/Base/MyContractsPayFeeModal';
import {
  SquareIcon,
  CubeIcon,
  TessIcon,
  SquareDarkIcon,
  CubeDarkIcon,
  TessDarkIcon,
  AllContract,
  AllDarkContract,
} from 'assets/images';
import { setIsClaimingReward, unSetIsClaimingReward } from 'services/contract';
import { infoMessage } from 'messages/infoMessages';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatAndTruncateNumber } from 'helpers/formatAndTruncateNumber';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { ReactComponent as WarnIcon } from 'assets/images/ic-warn-blue.svg';
import { ReactComponent as WarnDarkIcon } from 'assets/images/ic-warn-circle-dark.svg';
import { MineContract } from 'interfaces/MyContract';
import { useWeb3React } from '@web3-react/core';
import {
  checkPendingContract,
  checkAllContractIsPendingMonthlyFee,
  convertCType,
  getNoFeeContractType,
} from 'helpers/myContract';
import { calculateDueDate } from 'helpers/myContract/calculateDueDate';
export interface ContractItem {
  claimedRewards: string;
  current: string;
  initial: string;
  mintDate: string;
  name: string;
  rewards: string;
  type: string;
}

interface Props {
  title?: string;
  data: MineContract[];
}

const EmptyContracts = styled(Box)<BoxProps>(({ theme }) => ({
  // minHeight: 'calc(100vh - 50px - 315px)',
  minHeight: 'calc(100vh - 50px - 300px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'light' ? '#E0E0E0' : '#6B6B6B',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '36px',
  lineHeight: '42px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '30px',
    lineHeight: '38px',
  },
}));

const TableCellHeader = styled(TableCell)<TableCellProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#DBECFD' : '#37393A',
  padding: '15px 10px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  fontFamily: 'Roboto',
  fontSize: '16px',
  lineHeight: '19px',
  fontWeight: 'bold',
  border: 'none',

  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '20px',
    padding: '12px 20px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '20px',
    padding: '12px 12px',
  },
}));

const TableCellContent = styled(TableCell)<TableCellProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'unset',
  padding: '11px 10px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  fontFamily: 'Poppins',
  fontSize: '14px',
  lineHeight: '25px',
  fontWeight: '500',
  border: 'none',
  // maxWidth: '100px',
  whiteSpace: 'nowrap',
  overflow: 'hidden !important',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '16px',
    padding: '8px 20px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '16px',
    padding: '6px 12px',
  },
}));

const ButtonClaimAll = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: '700',
  padding: '8px 4px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  width: '98px',
  height: '38px',
  color: theme.palette.mode === 'light' ? `#fff` : '#fff',
  background:
    theme.palette.mode === 'light'
      ? `${theme.palette.secondary}`
      : 'linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)',

  '&:disabled': {
    background: theme.palette.mode === 'light' ? '#BCCBE2' : '#4F4F4F',
    color: theme.palette.mode === 'light' ? '#fff' : '#828282',
  },

  '&:hover': {
    cursor: 'pointed',
    color: theme.palette.mode === 'light' ? `#293247` : '#fff',
    background:
      theme.palette.mode === 'light'
        ? `${theme.palette.secondary}`
        : 'linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)',
    opacity: 0.7,
    boxShadow: 'none',
  },

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '16px',
    padding: '6px 8px',
    width: '84px',
    height: '32px',
  },
}));

const ButtonClaim = styled(Button)<
  ButtonProps & {
    fullWidth?: boolean;
  }
>(({ theme, fullWidth }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  padding: '8px 17px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  width: fullWidth ? '218px' : '98px',
  height: '38px',
  color: theme.palette.primary[theme.palette.mode],
  border: `1px solid ${theme.palette.primary[theme.palette.mode]}`,

  '&:hover': {
    cursor: 'pointed',
    opacity: 0.7,
  },

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '16px',
    padding: '6px 8px',
    width: fullWidth ? '188px' : '84px',
    height: '32px',
  },
}));

const TableWrapper = styled(TableContainer)<TableContainerProps>(({ theme }) => ({
  boxShadow: '0px 23px 48px rgba(0, 0, 0, 0.06)',
  border: 'none',
  borderRadius: '20px',
  maxHeight: 'calc(100vh - 50px - 200px)',

  '&::-webkit-scrollbar-button': {
    height: '0px',
  },
  '&::-webkit-scrollbar': {
    width: '9px',
    height: '0px',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#292929',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'none',
    webkitBoxShadow: 'none',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#292929',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#3864FF',
    height: '0px',
    outline: 'none',
    borderRadius: '10px',
  },

  [theme.breakpoints.down('lg')]: {
    maxHeight: 'calc(100vh - 260px)',

    '&::-webkit-scrollbar-button': {
      height: '0px',
    },
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '0px',
    },
  },
  [theme.breakpoints.down('md')]: {
    maxHeight: 'calc(100vh - 390px)',
  },
}));

const STATUS = ['success', 'error', 'pending', 'permission denied'];

const CustomTableBody = styled(TableBody)<TableBodyProps>(() => ({
  overflow: 'auto',
}));

const TableRowCustom = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#292929',
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#262626',
  },
}));

const TableRowNoData = styled(TableRow)<TableRowProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? 'unset' : 'rgba(255, 255, 255, 0.03)',
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
  zIndex: 1200,
}));

const ViewHelp = styled(Box)<BoxProps>(() => ({
  marginRight: '10px',
  display: 'flex',
}));

const BoxActions = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
}));

const CustomTable = styled(Table)<TableProps>(({ theme }) => ({
  tableLayout: 'fixed',
  '&>thead>tr>th:last-child': {
    width: '260px',
  },
  [theme.breakpoints.down('lg')]: {
    '&>thead>tr>th:last-child': {
      width: '220px',
    },
  },
}));

export enum ClaimingType {
  AllContracts = 'allContract',
  Cube = 'cube',
  Square = 'square',
  Tesseract = 'tesseract',
}

export type ClaimingTypeV2 = ClaimingType | null | 'approve' | 'payFee';

const TableContracts: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const theme = useTheme();
  const { claimAllNodes, getClaimPermit, claimNodeByNode, payMonthlyFee, approveToken, getMonthlyFeePermit } =
    useInteractiveContract();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const isClaimingReward = useAppSelector((state) => state.contract.isClaimingReward);
  const monthlyFeeTimes = useAppSelector((state) => state.contract.monthlyFeeTimes);
  const monthlyFees = useAppSelector((state) => state.contract.monthlyFees);

  const [openStatus, setOpenStatus] = useState(false);
  const [openPayFeeModalStatus, setOpenPayFeeModalStatus] = useState(false);

  const [status, setStatus] = useState<any>(STATUS[2]);
  const [claimType, setClaimType] = useState<string>('');
  const [claimingType, setClaimingType] = useState<ClaimingTypeV2>(null);
  const [isMetamaskConfirmPopupOpening, setIsMetamaskConfirmPopupOpening] = useState(false);
  const [claimingTransactionHash, setClaimingTransactionHash] = useState('');
  const [transactionHashCompleted, setTransactionHasCompleted] = useState('');
  const [transactionError, setTransactionError] = useState('');
  const [openPayFee, setOpenPayFee] = useState(false);
  const [isPayAllFee, setIsPayAllFee] = useState(false);
  const [currentSelectedContracts, setCurrentSelectedContracts] = useState<MineContract[]>([]);
  const [isClaiming, setIsClaiming] = useState(true);
  const [nextDueDate, setNextDueDate] = useState<number>();

  const handleToggleStatus = () => {
    if (openStatus && !isMetamaskConfirmPopupOpening) {
      dispatch(unSetIsClaimingReward());
      setClaimingTransactionHash('');
      setTransactionHasCompleted('');
      setTransactionError('');
    }
    setOpenStatus(!openStatus);
  };

  const handleTransactionCompleted = (txHash: string) => {
    setTransactionHasCompleted(txHash);
  };

  const handleTransactionError = (txHash: string) => {
    setTransactionError(txHash);
  };

  const processModal = (type: string) => {
    setStatus(STATUS[2]);
    setOpenStatus(true);
    setClaimType(type);
  };

  const getIconByMode = (type: ClaimingTypeV2, mode: string) => {
    if (type) {
      // TODO: return in if still need else statement?
      if (type === ClaimingType.AllContracts) return mode === 'light' ? AllContract : AllDarkContract;
      else if (type === ClaimingType.Square) return mode === 'light' ? SquareIcon : SquareDarkIcon;
      else if (type === ClaimingType.Cube) return mode === 'light' ? CubeIcon : CubeDarkIcon;
      else if (type === ClaimingType.Tesseract) return mode === 'light' ? TessIcon : TessDarkIcon;
    }
    return '';
  };

  const handlePayFee = (item: MineContract) => {
    setCurrentSelectedContracts([item]);
    setIsPayAllFee(false);
    setOpenPayFee(true);
  };
  const handlePayAllFees = () => {
    setCurrentSelectedContracts([...data]);
    setIsPayAllFee(true);
    setOpenPayFee(true);
  };
  const handleTogglePayFee = () => {
    setOpenPayFee(!openPayFee);
  };

  const handleSubmitPayFee = async (contracts: MineContract[], times: string[], nextDueDate: number) => {
    setIsClaiming(false);
    setNextDueDate(nextDueDate);
    if (openPayFee) handleTogglePayFee();
    let txHash = '';
    try {
      processModal(contracts.length <= 1 ? `${convertCType(contracts[0].type)} CONTRACT` : 'Monthly Subscription Fee');
      setClaimingType(contracts.length > 1 ? 'payFee' : convertCType(contracts[0].type));
      dispatch(setIsClaimingReward());
      // check on/off pay monthly fee
      const isPayMonthlyFeeActive = await getMonthlyFeePermit();
      if (!isPayMonthlyFeeActive[0]) {
        processModal('');
        setClaimingType(null);
        setStatus(STATUS[3]);
        return;
      }

      setIsMetamaskConfirmPopupOpening(true);
      const contractIndexes = contracts.map((item) => item.index);
      const response: Record<string, any> = await payMonthlyFee(contractIndexes, times);
      setIsMetamaskConfirmPopupOpening(false);
      if (response.hash) {
        txHash = response.hash;
        setClaimingTransactionHash(response.hash);
        await response.wait();
        handleTransactionCompleted(response.hash);
      }
    } catch (err: any) {
      if (txHash !== '') {
        handleTransactionError(txHash);
      } else {
        setIsMetamaskConfirmPopupOpening(false);
        if (!openPayFeeModalStatus) setOpenPayFeeModalStatus(true);
        setStatus(STATUS[1]);
        dispatch(unSetIsClaimingReward());
      }
    }
  };

  const handleApproveUSDC = async () => {
    let txHash = '';
    setIsClaiming(false);
    if (openPayFee) handleTogglePayFee();
    try {
      processModal('Approving');
      setClaimingType('approve');
      dispatch(setIsClaimingReward());

      setIsMetamaskConfirmPopupOpening(true);
      const response = await approveToken(
        String(process.env.REACT_APP_USDC_TOKEN_ADDRESS),
        String(process.env.REACT_APP_CONTS_REWARD_MANAGER),
      );
      setIsMetamaskConfirmPopupOpening(false);
      if (response.hash) {
        txHash = response.hash;
        setClaimingTransactionHash(response.hash);
        await response.wait();
        handleTransactionCompleted(response.hash);
      }
    } catch (err: any) {
      if (txHash !== '') {
        handleTransactionError(txHash);
      } else {
        setIsMetamaskConfirmPopupOpening(false);
        if (!openPayFeeModalStatus) setOpenPayFeeModalStatus(true);
        setStatus(STATUS[1]);
        dispatch(unSetIsClaimingReward());
      }
    }
  };

  const handleClickClaimAll = async () => {
    setIsClaiming(true);
    let txHash = '';
    try {
      processModal('ALL CONTRACTS');
      setClaimingType(ClaimingType.AllContracts);
      dispatch(setIsClaimingReward());

      const claimPermit = await getClaimPermit();
      if (!claimPermit[0]) {
        processModal('');
        setClaimingType(null);
        setStatus(STATUS[3]);
        return;
      }
      setIsMetamaskConfirmPopupOpening(true);
      const response: Record<string, any> = await claimAllNodes();
      setIsMetamaskConfirmPopupOpening(false);
      if (response.hash) {
        txHash = response.hash;
        setClaimingTransactionHash(response.hash);
        await response.wait();
        handleTransactionCompleted(response.hash);
      }
    } catch (err: any) {
      if (txHash !== '') {
        handleTransactionError(txHash);
      } else {
        setIsMetamaskConfirmPopupOpening(false);
        if (!openStatus) setOpenStatus(true);
        setStatus(STATUS[1]);
        dispatch(unSetIsClaimingReward());
      }
    }
  };

  const handleClickClaimNodeByNode = async (nodeIndex: number, cType: string) => {
    setIsClaiming(true);
    let txHash = '';
    try {
      processModal(`${formatCType(cType)} Contract`);
      setClaimingType(convertCType(cType));
      dispatch(setIsClaimingReward());

      const claimPermit = await getClaimPermit();
      if (!claimPermit[0]) {
        processModal('');
        setClaimingType(null);
        setStatus(STATUS[3]);
        return;
      }
      setIsMetamaskConfirmPopupOpening(true);
      const response: Record<string, any> = await claimNodeByNode(nodeIndex);
      setIsMetamaskConfirmPopupOpening(false);
      if (response.hash) {
        txHash = response.hash;
        setClaimingTransactionHash(response.hash);
        await response.wait();
        handleTransactionCompleted(response.hash);
      }
    } catch (e: any) {
      if (txHash !== '') {
        handleTransactionError(txHash);
      } else {
        setIsMetamaskConfirmPopupOpening(false);
        if (!openStatus) setOpenStatus(true);
        setStatus(STATUS[1]);
        dispatch(unSetIsClaimingReward());
      }
    }
  };

  useEffect(() => {
    if (transactionError !== '' && claimingTransactionHash === transactionError) {
      setIsMetamaskConfirmPopupOpening(false);
      if (!openStatus) setOpenStatus(true);
      setStatus(STATUS[1]);
      dispatch(unSetIsClaimingReward());
      setTransactionError('');
    }
  }, [claimingTransactionHash, transactionError]);

  useEffect(() => {
    // if user close loading popup, claim reward status listener will be closed
    if (!openStatus && isClaimingReward && !isMetamaskConfirmPopupOpening) {
      dispatch(unSetIsClaimingReward());
      setClaimingTransactionHash('');
      setTransactionHasCompleted('');
      setTransactionError('');
    }
  }, [openStatus, isClaimingReward, isMetamaskConfirmPopupOpening]);

  useEffect(() => {
    if (claimingTransactionHash === transactionHashCompleted && claimingTransactionHash !== '') {
      setOpenStatus(true);
      setStatus(STATUS[0]);
      dispatch(unSetIsClaimingReward());
      setClaimingTransactionHash('');
      setTransactionHasCompleted('');
    }
  }, [claimingTransactionHash, transactionHashCompleted]);

  useEffect(() => {
    setOpenPayFee(false);
  }, [account]);

  const noPayFeeContract = getNoFeeContractType(monthlyFees);

  return (
    <Box>
      <TableWrapper>
        <CustomTable stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader sx={{ paddingLeft: '30px', width: '50%' }}>Mint Date</TableCellHeader>
              <TableCellHeader align="left" sx={{ width: '100%' }}>
                Name
              </TableCellHeader>
              <TableCellHeader align="left" sx={{ width: '50%' }}>
                Type
              </TableCellHeader>
              <TableCellHeader align="center" sx={{ width: '50%' }}>
                Initial 0xB/day{' '}
              </TableCellHeader>
              <TableCellHeader align="center" sx={{ width: '50%' }}>
                Current 0xB/day
              </TableCellHeader>
              <TableCellHeader align="center" sx={{ width: '50%' }}>
                Rewards
              </TableCellHeader>
              <TableCellHeader align="center" sx={{ width: '50%' }}>
                Claimed 0xB
              </TableCellHeader>
              <TableCellHeader align="center" sx={{ width: '50%' }}>
                Due Days
              </TableCellHeader>
              <TableCellHeader
                sx={{
                  width: '260px',
                }}
                align="right"
              >
                <ButtonClaimAll
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleClickClaimAll}
                  disabled={
                    !(currentUserAddress && data.length !== 0 && !isClaimingReward) ||
                    checkAllContractIsPendingMonthlyFee(data, Number(monthlyFeeTimes.one))
                  }
                >
                  Claim all
                </ButtonClaimAll>
                <ButtonClaimAll
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handlePayAllFees}
                  disabled={!(currentUserAddress && data.length !== 0 && !isClaimingReward)}
                  sx={{ marginLeft: '19px' }}
                >
                  Pay All Fees
                </ButtonClaimAll>
              </TableCellHeader>
            </TableRow>
          </TableHead>
          <CustomTableBody>
            {data.length > 0 ? (
              data
                .filter((r) => r.mintDate !== '')
                .map((item, i) => {
                  const isPendingFee = checkPendingContract(Number(item.expireIn), Number(monthlyFeeTimes.one), true);
                  const dueDate = calculateDueDate(Number(item.expireIn), Number(monthlyFeeTimes.one));
                  return (
                    <TableRowCustom key={i}>
                      <TableCellContent sx={{ paddingLeft: '30px' }}>
                        {formatTimestampV2(item.mintDate)}
                      </TableCellContent>
                      <TableCellContent align="left">{item.name}</TableCellContent>
                      <TableCellContent align="left">{formatCType(item.type)}</TableCellContent>
                      <TableCellContent align="center">{item.initial}</TableCellContent>
                      <TableCellContent align="center">{item.current}</TableCellContent>
                      <TableCellContent align="center">
                        {formatForNumberLessThanCondition({
                          value: bigNumber2NumberV3(item.rewards, 1e18),
                          minValueCondition: 0.001,
                          callback: formatAndTruncateNumber,
                        })}
                      </TableCellContent>
                      <TableCellContent align="center">
                        {formatForNumberLessThanCondition({
                          value: bigNumber2NumberV3(item.claimedRewards, 1e18),
                          minValueCondition: 0.001,
                          callback: formatAndTruncateNumber,
                        })}
                      </TableCellContent>
                      <TableCellContent
                        align="center"
                        sx={{
                          color:
                            !noPayFeeContract.map((item) => item.cType).includes(item.type) && isPendingFee
                              ? '#FF0E0E'
                              : 'auto',
                        }}
                      >
                        {!noPayFeeContract.map((item) => item.cType).includes(item.type) ? dueDate : '-'}
                      </TableCellContent>
                      <TableCellContent align="left">
                        <BoxActions>
                          {!noPayFeeContract.map((item) => item.cType).includes(item.type) && isPendingFee && (
                            <TooltipCustom
                              title={
                                <div>
                                  <p style={{ margin: 0 }}>
                                    {' '}
                                    If the monthly fee is unpaid after the due days, this contract will not be able to
                                    claim rewards{' '}
                                  </p>
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

                          {!noPayFeeContract.map((item) => item.cType).includes(item.type) ? (
                            <>
                              <ButtonClaim
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  handleClickClaimNodeByNode(item.index, item.type);
                                }}
                                disabled={isClaimingReward || dueDate === 0}
                              >
                                Claim
                              </ButtonClaim>
                              <ButtonClaim
                                size="small"
                                variant="outlined"
                                color="primary"
                                disabled={isClaimingReward}
                                sx={{ marginLeft: '19px' }}
                                onClick={() => handlePayFee(item)}
                              >
                                Pay Fee
                              </ButtonClaim>
                            </>
                          ) : (
                            <ButtonClaim
                              size="small"
                              fullWidth
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                handleClickClaimNodeByNode(item.index, item.type);
                              }}
                              disabled={isClaimingReward}
                              sx={{ width: 215 }}
                            >
                              Claim
                            </ButtonClaim>
                          )}
                        </BoxActions>
                      </TableCellContent>
                    </TableRowCustom>
                  );
                })
            ) : (
              <TableRowNoData>
                <TableCellContent colSpan={9}>
                  <EmptyContracts>
                    {currentUserAddress ? 'No contracts yet!' : 'You need to connect wallet!'}
                  </EmptyContracts>
                </TableCellContent>
              </TableRowNoData>
            )}
          </CustomTableBody>
        </CustomTable>

        <MintStatusModal
          nextDueDate={nextDueDate}
          icon={getIconByMode(claimingType, theme.palette.mode)}
          mode={isClaiming ? 'claim_status' : 'pay_fee_status'}
          name={claimType}
          open={openStatus}
          status={status}
          text={
            isClaiming
              ? status === 'success'
                ? infoMessage.REWARD_CLAIM_OK.message
                : status === 'error'
                ? infoMessage.REWARD_CLAIM_FAILED.message
                : status === 'pending'
                ? infoMessage.PROCESSING.message
                : status === 'permission denied'
                ? infoMessage.PERMISSION_DENIED.message
                : 'Insufficient Tokens'
              : status === 'success'
              ? claimType === 'Approving'
                ? 'Transaction Completed'
                : 'Payment Successful'
              : status === 'error'
              ? claimType === 'Approving'
                ? 'Transaction Rejected'
                : 'Payment Failed'
              : status === 'pending'
              ? infoMessage.PROCESSING.message
              : infoMessage.PERMISSION_DENIED.message
          }
          onClose={handleToggleStatus}
        />

        {openPayFee && (
          <MyContractsPayFeeModal
            type={isPayAllFee ? 'pay_all' : 'pay_one'}
            contracts={currentSelectedContracts}
            open={openPayFee}
            allContracts={data}
            onClose={handleTogglePayFee}
            onSubmit={handleSubmitPayFee}
            onApproveToken={handleApproveUSDC}
          />
        )}
      </TableWrapper>
    </Box>
  );
};

export default TableContracts;
