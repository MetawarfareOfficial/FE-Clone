import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useWindowSize } from 'hooks/useWindowSize';
import { Box, BoxProps, TypographyProps, Typography } from '@mui/material';
import { ComposedChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { labelDate, tickFormatDate, tickFormatInterval } from 'consts/dashboard';
import { formatTimestamp } from 'helpers/formatTimestamp';
import { convertCamelCaseToPascalCase } from 'helpers/convertCamelCaseToPascalCase';
import { formatReward } from 'helpers';
import { formatPrice } from 'helpers/formatPrice';

interface Props {
  title?: string;
  heightTotal: number;
  data: Array<any>;
  XDataKey?: string;
  YDataKey?: string;
  changeChart: (isOpenPriceChart: boolean) => void;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#293247' : '#BDBDBD',
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
  background:
    theme.palette.mode === 'light'
      ? '#fff'
      : 'linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))',
  // backdropFilter: theme.palette.mode === 'light' ? 'unset' : 'blur(279px)',
  borderRadius: '26px',
  padding: '22px 0 20px 30px',
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

const PriceChart: React.FC<Props> = ({ data, heightTotal, XDataKey = 'time', YDataKey = 'price', changeChart }) => {
  const [width] = useWindowSize();
  const theme = useTheme();
  const [heightChart, setHeightChart] = useState(500);

  useEffect(() => {
    if (heightTotal) {
      const newHeight = heightTotal - 85 - 30;
      setHeightChart(newHeight);
    }
  }, [heightTotal]);

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      changeChart(false);
    } else changeChart(true);
  };

  return (
    <Wrapper>
      <Title>Chart</Title>

      <div className={`toggle-button-cover showMobile ${theme.palette.mode}Mode`}>
        <div className="button-cover">
          <div className="button b2" id="button-10">
            <input onChange={handleCheckBoxChange} type="checkbox" className="checkbox" />
            <div className="knobs">
              <span>Token price</span>
            </div>
            <div className="layer" />
          </div>
        </div>
      </div>

      <ViewChart>
        <div className={`toggle-button-cover showDesktop ${theme.palette.mode}Mode`}>
          <div className="button-cover">
            <div className="button b2" id="button-10">
              <input onChange={handleCheckBoxChange} type="checkbox" className="checkbox" />
              <div className="knobs">
                <span>Token price</span>
              </div>
              <div className="layer" />
            </div>
          </div>
        </div>

        <div
          style={{
            width: width < 480 ? 'calc(100% + 30px)' : '100%',
            height: width > 600 ? (heightChart > 300 ? heightChart : '500px') : width < 480 ? '200px' : '320px',
          }}
        >
          <ResponsiveContainer>
            <ComposedChart width={732} height={400} data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={theme.palette.mode === 'light' ? '#EFE5FE' : '#29445C'}
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor={theme.palette.mode === 'light' ? '#EFE5FE' : '#29445C'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                tickLine={false}
                axisLine={false}
                fontSize="10px"
                fontFamily="Helvetica"
                color={theme.palette.mode === 'light' ? '#000000' : '#4F4F4F'}
                dataKey={XDataKey}
                tickFormatter={(timestamp: any) => formatTimestamp(timestamp, tickFormatDate, 'UTC')}
                interval={heightTotal < 600 ? 6 : tickFormatInterval}
                padding={{ left: 15 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize="10px"
                color={theme.palette.mode === 'light' ? '#000000' : '#4F4F4F'}
                fontFamily="Helvetica"
                orientation="right"
                dataKey={YDataKey}
                tickFormatter={(value) =>
                  YDataKey === 'price' ? formatPrice(String(value), 0, 0) : formatReward(String(value))
                }
              />

              {theme.palette.mode === 'dark' && <CartesianGrid stroke="#1D1D1D" strokeOpacity={0.7} />}

              <Tooltip
                formatter={(value: string, name: string) => [
                  `$${YDataKey === 'price' ? formatPrice(String(value)) : formatPrice(String(value), 0, 0)}`,
                  convertCamelCaseToPascalCase(name),
                ]}
                labelFormatter={(value: string) => formatTimestamp(value, labelDate, 'UTC')}
              />

              <Area
                type="monotone"
                dataKey={YDataKey}
                stroke={theme.palette.mode === 'light' ? '#3864FF' : '#2978F4'}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ViewChart>
    </Wrapper>
  );
};

export default React.memo(PriceChart);
