import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';

import TypeReward from './TypeReward';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
  return (
    <Wrapper>
      <Title>Types of Reward Contracts</Title>

      <TypeReward
        id={0}
        name="Sqaure Contract"
        icon={SquareIcon}
        color="#E5E5FE"
        colorChart="#A1A1E1"
        value={5}
        apy={250}
        earn={0.03}
        dataChart={data}
      />
      <TypeReward
        id={1}
        name="Cube Contract"
        icon={CubeIcon}
        color="#D2FFDB"
        colorChart="#9DE6AB"
        value={15}
        apy={400}
        earn={0.16}
        dataChart={data}
      />
      <TypeReward
        id={2}
        name="Tesseract Contract"
        icon={TessIcon}
        color="#DBECFD"
        colorChart="#9EC5EB"
        value={30}
        apy={500}
        earn={0.41}
        dataChart={data}
      />
    </Wrapper>
  );
};

export default TypesReward;
