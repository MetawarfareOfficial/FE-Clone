import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';

import TypeReward from './TypeReward';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';
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
  color: '#293247',
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
  const dataApy = useAppSelector((state) => state.contract.apy);
  const dataPrice = useAppSelector((state) => state.contract.price);

  return (
    <Wrapper>
      <Title>Types of Reward Contracts</Title>

      <TypeReward
        id={0}
        name="Square Contract"
        icon={SquareIcon}
        color="#E5E5FE"
        colorChart="#A1A1E1"
        value={dataPrice.square}
        apy={dataApy.square}
        earn={computeEarnedTokenPerDay(dataPrice.square, dataApy.square)}
      />
      <TypeReward
        id={1}
        name="Cube Contract"
        icon={CubeIcon}
        color="#D2FFDB"
        colorChart="#9DE6AB"
        value={dataPrice.cube}
        apy={dataApy.cube}
        earn={computeEarnedTokenPerDay(dataPrice.cube, dataApy.cube)}
      />
      <TypeReward
        id={2}
        name="Tesseract Contract"
        icon={TessIcon}
        color="#DBECFD"
        colorChart="#9EC5EB"
        value={dataPrice.tesseract}
        apy={dataApy.tesseract}
        earn={computeEarnedTokenPerDay(dataPrice.tesseract, dataApy.tesseract)}
      />
    </Wrapper>
  );
};

export default TypesReward;
