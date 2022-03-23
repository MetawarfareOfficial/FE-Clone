import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

import { dataTokens, statisticData, statisticChartsData } from './data';

import { Contracts, Header, Statistic, StatisticCharts } from 'components/PrivateDashboard';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  background: '#f7f7fb',
  minHeight: '100vh',
}));

const Content = styled(Box)<BoxProps>(() => ({
  padding: '0 20px',
}));

const PrivateDashboard: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Header tab="square" filter="d" connected={true} />

      <Content>
        <Contracts dataTokens={dataTokens} />
        <Statistic data={statisticData} />
        <StatisticCharts data={statisticChartsData} />
      </Content>
    </Wrapper>
  );
};

export default PrivateDashboard;
