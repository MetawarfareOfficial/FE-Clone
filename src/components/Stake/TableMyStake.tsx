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
  Checkbox,
  CheckboxProps,
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

import { UnStakeAllModal, UnStakeModal } from './index';

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

const ButtonSelectAll = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  textAlign: 'center',
  color: '#3864FF',
  textTransform: 'capitalize',
  border: '1px solid #3864FF',
  height: '34px',
  width: '100%',
  maxWidth: '190px',
  borderRadius: '10px',

  '&:hover': {
    background: '#3864FF',
    borderColor: '#3864FF',
    color: '#fff',
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
  width: 'auto',
  minWidth: '80px',
  borderRadius: '10px',
  padding: '5px 9px',

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
  width: 'auto',
  minWidth: '80px',
  borderRadius: '10px',
  boxShadow: 'none',
  padding: '5px 11px',
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
  // textTransform: 'uppercase',
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

const CheckboxCustom = styled(Checkbox)<CheckboxProps>(() => ({
  padding: 0,
  float: 'right',
  marginRight: '-30px',
  width: '23px',
  height: '23px',

  '.MuiSvgIcon-root': {
    color: '#B8B8B8',
  },
}));

const RewardsFlex = styled(Box)<BoxProps>(() => ({
  width: '100%',
  position: 'relative',

  '.Mui-checked': {
    '.MuiSvgIcon-root': {
      color: '#3864FF',
    },
  },
}));

const ViewHelp = styled(Box)<BoxProps>(() => ({
  float: 'right',
  marginRight: '-60px',
}));

const TableMyStake: React.FC<Props> = ({ onClaim, data }) => {
  const tableData = data.filter((item) => item.stakeDate !== '0');
  const theme = useTheme();
  const { account } = useWeb3React();
  const [records, setRecords] = useState(data.filter((item) => item.stakeDate !== '0').slice(0, 5));
  const [pagination, setPagination] = useState({
    limit: 5,
    index: 0,
  });
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [openUnStakeAll, setOpenUnStakeAll] = useState<boolean>(false);
  const [openUnStake, setOpenUnStake] = useState(false);

  const handleToggleUnStake = () => {
    setOpenUnStake(!openUnStake);
  };

  const handleToggleUnStakeAll = () => {
    setOpenUnStakeAll(!openUnStakeAll);
  };

  const handleSelectRow = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
    }

    setSelectedRows(newSelected);
  };

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

  const handleSelectAllClick = () => {
    const newSelecteds = tableData.map((n) => n.id);
    setSelectedRows(newSelecteds);
  };

  const handleUnStake = () => {
    if (selectedRows.length === tableData.length) {
      handleToggleUnStakeAll();
    } else {
      handleToggleUnStake();
    }
  };

  const isSelected = (index: number) => selectedRows.indexOf(index) !== -1;

  return (
    <Wrapper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCellHeader align="left">stake date</TableCellHeader>
              <TableCellHeader align="center">stake amount</TableCellHeader>
              <TableCellHeader align="center">staked time</TableCellHeader>
              <TableCellHeader align="center">rewards 0xB</TableCellHeader>
              <TableCellHeader align="right">
                {selectedRows.length > 0 ? (
                  <Box>
                    <ButtonStake
                      variant="outlined"
                      onClick={() => {
                        setSelectedRows([]);
                      }}
                      style={{ width: '99px', marginRight: '16px', marginLeft: '-90px' }}
                    >
                      Deselect
                    </ButtonStake>
                    <ButtonStake variant="outlined" onClick={handleUnStake}>
                      Unstake {selectedRows.length === tableData.length && 'All'}
                    </ButtonStake>
                    <ButtonClaim variant="contained">
                      Claim {selectedRows.length === tableData.length && 'All'}
                    </ButtonClaim>
                  </Box>
                ) : (
                  <ButtonSelectAll variant="outlined" fullWidth onClick={handleSelectAllClick}>
                    Select All
                  </ButtonSelectAll>
                )}
              </TableCellHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((item: any, i: number) => {
              const isItemSelected = isSelected(item.id);

              return (
                <TableRow key={i} selected={isItemSelected}>
                  <TableCellBody align="left">
                    {moment.unix(Number(item.stakeDate)).format('MMM DD YYYY')}
                  </TableCellBody>
                  <TableCellBody align="center">
                    {formatForNumberLessThanCondition({
                      value: item.stakedAmount,
                      addLessThanSymbol: true,
                      minValueCondition: '0.000001',
                      callback: formatPercent,
                      callBackParams: [6],
                    })}
                  </TableCellBody>
                  <TableCellBody align="center">{`${item.stakingTime} Days`}</TableCellBody>
                  <TableCellBody align="center">
                    <RewardsFlex>
                      {formatForNumberLessThanCondition({
                        value: item.reward,
                        addLessThanSymbol: true,
                        minValueCondition: '0.000001',
                        callback: formatPercent,
                        callBackParams: [6],
                      })}

                      <CheckboxCustom
                        color="primary"
                        onChange={(event) => handleSelectRow(event, item.id)}
                        // checked={isSelected(item.id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': `enhanced-table-checkbox-${i}`,
                        }}
                      />

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
                          <ViewHelp>
                            <WarnIcon width={16} />
                          </ViewHelp>
                        ) : (
                          <ViewHelp>
                            <WarnDarkIcon width={16} />
                          </ViewHelp>
                        )}
                      </TooltipCustom>
                    </RewardsFlex>
                  </TableCellBody>

                  <TableCellBody align="right">
                    <ButtonStake
                      variant="outlined"
                      onClick={handleToggleUnStake}
                      // onClick={() => {
                      //   onUnstake(item.id);
                      // }}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {data.length > pagination.limit && (
        <ViewPagination>
          <PaginationCustom
            total={data.length}
            limit={pagination.limit}
            page={pagination.index + 1}
            onChange={handleChangePage}
          />{' '}
        </ViewPagination>
      )}

      <UnStakeAllModal open={openUnStakeAll} onClose={handleToggleUnStakeAll} />
      <UnStakeModal open={openUnStake} onClose={handleToggleUnStake} />
    </Wrapper>
  );
};

export default TableMyStake;
