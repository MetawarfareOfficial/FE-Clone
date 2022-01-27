import React, { useEffect } from 'react';
import 'styles/menus.css';
import { styled } from '@mui/material/styles';

import { Box, BoxProps, Typography, TypographyProps, Grid } from '@mui/material';

interface Props {
  title?: string;
}

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
    maxWidth: '249px',
    margin: '0 auto 21px',
  },
}));

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  marginTop: '35px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
  },
}));

const BoxSale = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  padding: '20px 40px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '22px',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  height: '100%',
  minHeight: '123px',

  [theme.breakpoints.down('lg')]: {
    padding: '16px 24px',
    minHeight: '100px',
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '30px',
    maxWidth: '265px',
  },
}));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'normal',
  color: '#293247',
  fontFamily: 'Poppins',
  maxWidth: '186px',

  span: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '18px',
    whiteSpace: 'normal',
  },
}));

const Sale = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: '-25px',
  left: '-18px',
  zIndex: '2',
  width: '57px',
  height: '57px',
  borderRadius: '15px',
  boxShadow: '0px 14px 26px -2px rgba(0, 0, 0, 0.14)',
  background: 'linear-gradient(112.15deg, #A5C7FB -10.8%, #C0CAFF 107.36%)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '27px',
  textTransform: 'uppercase',
  color: '#fff',

  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '20px',
    width: '46px',
    height: '46px',
    top: '-22px',
    left: '-12px',
  },
}));

const SliderItem = styled(Box)<BoxProps>(() => ({
  paddingTop: '23px',
  paddingLeft: '13px',
}));

const Tokens: React.FC<Props> = () => {
  useEffect(() => {
    const slider: any = document.querySelector('.tokens');
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

  return (
    <Wrapper>
      <Title>Minted Contract Tokens Distribution</Title>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>10%</Sale>
              <Text>
                <span>Token</span> in Development/ Marketing Funds Wallet (100% USDC)
              </Text>
            </BoxSale>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>20%</Sale>
              <Text>
                <span>Token</span> in Liquidity Pool as 50% 0xB and 50% AVAX
              </Text>
            </BoxSale>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>20%</Sale>
              <Text>
                <span>Token</span> in Treasury Wallet as 100% USDC
              </Text>
            </BoxSale>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <BoxSale>
              <Sale>50%</Sale>
              <Text>
                <span>Token</span> in Rewards Wallet as 100% 0xB
              </Text>
            </BoxSale>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {/* <SliderScroll elRef={holdingRef} settings={settings}> */}

        <div className="grid-item main">
          <div className="items tokens">
            <div className="item item1">
              <SliderItem>
                <BoxSale>
                  <Sale>10%</Sale>
                  <Text>
                    <span>Token</span> in Development/ Marketing Funds Wallet (100% USDC)
                  </Text>
                </BoxSale>
              </SliderItem>
            </div>

            <div className="item item2">
              <SliderItem>
                <BoxSale>
                  <Sale>20%</Sale>
                  <Text>
                    <span>Token</span> in Liquidity Pool as 50% 0xB and 50% AVAX
                  </Text>
                </BoxSale>
              </SliderItem>
            </div>

            <div className="item item3">
              <SliderItem>
                <BoxSale>
                  <Sale>20%</Sale>
                  <Text>
                    <span>Token</span> in Treasury Wallet as 100% USDC
                  </Text>
                </BoxSale>
              </SliderItem>{' '}
            </div>

            <div className="item item4">
              <SliderItem>
                <BoxSale>
                  <Sale>50%</Sale>
                  <Text>
                    <span>Token</span> in Rewards Wallet as 100% 0xB
                  </Text>
                </BoxSale>
              </SliderItem>
            </div>
          </div>
        </div>
        {/* </SliderScroll> */}
      </Box>
    </Wrapper>
  );
};

export default Tokens;
