import React, { useRef, useEffect } from 'react';
import 'styles/menus.css';
import { styled, useTheme } from '@mui/material/styles';
import { useWindowSize } from 'hooks/useWindowSize';
import { Box, Typography, TypographyProps, Grid } from '@mui/material';
import { BoxProps } from '@mui/material/Box';

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
  onChangeHeight: (value: number) => void;
}

interface BoxTypeProps extends BoxProps {
  shadow?: string;
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#293247' : '#BDBDBD',
  margin: ' 0 0 31px',
  fontSize: '24px',
  lineHeight: '36px',
  fontWeight: 'bold',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '19px',
    lineHeight: '32px',
    margin: '0 0 20px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    lineHeight: '36px',
    margin: '0 0 36px',
    textAlign: 'center',
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '48px',
    lineHeight: '56px',
    margin: '7px 0',
  },
}));

const TextBox = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#000' : 'rgba(255, 255, 255, 0.46)',
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
  color: theme.palette.mode === 'light' ? '#293247' : '#080A0F',
  fontSize: '20px',
  lineHeight: '30px',
  fontWeight: '600',
  fontFamily: 'Poppins',
  textTransform: 'uppercase',

  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '22px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

const HeaderText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.35)' : 'rgba(255, 255, 255, 0.42)',
  fontSize: '12px',
  lineHeight: '18px',
  fontWeight: 'normal',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '8px',
    lineHeight: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const Description = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#000000' : '#080A0F',
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

const BoxTotal = styled(Box)<BoxTypeProps>(({ color, shadow, theme }) => ({
  borderRadius: '13px',
  overflow: 'hidden',
  background: `${color}`,
  boxShadow: `${shadow}`,
  display: 'flex',

  [theme.breakpoints.down('sm')]: {
    marginRight: '13px',
    minWidth: '156px',
  },
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
  [theme.breakpoints.down('md')]: {
    padding: '11px 13px 13px',
    width: '100%',
  },
}));

const BoxRight = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '14px',
  boxSizing: 'border-box',
  minWidth: '150px',
  width: '40%',
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.21)',

  [theme.breakpoints.down('xl')]: {
    width: 'auto',
  },

  [theme.breakpoints.down('lg')]: {
    width: '115px',
    minWidth: '115px',
    padding: '8px',
  },
  [theme.breakpoints.down('md')]: {
    width: 0,
    display: 'none',
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
  [theme.breakpoints.down('sm')]: {
    width: '43px',
    height: '43px',
  },
}));

const TotalMinted: React.FC<Props> = ({ onChangeHeight }) => {
  const boxRef = useRef<any>(null);
  const [width] = useWindowSize();
  const theme = useTheme();

  const dataApy = useAppSelector((state) => state.contract.apy);
  const dataPrice = useAppSelector((state) => state.contract.price);
  const dataTotal = useAppSelector((state) => state.contract.total);

  useEffect(() => {
    const slider: any = document.querySelector('.totalContacts');
    let isDown = false;
    let startX: any = null;
    let scrollLeft: any = null;

    slider.addEventListener('mousedown', (e: any) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      // console.log(walk);
    });

    // mobile
    slider.addEventListener('touchstart', (e: any) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.changedTouches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchcancel', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('touchend', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('touchmove', (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.changedTouches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      // console.log(walk);
    });
  }, []);

  useEffect(() => {
    if (boxRef && boxRef.current) {
      const height = boxRef.current.clientHeight;
      onChangeHeight(height);
    }
  }, [width]);

  return (
    <Wrapper>
      <Title>Total Minted Contracts</Title>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <div ref={boxRef}>
          <Grid container spacing={{ sm: '24px', md: '30px' }}>
            <Grid item xs={4} md={12}>
              <BoxTotal
                color={theme.palette.mode === 'light' ? '#E5E5FE' : '#327DD2'}
                shadow=" 0px 56px 31px -48px rgba(25, 21, 48, 0.13)"
              >
                <BoxLeft>
                  <BoxHeader>
                    <ViewImage>
                      <img alt="" src={theme.palette.mode === 'light' ? SquareIcon : SquareDarkIcon} width="100%" />
                    </ViewImage>

                    <BoxHeaderContent>
                      <HeaderTitle>Square</HeaderTitle>
                      <HeaderText>Contract</HeaderText>
                    </BoxHeaderContent>
                  </BoxHeader>

                  <TitleBox>{dataTotal.square}</TitleBox>
                  <TextBox>Contracts minted</TextBox>
                </BoxLeft>

                <BoxRight>
                  <Box>
                    <Description>{`${dataPrice.square} 0xB`}</Description>
                    <Description>{`Earn ${computeEarnedTokenPerDay(
                      dataPrice.square,
                      dataApy.square,
                    )} 0xB/day`}</Description>
                    <Description>{`${Number(dataApy.square)}% APR`}</Description>
                  </Box>
                </BoxRight>
              </BoxTotal>
            </Grid>
            <Grid item xs={4} md={12}>
              <BoxTotal
                color={theme.palette.mode === 'light' ? '#D2FFDB' : '#2B91CF'}
                shadow="0px 56px 31px -48px rgba(25, 21, 48, 0.13)"
              >
                <BoxLeft>
                  <BoxHeader>
                    <ViewImage>
                      <img alt="" src={theme.palette.mode === 'light' ? CubeIcon : CubeDarkIcon} width="100%" />
                    </ViewImage>

                    <BoxHeaderContent>
                      <HeaderTitle>Cube </HeaderTitle>
                      <HeaderText>Contract</HeaderText>
                    </BoxHeaderContent>
                  </BoxHeader>

                  <TitleBox>{dataTotal.cube}</TitleBox>
                  <TextBox>Contracts minted</TextBox>
                </BoxLeft>

                <BoxRight>
                  <Box>
                    <Description>{`${dataPrice.cube} 0xB`}</Description>
                    <Description>{`Earn ${computeEarnedTokenPerDay(
                      dataPrice.cube,
                      dataApy.cube,
                    )} 0xB/day`}</Description>
                    <Description>{`${Number(dataApy.cube)}% APR`}</Description>
                  </Box>
                </BoxRight>
              </BoxTotal>
            </Grid>
            <Grid item xs={4} md={12}>
              <BoxTotal
                color={
                  theme.palette.mode === 'light'
                    ? '#DBECFD'
                    : 'linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)'
                }
                shadow="0px 56px 31px -48px rgba(25, 21, 48, 0.13)"
                sx={{ margin: 0 }}
              >
                <BoxLeft>
                  <BoxHeader>
                    <ViewImage>
                      <img alt="" src={theme.palette.mode === 'light' ? TessIcon : TessDarkIcon} width="100%" />
                    </ViewImage>

                    <BoxHeaderContent>
                      <HeaderTitle>Tesseract</HeaderTitle>
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
                    <Description>{`${Number(dataApy.tesseract)}% APR`}</Description>
                  </Box>
                </BoxRight>
              </BoxTotal>
            </Grid>
          </Grid>
        </div>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {/* <SliderScroll elRef={sliderRef} settings={settings}> */}
        <div className="grid-item main">
          <div className="items totalContacts">
            <div className="item item1">
              <Box>
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

                    <TitleBox>{dataTotal.square}</TitleBox>
                    <TextBox>Contracts minted</TextBox>
                  </BoxLeft>

                  <BoxRight>
                    <Box>
                      <Description>{`${dataPrice.square} 0xB`}</Description>
                      <Description>{`Earn ${computeEarnedTokenPerDay(
                        dataPrice.square,
                        dataApy.square,
                      )} 0xB/day`}</Description>
                      <Description>{`${dataApy.square}% APR`}</Description>
                    </Box>
                  </BoxRight>
                </BoxTotal>
              </Box>
            </div>

            <div className="item item2">
              <Box>
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

                    <TitleBox>{dataTotal.cube}</TitleBox>
                    <TextBox>Contracts minted</TextBox>
                  </BoxLeft>

                  <BoxRight>
                    <Box>
                      <Description>{`${dataPrice.cube} 0xB`}</Description>
                      <Description>{`Earn ${computeEarnedTokenPerDay(
                        dataPrice.cube,
                        dataApy.cube,
                      )} 0xB/day`}</Description>
                      <Description>{`${dataApy.cube}% APR`}</Description>
                    </Box>
                  </BoxRight>
                </BoxTotal>
              </Box>
            </div>

            <div className="item item3">
              <Box>
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
                      <Description>{`${dataApy.tesseract}% APR`}</Description>
                    </Box>
                  </BoxRight>
                </BoxTotal>
              </Box>
            </div>
          </div>
        </div>
        {/* </SliderScroll> */}
      </Box>
    </Wrapper>
  );
};

export default TotalMinted;
