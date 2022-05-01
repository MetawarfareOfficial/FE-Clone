import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid } from '@mui/material';

import { PoolCard } from 'components/Stake';

interface Props {
  title?: string;
  onNext: () => void;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.down('sm')]: {
    padding: '0 17px',
    boxSizing: 'border-box',
  },
}));

const TabCustom = styled(Box)<BoxProps>(({ theme }) => ({
  margin: '49px auto 65px',
  display: 'flex',
  justifyContent: 'center',

  [theme.breakpoints.down('sm')]: {
    margin: '51px auto 9px',
  },
}));

const ManagePools: React.FC<Props> = ({ onNext }) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeTab = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('checked: ', event.target.checked);
  };

  return (
    <Wrapper>
      <TabCustom>
        <div className={`toggle-button-cover ${theme.palette.mode}Mode`}>
          <div className="button-cover">
            <div className="button b2 button-10 button-11" id="">
              <input onChange={handleChangeTab} type="checkbox" className="checkbox" />
              <div className="knobs">
                <span>All Pools</span>
              </div>
              <div className="layer" />
            </div>
          </div>
        </div>
      </TabCustom>

      <Box>
        <Grid container spacing={{ xs: '34px', md: '60px' }}>
          <Grid item xs={12} sm={6}>
            <PoolCard onNext={onNext} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PoolCard onNext={onNext} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PoolCard onNext={onNext} />
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default ManagePools;
