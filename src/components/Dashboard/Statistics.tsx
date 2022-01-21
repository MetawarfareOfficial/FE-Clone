import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { statistic } from './data';
import SliderScroll from '../Base/SliderScroll/SliderScroll';

import { Box, Grid, Typography, Button, ButtonProps, BoxProps, TypographyProps } from '@mui/material';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '15px',
  },
}));

const CardBox = styled(Box)<BoxProps>(({ theme }) => ({
  background: 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)',
  borderRadius: '20px',
  textAlign: 'center',
  padding: '27px',
  boxSizing: 'border-box',
  maxHeight: '190px',
  boxShadow: '0px 66px 35px -48px rgba(25, 21, 48, 0.13)',

  [theme.breakpoints.down('lg')]: {
    padding: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '15px',
  },
}));

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // color: `#293247`,
  backgroundColor: `${theme.palette.secondary}`,
  padding: '12px',
  width: '176px',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'bold',
  textTransform: 'unset',
  boxShadow: '0px 13px 27px rgba(26, 38, 70, 0.09)',
  borderRadius: '14px',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    width: '145px',
    padding: '10px',
    fontSize: '13px',
    lineHeight: '19px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: `#FFFFFF`,
  fontFamily: 'Roboto',
  margin: '15px 0',
  fontSize: '32px',
  lineHeight: '37px',
  fontWeight: 'bold',

  [theme.breakpoints.down('lg')]: {
    fontSize: '28px',
    lineHeight: '31px',
  },
}));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: `rgba(255, 255, 255, 0.54)`,
  margin: '0 0',
  fontSize: '18px',
  lineHeight: '27px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '22px',
  },
}));

const SliderItem = styled(Box)<BoxProps>(() => ({}));

const Statistics: React.FC<Props> = () => {
  const statsRef = useRef<any>(null);

  const settings = {
    className: 'slider variable-width',
    dots: false,
    arrows: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 300,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const scroll = (e: any) => {
    if (statsRef === null) {
      return 0;
    } else {
      if (e.wheelDelta > 0) {
        statsRef.current.slickPrev();
      } else {
        statsRef.current.slickNext();
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
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid container spacing={{ sm: '24px', md: '30px' }}>
          {statistic.map((item, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <CardBox>
                <Text variant="h5">{item.title}</Text>
                <Title variant="h2">{item.value}</Title>
                <CustomButton variant="contained" color="secondary">
                  Buy now
                </CustomButton>
              </CardBox>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <SliderScroll elRef={statsRef} settings={settings}>
          {statistic.map((item, i) => (
            <SliderItem key={i}>
              <CardBox>
                <Text variant="h5">{item.title}</Text>
                <Title variant="h2">{item.value}</Title>
                <CustomButton variant="contained" color="secondary">
                  Buy now
                </CustomButton>
              </CardBox>
            </SliderItem>
          ))}
        </SliderScroll>
      </Box>
    </Wrapper>
  );
};

export default Statistics;
