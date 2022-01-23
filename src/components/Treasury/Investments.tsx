import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps, Paper, PaperProps } from '@mui/material';

import TableTokens from 'components/Base/TableTokens';

import BitcoinCoin from 'assets/images/coin-bitcoin.svg';

const data = [
  {
    icon: BitcoinCoin,
    name: 'Bitcoin',
    amount: 23,
    value: 22234,
  },
];

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  color: '#828282',
  marginBottom: '30px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    fontSize: '24px',
    lineHeight: '36px',
    color: '#293247',
  },
}));

const PaperContent = styled(Paper)<PaperProps>(({ theme }) => ({
  background: ' #FFFFFF',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  borderRadius: '22px',
  padding: '17px 25px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('lg')]: {
    padding: '14px 18px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '18px',
  },
}));

const Detail = styled(Box)<BoxProps>(({ theme }) => ({
  background: '#F9F9FB',
  borderRadius: '11px',
  padding: '13px 8px',

  [theme.breakpoints.down('lg')]: {
    padding: '10px 6px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px 3px',
  },
}));

const TextNoData = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '23px',
  textAlign: 'center',
  color: '#4F4F4F',
  width: '100%',
  height: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '92px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '18px',
    lineHeight: '22px',
    minHeight: '60px',
  },
}));

const Investments: React.FC<Props> = () => {
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowData(true);
    }, 3000);
  }, []);

  return (
    <Wrapper>
      <Title>Investments</Title>

      <PaperContent>
        {showData ? (
          <Grid container spacing={{ xs: '12px', md: '24px', lg: '42px' }}>
            <Grid item xs={12} sm={4}>
              <Detail>
                <TableTokens data={data} />
              </Detail>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Detail>
                <TableTokens data={data} />
              </Detail>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Detail>
                <TableTokens data={data} />
              </Detail>
            </Grid>
          </Grid>
        ) : (
          <TextNoData>No investments yet!</TextNoData>
        )}
      </PaperContent>
    </Wrapper>
  );
};

export default Investments;
