import React from 'react';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, ComposedChart, XAxis, Tooltip, Line } from 'recharts';

interface Props {
  id?: string;
  title?: string;
  color: string;
  data: Array<any>;
  dataKey?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: any;
  label?: string;
}

const TooltipCustom = styled(Box)<BoxProps>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  background: '#FFFFFF',
  boxShadow: '0px 12px 36px #FEF6F4',
  borderRadius: '7px',
  padding: '10px 16px',
  boxSizing: 'border-box',

  h3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'capitalize',
    color: 'rgba(21, 19, 75, 0.61)',
    margin: '0 12px 0 0',
    paddingRight: '12px',
    borderRight: '1px solid rgba(49, 47, 97, 0.12)',
  },

  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'capitalize',
    color: 'rgba(21, 19, 75, 0.88)',
    margin: 0,
  },
}));

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipCustom>
        <h3>{moment(label).format('MMM DD YYYY')}</h3>
        <p>{payload[0].value}</p>
      </TooltipCustom>
    );
  }

  return null;
};

const ChartDetail: React.FC<Props> = ({ id, data, color }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        // width={300}
        // height={200}
        data={data}
        className={`lineReward ${theme.palette.mode}ModeChart`}
        margin={{ top: 30, right: 0, left: 15, bottom: -12 }}
      >
        <defs>
          <filter id={`shadow${id}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feOffset in="blur" dx="0" dy="8" result="offsetBlur" />
            <feFlood floodColor={color} floodOpacity="1" result="offsetColor" />
            <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          fontSize="12px"
          fontFamily="'Poppins'"
          color={theme.palette.mode === 'light' ? '#A3ABBD' : '#FFFFFF'}
          tickFormatter={(time) => moment(time).format('YYYY')}
          interval={0}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          strokeLinecap="round"
          strokeWidth={2}
          filter={`url(#shadow${id})`}
          dataKey="value"
          stroke={color}
          dot={false}
          legendType="none"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ChartDetail;
