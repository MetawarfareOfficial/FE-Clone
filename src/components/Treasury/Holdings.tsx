import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';
import { dataHoldings } from './data';
import TableTokens from 'components/Base/TableTokens';
import SliderScroll from 'components/Base/SliderScroll';

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
    paddingLeft: '15px',
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
    color: '#293247',
  },
}));

const BoxDetail = styled(Box)<BoxProps>(({ theme }) => ({
  background: '#FFFFFF',
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  minHeight: '167px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.05)',

  [theme.breakpoints.down('lg')]: {
    minHeight: '140px',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '140px',
    width: 'auto',
    marginRight: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '140px',
    width: '265px',
    marginRight: '32px',
  },
}));

const BoxHeader = styled(Box)<BoxCustomProps>(({ color, theme }) => ({
  padding: '9px 26px',
  backgroundColor: color,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const scroll = (e: any) => {
    if (holdingRef === null) {
      return 0;
    } else {
      if (e.wheelDelta > 0) {
        holdingRef.current.slickPrev();
      } else {
        holdingRef.current.slickNext();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', scroll, true);

    return () => {
      window.removeEventListener('wheel', scroll, true);
    };
  }, []);

  return (
    <Wrapper>
      <Title>Holdings</Title>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={{ xs: '24px', lg: '32px' }}>
          {dataHoldings.map((item, i) => (
            <Grid item xs={3} sm={6} lg={3} key={i}>
              <BoxDetail>
                <BoxHeader color={item.color}>{item.title}</BoxHeader>

                <BoxContent>
                  <TableTokens fontSize="12px" data={data} />
                </BoxContent>
              </BoxDetail>
            </Grid>
          ))}
        </Grid>
      </Box>

      <SliderScroll elRef={holdingRef} settings={settings}>
        {dataHoldings.map((item, i) => (
          <Box key={i}>
            <BoxDetail>
              <BoxHeader color={item.color}>{item.title}</BoxHeader>

              <BoxContent>
                <TableTokens fontSize="12px" data={data} />
              </BoxContent>
            </BoxDetail>
          </Box>
        ))}
      </SliderScroll>
    </Wrapper>
  );
};

export default Holdings;
