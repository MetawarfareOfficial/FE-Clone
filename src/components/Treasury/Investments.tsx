import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Paper, PaperProps, Typography, TypographyProps } from '@mui/material';

// import TableTokens from 'components/Base/TableTokens';
import TableInvestments from './TableInvestments';
import ListInvestments from './ListInvestments';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchInvestments } from 'services/investments';
import { useToast } from 'hooks/useToast';
import { getMarketPriceData } from '../../services/coingeko';
import { Coin } from '../../interfaces/Coin';
import { BaseInvest, Invest } from '../../interfaces/Invest';
import BigNumber from 'bignumber.js';
import useInterval from '../../hooks/useInterval';
import { DELAY_TIME } from '../../consts/investments';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
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
    fontSize: '24px',
    lineHeight: '36px',
    color: theme.palette.mode === 'light' ? '#293247' : '#828282',
  },
}));

const PaperContent = styled(Paper)<PaperProps>(({ theme }) => ({
  background: 'none',
  boxShadow: 'none',
  boxSizing: 'border-box',
  // minHeight: '550px',

  [theme.breakpoints.down('lg')]: {
    padding: ' 0',
    minHeight: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0',
    background: 'none',
    boxShadow: 'unset',
  },
}));

const Investments: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { error, investments } = useAppSelector((state) => state.investments);
  const marketPriceData: Coin[] = useAppSelector((state) => state.coingeko.marketPriceData);

  const { createToast } = useToast();
  const [width] = useWindowSize();
  const [dataTableInvest, setDataTableInvest] = useState<Invest[]>([]);

  useEffect(() => {
    if (error) {
      createToast({
        message: error,
        type: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchInvestments());
    dispatch(getMarketPriceData({ vs_currency: 'usd', page: 1, per_page: 100 }));
  }, []);

  useEffect(() => {
    if (investments.length > 0 && marketPriceData.length > 0) {
      setDataTableInvest(
        investments.map((item: BaseInvest) => {
          const coin = marketPriceData.find((el: Coin) => el.symbol === item.symbol.toLowerCase());
          return coin
            ? ({
                ...item,
                token_price: coin.current_price,
                icon: coin.image,
                current_investment: new BigNumber(coin.current_price).times(item.our_holdings).toNumber(),
              } as Invest)
            : ({} as Invest);
        }),
      );
    }
  }, [marketPriceData, investments]);

  useInterval(() => {
    dispatch(getMarketPriceData({ vs_currency: 'usd', page: 1, per_page: 100 }));
    // dispatch(fetchInvestments());
  }, DELAY_TIME);

  return (
    <Wrapper>
      <Title>Investments</Title>

      <PaperContent>
        {width < 600 ? <ListInvestments data={dataTableInvest} /> : <TableInvestments data={dataTableInvest} />}
      </PaperContent>
    </Wrapper>
  );
};

export default Investments;
