import React, { useEffect, useState } from 'react';
import 'styles/menus.css';
import { styled } from '@mui/material/styles';

import { Box, Grid, Typography, Button, ButtonProps, BoxProps, TypographyProps } from '@mui/material';
import { TokenPrice } from 'interfaces/TokenPrice';
import { useAppSelector } from 'stores/hooks';
import { formatPrice } from 'helpers/formatPrice';
import { StatisticDashboard } from 'interfaces/StatisticDashboard';
import { useHistory } from 'react-router-dom';

import TokenBg from 'assets/images/bg-token.png';

interface Props {
  title?: string;
  data?: TokenPrice;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 0,

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
  },
}));

const CardBox = styled(Box)<BoxProps>(({ theme }) => ({
  background:
    theme.palette.mode === 'light'
      ? 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%)'
      : `url(${TokenBg}) no-repeat center -2px`,
  borderRadius: '20px',
  textAlign: 'center',
  padding: '27px',
  boxSizing: 'border-box',
  maxHeight: '190px',
  backdropFilter: 'blur(111px)',
  boxShadow: '0px 66px 35px -48px rgba(25, 21, 48, 0.13)',

  [theme.breakpoints.down('lg')]: {
    padding: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '14px',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    padding: '27px 14px 12px',
  },
}));

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? `#293247` : '#fff',
  background:
    theme.palette.mode === 'light'
      ? `${theme.palette.secondary}`
      : 'linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)',
  padding: '12px',
  width: '176px',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'bold',
  textTransform: 'unset',
  boxShadow: '0px 13px 27px rgba(26, 38, 70, 0.09)',
  borderRadius: '14px',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    width: '145px',
    padding: '10px',
    fontSize: '13px',
    lineHeight: '19px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '129px',
    padding: '7px',
    fontSize: '14px',
    lineHeight: '21px',
    borderRadius: '9px',
  },

  '&:hover': {
    cursor: 'pointer',
    opacity: 0.7,
    boxShadow: 'none',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: `#FFFFFF`,
  fontFamily: 'Roboto',
  margin: '15px 0',
  fontSize: '32px',
  lineHeight: '37px',
  fontWeight: 'bold',

  [theme.breakpoints.down('lg')]: {
    fontSize: '28px',
    lineHeight: '31px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    lineHeight: '28px',
    margin: '15px auto 21px',
  },
}));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.mode === 'light' ? `rgba(255, 255, 255, 0.54)` : '#656567',
  margin: '0 0',
  fontSize: '18px',
  lineHeight: '27px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontFamily: 'Poppins',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '22px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const SliderItem = styled(Box)<BoxProps>(() => ({}));

const Statistics: React.FC<Props> = ({ data }) => {
  const history = useHistory();
  const nodes = useAppSelector((state) => state.contract.nodes);
  const myReward = useAppSelector((state) => state.contract.dataRewardAmount);

  const [statistic, setStatistic] = useState<StatisticDashboard[]>([]);

  useEffect(() => {
    const slider: any = document.querySelector('.itemsStats');
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
    setStatistic([
      {
        title: 'Token Price',
        value: data?.price ? formatPrice(data.price) : '0.00',
        nameBtn: 'Buy now',
        linkTo: '',
      },
      {
        title: 'MY CONTRACTS',
        value: `${nodes}/100`,
        nameBtn: 'Mint Contract',
        linkTo: '/mint-contracts',
      },
      {
        title: 'My Rewards',
        value: formatPrice(`${myReward}`),
        nameBtn: 'Claim all',
        linkTo: '/my-contracts',
      },
    ]);
  }, [nodes, myReward, data?.price]);

  return (
    <Wrapper>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid container spacing={{ sm: '24px', md: '30px' }}>
          {statistic.map((item, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <CardBox>
                <Text variant="h5">{item.title}</Text>
                <Title variant="h2">{item.value}</Title>
                <CustomButton
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    history.push(item.linkTo);
                  }}
                >
                  {item.nameBtn}
                </CustomButton>
              </CardBox>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {/* <SliderScroll elRef={statsRef} settings={settings}> */}
        <div className="grid-item main">
          <div className="items itemsStats">
            {statistic.map((item, i) => (
              <div key={i} className={`item item${i + 1}`}>
                <SliderItem key={i}>
                  <CardBox>
                    <Text variant="h5">{item.title}</Text>
                    <Title variant="h2">{item.value}</Title>
                    <CustomButton
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        history.push(item.linkTo);
                      }}
                    >
                      {item.nameBtn}
                    </CustomButton>
                  </CardBox>
                </SliderItem>
              </div>
            ))}
          </div>
        </div>
        {/* </SliderScroll> */}
      </Box>
    </Wrapper>
  );
};

export default Statistics;
