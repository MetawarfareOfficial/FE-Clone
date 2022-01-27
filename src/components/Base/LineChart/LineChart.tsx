import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
  title?: string;
  color: string;
  data: Array<any>;
}

const LineChartCustom: React.FC<Props> = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line type="step" dataKey="rewardRatio" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartCustom;
