import React, { useEffect } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled } from '@mui/material/styles';
import { Box, Paper, PaperProps } from '@mui/material';

import { TypesReward, Tokens, ClaimRewards } from 'components/MintContract';
import { toast } from 'react-toastify';
import useMobileChangeAccountMetamask from 'hooks/useMobileChangeAccountMetamask';

interface Props {
  title?: string;
}

const Pool = styled(Paper)<PaperProps>(({ theme }) => ({
  borderRadius: '22px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.11)',
  padding: '28px 30px 31px',
  textAlign: 'center',
  boxSizing: 'border-box',
  fontSize: '16px',
  lineHeight: '29px',
  fontFamily: 'Poppins',
  fontWeight: '600',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  border: theme.palette.mode === 'light' ? `1px solid ${theme.palette.primary.main}` : 'none',
  background: theme.palette.mode === 'light' ? '#fff' : `rgba(255, 255, 255, 0.03)`,
  // color: '#293247',
  // border: `1px solid ${theme.palette.primary.main}`,
  margin: '0 14px 42px',
}));

const MintContract: React.FC<Props> = () => {
  const [width] = useWindowSize();

  useEffect(() => {
    toast.clearWaitingQueue();
  }, []);

  useMobileChangeAccountMetamask();

  return (
    <Box>
      {width < 600 && (
        <Pool>Mint 0xBlock Reward Contracts (0xRC) and get steady stream of Rewards in 0xBlock (0xB) tokens</Pool>
      )}
      <TypesReward />
      <Tokens />
      <ClaimRewards />
    </Box>
  );
};

export default MintContract;
