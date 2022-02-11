import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps, Paper, PaperProps } from '@mui/material';

// import TableTokens from 'components/Base/TableTokens';
import TableInvestments from './TableInvestments';

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
  color: '#293247',
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
  background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255, 255, 255, 0.03)',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  borderRadius: '22px',
  padding: '17px 24px',
  boxSizing: 'border-box',
  minHeight: '550px',
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('lg')]: {
    padding: '14px 18px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '18px',
  },
}));

const TextNoData = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '23px',
  textAlign: 'center',
  color: '#4F4F4F',
  width: '100%',
  height: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '92px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '18px',
    lineHeight: '22px',
    minHeight: '60px',
  },
}));

const Investments: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    // status, investments
  } = useAppSelector((state) => state.investments);
  const { createToast } = useToast();

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
        {/* {status === 'succeeded' && investments ? (
          <Grid container spacing={{ xs: '12px', md: '24px', lg: '42px' }}>
            {investments.map((data) => (
              <Grid key={data.name} item xs={12} sm={4}>
                <Detail>
                  <TableTokens data={[data]} />
                </Detail>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TextNoData>No investments yet!</TextNoData>
        )} */}

        {investmentsData.length > 0 ? (
          <TableInvestments data={investmentsData} />
        ) : (
          <TextNoData>No investments yet!</TextNoData>
        )}
      </PaperContent>
    </Wrapper>
  );
};

export default Investments;
