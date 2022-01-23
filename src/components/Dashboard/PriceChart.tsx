import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useWindowSize } from 'hooks/useWindowSize';
// import moment from 'moment';
import { Box, BoxProps, TypographyProps, Typography } from '@mui/material';
import { ComposedChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { labelDate, tickFormatDate, tickFormatInterval } from 'consts/dashboard';
import { formatPrice } from 'helpers/formatPrice';
import { formatTimestamp } from 'helpers/formatTimestamp';

interface Props {
  title?: string;
  heightTotal: number;
  data: Array<any>;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    lineHeight: '36px',
    margin: '0 0 31px',
    textAlign: 'center',
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
  [theme.breakpoints.down('sm')]: {
    minHeight: '100px',
    padding: '20px 0 10px 10px',
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
        <div
          style={{
            width: width < 480 ? 'calc(100% + 30px)' : '100%',
            height: width > 600 ? (heightChart > 300 ? heightChart : '500px') : width < 480 ? '200px' : '320px',
          }}
        >
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
                tickFormatter={(timestamp) => formatTimestamp(timestamp, tickFormatDate)}
                interval={heightTotal < 600 ? 6 : tickFormatInterval}
                padding={{ left: 15 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize="10px"
                fontFamily="Helvetica"
                orientation="right"
                dataKey="price"
              />

              <Tooltip
                formatter={(value: string) => formatPrice(value)}
                labelFormatter={(value: string) => formatTimestamp(value, labelDate)}
              />

              <Area
                type="monotone"
                dataKey="price"
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
