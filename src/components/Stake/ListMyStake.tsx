import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Button, ButtonProps, Grid } from '@mui/material';

import PaginationCustom from './Pagination';
import { ReactComponent as WarnIcon } from 'assets/images/ic-warn-circle.svg';

interface Props {
  onClaimAll: () => void;
  onClaim: (index: any) => void;
  onUnstake: (index: any) => void;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  background: '#FFFFFF',
  border: '1px solid rgba(41, 50, 71, 0.12)',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 30px rgba(56, 100, 255, 0.03)',
  borderRadius: '9px',
}));

const ButtonClaimAll = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '21px',
  lineHeight: '32px',
  textAlign: 'center',
  background: '#3864FF',
  color: '#fff',
  textTransform: 'capitalize',
  height: '51px',
  borderRadius: '15px',
  boxShadow: 'none',
  padding: '6px 10px',
  width: '206px',
  margin: '24px auto',
  display: 'block',

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
  fontSize: '21px',
  lineHeight: '32px',
  textAlign: 'center',
  color: '#3864FF',
  textTransform: 'capitalize',
  border: '1px solid #3864FF',
  height: '51px',
  width: '120px',
  borderRadius: '15px',

  '&:hover': {
    background: '#3864FF',
    borderColor: '#3864FF',
    color: '#fff',
  },
}));

const ButtonClaim = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '21px',
  lineHeight: '32px',
  textAlign: 'center',
  background: '#3864FF',
  color: '#fff',
  textTransform: 'capitalize',
  height: '51px',
  width: '120px',
  borderRadius: '15px',
  boxShadow: 'none',
  marginLeft: '36px',

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

const CardItem = styled(Box)<BoxProps>(() => ({
  width: '100%',
  borderBottom: '0.586653px solid rgba(41, 50, 71, 0.09)',
  padding: '40px',
  boxSizing: 'border-box',
  textAlign: 'center',
}));

const Detail = styled(Box)<BoxProps>(() => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: '40px',

  h4: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    color: 'rgba(41, 50, 71, 0.7)',
    margin: '0 auto 18px',
  },

  h3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.025em',
    color: '#293247',
    margin: '0',
  },
}));

const ViewPagination = styled(Box)<BoxProps>(() => ({
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  padding: '36px 0 47px',
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

const ListMyStake: React.FC<Props> = ({ onClaimAll, onClaim, onUnstake }) => {
  const data = dataTable();
  const [records, setRecords] = useState(data.slice(0, 5));
  const [pagination, setPagination] = useState({
    limit: 5,
    index: 0,
  });

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
      <ButtonClaimAll onClick={onClaimAll}>Claim All</ButtonClaimAll>

      {records.map((item: any, i: number) => (
        <CardItem key={i}>
          <Grid container spacing={'15px'}>
            <Grid item xs={6}>
              <Detail>
                <h4>stake date</h4>
                <h3>{item.date}</h3>
              </Detail>
            </Grid>
            <Grid item xs={6}>
              <Detail>
                <h4>stake amount</h4>
                <h3>{item.stake_amount}</h3>
              </Detail>
            </Grid>
            <Grid item xs={6}>
              <Detail>
                <h4>unstaked amount</h4>
                <h3>{item.unstake_amount}</h3>
              </Detail>
            </Grid>
            <Grid item xs={6}>
              <Detail>
                <h4>staking time</h4>
                <h3>{item.staking_time}</h3>
              </Detail>
            </Grid>
            <Grid item xs={6}>
              <Detail>
                <h4>rewards 0xB</h4>
                <h3>{item.staking_time}</h3>
              </Detail>
            </Grid>
            <Grid item xs={6}>
              <Detail>
                <h4>{''}</h4>
                <h3>
                  <WarnIcon />
                </h3>
              </Detail>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <ButtonStake variant="outlined" onClick={() => onUnstake(item.id)}>
                  Unstake
                </ButtonStake>
                <ButtonClaim variant="contained" onClick={() => onClaim(item.id)}>
                  Claim
                </ButtonClaim>
              </Box>
            </Grid>
          </Grid>
        </CardItem>
      ))}

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

export default ListMyStake;
