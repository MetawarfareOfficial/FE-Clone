import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';

import { Box, BoxProps, Typography, TypographyProps, Grid } from '@mui/material';

import SliderScroll from 'components/Base/SliderScroll';

interface Props {
  title?: string;
}

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '44px',
  color: '#293247',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
  margin: '0 0 41px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '21px',
    lineHeight: '31px',
    maxWidth: '249px',
    margin: '0 auto 21px',
  },
}));

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  marginTop: '35px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
  },
}));

const BoxSale = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '22px',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  height: '100%',
  minHeight: '123px',

  [theme.breakpoints.down('lg')]: {
    padding: '16px 24px',
    minHeight: '100px',
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '30px',
    maxWidth: '265px',
  },
}));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'normal',
  color: '#293247',
  fontFamily: 'Poppins',
  maxWidth: '186px',

  span: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const Sale = styled(Box)<BoxProps>(({ theme }) => ({
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

  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '20px',
    width: '46px',
    height: '46px',
    top: '-22px',
    left: '-12px',
  },
}));

const SliderItem = styled(Box)<BoxProps>(() => ({
  paddingTop: '23px',
  paddingLeft: '13px',
}));

const Tokens: React.FC<Props> = () => {
  const holdingRef = useRef<any>(null);

  const settings = {
    className: 'slider variable-width',
    dots: false,
    arrows: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 300,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          className: 'slider variable-width',
          dots: false,
          arrows: false,
          infinite: false,
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: true,
          speed: 300,
        },
      },
      {
        breakpoint: 769,
        settings: {
          className: 'slider variable-width',
          dots: false,
          arrows: false,
          infinite: false,
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
          speed: 300,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Title>Minted Contract Tokens Distribution</Title>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>10%</Sale>
              <Text>
                <span>Token</span> in Development/ Marketing Funds Wallet (100% USDC)
              </Text>
            </BoxSale>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>20%</Sale>
              <Text>
                <span>Token</span> in Liquidity Pool as 50% 0xB and 50% AVAX
              </Text>
            </BoxSale>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>30%</Sale>
              <Text>
                <span>Token</span> in Treasury Wallet as 100% USDC
              </Text>
            </BoxSale>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>50%</Sale>
              <Text>
                <span>Token</span> in Rewards Wallet as 100% 0xB
              </Text>
            </BoxSale>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <SliderScroll elRef={holdingRef} settings={settings}>
          <SliderItem>
            <BoxSale>
              <Sale>10%</Sale>
              <Text>
                <span>Token</span> in Development/ Marketing Funds Wallet (100% USDC)
              </Text>
            </BoxSale>
          </SliderItem>
          <SliderItem>
            <BoxSale>
              <Sale>20%</Sale>
              <Text>
                <span>Token</span> in Liquidity Pool as 50% 0xB and 50% AVAX
              </Text>
            </BoxSale>
          </SliderItem>
          <SliderItem>
            <BoxSale>
              <Sale>30%</Sale>
              <Text>
                <span>Token</span> in Treasury Wallet as 100% USDC
              </Text>
            </BoxSale>
          </SliderItem>
          <SliderItem>
            <BoxSale>
              <Sale>50%</Sale>
              <Text>
                <span>Token</span> in Rewards Wallet as 100% 0xB
              </Text>
            </BoxSale>
          </SliderItem>
        </SliderScroll>
      </Box>
    </Wrapper>
  );
};

export default Tokens;
