import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { useAppSelector } from 'stores/hooks';
import { formatPrice } from 'helpers/formatPrice';

interface Props {
  icon?: any;
  title: string;
  value: string;
  color: string;
  text?: string;
  disabled?: boolean;
}

interface BoxCustomProps {
  color: string;
  opacity?: string;
}

interface TypographyCustomProps extends TypographyProps {
  rewards: boolean | any;
}

const Wrapper = styled(Box)<BoxCustomProps>(({ color, theme, opacity }) => ({
  background: color,
  opacity: opacity,
  padding: '20px 20px',
  borderRadius: '20px',
  boxShadow: '1px 19px 22px -16px rgba(50, 71, 117, 0.18)',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',

  [theme.breakpoints.down('lg')]: {
    padding: '12px 14px',
  },
}));

const WrapperMobile = styled(Box)<BoxCustomProps>(({ color, theme, opacity }) => ({
  width: '100%',
  display: 'none',
  background: color,
  padding: '16px 13px 21px 20px',
  borderRadius: '20px',
  boxShadow: '0px 28px 37px -17px rgba(25, 21, 48, 0.11)',
  boxSizing: 'border-box',
  height: '100%',
  opacity: opacity,

  [theme.breakpoints.down('sm')]: {
    display: 'inline-block',
  },
}));

const BoxHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '24px',
}));

const ViewImage = styled(Box)<BoxProps>(({ theme }) => ({
  width: '43px',
  height: '43px',
  marginRight: '10px',

  img: {
    width: '100%',
  },

  [theme.breakpoints.down('lg')]: {
    width: '30px',
    height: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '58px',
    height: '58px',
    marginRight: '9px',
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '30px',
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '18px',
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

const TotalMobile = styled(Typography)<TypographyCustomProps>(({ rewards }) => ({
  color: '#293247',
  boxSizing: 'border-box',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: rewards ? '24px' : '36px',
  lineHeight: rewards ? '28px' : '42px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'cal(100% - 67px)',
  // whiteSpace: 'nowrap',
  // overflow: 'hidden !important',
  // textOverflow: 'ellipsis',
}));

const Statistic: React.FC<Props> = ({ icon, title, value, color, text }) => {
  const [width] = useWindowSize();
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const opacity = currentUserAddress && Number(value) > 0 ? '1' : '0.5';

  if (width < 600) {
    return (
      <WrapperMobile color={color} opacity={opacity}>
        <BoxHeader>
          <ViewImage>
            <img alt="" src={icon} />
          </ViewImage>
          <TotalMobile rewards={title === 'Rewards'}>
            {title === 'Rewards' || title === 'My Rewards' ? formatPrice(value) : value}
          </TotalMobile>
        </BoxHeader>

        <Content>
          <Title>{title}</Title>
          {text && <Description>{text}</Description>}
        </Content>
      </WrapperMobile>
    );
  } else {
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
        <Value>{title === 'Rewards' || title === 'My Rewards' ? formatPrice(value) : value}</Value>
      </Wrapper>
    );
  }
};

export default Statistic;
