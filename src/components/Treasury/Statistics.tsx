import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { rechartLineData } from 'components/Dashboard/data';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';
import { useWindowSize } from 'hooks/useWindowSize';
import AreaChartCustom from 'components/Base/AreaChart';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: '79px',

  [theme.breakpoints.down('lg')]: {
    marginTop: '50px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 15px',
  },
}));

const BoxDetail = styled(Box)<BoxProps>(({ theme }) => ({
  background: 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%), #FFFFFF',
  boxShadow: '0px 66px 35px -48px rgba(25, 21, 48, 0.13)',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  padding: '2px',
  height: '190px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('lg')]: {
    height: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'inline-block',
    width: '100%',
    padding: '10px',
  },
}));

const BoxTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '37px',
  color: '#FFFFFF',

  [theme.breakpoints.down('lg')]: {
    fontSize: '26px',
    lineHeight: '34px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
    lineHeight: '37px',
  },
}));

const BoxText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '21px',
  textTransform: 'uppercase',
  color: '#C5D9FF',
  maxWidth: '163px',
  marginBottom: '15px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    margin: '0 auto 15px',
    fontSize: '14px',
    lineHeight: '21px',
  },
}));

const BoxLeft = styled(Box)<BoxProps>(({ theme }) => ({
  width: 'calc(100% - 290px)',
  padding: '30px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('lg')]: {
    width: '50%',
    padding: '20px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
    padding: '27px 20px 23px',
  },
}));

const BoxRight = styled(Box)<BoxProps>(({ theme }) => ({
  width: '290px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 26px rgba(0, 0, 0, 0.12)',
  borderRadius: '17px',
  padding: '10px 28px 10px 5px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('lg')]: {
    width: '50%',
    paddingRight: '15px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const Statistics: React.FC<Props> = () => {
  const [width] = useWindowSize();
  const [screenSize, setScreenSize] = useState(width);

  useEffect(() => {
    setScreenSize(width);
  }, [width]);

  return (
    <Wrapper>
      <Grid container spacing={{ xs: '20px', md: '24px', lg: '39px' }}>
        <Grid item xs={12} sm={6} md={6}>
          <BoxDetail>
            <BoxLeft>
              <BoxText>Circulation Supply / Total Supply</BoxText>
              <BoxTitle>20.3K / 1.0M</BoxTitle>
            </BoxLeft>
            <BoxRight>
              <div
                style={{
                  width: screenSize > 600 ? '120%' : '100%',
                  // height: { md: '140px', lg: '181px' },
                  height: screenSize > 899 ? '181px' : screenSize > 599 ? '140px' : '200px',
                  minHeight: '100%',
                  marginLeft: screenSize > 599 ? '-35px' : '-17px',
                  marginBottom: '-15px',
                }}
              >
                <AreaChartCustom id="colorUv" color="#E5F5FE" data={rechartLineData} />
              </div>
            </BoxRight>
          </BoxDetail>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <BoxDetail>
            <BoxLeft>
              <BoxText>Market Cap</BoxText>
              <BoxTitle>1.3 Million</BoxTitle>
            </BoxLeft>
            <BoxRight>
              <div
                style={{
                  width: screenSize > 600 ? '120%' : '100%',
                  // height: { md: '140px', lg: '181px' },
                  height: screenSize > 899 ? '181px' : screenSize > 599 ? '140px' : '200px',
                  minHeight: '100%',
                  marginLeft: screenSize > 599 ? '-35px' : '-17px',
                  marginBottom: '-15px',
                }}
              >
                <AreaChartCustom id="colorUv2" data={rechartLineData} color="#E5E8FE" />
              </div>
            </BoxRight>
          </BoxDetail>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Statistics;
