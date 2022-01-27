import React from 'react';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

interface Props {
  id?: string;
  title?: string;
  color: string;
  data: Array<any>;
}

const AreaChartCustom: React.FC<Props> = ({ id, data, color }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer>
      <ComposedChart width={732} height={540} data={data}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          tickLine={false}
          axisLine={false}
          fontSize="10px"
          fontFamily="Poppins"
          color={theme.palette.mode === 'light' ? '#000000' : '#4F4F4F'}
          dataKey="time"
          tickFormatter={(timestamp) => moment(new Date(timestamp * 1000)).format('MMM D')}
        />
        <YAxis
          axisLine={false}
          // interval={9}
          tickLine={false}
          color={theme.palette.mode === 'light' ? '#000000' : '#4F4F4F'}
          fontSize="10px"
          fontFamily="Poppins"
          tickFormatter={(value) => `${Math.floor(value / 10e2)}`}
          orientation="left"
        />
        <Tooltip />

        <Area type="monotone" dataKey="close" stroke="#3864FF" strokeWidth={2} fillOpacity={1} fill={`url(#${id})`} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AreaChartCustom;
