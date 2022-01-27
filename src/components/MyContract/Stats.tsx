import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid } from '@mui/material';

import Statistic from 'components/MyContract/Statistic';

import SquareIcon from 'assets/images/square.gif';
import SquareDarkIcon from 'assets/images/square-dark.gif';
import CubeIcon from 'assets/images/cube.gif';
import CubeDarkIcon from 'assets/images/cube-dark.gif';
import TessIcon from 'assets/images/tess.gif';
import TessDarkIcon from 'assets/images/tess-dark.gif';
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

  const theme = useTheme();
  const [width] = useWindowSize();

  return (
    <Wrapper sx={{ width: '100%', margin: '30px 0' }}>
      <Grid container spacing={{ xs: '19px', md: '25px' }}>
        <Grid item xs={6} sm={6} md={3}>
          <Statistic
            icon={theme.palette.mode === 'light' ? SquareIcon : SquareDarkIcon}
            color={theme.palette.mode === 'light' ? '#E5E5FE' : '#327DD2'}
            title="Square"
            text="Contract"
            value={countMyContract.square}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Statistic
            icon={theme.palette.mode === 'light' ? CubeIcon : CubeDarkIcon}
            color={theme.palette.mode === 'light' ? '#D2FFDB' : '#2B91CF'}
            title="CUBE"
            text="Contract"
            value={countMyContract.cube}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Statistic
            icon={theme.palette.mode === 'light' ? TessIcon : TessDarkIcon}
            color={
              theme.palette.mode === 'light' ? '#DBECFD' : 'linear-gradient(126.79deg, #2978F4 43.77%, #23ABF8 129.86%)'
            }
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
                  : theme.palette.mode === 'light'
                  ? 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)'
                  : 'linear-gradient(102.25deg, #2D91D9 -1.96%, #2670A5 97.13%)'
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
