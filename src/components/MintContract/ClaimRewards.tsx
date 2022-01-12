import React from 'react';
import { styled } from '@mui/material/styles';

import { Box, BoxProps, Typography, TypographyProps, Paper, PaperProps } from '@mui/material';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginTop: '35px',
}));

const Title = styled(Typography)<TypographyProps>(() => ({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '44px',
  color: '#293247',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
  margin: '0 0 35px',
}));

const Pool = styled(Paper)<PaperProps>(() => ({
  borderRadius: '22px',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  padding: '26px',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: '500',
  color: '#293247',
}));

const ClaimRewards: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Title>Claim Rewards Tax</Title>
      <Pool>
        Every time a user claims rewards, a 10% tax will be applied and redirected to the 0xBlock Liquidity Pool (50%
        0xB, 50% AVAX)
      </Pool>
    </Wrapper>
  );
};

export default ClaimRewards;
