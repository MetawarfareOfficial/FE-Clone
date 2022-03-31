import React from 'react';
import Lottie from 'react-lottie';

import animationData from 'lotties/loading.json';
import { Box, BoxProps, styled } from '@mui/material';

interface Props {
  loading?: boolean;
}
const AnimationBox = styled(Box)<BoxProps>(() => ({
  '& div:first-child': {
    background: '#fff',
  },
}));
const Loading: React.FC<Props> = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <AnimationBox>
      <Lottie options={defaultOptions} height={200} width={200} />
    </AnimationBox>
  );
};

export default Loading;
