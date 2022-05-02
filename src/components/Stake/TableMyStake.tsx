import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  BoxProps,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableCellProps,
  TableRow,
  Button,
  ButtonProps,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';

import PaginationCustom from './Pagination';
import { ReactComponent as WarnIcon } from 'assets/images/ic-warn-circle.svg';
import { ReactComponent as WarnDarkIcon } from 'assets/images/ic-warn-circle-dark.svg';

interface Props {
  title?: string;
  onClaimAll: () => void;
  onClaim: (index: any) => void;
  onUnstake: (index: any) => void;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  border: '1px solid rgba(41, 50, 71, 0.09)',
  boxSizing: 'border-box',
  borderRadius: '11px',
}));

const ButtonClaimAll = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '21px',
  textAlign: 'center',
  background: '#3864FF',
  color: '#fff',
  textTransform: 'capitalize',
  height: '34px',
  borderRadius: '10px',
  boxShadow: 'none',
  padding: '6px 10px',
  maxWidth: '184px',

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

const ButtonStake = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  textAlign: 'center',
  color: '#3864FF',
  textTransform: 'capitalize',
  border: '1px solid #3864FF',
  height: '34px',
  width: '80px',
  borderRadius: '10px',

  '&:hover': {
    background: '#3864FF',
    borderColor: '#3864FF',
    color: '#fff',
  },
}));

const ButtonClaim = styled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  textAlign: 'center',
  background: '#3864FF',
  color: '#fff',
  textTransform: 'capitalize',
  height: '34px',
  width: '80px',
  borderRadius: '10px',
  boxShadow: 'none',
  marginLeft: '24px',

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

  [theme.breakpoints.down('lg')]: {
    marginLeft: '12px',
  },
}));

const TableCellHeader = styled(TableCell)<TableCellProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.025em',
  textTransform: 'uppercase',
  color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  padding: '19px 32px 15px',
  borderBottom: '1px solid rgba(41, 50, 71, 0.09)',

  [theme.breakpoints.down('lg')]: {
    padding: '10px 16px',
    fontSize: '12px',
  },
}));

const TableCellBody = styled(TableCell)<TableCellProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.025em',
  textTransform: 'uppercase',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  padding: '18px 32px',
  borderBottom: '1px solid rgba(41, 50, 71, 0.09)',

  [theme.breakpoints.down('lg')]: {
    padding: '10px 16px',
    fontSize: '14px',
  },
}));

const ViewPagination = styled(Box)<BoxProps>(() => ({
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  padding: '19px 0',
}));

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === 'light' ? '#e4e4e4' : '#000',
    top: '5px !important',

    ['&::before']: {
      boxShadow: '0px 1px 7px rgba(0, 0, 0, 0.08)',
      backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#171717',
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#171717',
    boxShadow: '0px 1px 7px rgba(0, 0, 0, 0.08)',
    color: theme.palette.mode === 'light' ? '#293247' : '#fff',
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '22px',
    borderRadius: '7px',
    padding: '2px 10px',
    maxWidth: '552px',
    filter: theme.palette.mode === 'light' ? 'unset' : 'drop-shadow(0px 0px 5px rgba(56, 100, 255, 0.19))',
  },
  zIndex: 1200,
}));

const dataTable = () => {
  const results: any = [];
  for (let i = 0; i < 41; i++) {
    results.push({
      id: i + 1,
      date: 'Apr 11 2022',
      stake_amount: '50',
      unstake_amount: '50',
      staking_time: '5 Days',
      rewards: '400',
    });
  }

  return results;
};

const TableMyStake: React.FC<Props> = ({ onClaimAll, onClaim, onUnstake }) => {
  const theme = useTheme();
  const data = dataTable();
  const [records, setRecords] = useState(data.slice(0, 5));
  const [pagination, setPagination] = useState({
    limit: 5,
    index: 0,
  });

  useEffect(() => {}, [pagination]);

  const handleChangePage = (value: number) => {
    const values = data.slice((value - 1) * pagination.limit, value * pagination.limit);
    setRecords(values);
    setPagination({
      ...pagination,
      index: value - 1,
    });
  };

  return (
    <Wrapper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCellHeader align="left">stake date</TableCellHeader>
              <TableCellHeader align="center">stake amount</TableCellHeader>
              <TableCellHeader align="center">unstaked amount</TableCellHeader>
              <TableCellHeader align="center">staking time</TableCellHeader>
              <TableCellHeader align="center">rewards 0xB</TableCellHeader>
              <TableCellHeader align="right">
                <ButtonClaimAll variant="contained" fullWidth onClick={onClaimAll}>
                  Claim All
                </ButtonClaimAll>
              </TableCellHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCellBody align="left">{item.date}</TableCellBody>
                <TableCellBody align="center">{item.stake_amount}</TableCellBody>
                <TableCellBody align="center">{item.unstake_amount}</TableCellBody>
                <TableCellBody align="center">{item.staking_time}</TableCellBody>
                <TableCellBody align="center">
                  {item.rewards}{' '}
                  <TooltipCustom
                    title={
                      <div>
                        <p style={{ margin: 0 }}>
                          If you unstake before 30 days, you will be charged 5% on your unstake amount
                        </p>
                        <p style={{ margin: 0 }}>
                          If you unstake before 60 days, you will be charged 2.5% on your unstake amount{' '}
                        </p>
                      </div>
                    }
                    arrow
                    placement="left-start"
                  >
                    {theme.palette.mode === 'light' ? (
                      <WarnIcon width={16} style={{ float: 'right' }} />
                    ) : (
                      <WarnDarkIcon width={16} style={{ float: 'right' }} />
                    )}
                  </TooltipCustom>
                </TableCellBody>
                <TableCellBody align="right">
                  <ButtonStake variant="outlined" onClick={() => onUnstake(item.id)}>
                    Unstake
                  </ButtonStake>
                  <ButtonClaim variant="contained" onClick={() => onClaim(item.id)}>
                    Claim
                  </ButtonClaim>
                </TableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ViewPagination>
        <PaginationCustom
          total={data.length}
          limit={pagination.limit}
          page={pagination.index + 1}
          onChange={handleChangePage}
        />
      </ViewPagination>
    </Wrapper>
  );
};

export default TableMyStake;
