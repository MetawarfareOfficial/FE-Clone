import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

import { ManagePools, MyStake } from 'components/Stake';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const StakePage: React.FC<Props> = () => {
  const [step, setStep] = useState(0);

  return (
    <Wrapper>{step === 0 ? <ManagePools onNext={() => setStep(1)} /> : <MyStake onBack={() => setStep(0)} />}</Wrapper>
  );
};

export default StakePage;
