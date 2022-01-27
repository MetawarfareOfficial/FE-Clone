import React from 'react';
import moment from 'moment';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { formatTimestamp } from 'helpers/formatTimestamp';
import { labelDate } from 'consts/dashboard';
import { formatBigNumber } from 'helpers/formatBigNumber';
import { convertCamelCaseToPascalCase } from 'helpers/convertCamelCaseToPascalCase';

interface Props {
  id?: string;
  title?: string;
  color: string;
  data: Array<any>;
  dataKey?: string;
}

const AreaChartCustom: React.FC<Props> = ({ id, data, color, dataKey = 'close' }) => {
  const MaxDataValue = Math.max(...data.map((item) => item[dataKey]));

  const getMaxYAxixValue = (MaxDataValue: number) => {
    return Math.round(MaxDataValue + MaxDataValue / 3);
  };

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
          color="#000000"
          dataKey="time"
          tickFormatter={(timestamp) => moment(timestamp).format('MMM D')}
        />
        <YAxis
          axisLine={false}
          domain={[0, getMaxYAxixValue(MaxDataValue)]}
          tickLine={false}
          fontSize="10px"
          fontFamily="Poppins"
          tickFormatter={(value) => `${formatBigNumber(Number(value))}`}
          orientation="left"
        />
        <Tooltip
          formatter={(value: string, name: string) => [
            formatBigNumber(Number(value)),
            convertCamelCaseToPascalCase(name),
          ]}
          labelFormatter={(value: string) => formatTimestamp(value, labelDate)}
        />
        <Area type="monotone" dataKey={dataKey} stroke="#3864FF" strokeWidth={2} fillOpacity={1} fill={`url(#${id})`} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AreaChartCustom;
