import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps, Grid } from '@mui/material';

interface Props {
  data: Array<any>;
}

interface TextUnitProps {
  status: 'increase' | 'decrease';
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const InvestmentItem = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: '1px',
  boxSizing: 'border-box',
  borderRadius: '14px',
  overflow: 'hidden',
  marginBottom: '10px',
  background:
    theme.palette.mode === 'light'
      ? ' #FFFFFF'
      : `linear-gradient(136.53deg, rgba(255, 255, 255, 0.1258) 1.5%, 
        rgba(255, 255, 255, 0) 48.05%, rgba(255, 255, 255, 0.1739) 107.89%)`,
}));

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  background: theme.palette.mode === 'light' ? ' #FFFFFF' : '#252525',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.1)',
  borderRadius: '14px',
  padding: '21px 19px 24px 23px',
  boxSizing: 'border-box',
  overflow: 'hidden',
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '14px',
  color: theme.palette.mode === 'light' ? '#BDBDBD' : '#4F4F4F',
  marginBottom: '2px',
}));

const ViewIcon = styled('img')(() => ({
  width: '21px',
  height: '21px',
  marginRight: '7px',
}));

const TextCenter = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'Poppins',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '21px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
}));

const TextUnit = styled(Typography)<TextUnitProps>(() => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '21px',
  marginRight: '4px',
}));

const TextNoData = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '23px',
  textAlign: 'center',
  color: theme.palette.mode === 'light' ? '#4F4F4F' : '#6B6B6B',
  width: '100%',
  height: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80px',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.03)',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  borderRadius: '22px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '18px',
    lineHeight: '22px',
    // minHeight: '400px',
  },
  [theme.breakpoints.down('md')]: {
    // minHeight: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    // minHeight: '80px',
    background: theme.palette.mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.03)',
    boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
    borderRadius: '22px',
  },
}));

const ListInvestments: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      {data.length > 0 ? (
        data.map((item, i) => (
          <InvestmentItem key={i}>
            <BoxContent>
              <Grid container spacing={'14px'}>
                <Grid item xs={5}>
                  <Title>Token Name</Title>
                  <TextCenter>
                    <ViewIcon alt="" src={item.icon} />
                    {item.name}
                  </TextCenter>
                </Grid>
                <Grid item xs={7}></Grid>

                <Grid item xs={5}>
                  <Title>Token Price</Title>
                  <TextCenter>
                    <TextUnit status={item.status}>$</TextUnit>
                    {item.token_price}
                  </TextCenter>
                </Grid>
                <Grid item xs={7}>
                  <Title>Initial Investment (USD)</Title>
                  <TextCenter>
                    <TextUnit status={item.status}>$</TextUnit>
                    {item.initial}
                  </TextCenter>
                </Grid>

                <Grid item xs={5}>
                  <Title>Our Holdings</Title>
                  <TextCenter>{item.our_holdings}</TextCenter>
                </Grid>
                <Grid item xs={7}>
                  <Title>Current investment value (USD)</Title>
                  <TextCenter>
                    <TextUnit status={item.status}>$</TextUnit>
                    {item.current_investment}
                  </TextCenter>
                </Grid>
              </Grid>
            </BoxContent>
          </InvestmentItem>
        ))
      ) : (
        <TextNoData>No investments yet!</TextNoData>
      )}
    </Wrapper>
  );
};

export default ListInvestments;
