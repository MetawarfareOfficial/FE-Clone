import React, { useEffect } from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps, Paper, PaperProps } from '@mui/material';

// import TableTokens from 'components/Base/TableTokens';
import TableInvestments from './TableInvestments';
import ListInvestments from './ListInvestments';

import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { fetchInvestments } from 'services/investments';
import { useToast } from 'hooks/useToast';

import { investmentsData } from './data';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  color: theme.palette.mode === 'light' ? '#293247' : '#828282',
  marginBottom: '30px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    fontSize: '24px',
    lineHeight: '36px',
    color: theme.palette.mode === 'light' ? '#293247' : '#828282',
  },
}));

const PaperContent = styled(Paper)<PaperProps>(({ theme }) => ({
  background: 'none',
  boxShadow: 'none',
  boxSizing: 'border-box',
  // minHeight: '550px',

  [theme.breakpoints.down('lg')]: {
    padding: ' 0',
    minHeight: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0',
    background: 'none',
    boxShadow: 'unset',
  },
}));

const Investments: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    // status, investments
  } = useAppSelector((state) => state.investments);
  const { createToast } = useToast();
  const [width] = useWindowSize();

  useEffect(() => {
    if (error) {
      createToast({
        message: error,
        type: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchInvestments());
  }, []);

  return (
    <Wrapper>
      <Title>Investments</Title>

      <PaperContent>
        {width < 600 ? <ListInvestments data={investmentsData} /> : <TableInvestments data={investmentsData} />}
      </PaperContent>
    </Wrapper>
  );
};

export default Investments;
