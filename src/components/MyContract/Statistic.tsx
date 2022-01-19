import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';

interface Props {
  icon?: string;
  title: string;
  value: string;
  color: string;
  text?: string;
}

interface BoxCustomProps {
  color: string;
}

const Wrapper = styled(Box)<BoxCustomProps>(({ color, theme }) => ({
  background: color,
  padding: '20px 20px',
  borderRadius: '20px',
  boxShadow: '1px 19px 22px -16px rgba(50, 71, 117, 0.18)',
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('lg')]: {
    padding: '12px 14px',
  },
}));

const ViewImage = styled(Box)<BoxProps>(({ theme }) => ({
  width: '43px',
  heigh: '43px',
  marginRight: '10px',

  img: {
    width: '100%',
  },

  [theme.breakpoints.down('lg')]: {
    width: '30px',
    height: '30px',
  },
}));

const Content = styled(Box)<BoxProps>(() => ({}));

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontWeight: '600',
  fontSize: '20px',
  lineHeight: '30px',
  color: '#293247',
  textTransform: 'uppercase',
  margin: '0',

  [theme.breakpoints.down('lg')]: {
    fontSize: '15px',
    lineHeight: '22px',
  },
}));

const Description = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: 'rgba(41, 50, 71, 0.35)',
  fontWeight: 'normal',
  fontFamily: 'Poppins',
  fontSize: '12px',
  lineHeight: '18px',
  textTransform: 'capitalize',
  margin: 0,

  [theme.breakpoints.down('lg')]: {
    fontSize: '10px',
    lineHeight: '14px',
  },
}));

const Value = styled(Typography)<TypographyProps>(({ theme }) => ({
  padding: '13px 18px',
  backgroundColor: '#fff',
  color: '#293247',
  boxSizing: 'border-box',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '23px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.13)',
  borderRadius: '12px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '16px',
    lineHeight: '22px',
    padding: '8px',
    minWidth: '38px',
  },
}));

const Statistic: React.FC<Props> = ({ icon, title, value, color, text }) => {
  return (
    <Wrapper color={color}>
      {icon && (
        <ViewImage>
          <img alt="" src={icon} />
        </ViewImage>
      )}

      <Content>
        <Title>{title}</Title>
        {text && <Description>{text}</Description>}
      </Content>
      <Value>{value}</Value>
    </Wrapper>
  );
};

export default Statistic;
