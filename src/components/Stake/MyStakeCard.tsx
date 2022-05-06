import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps, Button, ButtonProps } from '@mui/material';

import OxToken from 'assets/images/0x-token.png';
import AvaxToken from 'assets/images/avax-token.png';
import { PoolItem } from 'services/staking';
import { formatForNumberLessThanCondition } from 'helpers/formatForNumberLessThanCondition';
import { formatPercent, formatPrice } from 'helpers/formatPrice';

interface Props {
  title?: String;
  onClaimAll: () => void;
  data: PoolItem;
}

interface LineProps {
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#171717',
  border: '1px solid rgba(41, 50, 71, 0.09)',
  boxSizing: 'border-box',
  boxShadow: theme.palette.mode === 'light' ? '0px 2px 17px rgba(213, 215, 222, 0.24)' : 'unset',
  borderRadius: '11px',
}));

const BoxHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '29px 24px 24px',
  boxSizing: 'border-box',
  borderBottom: '1px solid rgba(41, 50, 71, 0.09)',
}));

const ViewIcon = styled(Box)<BoxProps>(() => ({
  width: '33px',
  height: '33px',
  borderRadius: '50%',
  overflow: 'hidden',
  marginRight: '8px',

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

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  padding: '36px 37px 24px',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    padding: '36px 14px 24px',
  },
}));

const BoxActions = styled(Box)<BoxProps>(() => ({
  width: '100%',
  textAlign: 'center',
}));

const Info = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    marginBottom: '16px',
  },
}));

const ViewValue = styled(Box)<BoxProps>(({ theme }) => ({
  maxWidth: '560px',
  margin: '0 auto 28px',
  border: '1px solid rgba(41, 50, 71, 0.09)',
  borderRadius: '11px',
  padding: '19px 28px 18px',
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    display: 'inline-block',
    maxWidth: '314px',
  },

  '@media(max-width: 320px)': {
    maxWidth: '90%',
  },

  h3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    color: theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    margin: '0 ',

    '@media(max-width: 320px)': {
      fontSize: '12px',
    },
  },

  h4: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.025em',
    color: theme.palette.mode === 'light' ? '#293247' : '#fff',
    margin: '0 0 0 56px',

    '@media(max-width: 320px)': {
      fontSize: '14px',
      margin: '0 0 0 24px',
    },
  },
}));

const Line = styled(Box)<LineProps>(({ color, theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '19px',

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
    width: '25%',

    '&:first-child': {
      textAlign: 'left',
    },

    '&:last-child': {
      textAlign: 'right',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      minWidth: '60px',
      margin: 'auto',

      '&:first-child': {
        marginLeft: '0',
      },

      '&:last-child': {
        marginRight: '0',
      },
    },

    '@media(max-width: 320px)': {
      fontSize: '11px',
      minWidth: '45px',
    },
  },

  h4: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'center',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    color: color,
    margin: '0 0',
    minWidth: '100px',
    width: '25%',

    '&:first-child': {
      textAlign: 'left',
    },

    '&:last-child': {
      textAlign: 'right',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      minWidth: '60px',
      margin: 'auto',
      textAlign: 'left',

      '&:first-child': {
        marginLeft: '0',
      },

      '&:last-child': {
        textAlign: 'center',
        marginRight: '0',
      },
    },

    '@media(max-width: 320px)': {
      fontSize: '13px',
      minWidth: '45px',
    },
  },
}));

const ButtonClaim = styled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '21px',
  textAlign: 'center',
  background: '#3864FF',
  color: '#fff',
  textTransform: 'capitalize',
  height: '41px',
  borderRadius: '14px',
  boxShadow: 'none',
  padding: '10px 10px',
  marginLeft: '32px',
  minWidth: '122px',

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

  [theme.breakpoints.down('sm')]: {
    borderRadius: '10px',
  },
}));

const MyStakeCard: React.FC<Props> = ({ onClaimAll, data }) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <BoxHeader>
        <ViewIcon>
          <img alt="" src={OxToken} />
        </ViewIcon>
        <ViewIcon>
          <img alt="" src={AvaxToken} />
        </ViewIcon>
        <Title>{data.title}</Title>
      </BoxHeader>

      <BoxContent>
        <Line color={theme.palette.mode === 'light' ? 'rgba(41, 50, 71, 0.7)' : 'rgba(255, 255, 255, 0.7)'}>
          <p>Liquidity</p>
          <p>APR</p>
          <p>Your Stake</p>
          <p>your share</p>
        </Line>
        <Line color={theme.palette.mode === 'light' ? '#293247' : '#fff'}>
          <h4>
            $
            {formatForNumberLessThanCondition({
              value: data.liquidity,
              addLessThanSymbol: true,
              minValueCondition: '0.000001',
              callback: formatPercent,
              callBackParams: [6],
            })}
          </h4>
          <h4>{formatPercent(data.apr, 2)}%</h4>
          <h4>
            {formatForNumberLessThanCondition({
              value: data.yourTotalStakedAmount,
              addLessThanSymbol: true,
              minValueCondition: '0.000001',
              callback: formatPercent,
              callBackParams: [6],
            })}
          </h4>
          <h4>{formatPercent(data.yourShare)}%</h4>
        </Line>
      </BoxContent>

      <BoxActions>
        <ViewValue>
          <Info>
            <h3>rewards</h3>
            <h4>
              {formatForNumberLessThanCondition({
                value: data.yourTotalRewardAmount,
                addLessThanSymbol: true,
                minValueCondition: '0.000001',
                callback: formatPercent,
                callBackParams: [4],
              })}{' '}
              0xB
            </h4>
            <h4>
              $
              {formatForNumberLessThanCondition({
                value: data.yourTotalRewardValue,
                addLessThanSymbol: true,
                minValueCondition: '0.000001',
                callback: formatPrice,
                callBackParams: [4],
              })}
            </h4>
          </Info>

          <ButtonClaim variant="contained" onClick={onClaimAll}>
            Claim All
          </ButtonClaim>
        </ViewValue>
      </BoxActions>
    </Wrapper>
  );
};

export default MyStakeCard;
