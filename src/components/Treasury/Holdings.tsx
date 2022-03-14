import React, { useEffect, useState } from 'react';
import 'styles/menus.css';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';
import { dataHoldings } from './data';
import TableTokens from 'components/Base/TableTokens';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { getHoldingWalletTokenData } from 'services/coingeko';

import { bigNumber2Number } from 'helpers/formatNumber';

import OxBCoin from 'assets/images/coin-0xb.svg';
import USDCoin from 'assets/images/coin-usd.svg';
import AVAXCoin from 'assets/images/avalanche-avax-logo.svg';
import { holdingWalletTokenID } from 'consts/holdings';
import { usdcAbi } from 'abis/usdcAbi';
import { formatReward, getTokenBalanceFromWalletAddress } from 'helpers';
import { useFetchHoldingsWalletAddress } from 'helpers/useFetchHoldingsWalletAddress';
import { useInteractiveContract } from 'hooks/useInteractiveContract';

interface HoldingWallet {
  icon: string;
  name: string;
  amount: string;
  value: string;
}

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
  fontFamily: theme.palette.mode === 'light' ? 'Roboto' : 'Poppins',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  color: theme.palette.mode === 'light' ? '#293247' : '#828282',
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

const BoxItem = styled(Box)<BoxProps>(({ theme }) => ({
  background:
    theme.palette.mode === 'light'
      ? '#FFFFFF'
      : `linear-gradient(136.53deg, rgba(255, 255, 255, 0.126) 1.5%, rgba(255, 255, 255, 0) 48.05%, 
        rgba(255, 255, 255, 0.1739) 107.89%)`,
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  minHeight: '288px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.05)',
  position: 'relative',
  padding: '1px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    minHeight: '140px',
    width: '265px',
    marginRight: '32px',
  },
}));

const BoxDetail = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#252525',

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
}));

const BoxHeader = styled(Box)<BoxCustomProps>(({ color, theme }) => ({
  padding: '8px 26px',
  background: color,
  fontFamily: 'Poppins',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#11151D',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden !important',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '24px',
    padding: '8px 20px',
    maxWidth: '100%',
  },
}));

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '4px 8px',
  height: 'calc(100% - 43px)',
  background: theme.palette.mode === 'light' ? '#fff' : '#252525',
}));

const Holdings: React.FC<Props> = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const holdingWalletTokenPrice = useAppSelector((state) => state.coingeko.holdingWalletTokenPrice);
  const holdingTokenLoadCompleted = useAppSelector((state) => state.coingeko.holdingTokenLoadCompleted);
  const { getBalanceTokenOf, getBalanceNativeTokenOf } = useInteractiveContract();
  const { holdingsWalletAddresses, usdcTokenAddress } = useFetchHoldingsWalletAddress();
  const [treasury, setTreasury] = useState<HoldingWallet[]>([
    {
      name: 'USDC',
      icon: USDCoin,
      value: '0',
      amount: '0',
    },
  ]);
  const [liquidity, setLiquidity] = useState<HoldingWallet[]>([
    {
      name: '0XB',
      icon: OxBCoin,
      value: '0',
      amount: '0',
    },
    {
      name: 'AVAX',
      icon: AVAXCoin,
      value: '0',
      amount: '0',
    },
  ]);
  const [rewards, setRewards] = useState<HoldingWallet[]>([
    {
      name: '0XB',
      icon: OxBCoin,
      value: '0',
      amount: '0',
    },
  ]);
  const [dev_marketing, setDev_marketing] = useState<HoldingWallet[]>([
    {
      name: 'USDC',
      icon: USDCoin,
      value: '0',
      amount: '0',
    },
  ]);

  const getTokenData = (params: object) => dispatch(getHoldingWalletTokenData(params));

  const handleGetDevAndMarketingOrTreasuryWalletData = async (key: string) => {
    if (holdingsWalletAddresses) {
      const isTreasury = key === 'treasury';
      const usdToken = await getTokenBalanceFromWalletAddress(
        usdcTokenAddress,
        usdcAbi,
        isTreasury ? holdingsWalletAddresses.treasury : holdingsWalletAddresses.dev_marketing,
      );
      if (key === 'treasury') {
        setTreasury([
          {
            ...treasury[0],
            amount: formatReward(String(usdToken)),
            value: `${formatReward(String(Number(usdToken) * holdingWalletTokenPrice[holdingWalletTokenID.usdc].usd))}`,
          },
        ]);
      } else {
        setDev_marketing([
          {
            ...dev_marketing[0],
            amount: formatReward(String(usdToken)),
            value: `${formatReward(String(Number(usdToken) * holdingWalletTokenPrice[holdingWalletTokenID.usdc].usd))}`,
          },
        ]);
      }
    }
  };

  const handleGetLiquidityWalletData = async () => {
    if (holdingsWalletAddresses) {
      const zeroToken = await getBalanceTokenOf(holdingsWalletAddresses.liquidity);
      const zeroTokenAmount = bigNumber2Number(zeroToken[0]);
      const avaxToken = await getBalanceNativeTokenOf(holdingsWalletAddresses.liquidity);
      const avaxAmount = bigNumber2Number(avaxToken);
      if (holdingWalletTokenID.zeroToken) {
        setLiquidity([
          {
            ...liquidity[0],
            amount: formatReward(String(zeroTokenAmount)),
            value: `${formatReward(
              String(Number(zeroTokenAmount) * holdingWalletTokenPrice[holdingWalletTokenID.zeroToken].usd),
            )}`,
          },
          {
            ...liquidity[1],
            amount: formatReward(String(avaxAmount)),
            value: `${formatReward(
              String(Number(avaxAmount) * holdingWalletTokenPrice[holdingWalletTokenID.avax].usd),
            )}`,
          },
        ]);
      }
    }
  };

  const handleGetRewardsWalletData = async () => {
    if (holdingsWalletAddresses) {
      const zeroToken = await getBalanceTokenOf(holdingsWalletAddresses.rewards);
      const zeroTokenAmount = bigNumber2Number(zeroToken[0]);
      if (holdingWalletTokenID.zeroToken) {
        setRewards([
          {
            ...rewards[0],
            amount: formatReward(String(zeroTokenAmount)),
            value: `${formatReward(
              String(Number(zeroTokenAmount) * holdingWalletTokenPrice[holdingWalletTokenID.zeroToken].usd),
            )}`,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    getTokenData({
      ids: `${holdingWalletTokenID.zeroToken},${holdingWalletTokenID.usdc},${holdingWalletTokenID.avax}`,
      vs_currencies: 'usd',
    });
    if (holdingTokenLoadCompleted && holdingsWalletAddresses && usdcTokenAddress) {
      handleGetRewardsWalletData();
      handleGetLiquidityWalletData();
      handleGetDevAndMarketingOrTreasuryWalletData('treasury');
      handleGetDevAndMarketingOrTreasuryWalletData('dev_marketing');
    }
  }, [holdingTokenLoadCompleted, holdingsWalletAddresses, usdcTokenAddress]);

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
              <BoxItem>
                <BoxDetail>
                  <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>
                    {item.title}
                  </BoxHeader>

                  <BoxContent>
                    <TableTokens fontSize="12px" data={renderData(item.key)} />
                  </BoxContent>
                </BoxDetail>
              </BoxItem>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <div className="scroll-area scroll-area--horizontal">
          <div className="scroll-area__body">
            {dataHoldings.map((item, i) => (
              <div key={i} className={`scroll-area__column item${i + 1}`}>
                <BoxItem>
                  <BoxDetail>
                    <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>
                      {item.title}
                    </BoxHeader>

                    <BoxContent>
                      <TableTokens fontSize="12px" data={renderData(item.key)} />
                    </BoxContent>
                  </BoxDetail>
                </BoxItem>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

export default Holdings;
