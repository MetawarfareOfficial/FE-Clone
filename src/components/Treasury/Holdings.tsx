import React from 'react';
import 'styles/menus.css';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';
import { dataHoldings } from './data';
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

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: '34px',
  marginTop: '36px',

  [theme.breakpoints.down('sm')]: {
    margin: '44px 0',
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
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
    marginBottom: '36px',
    fontSize: '24px',
    lineHeight: '36px',
    color: theme.palette.mode === 'light' ? '#293247' : '#828282',
  },
}));

const BoxDetail = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.03)',
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  minHeight: '167px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.05)',

  [theme.breakpoints.up('xl')]: {
    minHeight: '200px',
  },
  [theme.breakpoints.down('lg')]: {
    minHeight: '140px',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '140px',
    width: 'auto',
    marginRight: '0',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '140px',
    width: '265px',
    marginRight: '32px',
  },
}));

const BoxHeader = styled(Box)<BoxCustomProps>(({ color, theme }) => ({
  padding: '9px 26px',
  background: color,
  fontFamily: 'Poppins',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#11151D',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '24px',
    padding: '8px 20px',
  },
}));

const BoxContent = styled(Box)<BoxProps>(() => ({
  padding: '4px 8px',
}));

const Holdings: React.FC<Props> = () => {
  const theme = useTheme();

  return (
    <Wrapper>
      <Title>Holdings</Title>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid container spacing={{ xs: '24px', lg: '32px' }}>
          {dataHoldings.map((item, i) => (
            <Grid item xs={6} sm={6} lg={3} key={i}>
              <BoxDetail>
                <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>{item.title}</BoxHeader>

                <BoxContent>
                  <TableTokens fontSize="12px" data={data} />
                </BoxContent>
              </BoxDetail>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <div className="scroll-area scroll-area--horizontal">
          <div className="scroll-area__body">
            {dataHoldings.map((item, i) => (
              <div key={i} className={`scroll-area__column item${i + 1}`}>
                <BoxDetail>
                  <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>
                    {item.title}
                  </BoxHeader>

                  <BoxContent>
                    <TableTokens fontSize="12px" data={data} />
                  </BoxContent>
                </BoxDetail>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

export default Holdings;
