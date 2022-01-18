import React from 'react';
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

const Title = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  color: '#828282',
  marginBottom: '30px',
}));

const PaperContent = styled(Paper)<PaperProps>(() => ({
  background: ' #FFFFFF',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  borderRadius: '22px',
  padding: '17px 25px',
  boxSizing: 'border-box',
}));

const Detail = styled(Box)<BoxProps>(() => ({
  background: '#F9F9FB',
  borderRadius: '11px',
  padding: '13px 8px',
}));

const Investments: React.FC<Props> = () => {
  return (
    <Box>
      <Title>Investments</Title>

      <PaperContent>
        <Grid container spacing={'42px'}>
          <Grid item xs={12} md={4}>
            <Detail>
              <TableTokens data={data} />
            </Detail>
          </Grid>
          <Grid item xs={12} md={4}>
            <Detail>
              <TableTokens data={data} />
            </Detail>
          </Grid>
          <Grid item xs={12} md={4}>
            <Detail>
              <TableTokens data={data} />
            </Detail>
          </Grid>
        </Grid>
      </PaperContent>
    </Box>
  );
};

export default Investments;
