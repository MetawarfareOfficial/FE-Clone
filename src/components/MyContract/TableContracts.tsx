import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
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
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { formatTimestampV2 } from 'helpers/formatTimestamp';
import { formatPrice } from 'helpers/formatPrice';
import { formatCType } from 'helpers/formatCType';
import { bigNumber2NumberV3 } from 'helpers/formatNumber';
import { claimAllNodes, claimNodeByNode } from 'helpers/interractiveContract';
import MintStatusModal from 'components/Base/MintStatusModal';
import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';
import { sleep } from 'helpers/delayTime';
import { DELAY_TIME } from 'consts/typeReward';
import { errorMessage } from 'messages/errorMessages';
import { setIsClaimingReward, unSetIsClaimingReward } from 'services/contract';
import { useToast } from 'hooks/useToast';

interface Props {
  title?: string;
  data: Array<any>;
}

const EmptyContracts = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: 'calc(100vh - 119px - 315px)',
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
  padding: '15px 30px',
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
  padding: '11px 30px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  fontFamily: 'Poppins',
  fontSize: '14px',
  lineHeight: '25px',
  fontWeight: '500',
  border: 'none',
  maxWidth: '160px',
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
  fontWeight: 'bold',
  padding: '8px 10px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  width: '98px',
  height: '38px',
  color: theme.palette.mode === 'light' ? `#293247` : '#fff',
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

const ButtonClaim = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  padding: '8px 17px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  width: '98px',
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
    width: '84px',
    height: '32px',
  },
}));

const TableWrapper = styled(TableContainer)<TableContainerProps>(({ theme }) => ({
  boxShadow: '0px 23px 48px rgba(0, 0, 0, 0.06)',
  border: 'none',
  borderRadius: '20px',
  maxHeight: 'calc(100vh - 119px - 212px)',

  '&::-webkit-scrollbar-button': {
    height: '9px',
  },
  '&::-webkit-scrollbar': {
    width: '9px',
    height: '9px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'none',
    webkitBoxShadow: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#3864FF',
    height: '9px',
    outline: 'none',
    borderRadius: '10px',
  },

  [theme.breakpoints.down('lg')]: {
    maxHeight: 'calc(100vh - 260px)',

    '&::-webkit-scrollbar-button': {
      height: '4px',
    },
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
    },
  },
  [theme.breakpoints.down('md')]: {
    maxHeight: 'calc(100vh - 390px)',
  },
}));

const STATUS = ['success', 'error', 'pending'];

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

const TableContracts: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const isClaimingReward = useAppSelector((state) => state.contract.isClaimingReward);

  const { createToast } = useToast();
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [claimType, setClaimType] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  const handleToggleStatus = () => {
    setOpenStatus(!openStatus);
  };

  const processModal = (type: string) => {
    setStatus(STATUS[2]);
    setOpenStatus(true);
    setClaimType(type);
  };

  const processIcon = (cType: string) => {
    if (cType === '0') {
      setIcon(SquareIcon);
      return;
    }

    if (cType === '1') {
      setIcon(CubeIcon);
      return;
    }

    setIcon(TessIcon);
  };

  const handleClickClaimAll = async () => {
    try {
      processModal('ALL CONTRACT');
      processIcon('');
      dispatch(setIsClaimingReward());

      const response: Record<string, any> = await claimAllNodes();
      await sleep(DELAY_TIME);

      if (response.hash) setStatus(STATUS[0]);
    } catch (err: any) {
      setStatus(STATUS[1]);
    } finally {
      dispatch(unSetIsClaimingReward());
    }
  };

  const handleClickClaimNodeByNode = async (nodeIndex: number, cType: string) => {
    try {
      processModal(formatCType(cType));
      processIcon(cType);
      dispatch(setIsClaimingReward());

      const response: Record<string, any> = await claimNodeByNode(nodeIndex);
      await sleep(DELAY_TIME);

      if (response.hash) setStatus(STATUS[0]);
    } catch (e: any) {
      if (e.code === -32603) {
        createToast({
          message: errorMessage.REWARDS_NOT_READY.message,
          type: 'error',
        });
      }
      setStatus(STATUS[1]);
    } finally {
      dispatch(unSetIsClaimingReward());
    }
  };

  return (
    <Box>
      <TableWrapper>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader>Mint Date</TableCellHeader>
              <TableCellHeader align="left">Name</TableCellHeader>
              <TableCellHeader align="left">Type</TableCellHeader>
              <TableCellHeader align="center">Initial 0xB/day </TableCellHeader>
              <TableCellHeader align="center">Current 0xB/day</TableCellHeader>
              <TableCellHeader align="center">Rewards</TableCellHeader>
              <TableCellHeader align="right">
                <ButtonClaimAll
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleClickClaimAll}
                  disabled={!(currentUserAddress && data.length !== 0 && !isClaimingReward)}
                >
                  Claim all
                </ButtonClaimAll>
              </TableCellHeader>
            </TableRow>
          </TableHead>
          <CustomTableBody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <TableRowCustom key={i}>
                  <TableCellContent>{formatTimestampV2(item.mintDate)}</TableCellContent>
                  <TableCellContent align="left">{item.name}</TableCellContent>
                  <TableCellContent align="left">{formatCType(item.type)}</TableCellContent>
                  <TableCellContent align="center">{item.initial}</TableCellContent>
                  <TableCellContent align="center">{item.current}</TableCellContent>
                  <TableCellContent align="center">
                    {formatPrice(bigNumber2NumberV3(item.rewards, 1e9))}
                  </TableCellContent>
                  <TableCellContent align="right">
                    <ButtonClaim
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        handleClickClaimNodeByNode(data.length - i - 1, item.type);
                      }}
                      disabled={isClaimingReward}
                    >
                      Claim
                    </ButtonClaim>
                  </TableCellContent>
                </TableRowCustom>
              ))
            ) : (
              <TableRowNoData>
                <TableCellContent colSpan={7}>
                  <EmptyContracts>
                    {currentUserAddress ? 'No contracts yet!' : 'You need to connect wallet!'}
                  </EmptyContracts>
                </TableCellContent>
              </TableRowNoData>
            )}
          </CustomTableBody>
        </Table>
        <MintStatusModal
          icon={icon}
          name={claimType}
          open={openStatus}
          status={status}
          text={
            status === 'success'
              ? 'Rewards claimed successfully'
              : status === 'error'
              ? 'Rewards claiming failed'
              : status === 'pending'
              ? 'Processing'
              : 'Insufficient Tokens'
          }
          onClose={handleToggleStatus}
        />
      </TableWrapper>
    </Box>
  );
};

export default TableContracts;
