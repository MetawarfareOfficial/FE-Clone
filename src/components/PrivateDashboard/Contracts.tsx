import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Grid, Typography, TypographyProps } from '@mui/material';

interface Props {
  dataTokens: Array<any>;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const BoxContent = styled(Box)<BoxProps>(() => ({
  background: '#FFFFFF',
  boxShadow: '0px 20px 45px #F0EDF7',
  borderRadius: '10px',
  boxSizing: 'border-box',
  padding: '28px 22px',
  height: '100%',
}));

const BoxHeader = styled(Box)<BoxProps>(() => ({
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  borderRadius: '9px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
}));

const CoinItem = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '24px',
}));

const CoinDetail = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const ViewCoin = styled(Box)<BoxProps>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  width: '21px',
  height: '21px',
  marginRight: '6px',
}));

const Name = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '29px',
  alignItems: 'center',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  color: '#293247',
}));

const Price = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '29px',
  alignItems: 'center',
  letterSpacing: '0.04em',
  textTransform: 'capitalize',
  color: '#232859',
  marginLeft: 'auto',
}));

const Contracts: React.FC<Props> = ({ dataTokens }) => {
  return (
    <Wrapper>
      <Grid container spacing={'39px'}>
        {dataTokens.map((item, i) => (
          <Grid key={i} item xs={12} md={6} lg={3}>
            <BoxContent>
              <BoxHeader style={{ color: item.color, background: item.background }}>{item.title}</BoxHeader>

              {item.data.length > 0 &&
                item.data.map((coin: any, t: number) => (
                  <CoinItem key={t}>
                    <CoinDetail>
                      <ViewCoin>
                        <img alt="" src={coin.coin} />
                      </ViewCoin>
                      <Name>{coin.name}</Name>
                    </CoinDetail>

                    <Price>{coin.value}</Price>
                  </CoinItem>
                ))}
            </BoxContent>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Contracts;
