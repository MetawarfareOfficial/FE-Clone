import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { TypesReward, Tokens, ClaimRewards } from 'components/MintContract';
import { toast } from 'react-toastify';

interface Props {
  title?: string;
}

const MintContract: React.FC<Props> = () => {
  useEffect(() => {
    toast.clearWaitingQueue();
  }, []);

  return (
    <Box>
      <TypesReward />
      <Tokens />
      <ClaimRewards />
    </Box>
  );
};

export default MintContract;
