import React from 'react';

import { Box } from '@mui/material';

import { Banner } from 'components/Base/Banner';
import { TypesReward, Tokens, ClaimRewards } from 'components/MintContract';

interface Props {
  title?: string;
}

const MintContract: React.FC<Props> = () => {
  const handleConnect = () => {};

  return (
    <Box>
      <Banner
        text="Mint 0xBlock Reward Contracts (0xRC) and get steady stream of Rewards in 0xBlock (0xB) tokens"
        walletId="0x33434dieoewo"
        onConnect={handleConnect}
        connected={true}
      />
      <TypesReward />
      <Tokens />
      <ClaimRewards />
    </Box>
  );
};

export default MintContract;
