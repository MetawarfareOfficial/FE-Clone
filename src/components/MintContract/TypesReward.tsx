import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useWindowSize } from 'hooks/useWindowSize';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import TypeReward from './TypeReward';

import SquareIcon from 'assets/images/square.gif';
import SquareDarkIcon from 'assets/images/square-dark.gif';
import CubeIcon from 'assets/images/cube.gif';
import CubeDarkIcon from 'assets/images/cube-dark.gif';
import TessIcon from 'assets/images/tess.gif';
import TessDarkIcon from 'assets/images/tess-dark.gif';
import { useAppSelector } from 'stores/hooks';
import { computeEarnedTokenPerDay } from 'helpers/computeEarnedTokenPerDay';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  marginTop: '35px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    padding: '0 14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '44px',
  color: theme.palette.mode === 'light' ? '#293247' : '#BDBDBD',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
  margin: '0 0 41px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '21px',
    lineHeight: '31px',
  },
}));

const TypesReward: React.FC<Props> = () => {
  const theme = useTheme();
  const [width] = useWindowSize();
  const dataApy = useAppSelector((state) => state.contract.apy);
  const dataPrice = useAppSelector((state) => state.contract.price);

  return (
    <Wrapper>
      <Title>Types of Reward Contracts</Title>

      <TypeReward
        id={0}
        name="Square Contract"
        icon={theme.palette.mode === 'light' ? SquareIcon : SquareDarkIcon}
        color={theme.palette.mode === 'light' ? '#E5E5FE' : '#327DD2'}
        colorChart={theme.palette.mode === 'light' ? '#A1A1E1' : width < 600 ? '#934EA0' : '#3864FF'}
        value={dataPrice.square}
        apy={dataApy.square}
        earn={computeEarnedTokenPerDay(dataPrice.square, dataApy.square)}
      />
      <TypeReward
        id={1}
        name="Cube Contract"
        icon={theme.palette.mode === 'light' ? CubeIcon : CubeDarkIcon}
        color={theme.palette.mode === 'light' ? '#D2FFDB' : '#2B91CF'}
        // colorChart="#9DE6AB"
        colorChart={theme.palette.mode === 'light' ? '#9DE6AB' : width < 600 ? '#4F9F96' : '#3864FF'}
        value={dataPrice.cube}
        apy={dataApy.cube}
        earn={computeEarnedTokenPerDay(dataPrice.cube, dataApy.cube)}
      />
      <TypeReward
        id={2}
        name="Tesseract Contract"
        icon={theme.palette.mode === 'light' ? TessIcon : TessDarkIcon}
        color={
          theme.palette.mode === 'light' ? '#DBECFD' : 'linear-gradient(125.46deg, #2978F4 42.78%, #23ABF8 129.61%)'
        }
        // colorChart="#9EC5EB"
        colorChart={theme.palette.mode === 'light' ? '#9EC5EB' : width < 600 ? '#5B71C4' : '#3864FF'}
        value={dataPrice.tesseract}
        apy={dataApy.tesseract}
        earn={computeEarnedTokenPerDay(dataPrice.tesseract, dataApy.tesseract)}
      />
    </Wrapper>
  );
};

export default TypesReward;
