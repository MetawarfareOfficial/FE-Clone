import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Grid } from '@mui/material';

import Statistic from './Statistic';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';
import RewardsIcon from 'assets/images/rewards.gif';
import { CountMyContract } from 'interfaces/CountMyContract';
import { useAppSelector } from 'stores/hooks';

interface Props {
  countMyContract: CountMyContract;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  boxSizing: 'border-box',
  margin: '30px 0',

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
    margin: '38px 0 40px',
  },
}));

const Stats: React.FC<Props> = ({ countMyContract }) => {
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const dataRewardAmount = useAppSelector((state) => state.contract.dataRewardAmount);

  const [width] = useWindowSize();

  return (
    <Wrapper sx={{ width: '100%', margin: '30px 0' }}>
      <Grid container spacing={{ xs: '19px', md: '25px' }}>
        <Grid item xs={6} sm={6} md={3}>
          <Statistic icon={SquareIcon} color="#E5E5FE" title="Square" text="Contract" value={countMyContract.square} />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Statistic icon={CubeIcon} color="#D2FFDB" title="CUBE" text="Contract" value={countMyContract.cube} />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Statistic
            icon={TessIcon}
            color="#DBECFD"
            title="Tesseract"
            text="Contract"
            value={countMyContract.tesseract}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Statistic
            color={
              currentUserAddress
                ? width < 600
                  ? '#EFE5FE'
                  : 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)'
                : '#fff'
            }
            title={width < 600 ? 'Rewards' : 'My Rewards'}
            value={`${dataRewardAmount}`}
            icon={width < 600 ? RewardsIcon : null}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Stats;
