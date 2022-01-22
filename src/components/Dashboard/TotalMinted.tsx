import * as React from 'react';
import { styled } from '@mui/material/styles';

import { Box, Typography, TypographyProps } from '@mui/material';
import { BoxProps } from '@mui/material/Box';

import SquareIcon from 'assets/images/square.gif';
import CubeIcon from 'assets/images/cube.gif';
import TessIcon from 'assets/images/tess.gif';
import { useAppSelector } from 'stores/hooks';
import { computeEarnedTokenPerDay } from 'helpers/computeEarnedTokenPerDay';

interface Props {
  title?: string;
}

interface BoxTypeProps extends BoxProps {
  shadow?: string;
  color: string;
}

const Title = styled(Typography)<TypographyProps>(() => ({
  color: '#293247',
  margin: ' 0 0 31px',
  fontSize: '24px',
  lineHeight: '36px',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
}));

const TitleBox = styled(Typography)<TypographyProps>(() => ({
  color: '#293247',
  fontFamily: 'Roboto',
  margin: ' 4px 5px 11px',
  fontSize: '48px',
  lineHeight: '56px',
  fontWeight: 'bold',
}));

const TextBox = styled(Typography)<TypographyProps>(() => ({
  color: '#000',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'normal',
  marginLeft: '5px',
  fontFamily: 'Poppins',
}));

const HeaderTitle = styled(Typography)<TypographyProps>(() => ({
  color: '#293247',
  fontSize: '20px',
  lineHeight: '30px',
  fontWeight: '600',
  fontFamily: 'Poppins',
  textTransform: 'uppercase',
}));

const HeaderText = styled(Typography)<TypographyProps>(() => ({
  color: 'rgba(41, 50, 71, 0.35)',
  fontSize: '12px',
  lineHeight: '18px',
  fontWeight: 'normal',
  fontFamily: 'Poppins',
}));

const Description = styled(Typography)<TypographyProps>(() => ({
  color: '#000000',
  margin: '5px 0',
  fontSize: '13px',
  lineHeight: '20px',
  fontWeight: '500',
  fontFamily: 'Poppins',
}));

const BoxTotal = styled(Box)<BoxTypeProps>(({ color, shadow }) => ({
  borderRadius: '13px',
  overflow: 'hidden',
  backgroundColor: `${color}`,
  boxShadow: `${shadow}`,
  display: 'flex',
  marginBottom: '30px',
}));

const BoxLeft = styled(Box)<BoxProps>(() => ({
  padding: '12px 16px 25px',
  width: 'calc(100% - 150px)',
  maxHeight: '174px',
  boxSizing: 'border-box',
}));

const BoxRight = styled(Box)<BoxProps>(() => ({
  padding: '16px',
  boxSizing: 'border-box',
  width: '150px',
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.21)',
}));

const BoxHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const BoxHeaderContent = styled(Box)<BoxProps>(() => ({
  marginLeft: '9px',
}));

const ViewImage = styled(Box)<BoxProps>(() => ({
  width: '43px',
  height: '43px',
}));

const TotalMinted: React.FC<Props> = () => {
  const dataApy = useAppSelector((state) => state.contract.apy);
  const dataPrice = useAppSelector((state) => state.contract.price);
  const dataTotal = useAppSelector((state) => state.contract.total);

  return (
    <Box>
      <Title>Total Minted Contracts</Title>

      <BoxTotal color="#E5E5FE" shadow=" 0px 56px 31px -48px rgba(25, 21, 48, 0.13)">
        <BoxLeft>
          <BoxHeader>
            <ViewImage>
              <img alt="" src={SquareIcon} width="100%" />
            </ViewImage>

            <BoxHeaderContent>
              <HeaderTitle>SQUARE</HeaderTitle>
              <HeaderText>Contract</HeaderText>
            </BoxHeaderContent>
          </BoxHeader>

          <TitleBox>{dataTotal.square}</TitleBox>
          <TextBox>Contracts minted</TextBox>
        </BoxLeft>

        <BoxRight>
          <Box>
            <Description>{`${dataPrice.square} 0xB`}</Description>
            <Description>{`Earn ${computeEarnedTokenPerDay(dataPrice.square, dataApy.square)} 0xB/day`}</Description>
            <Description>{`${dataApy.square}% APY`}</Description>
          </Box>
        </BoxRight>
      </BoxTotal>

      <BoxTotal color="#D2FFDB" shadow="0px 56px 31px -48px rgba(25, 21, 48, 0.13)">
        <BoxLeft>
          <BoxHeader>
            <ViewImage>
              <img alt="" src={CubeIcon} width="100%" />
            </ViewImage>

            <BoxHeaderContent>
              <HeaderTitle>CUBE </HeaderTitle>
              <HeaderText>Contract</HeaderText>
            </BoxHeaderContent>
          </BoxHeader>

          <TitleBox>{dataTotal.cube}</TitleBox>
          <TextBox>Contracts minted</TextBox>
        </BoxLeft>

        <BoxRight>
          <Box>
            <Description>{`${dataPrice.cube} 0xB`}</Description>
            <Description>{`Earn ${computeEarnedTokenPerDay(dataPrice.cube, dataApy.cube)} 0xB/day`}</Description>
            <Description>{`${dataApy.cube}% APY`}</Description>
          </Box>
        </BoxRight>
      </BoxTotal>

      <BoxTotal color="#DBECFD" shadow="0px 56px 31px -48px rgba(25, 21, 48, 0.13)">
        <BoxLeft>
          <BoxHeader>
            <ViewImage>
              <img alt="" src={TessIcon} width="100%" />
            </ViewImage>

            <BoxHeaderContent>
              <HeaderTitle>TESSERACT</HeaderTitle>
              <HeaderText>Contract</HeaderText>
            </BoxHeaderContent>
          </BoxHeader>

          <TitleBox>{dataTotal.tesseract}</TitleBox>
          <TextBox>Contracts minted</TextBox>
        </BoxLeft>

        <BoxRight>
          <Box>
            <Description>{`${dataPrice.tesseract} 0xB`}</Description>
            <Description>{`Earn ${computeEarnedTokenPerDay(
              dataPrice.tesseract,
              dataApy.tesseract,
            )} 0xB/day`}</Description>
            <Description>{`${dataApy.tesseract}% APY`}</Description>
          </Box>
        </BoxRight>
      </BoxTotal>
    </Box>
  );
};

export default TotalMinted;
