import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface Props {
  title?: string;
  color?: string;
  data?: Array<any>;
}

const dataTest = [
  {
    yValue: 15,
    xValue: 1,
  },
  // {
  //   yValue: 13.4,
  //   xValue: 4,
  // },
  {
    yValue: 10,
    xValue: 4,
  },
  {
    yValue: 8,
    xValue: 7,
  },
  {
    yValue: 4,
    xValue: 10,
  },
];

const LineChartCustom: React.FC<Props> = () => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={200} data={dataTest} className="lineReward">
        <XAxis
          // tick={{
          //   dx: 3,
          // }}
          dataKey="xValue"
          tickLine={false}
          axisLine={false}
          fontSize="9px"
          fontFamily="Roboto"
          color={theme.palette.mode === 'light' ? '#A4A9B7' : '#A4A9B7'}
        />
        <YAxis
          // tick={{
          //   dy: 0,
          // }}
          dataKey="yValue"
          tickLine={false}
          axisLine={false}
          fontSize="9px"
          fontFamily="Roboto"
          color={theme.palette.mode === 'light' ? '#A4A9B7' : '#4F4F4F'}
        />
        <Line
          type="step"
          dataKey="yValue"
          stroke={theme.palette.mode === 'light' ? '#3864FF' : '#3864FF'}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LineChartCustom);
