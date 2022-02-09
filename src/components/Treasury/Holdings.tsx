import React, { useEffect, useState } from 'react';
import 'styles/menus.css';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';
import { dataHoldings } from './data';
import TableTokens from 'components/Base/TableTokens';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { convertPrice } from 'services/coingeko';

import { getBalanceNativeTokenOf, getBalanceTokenOf } from 'helpers/interractiveContract';
import { bigNumber2Number } from 'helpers/formatNumber';
import { formatBigNumber } from 'helpers/formatBigNumber';

import OxBCoin from 'assets/images/coin-0xb.svg';
import USDCoin from 'assets/images/coin-usd.svg';

const data = [
  {
    icon: OxBCoin,
    name: 'OxB',
    amount: Number,
    value: Number,
  },
  {
    icon: USDCoin,
    name: 'USDC',
    amount: Number,
    value: Number,
  },
];

interface Props {
  title?: string;
}

interface BoxCustomProps {
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: '34px',
  marginTop: '36px',

  [theme.breakpoints.down('sm')]: {
    margin: '44px 0',
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  color: '#828282',
  marginBottom: '30px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    marginBottom: '36px',
    fontSize: '24px',
    lineHeight: '36px',
    color: theme.palette.mode === 'light' ? '#293247' : '#828282',
  },
}));

const BoxDetail = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.03)',
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  minHeight: '167px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.05)',

  [theme.breakpoints.up('xl')]: {
    minHeight: '200px',
  },
  [theme.breakpoints.down('lg')]: {
    minHeight: '140px',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '140px',
    width: 'auto',
    marginRight: '0',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '140px',
    width: '265px',
    marginRight: '32px',
  },
}));

const BoxHeader = styled(Box)<BoxCustomProps>(({ color, theme }) => ({
  padding: '8px 26px',
  background: color,
  fontFamily: 'Poppins',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#11151D',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden !important',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '24px',
    padding: '8px 20px',
  },
}));

const BoxContent = styled(Box)<BoxProps>(() => ({
  padding: '4px 8px',
}));

const Holdings: React.FC<Props> = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const dataConvert = useAppSelector((state) => state.coingeko.dataConvert);
  const convertPriceComplete = useAppSelector((state) => state.coingeko.convertPriceComplete);

  const [treasury, setTreasury] = useState<any>(null);
  const [liquidity, setLiquidity] = useState<any>(null);
  const [rewards, setRewards] = useState<any>(null);
  const [dev_marketing, setDev_marketing] = useState<any>(null);

  const getValue = (params: object) => dispatch(convertPrice(params));

  const getAmount = async (address: string, key: string): Promise<void> => {
    const nativeToken = await getBalanceNativeTokenOf(address);
    const zeroXBlockToken = await getBalanceTokenOf(address);
    const amountZeroXB: any = bigNumber2Number(zeroXBlockToken[0]);
    const amountAVAX: any = bigNumber2Number(nativeToken);
    const newData = data.map((el, index) => {
      // viết điều kiện nếu có nhiều đồng khác
      // index === 1 là avax
      // index === 0 là 0xb
      if (index)
        return {
          ...el,
          amount: formatBigNumber(amountAVAX),
          value: formatBigNumber(Number(Number(dataConvert.aave.usd * amountAVAX).toFixed(2))),
        };
      return {
        ...el,
        amount: formatBigNumber(amountZeroXB),
        value: formatBigNumber(Number(Number(dataConvert.aave.usd * amountZeroXB).toFixed(2))),
      };
    });
    if (key === 'treasury') {
      setTreasury(newData);
    }
    if (key === 'liquidity') {
      setLiquidity(newData);
    }
    if (key === 'rewards') {
      setRewards(newData);
    }
    if (key === 'dev_marketing') {
      setDev_marketing(newData);
    }
  };

  useEffect(() => {
    // ví dụ lâý đồng aave để convert
    getValue({ ids: 'aave', vs_currencies: 'usd' });
    if (convertPriceComplete) {
      getAmount('0x3e513b088339aB233d0F712910f4c60E402cd408', 'treasury');
      getAmount('0x3e513b088339aB233d0F712910f4c60E402cd408', 'liquidity');
      getAmount('0x3299dcc8A7f12E12C3D4F81E3a348055c0A4c381', 'rewards');
      getAmount('0x55fF2DF220Ab057D70cb745da9eb47Ba59df5dc1', 'dev_marketing');
    }
  }, [convertPriceComplete]);

  const renderData = (k: string) => {
    if (k === 'treasury') return treasury;
    if (k === 'liquidity') return liquidity;
    if (k === 'rewards') return rewards;
    return dev_marketing;
  };

  return (
    <Wrapper>
      <Title>Holdings</Title>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid container spacing={{ xs: '24px', lg: '32px' }}>
          {dataHoldings.map((item, i) => (
            <Grid item xs={6} sm={6} lg={3} key={i}>
              <BoxDetail>
                <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>{item.title}</BoxHeader>

                <BoxContent>
                  <TableTokens fontSize="12px" data={renderData(item.key)} />
                </BoxContent>
              </BoxDetail>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <div className="scroll-area scroll-area--horizontal">
          <div className="scroll-area__body">
            {dataHoldings.map((item, i) => (
              <div key={i} className={`scroll-area__column item${i + 1}`}>
                <BoxDetail>
                  <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>
                    {item.title}
                  </BoxHeader>

                  <BoxContent>
                    <TableTokens fontSize="12px" data={renderData(item.key)} />
                  </BoxContent>
                </BoxDetail>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

export default Holdings;
