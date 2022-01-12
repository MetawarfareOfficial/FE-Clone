import React from 'react';

import { Box } from '@mui/material';

import { Banner, TypesReward, Tokens, ClaimRewards } from 'components/MintContract';

interface Props {
  title?: string;
}

const MintContract: React.FC<Props> = () => {
  return (
    <Box>
      <Banner />
      <TypesReward />
      <Tokens />
      <ClaimRewards />
    </Box>
  );
};

export default MintContract;
