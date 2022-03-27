import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

import { dataTokens, statisticData, statisticChartsData } from './data';

import { Contracts, Header, Statistic, StatisticCharts, Filters } from 'components/PrivateDashboard';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  background: '#f7f7fb',
  minHeight: '100vh',

  [theme.breakpoints.down('md')]: {
    background: '#fff',
    paddingBottom: '40px',
  },
}));

const Content = styled(Box)<BoxProps>(() => ({
  padding: '0 20px',
}));

const PrivateDashboard: React.FC<Props> = () => {
  const [width] = useWindowSize();

  return (
    <Wrapper>
      <Header tab="square" filter="d" connected={true} />

      <Content>
        {width < 769 && <Filters />}
        {width > 768 && <Contracts dataTokens={dataTokens} />}
        <Statistic data={statisticData} />
        <StatisticCharts data={statisticChartsData} />
        {width < 769 && <Contracts dataTokens={dataTokens} />}
      </Content>
    </Wrapper>
  );
};

export default PrivateDashboard;
