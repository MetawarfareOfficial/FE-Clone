import React from 'react';
import { styled } from '@mui/material/styles';

import { Box, BoxProps, Typography, TypographyProps, Paper, PaperProps } from '@mui/material';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  marginTop: '35px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '44px',
  color: '#293247',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
  margin: '0 0 35px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '21px',
    lineHeight: '31px',
    marginBottom: '28px',
  },
}));

const Pool = styled(Paper)<PaperProps>(({ theme }) => ({
  borderRadius: '22px',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  padding: '26px',
  textAlign: 'center',
  boxSizing: 'border-box',
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: '500',
  color: '#293247',
  border: `1px solid ${theme.palette.primary.main}`,

  [theme.breakpoints.down('lg')]: {
    padding: '20px',
    fontSize: '12px',
    lineHeight: '18px',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '40px 42px 35px',
    fontSize: '14px',
    lineHeight: '25px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '38px 42px 35px',
    fontSize: '14px',
    lineHeight: '25px',
  },
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
