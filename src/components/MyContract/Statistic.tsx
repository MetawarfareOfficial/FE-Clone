import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { useAppSelector } from 'stores/hooks';
import { formatPrice } from '../../helpers/formatPrice';

interface Props {
  icon?: string;
  title: string;
  value: string;
  color: string;
  text?: string;
}

interface BoxCustomProps {
  color: string;
  opacity?: string;
}

const Wrapper = styled(Box)<BoxCustomProps>(({ color, opacity }) => ({
  background: color,
  opacity: opacity,
  padding: '20px 20px',
  borderRadius: '20px',
  boxShadow: '1px 19px 22px -16px rgba(50, 71, 117, 0.18)',
  display: 'flex',
  alignItems: 'center',
}));

const ViewImage = styled(Box)<BoxProps>(() => ({
  width: '43px',
  height: '43px',
  marginRight: '10px',

  img: {
    width: '100%',
  },
}));

const Content = styled(Box)<BoxProps>(() => ({}));

const Title = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontWeight: '600',
  fontSize: '20px',
  lineHeight: '30px',
  color: '#293247',
  textTransform: 'uppercase',
  margin: '0',
}));

const Description = styled(Typography)<TypographyProps>(() => ({
  color: 'rgba(41, 50, 71, 0.35)',
  fontWeight: 'normal',
  fontFamily: 'Poppins',
  fontSize: '12px',
  lineHeight: '18px',
  textTransform: 'capitalize',
  margin: 0,
}));

const Value = styled(Typography)<TypographyProps>(() => ({
  padding: '13px 18px',
  backgroundColor: '#fff',
  color: '#293247',
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
}));

const Statistic: React.FC<Props> = ({ icon, title, value, color, text }) => {
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const opacity = currentUserAddress && Number(value) > 0 ? '1' : '0.5';

  return (
    <Wrapper color={color} opacity={opacity}>
      {icon && (
        <ViewImage>
          <img alt="" src={icon} />
        </ViewImage>
      )}

      <Content>
        <Title>{title}</Title>
        {text && <Description>{text}</Description>}
      </Content>
      <Value>{formatPrice(value)}</Value>
    </Wrapper>
  );
};

export default Statistic;
