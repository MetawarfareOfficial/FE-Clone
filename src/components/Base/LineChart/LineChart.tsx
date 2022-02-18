import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface Props {
  title?: string;
  color?: string;
  data?: Array<any>;
}

const LineChartCustom: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  const xAxisData = data?.map((i) => i.rewardRatio);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={200} data={data} className="lineReward">
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          fontSize="9px"
          fontFamily="Roboto"
          color={theme.palette.mode === 'light' ? '#A4A9B7' : '#A4A9B7'}
        />
        <YAxis
          dataKey="rewardRatio"
          type={'number'}
          tickLine={false}
          axisLine={false}
          fontSize="9px"
          fontFamily="Roboto"
          color={theme.palette.mode === 'light' ? '#A4A9B7' : '#4F4F4F'}
          ticks={xAxisData}
          domain={xAxisData ? xAxisData[0] : 0}
          interval={0}
        />
        <Line
          type="step"
          dataKey="rewardRatio"
          stroke={theme.palette.mode === 'light' ? '#3864FF' : '#3864FF'}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LineChartCustom);
