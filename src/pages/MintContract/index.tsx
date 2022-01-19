import React from 'react';
import { Box } from '@mui/material';

import { TypesReward, Tokens, ClaimRewards } from 'components/MintContract';

interface Props {
  title?: string;
}

const MintContract: React.FC<Props> = () => {
  return (
    <Box>
      <TypesReward />
      <Tokens />
      <ClaimRewards />
    </Box>
  );
};

export default MintContract;
