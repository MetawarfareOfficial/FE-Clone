import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { Holdings, Investments } from 'components/Treasury';
import { toast } from 'react-toastify';
import useMobileChangeAccountMetamask from 'hooks/useMobileChangeAccountMetamask';

interface Props {
  title?: string;
}

const Treasury: React.FC<Props> = () => {
  useEffect(() => {
    toast.clearWaitingQueue();
  }, []);

  useMobileChangeAccountMetamask();

  return (
    <Box>
      {/* <Statistics /> */}
      <Holdings />
      <Investments />
    </Box>
  );
};

export default Treasury;
