import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps, Button, ButtonProps, Grid } from '@mui/material';

import OxToken from 'assets/images/0x-token.png';
import AvaxToken from 'assets/images/avax-token.png';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatPercent } from 'helpers/formatPrice';
import { useWeb3React } from '@web3-react/core';

interface Props {
  title: String;
  onNext: (value: number) => void;
  liquidity: string;
  apr: string;
  stakedAmount: string;
  id: number;
  onClaimAll: () => void;
}

interface LineProps {
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
  boxSizing: 'border-box',
  boxShadow:
    theme.palette.mode === 'light' ? '0px 2px 17px rgba(213, 215, 222, 0.24)' : '0px 2px 17px rgba(17, 18, 19, 0.24)',
  borderRadius: '27px 27px 27px 29px',
  padding: '35px 49px 35px 42px',

  [theme.breakpoints.down('sm')]: {
    padding: '34px 30px',
  },

  '@media(max-width: 320px)': {
    padding: '26px 20px',
  },
}));

const BoxHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '42px',
}));

const ViewIcon = styled(Box)<BoxProps>(() => ({
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  overflow: 'hidden',
  marginRight: '9px',

  img: {
    maxWidth: '100%',
  },
}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginLeft: '10px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '22px',
  lineHeight: '26px',
  letterSpacing: '0.025em',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
}));

const BoxContent = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const BoxActions = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginTop: '46px',
}));

const Line = styled(Box)<LineProps>(({ color }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '19px',
  overflow: 'hidden',

  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: 'center',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    color: color,
    margin: '0 0',
    minWidth: '100px',

    '&:first-child': {
      marginRight: 'auto',
      textAlign: 'left',
    },

    '&:last-child': {
      marginLeft: 'auto',
      textAlign: 'right',
    },

    '@media(max-width: 320px)': {
      minWidth: '70px',
    },
  },

  h4: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '18px',
    textAlign: 'center',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    color: color,
    margin: '0 0',
    minWidth: '100px',

    '&:first-child': {
      marginRight: 'auto',
      textAlign: 'left',
    },

    '&:last-child': {
      marginLeft: 'auto',
      textAlign: 'center',
    },

    '@media(max-width: 320px)': {
      minWidth: '70px',
    },
  },
}));

const ButtonStake = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
  color: '#3864FF',
  textTransform: 'capitalize',
  border: '1px solid #3864FF',
  height: '46px',
  borderRadius: '14px',

  '&:hover': {
    background: '#3864FF',
    borderColor: '#3864FF',
    color: '#fff',
  },
}));

const ButtonClaim = styled(Button)<ButtonProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
  background: '#3864FF',
  color: '#fff',
  textTransform: 'capitalize',
  // border: '1px solid #3864FF',
  height: '46px',
  borderRadius: '14px',
  boxShadow: 'none',

  '&:disabled': {
    background: 'rgba(56, 100, 255, 0.16)',
    color: '#fff',
  },

  '&:hover': {
    background: '#1239C4',
    color: '#fff',
    outline: 'none',
    boxShadow: 'none',
  },
}));

const PoolCard: React.FC<Props> = ({ onNext, title, liquidity, apr, stakedAmount, id, onClaimAll }) => {
  const theme = useTheme();
  const { account } = useWeb3React();
  return (
    <Wrapper>
      <BoxHeader>
        <ViewIcon>
          <img alt="" src={OxToken} />
        </ViewIcon>
        <ViewIcon>
          <img alt="" src={AvaxToken} />
        </ViewIcon>
        <Title>{title}</Title>
      </BoxHeader>

      <BoxContent>
        <Line color={theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.7)' : 'rgba(255, 255, 255, 0.7)'}>
          <p>Liquidity</p>
          <p>APR</p>
          <p>Your Stake</p>
        </Line>
        <Line color={theme.palette.mode === 'light' ? '#293247' : '#fff'}>
          <h4>
            $
            {formatForNumberLessThanCondition({
              value: liquidity,
              minValueCondition: '0.000001',
              addLessThanSymbol: true,
              callback: formatPercent,
              callBackParams: [6],
            })}
          </h4>
          <h4>
            {formatForNumberLessThanCondition({
              value: apr,
              minValueCondition: '0.01',
              addLessThanSymbol: true,
              callback: formatPercent,
              callBackParams: [2],
            })}
            %
          </h4>
          <h4>
            {stakedAmount !== '0'
              ? formatForNumberLessThanCondition({
                  value: apr,
                  minValueCondition: '0.000001',
                  addLessThanSymbol: true,
                  callback: formatPercent,
                  callBackParams: [6],
                })
              : '0.0'}{' '}
            LP
          </h4>
        </Line>
      </BoxContent>

      <BoxActions>
        <Grid container spacing={'39px'}>
          <Grid item md={6}>
            {account && (
              <ButtonStake
                variant="outlined"
                fullWidth
                onClick={() => {
                  onNext(id);
                }}
              >
                Stake
              </ButtonStake>
            )}
          </Grid>
          <Grid item md={6}>
            {Number(stakedAmount) > 0 && (
              <ButtonClaim variant="contained" fullWidth onClick={onClaimAll}>
                Claim
              </ButtonClaim>
            )}
          </Grid>
        </Grid>
      </BoxActions>
    </Wrapper>
  );
};

export default PoolCard;
