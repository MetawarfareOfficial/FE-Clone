import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Button, ButtonProps, Grid, Typography, TypographyProps, Tooltip } from '@mui/material';

import { formatTimestampV2 } from 'helpers/formatTimestamp';

interface Props {
  mintDate: string;
  type: string;
  initial: string;
  name: string;
  rewards: number;
  current: number;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  padding: '28px 14px 14px',
  background: '#FFFFFF',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.1)',
  borderRadius: '14px',
  marginBottom: '7px',
}));

const Title = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '14px',
  color: '#A4A9B7',
}));

const Text = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '26px',
  color: '#293247',
  whiteSpace: 'nowrap',
  overflow: 'hidden !important',
  textOverflow: 'ellipsis',
}));

const ButtonClaim = styled(Button)<ButtonProps>(() => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  padding: '8px 17px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  height: '36px',
  marginTop: '15px',

  '&:hover': {
    cursor: 'pointed',
    opacity: 0.7,
  },
}));

const ContractDetail: React.FC<Props> = ({ mintDate, type, initial, name, rewards, current }) => {
  return (
    <Wrapper>
      <Grid container spacing="19px">
        <Grid item xs={4}>
          <Box>
            <Title>Mint Date</Title>
            <Tooltip title={formatTimestampV2(mintDate)}>
              <Text>{formatTimestampV2(mintDate)}</Text>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Title>Type</Title>
            <Tooltip title={type}>
              <Text>{type}</Text>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Title>Initial 0xB/day </Title>
            <Tooltip title={initial}>
              <Text>{initial}</Text>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Title>Name</Title>
            <Tooltip title={name}>
              <Text>{name}</Text>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Title>Rewards</Title>
            <Tooltip title={rewards}>
              <Text>{rewards}</Text>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Title>Current 0xB/day</Title>
            <Tooltip title={current}>
              <Text>{current}</Text>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      <ButtonClaim size="small" variant="outlined" color="primary" fullWidth>
        Claim
      </ButtonClaim>
    </Wrapper>
  );
};

export default ContractDetail;
