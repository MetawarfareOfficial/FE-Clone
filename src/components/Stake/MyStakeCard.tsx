import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps, Button, ButtonProps } from '@mui/material';

import OxToken from 'assets/images/0x-token.png';
import AvaxToken from 'assets/images/avax-token.png';

interface Props {
  title?: String;
  onClaimAll: () => void;
}

interface LineProps {
  color: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  background: '#FFFFFF',
  border: '1px solid rgba(41, 50, 71, 0.09)',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 17px rgba(213, 215, 222, 0.24)',
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

const Title = styled(Typography)<TypographyProps>(() => ({
  marginLeft: '10px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '22px',
  lineHeight: '26px',
  letterSpacing: '0.025em',
  color: '#293247',
}));

const BoxContent = styled(Box)<BoxProps>(() => ({
  width: '100%',
  padding: '36px 37px 24px',
  boxSizing: 'border-box',
}));

const BoxActions = styled(Box)<BoxProps>(() => ({
  width: '100%',
  textAlign: 'center',
}));

const ViewValue = styled(Box)<BoxProps>(() => ({
  maxWidth: '476px',
  margin: '0 auto 28px',
  border: '1px solid rgba(41, 50, 71, 0.09)',
  borderRadius: '11px',
  padding: '19px 28px 18px',
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',

  h3: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    color: 'rgba(41, 50, 71, 0.7)',
    margin: '0 ',
  },

  h4: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.025em',
    color: '#293247',
    margin: '0 0 0 56px',
  },
}));

const Line = styled(Box)<LineProps>(({ color }) => ({
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
  },
}));

const ButtonClaim = styled(Button)<ButtonProps>(() => ({
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
}));

const MyStakeCard: React.FC<Props> = ({ onClaimAll }) => {
  return (
    <Wrapper>
      <BoxHeader>
        <ViewIcon>
          <img alt="" src={OxToken} />
        </ViewIcon>
        <ViewIcon>
          <img alt="" src={AvaxToken} />
        </ViewIcon>
        <Title>0xB/AVAX</Title>
      </BoxHeader>

      <BoxContent>
        <Line color="rgba(41, 50, 71, 0.7)">
          <p>Liquidity</p>
          <p>APR</p>
          <p>Your Stake</p>
          <p>your share</p>
        </Line>
        <Line color="#293247">
          <h4>$46380</h4>
          <h4>49%</h4>
          <h4>600</h4>
          <h4>50%</h4>
        </Line>
      </BoxContent>

      <BoxActions>
        <ViewValue>
          <h3>rewards</h3>
          <h4>600xB</h4>
          <h4>$120</h4>
          <ButtonClaim variant="contained" onClick={onClaimAll}>
            Claim All
          </ButtonClaim>
        </ViewValue>
      </BoxActions>
    </Wrapper>
  );
};

export default MyStakeCard;
