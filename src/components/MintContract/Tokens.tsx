import React from 'react';
import { styled } from '@mui/material/styles';

import { Box, BoxProps, Typography, TypographyProps, Grid } from '@mui/material';

interface Props {
  title?: string;
}

const Title = styled(Typography)<TypographyProps>(() => ({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '44px',
  color: '#293247',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
  margin: '0 0 41px',
}));

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginTop: '35px',
}));

const BoxSale = styled(Box)<BoxProps>(() => ({
  position: 'relative',
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '22px',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  height: '100%',
  minHeight: '123px',
}));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'normal',
  color: '#293247',
  fontFamily: 'Poppins',

  span: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));

const Sale = styled(Box)<BoxProps>(() => ({
  position: 'absolute',
  top: '-25px',
  left: '-18px',
  zIndex: '2',
  width: '57px',
  height: '57px',
  borderRadius: '15px',
  boxShadow: '0px 14px 26px -2px rgba(0, 0, 0, 0.14)',
  background: 'linear-gradient(112.15deg, #A5C7FB -10.8%, #C0CAFF 107.36%)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '27px',
  textTransform: 'uppercase',
  color: '#fff',
}));

const Tokens: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Title>Minted Contract Tokens Distribution</Title>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <BoxSale>
            <Sale>10%</Sale>
            <Text>
              <span>Token</span> in Development/ Marketing Funds Wallet (100% USDC)
            </Text>
          </BoxSale>
        </Grid>
        <Grid item md={3}>
          <BoxSale>
            <Sale>20%</Sale>
            <Text>
              <span>Token</span> in Liquidity Pool (50% 0xB, 50% AVAX)
            </Text>
          </BoxSale>
        </Grid>
        <Grid item md={3}>
          <BoxSale>
            <Sale>30%</Sale>
            <Text>
              <span>Token</span> in Treasury Wallet (100% USDC)
            </Text>
          </BoxSale>
        </Grid>
        <Grid item md={3}>
          <BoxSale>
            <Sale>50%</Sale>
            <Text>
              <span>Token</span> in Rewards Wallet (100% 0xB)
            </Text>
          </BoxSale>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Tokens;
