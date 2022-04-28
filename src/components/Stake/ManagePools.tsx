import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid } from '@mui/material';

import { PoolCard } from 'components/Stake';

interface Props {
  title?: string;
  onNext: () => void;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const TabCustom = styled(Box)<BoxProps>(() => ({
  margin: '49px auto 65px',
  display: 'flex',
  justifyContent: 'center',
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
        <Grid container spacing={'60px'}>
          <Grid item md={6}>
            <PoolCard onNext={onNext} />
          </Grid>
          <Grid item md={6}>
            <PoolCard onNext={onNext} />
          </Grid>
          <Grid item md={6}>
            <PoolCard onNext={onNext} />
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default ManagePools;
