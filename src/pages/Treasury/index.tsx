import React from 'react';

import { Box } from '@mui/material';

import { Statistics, Holdings, Investments } from 'components/Treasury';

interface Props {
  title?: string;
}

const Treasury: React.FC<Props> = () => {
  return (
    <Box>
      <Statistics />
      <Holdings />
      <Investments />
    </Box>
  );
};

export default Treasury;
