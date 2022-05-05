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
  // Checkbox,
  // CheckboxProps,
} from '@mui/material';

import PaginationCustom from './Pagination';
import { ReactComponent as WarnIcon } from 'assets/images/ic-warn-circle.svg';
import { ReactComponent as WarnDarkIcon } from 'assets/images/ic-warn-circle-dark.svg';
import { StakeItem } from 'services/staking';
import moment from 'moment';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatPercent } from 'helpers/formatPrice';
import { useWeb3React } from '@web3-react/core';
// import { removeArrayItemByValue } from 'helpers/removeArrayItemByIndex';

interface Props {
  title?: string;
  onClaim: (index: any) => void;
  onUnstake: (index: any) => void;
  data: StakeItem[];
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  border: '1px solid rgba(41, 50, 71, 0.09)',
  boxSizing: 'border-box',
  borderRadius: '11px',
}));

// const ButtonClaimAll = styled(Button)<ButtonProps>(() => ({
//   fontFamily: 'Poppins',
//   fontStyle: 'normal',
//   fontWeight: '500',
//   fontSize: '14px',
//   lineHeight: '21px',
//   textAlign: 'center',
//   background: '#3864FF',
//   color: '#fff',
//   textTransform: 'capitalize',
//   height: '34px',
//   borderRadius: '10px',
//   boxShadow: 'none',
//   padding: '6px 10px',
//   maxWidth: '184px',

//   '&:disabled': {
//     background: 'rgba(56, 100, 255, 0.16)',
//     color: '#fff',
//   },

//   '&:hover': {
//     background: '#1239C4',
//     color: '#fff',
//     outline: 'none',
//     boxShadow: 'none',
//   },
// }));

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

// const ButtonClaimAll = styled(Button)<ButtonProps>(() => ({
//   fontFamily: 'Poppins',
//   fontStyle: 'normal',
//   fontWeight: '500',
//   fontSize: '14px',
//   lineHeight: '21px',
//   textAlign: 'center',
//   background: '#3864FF',
//   color: '#fff',
//   textTransform: 'capitalize',
//   height: '34px',
//   borderRadius: '10px',
//   boxShadow: 'none',
//   padding: '6px 10px',
//   maxWidth: '184px',

//   '&:disabled': {
//     background: 'rgba(56, 100, 255, 0.16)',
//     color: '#fff',
//   },

//   '&:hover': {
//     background: '#1239C4',
//     color: '#fff',
//     outline: 'none',
//     boxShadow: 'none',
//   },
// }));

// const SelectBox = styled(Checkbox)<CheckboxProps>(() => ({}));

const TableMyStake: React.FC<Props> = ({ onClaim, onUnstake, data }) => {
  const theme = useTheme();
  const { account } = useWeb3React();
  const [records, setRecords] = useState(data.filter((item) => item.stakeDate !== '0').slice(0, 5));
  const [pagination, setPagination] = useState({
    limit: 5,
    index: 0,
  });
  // const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // const handleSelectStakingTableRow = (checked: boolean, index: string) => {
  //   const rowIndexes = selectedRows.filter((item) => item === String(index));
  //   if (rowIndexes.length > 0) {
  //     if (!checked) {
  //       setSelectedRows(removeArrayItemByValue<string>(selectedRows, String(index)));
  //     }
  //   } else {
  //     if (checked) {
  //       const newSelectedRows = [...selectedRows, String(index)];
  //       setSelectedRows(newSelectedRows);
  //     }
  //   }
  // };

  useEffect(() => {}, [pagination]);

  const handleChangePage = (value: number) => {
    const values = data.slice((value - 1) * pagination.limit, value * pagination.limit);
    setRecords(values);
    setPagination({
      ...pagination,
      index: value - 1,
    });
  };

  useEffect(() => {
    if (account) {
      setRecords(data.filter((item) => item.stakeDate !== '0').slice(0, 5));
    } else {
      setRecords([]);
    }
  }, [account, data]);

  return (
    <Wrapper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCellHeader align="left">stake date</TableCellHeader>
              <TableCellHeader align="center">stake amount</TableCellHeader>
              <TableCellHeader align="center">staking time</TableCellHeader>
              <TableCellHeader align="center">rewards 0xB</TableCellHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((item, i: number) => (
              <TableRow key={i}>
                <TableCellBody align="left">{moment.unix(Number(item.stakeDate)).format('MMM DD YYYY')}</TableCellBody>
                <TableCellBody align="center">
                  {formatForNumberLessThanCondition({
                    value: item.stakedAmount,
                    addLessThanSymbol: true,
                    minValueCondition: '0.000001',
                    callback: formatPercent,
                    callBackParams: [6],
                  })}
                </TableCellBody>
                <TableCellBody align="center">{`${item.stakingTime} days`}</TableCellBody>
                <TableCellBody align="center">
                  {formatForNumberLessThanCondition({
                    value: item.reward,
                    addLessThanSymbol: true,
                    minValueCondition: '0.000001',
                    callback: formatPercent,
                    callBackParams: [6],
                  })}
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
                  <ButtonStake
                    variant="outlined"
                    onClick={() => {
                      onUnstake(item.id);
                    }}
                  >
                    Unstake
                  </ButtonStake>
                  <ButtonClaim
                    variant="contained"
                    onClick={() => {
                      onClaim(item.id);
                    }}
                  >
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
