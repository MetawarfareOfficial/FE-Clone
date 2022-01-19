import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';

import TableTokens from 'components/Base/TableTokens';

import USDCoin from 'assets/images/coin-usd.svg';
import USD1Coin from 'assets/images/coin-usd.svg';

const data = [
  {
    icon: USD1Coin,
    name: 'USDC',
    amount: 23,
    value: 22234,
  },
  {
    icon: USDCoin,
    name: 'USDC',
    amount: 23,
    value: 22234,
  },
];

interface Props {
  title?: string;
}

interface BoxCustomProps {
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  marginBottom: '34px',
  marginTop: '36px',
}));

const Title = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  color: '#828282',
  marginBottom: '30px',
}));

const BoxDetail = styled(Box)<BoxProps>(() => ({
  background: '#FFFFFF',
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  minHeight: '167px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.05)',
}));

const BoxHeader = styled(Box)<BoxCustomProps>(({ color }) => ({
  padding: '9px 26px',
  backgroundColor: color,
  fontFamily: 'Poppins',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#11151D',
}));

const BoxContent = styled(Box)<BoxProps>(() => ({
  padding: '4px 8px',
}));

const Holdings: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Title>Holdings</Title>

      <Grid container spacing={'32px'}>
        <Grid item xs={12} md={3}>
          <BoxDetail>
            <BoxHeader color="#DBECFD">Treasury Wallet</BoxHeader>

            <BoxContent>
              <TableTokens fontSize="12px" data={data} />
            </BoxContent>
          </BoxDetail>
        </Grid>

        <Grid item xs={12} md={3}>
          <BoxDetail>
            <BoxHeader color="#E5E5FE">Liquidity Wallet</BoxHeader>

            <BoxContent>
              <TableTokens data={data} />
            </BoxContent>
          </BoxDetail>
        </Grid>

        <Grid item xs={12} md={3}>
          <BoxDetail>
            <BoxHeader color="#D2FFDB">Rewards Wallet</BoxHeader>

            <BoxContent>
              <TableTokens data={data} />
            </BoxContent>
          </BoxDetail>
        </Grid>

        <Grid item xs={12} md={3}>
          <BoxDetail>
            <BoxHeader color="#DBECFD">Dev/Marketing Wallet</BoxHeader>

            <BoxContent>
              <TableTokens data={data} />
            </BoxContent>
          </BoxDetail>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Holdings;
