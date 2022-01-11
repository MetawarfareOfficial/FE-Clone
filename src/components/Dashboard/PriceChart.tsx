import * as React from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { Box, BoxProps, TypographyProps, Typography } from '@mui/material';
import { ComposedChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  title?: string;
  data: Array<any>;
}

const Title = styled(Typography)<TypographyProps>(() => ({
  color: '#293247',
  margin: ' 0 0 31px',
  fontSize: '24px',
  lineHeight: '36px',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
}));

const ViewChart = styled(Box)<BoxProps>(() => ({
  backgroundColor: '#fff',
  borderRadius: '26px',
  padding: '35px 30px',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
}));

const PriceChart: React.FC<Props> = ({ data }) => {
  return (
    <Box>
      <Title>Price Chart</Title>

      <ViewChart>
        {/* <ResponsiveContainer className="rechartGradient" width="100%" height="100%"> */}
        <ComposedChart width={732} height={520} data={data} margin={{ top: 25, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EFE5FE" stopOpacity={1} />
              <stop offset="100%" stopColor="#EFE5FE" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            tickLine={false}
            axisLine={false}
            fontSize="10px"
            color="#000000"
            dataKey="time"
            tickFormatter={(timestamp) => moment(new Date(timestamp * 1000)).format('DD/MMM')}
          />
          <YAxis
            axisLine={false}
            // interval={9}
            tickLine={false}
            fontSize="10px"
            tickFormatter={(value) => `${Math.floor(value / 10e2)}`}
            orientation="right"
          />
          <Tooltip />

          <Area type="monotone" dataKey="close" stroke="#3864FF" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
        </ComposedChart>
        {/* </ResponsiveContainer> */}
      </ViewChart>
    </Box>
  );
};

export default PriceChart;
