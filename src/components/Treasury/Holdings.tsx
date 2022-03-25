import React, { useEffect, useState } from 'react';
import 'styles/menus.css';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { dataHoldings } from './data';
import TableTokens from 'components/Base/TableTokens';
import { useAppSelector } from 'stores/hooks';
import { useFetchHoldingsWalletAddress } from 'helpers/useFetchHoldingsWalletAddress';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

interface Props {
  title?: string;
}

interface BoxCustomProps {
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: '34px',
  marginTop: '36px',

  [theme.breakpoints.down('sm')]: {
    margin: '44px 0',
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '14px',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: theme.palette.mode === 'light' ? 'Roboto' : 'Poppins',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  color: theme.palette.mode === 'light' ? '#293247' : '#828282',
  marginBottom: '30px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    marginBottom: '36px',
    fontSize: '24px',
    lineHeight: '36px',
    color: theme.palette.mode === 'light' ? '#293247' : '#828282',
  },
}));

const BoxItem = styled(Box)<BoxProps>(({ theme }) => ({
  background:
    theme.palette.mode === 'light'
      ? '#FFFFFF'
      : `linear-gradient(136.53deg, rgba(255, 255, 255, 0.126) 1.5%, rgba(255, 255, 255, 0) 48.05%, 
        rgba(255, 255, 255, 0.1739) 107.89%)`,
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  minHeight: '288px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.05)',
  position: 'relative',
  padding: '1px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    minHeight: '140px',
    width: '265px',
    marginRight: '32px',
  },
}));

const BoxDetail = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '20px',
  overflow: 'hidden',
  height: '100%',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#252525',

  [theme.breakpoints.up('xl')]: {
    minHeight: '200px',
  },
  [theme.breakpoints.down('lg')]: {
    minHeight: '140px',
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '140px',
    width: 'auto',
    marginRight: '0',
  },
}));

const BoxHeader = styled(Box)<BoxCustomProps>(({ color, theme }) => ({
  padding: '8px 26px',
  background: color,
  fontFamily: 'Poppins',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#11151D',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden !important',
  textOverflow: 'ellipsis',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '24px',
    padding: '8px 20px',
    maxWidth: '100%',
  },
}));

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '4px 8px',
  height: 'calc(100% - 43px)',
  background: theme.palette.mode === 'light' ? '#fff' : '#252525',
}));

const Holdings: React.FC<Props> = () => {
  const theme = useTheme();

  const { holdingsData } = useAppSelector((state) => state.holdings);

  const [dataHoldingsResources, setDataHoldingsResources] = useState<any[]>([]);

  useFetchHoldingsWalletAddress();

  useEffect(() => {
    const _data = dataHoldings.map((item) => ({ ...item, resources: holdingsData[item.key] }));
    setDataHoldingsResources(_data);
  }, [holdingsData]);

  const settings = {
    infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
  };

  return (
    <Wrapper>
      <Title>Holdings</Title>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Box>
          <Slider {...settings}>
            {dataHoldingsResources.map((item, i) => (
              <Box key={i}>
                <BoxItem sx={{ cursor: 'pointer', margin: '31px 31px 31px 0' }}>
                  <BoxDetail>
                    <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>
                      {item.title}
                    </BoxHeader>

                    <BoxContent>
                      <TableTokens fontSize="12px" data={item.resources} />
                    </BoxContent>
                  </BoxDetail>
                </BoxItem>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <div className="scroll-area scroll-area--horizontal">
          <div className="scroll-area__body">
            {dataHoldingsResources.map((item, i) => (
              <div key={i} className={`scroll-area__column item${i + 1}`}>
                <BoxItem>
                  <BoxDetail>
                    <BoxHeader color={theme.palette.mode === 'light' ? item.color : item.colorDark}>
                      {item.title}
                    </BoxHeader>

                    <BoxContent>
                      <TableTokens fontSize="12px" data={item.resources} />
                    </BoxContent>
                  </BoxDetail>
                </BoxItem>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

export default Holdings;
