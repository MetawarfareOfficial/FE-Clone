import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Grid } from '@mui/material';

import ChartDetail from './ChartDetail';

interface Props {
  data: Array<any>;
}

interface CardHeaderProps extends BoxProps {
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  paddingBottom: '38px',
}));

const CardItem = styled(Box)<BoxProps>(() => ({
  width: '100%',
  background: '#FFFFFF',
  boxShadow: '0px 20px 45px #F0EDF7',
  borderRadius: '10px',
  padding: '30px 20px',
  boxSizing: 'border-box',
  minHeight: '388px',
}));

const CardHeader = styled(Box)<CardHeaderProps>(({ color }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',

  h5: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'capitalize',
    color: '#5A5881',
    margin: 0,
  },

  h6: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'capitalize',
    color: '#5A5881',
    paddingLeft: '15px',
    margin: '0 0 0 auto',

    '&:before': {
      content: '""',
      width: '9px',
      height: '9px',
      display: 'inline-block',
      borderRadius: '50%',
      background: color,
      marginRight: '6px',
    },
  },
}));

const CardContent = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const StatisticCharts: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Grid container spacing={'26px'}>
        {data.map((item, i) => (
          <Grid item md={4} key={i}>
            <CardItem>
              <CardHeader color={item.color}>
                <h5>{item.title}</h5>
                <h6>{item.label}</h6>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: '287px' }}>
                  <ChartDetail data={item.chartData} color={item.color} id={`chartView${i}`} />
                </div>
              </CardContent>
            </CardItem>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default StatisticCharts;
