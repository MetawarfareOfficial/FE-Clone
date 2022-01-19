import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useWindowSize } from 'hooks/useWindowSize';
import { Box, Typography, TypographyProps, Grid } from '@mui/material';
import { BoxProps } from '@mui/material/Box';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';

interface Props {
  title?: string;
  onChangeHeight: (value: number) => void;
}

interface BoxTypeProps extends BoxProps {
  shadow?: string;
  color: string;
}

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#293247',
  margin: ' 0 0 31px',
  fontSize: '24px',
  lineHeight: '36px',
  fontWeight: 'bold',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '32px',
    margin: '0 0 20px',
  },
}));

const TitleBox = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#293247',
  fontFamily: 'Roboto',
  margin: ' 4px 5px 11px',
  fontSize: '48px',
  lineHeight: '56px',
  fontWeight: 'bold',

  [theme.breakpoints.down('lg')]: {
    fontSize: '40px',
    lineHeight: '48px',
    margin: '4px 5px 6px',
  },
}));

const TextBox = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#000',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'normal',
  marginLeft: '5px',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#293247',
  fontSize: '20px',
  lineHeight: '30px',
  fontWeight: '600',
  fontFamily: 'Poppins',
  textTransform: 'uppercase',

  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '22px',
  },
}));

const HeaderText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: 'rgba(41, 50, 71, 0.35)',
  fontSize: '12px',
  lineHeight: '18px',
  fontWeight: 'normal',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '11px',
    lineHeight: '16px',
  },
}));

const Description = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#000000',
  margin: '5px 0',
  fontSize: '13px',
  lineHeight: '20px',
  fontWeight: '500',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '10px',
    lineHeight: '14px',
  },
}));

const BoxTotal = styled(Box)<BoxTypeProps>(({ color, shadow }) => ({
  borderRadius: '13px',
  overflow: 'hidden',
  backgroundColor: `${color}`,
  boxShadow: `${shadow}`,
  display: 'flex',
}));

const BoxLeft = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '12px 16px 25px',
  width: 'calc(100% - 150px)',
  maxHeight: '174px',
  boxSizing: 'border-box',
  display: 'inline-block',

  [theme.breakpoints.down('lg')]: {
    width: 'calc(100% - 115px)',
    padding: '12px 16px 16px',
  },
}));

const BoxRight = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '14px',
  boxSizing: 'border-box',
  width: '150px',
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.21)',

  [theme.breakpoints.down('lg')]: {
    width: '115px',
    padding: '8px',
  },
}));

const BoxHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const BoxHeaderContent = styled(Box)<BoxProps>(({ theme }) => ({
  paddingLeft: '9px',
  width: 'calc(100% - 150px)',
  display: 'inline-block',
  boxSizing: 'border-box',

  [theme.breakpoints.down('lg')]: {
    width: 'calc(100% - 115px)',
  },
}));

const ViewImage = styled(Box)<BoxProps>(({ theme }) => ({
  width: '43px',
  height: '43px',

  [theme.breakpoints.down('lg')]: {
    width: '30px',
    height: '30px',
  },
}));

const TotalMinted: React.FC<Props> = ({ onChangeHeight }) => {
  const boxRef = useRef<any>(null);
  const [width] = useWindowSize();

  useEffect(() => {
    if (boxRef && boxRef.current) {
      const height = boxRef.current.clientHeight;
      onChangeHeight(height);
    }
  }, [width]);

  return (
    <Box>
      <Title>Total Minted Contracts</Title>

      <div ref={boxRef}>
        <Grid container spacing="30px">
          <Grid item xs={4} md={12}>
            <BoxTotal color="#E5E5FE" shadow=" 0px 56px 31px -48px rgba(25, 21, 48, 0.13)">
              <BoxLeft>
                <BoxHeader>
                  <ViewImage>
                    <img alt="" src={SquareIcon} width="100%" />
                  </ViewImage>

                  <BoxHeaderContent>
                    <HeaderTitle>Square</HeaderTitle>
                    <HeaderText>Contract</HeaderText>
                  </BoxHeaderContent>
                </BoxHeader>

                <TitleBox>30</TitleBox>
                <TextBox>Contracts minted</TextBox>
              </BoxLeft>

              <BoxRight>
                <Box>
                  <Description>5 0xB</Description>
                  <Description>Earn 0.03 0xB/day</Description>
                  <Description>250% APY</Description>
                </Box>
              </BoxRight>
            </BoxTotal>
          </Grid>
          <Grid item xs={4} md={12}>
            <BoxTotal color="#D2FFDB" shadow="0px 56px 31px -48px rgba(25, 21, 48, 0.13)">
              <BoxLeft>
                <BoxHeader>
                  <ViewImage>
                    <img alt="" src={CubeIcon} width="100%" />
                  </ViewImage>

                  <BoxHeaderContent>
                    <HeaderTitle>Cube </HeaderTitle>
                    <HeaderText>Contract</HeaderText>
                  </BoxHeaderContent>
                </BoxHeader>

                <TitleBox>30</TitleBox>
                <TextBox>Contracts minted</TextBox>
              </BoxLeft>

              <BoxRight>
                <Box>
                  <Description>15 0xB</Description>
                  <Description>Earn 0.16 0xB/day</Description>
                  <Description>400% APY</Description>
                </Box>
              </BoxRight>
            </BoxTotal>
          </Grid>
          <Grid item xs={4} md={12}>
            <BoxTotal color="#DBECFD" shadow="0px 56px 31px -48px rgba(25, 21, 48, 0.13)" sx={{ margin: 0 }}>
              <BoxLeft>
                <BoxHeader>
                  <ViewImage>
                    <img alt="" src={TessIcon} width="100%" />
                  </ViewImage>

                  <BoxHeaderContent>
                    <HeaderTitle>Tesseract</HeaderTitle>
                    <HeaderText>Contract</HeaderText>
                  </BoxHeaderContent>
                </BoxHeader>

                <TitleBox>30</TitleBox>
                <TextBox>Contracts minted</TextBox>
              </BoxLeft>

              <BoxRight>
                <Box>
                  <Description>30 0xB</Description>
                  <Description>Earn 0.41 0xB/day</Description>
                  <Description>500% APY</Description>
                </Box>
              </BoxRight>
            </BoxTotal>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default TotalMinted;
