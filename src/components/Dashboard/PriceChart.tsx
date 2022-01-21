import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useWindowSize } from 'hooks/useWindowSize';
import moment from 'moment';
import { Box, BoxProps, TypographyProps, Typography } from '@mui/material';
import { ComposedChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  title?: string;
  heightTotal: number;
  data: Array<any>;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    padding: '0 15px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#293247',
  margin: ' 0 0 31px',
  fontSize: '24px',
  lineHeight: '36px',
  fontWeight: 'bold',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '19px',
    lineHeight: '32px',
    margin: '0 0 20px',
  },
}));

const ViewChart = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '26px',
  padding: '35px 0 20px 30px',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  minHeight: '500px',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',

  [theme.breakpoints.down('lg')]: {
    minHeight: '300px',
  },
}));

const PriceChart: React.FC<Props> = ({ data, heightTotal }) => {
  const [width] = useWindowSize();
  const [heightChart, setHeightChart] = useState(500);

  useEffect(() => {
    if (heightTotal) {
      const newHeight = heightTotal - 85;
      setHeightChart(newHeight);
    }
  }, [heightTotal]);

  return (
    <Wrapper>
      <Title>Price Chart</Title>

      <ViewChart>
        <div style={{ width: '100%', height: width > 600 ? (heightChart > 300 ? heightChart : '500px') : '320px' }}>
          <ResponsiveContainer>
            <ComposedChart width={732} height={400} data={data}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="40%" stopColor="#EFE5FE" stopOpacity={1} />
                  <stop offset="100%" stopColor="#EFE5FE" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                tickLine={false}
                axisLine={false}
                fontSize="10px"
                fontFamily="Helvetica"
                color="#000000"
                dataKey="time"
                tickFormatter={(timestamp) => moment(new Date(timestamp * 1000)).format('DD/MMM')}
              />
              <YAxis
                axisLine={false}
                // interval={9}
                tickLine={false}
                fontSize="10px"
                fontFamily="Helvetica"
                tickFormatter={(value) => `${Math.floor(value / 10e2)}`}
                orientation="right"
              />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="close"
                stroke="#3864FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ViewChart>
    </Wrapper>
  );
};

export default PriceChart;
