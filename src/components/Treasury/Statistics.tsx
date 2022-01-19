import React from 'react';
import { styled } from '@mui/material/styles';
import { rechartLineData } from 'components/Dashboard/data';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';

import AreaChartCustom from 'components/Base/AreaChart';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  marginTop: '79px',
}));

const BoxDetail = styled(Box)<BoxProps>(() => ({
  background: 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%), #FFFFFF',
  boxShadow: '0px 66px 35px -48px rgba(25, 21, 48, 0.13)',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  padding: '2px',
  height: '190px',
  boxSizing: 'border-box',
}));

const BoxTitle = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '37px',
  color: '#FFFFFF',
}));

const BoxText = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '21px',
  textTransform: 'uppercase',
  color: '#C5D9FF',
  maxWidth: '163px',
  marginBottom: '15px',
}));

const BoxLeft = styled(Box)<BoxProps>(() => ({
  width: 'calc(100% - 290px)',
  padding: '30px',
  boxSizing: 'border-box',
}));

const BoxRight = styled(Box)<BoxProps>(() => ({
  width: '290px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 26px rgba(0, 0, 0, 0.12)',
  borderRadius: '17px',
  padding: '10px 28px 10px 5px',
  boxSizing: 'border-box',
}));

const Statistics: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Grid container spacing={'39px'}>
        <Grid item xs={12} md={6}>
          <BoxDetail>
            <BoxLeft>
              <BoxText>Circulation Supply / Total Supply</BoxText>
              <BoxTitle>20.3K / 1.0M</BoxTitle>
            </BoxLeft>
            <BoxRight>
              <div
                style={{
                  width: '120%',
                  height: '181px',
                  minHeight: '100%',
                  marginLeft: '-35px',
                  marginBottom: '-15px',
                }}
              >
                <AreaChartCustom id="colorUv" color="#E5F5FE" data={rechartLineData} />
              </div>
            </BoxRight>
          </BoxDetail>
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxDetail>
            <BoxLeft>
              <BoxText>Market Cap</BoxText>
              <BoxTitle>1.3 Million</BoxTitle>
            </BoxLeft>
            <BoxRight>
              <div
                style={{
                  width: '120%',
                  height: '181px',
                  minHeight: '100%',
                  marginLeft: '-35px',
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
