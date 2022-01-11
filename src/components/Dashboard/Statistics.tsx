import * as React from 'react';
import { styled } from '@mui/material/styles';

import { Box, Grid, Typography, Button, ButtonProps, BoxProps, TypographyProps } from '@mui/material';

interface Props {
  title?: string;
}

const CardBox = styled(Box)<BoxProps>(() => ({
  background: 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)',
  borderRadius: '20px',
  textAlign: 'center',
  padding: '27px',
  boxShadow: '0px 66px 35px -48px rgba(25, 21, 48, 0.13)',
}));

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // color: `#293247`,
  backgroundColor: `${theme.palette.secondary}`,
  padding: '12px',
  width: '176px',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'bold',
  textTransform: 'unset',
  boxShadow: '0px 13px 27px rgba(26, 38, 70, 0.09)',
  borderRadius: '14px',
}));

const Title = styled(Typography)<TypographyProps>(() => ({
  color: `#FFFFFF`,
  fontFamily: 'Roboto',
  margin: '15px 0',
  fontSize: '32px',
  lineHeight: '37px',
  fontWeight: 'bold',
}));

const Text = styled(Typography)<TypographyProps>(() => ({
  color: `rgba(255, 255, 255, 0.54)`,
  margin: '15px 0',
  fontSize: '18px',
  lineHeight: '27px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const Statistics: React.FC<Props> = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <CardBox>
            <Text variant="h5">Token Price</Text>
            <Title variant="h2">1.1029993</Title>
            <CustomButton variant="contained" color="secondary">
              Buy now
            </CustomButton>
          </CardBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardBox>
            <Text variant="h5">MY CONTRACTS</Text>
            <Title variant="h2">0/100</Title>
            <CustomButton variant="contained" color="secondary">
              Mint contract
            </CustomButton>
          </CardBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardBox>
            <Text variant="h5">My Rewards</Text>
            <Title variant="h2">0.000</Title>
            <CustomButton variant="contained" color="secondary">
              Claim all
            </CustomButton>
          </CardBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
