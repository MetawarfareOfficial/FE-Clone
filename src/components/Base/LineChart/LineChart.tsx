import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ComposedChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { uniq } from 'lodash';

interface Props {
  title?: string;
  color?: string;
  data?: Array<any>;
}

const LineChartCustom: React.FC<Props> = ({ data, color }) => {
  const theme = useTheme();

  const yAxisData = data?.map((i) => i.rewardRatio);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={300} height={200} data={data} className="lineReward">
        <defs>
          <linearGradient id="shadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.mode === 'light' ? `#EFE5FE` : '#29445C'} stopOpacity={0.8} />
            <stop offset="100%" stopColor={theme.palette.mode === 'light' ? `#EFE5FE` : '#29445C'} stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="month"
          type={'number'}
          tickLine={false}
          axisLine={false}
          fontSize="9px"
          fontFamily="Roboto"
          color={theme.palette.mode === 'light' ? '#A4A9B7' : '#A4A9B7'}
          tickFormatter={(value, index) => {
            if (index >= 4) return ``;
            return `${Number(value) + 1}`;
          }}
        />
        <YAxis
          dataKey="rewardRatio"
          type={'number'}
          tickLine={false}
          axisLine={false}
          fontSize="9px"
          fontFamily="Roboto"
          color={theme.palette.mode === 'light' ? '#A4A9B7' : '#4F4F4F'}
          ticks={uniq(yAxisData)}
          domain={yAxisData ? yAxisData[0] : 0}
          interval={0}
        />
        <Area
          type="step"
          dataKey="rewardRatio"
          stroke={color}
          strokeWidth={3}
          dot={false}
          fillOpacity={1}
          fill={'url(#shadow)'}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LineChartCustom);
