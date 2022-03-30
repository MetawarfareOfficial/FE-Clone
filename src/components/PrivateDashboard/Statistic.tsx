import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

interface Props {
  data: Array<any>;
}

const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  margin: '40px 0',

  [theme.breakpoints.down('lg')]: {
    display: 'inline-block',
  },

  [theme.breakpoints.down('md')]: {
    display: 'inline-block',
    margin: 0,
  },
}));

const ViewLogo = styled(Box)<BoxProps>(() => ({
  width: '53px',
  height: '53px',
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    height: '21px',
  },
}));

const BoxItem = styled(Box)<BoxProps>(({ theme }) => ({
  width: 'calc((100% - (68px * 4)) / 5)',
  display: 'inline-flex',
  padding: '20px',
  boxSizing: 'border-box',
  background: '#FFFFFF',
  boxShadow: '0px 20px 45px #F0EDF7',
  borderRadius: '10px',
  margin: '0 34px',

  '&:first-child': {
    marginLeft: '0',
  },

  '&:last-child': {
    marginRight: '0',
  },

  [theme.breakpoints.down('xl')]: {
    width: 'calc((100% - (30px * 4)) / 5)',
    margin: '0 15px',
  },

  [theme.breakpoints.down('lg')]: {
    width: 'calc((100% - 40px) / 2)',
    margin: '0 0 40px',
    float: 'left',

    '&:nth-child(even)': {
      marginLeft: '40px',
    },
  },

  [theme.breakpoints.down('md')]: {
    border: '1px solid #E1E8FF',
    boxShadow: 'unset',
    width: 'calc((100% - 24px) / 2)',
    margin: '0 0 24px',
    padding: '19px',
    height: '100%',

    '&:nth-child(even)': {
      marginLeft: '24px',
    },
  },

  [theme.breakpoints.down('sm')]: {
    '&:last-child': {
      width: '100%',
    },
  },

  '@media(max-width: 375px)': {
    padding: '14px',
    minHeight: '158px',
  },

  '@media(max-width: 320px)': {
    width: '100%',
    margin: '0 0 20px',

    '&:nth-child(even)': {
      marginLeft: '0px',
    },
  },

  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'capitalize',
    color: '#5A5881',
    margin: '19px 0 4px',

    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      lineHeight: '21px',
    },

    '@media(max-width: 375px)': {
      fontSize: '12px',
    },
  },

  h4: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '30px',
    lineHeight: '45px',
    textTransform: 'capitalize',
    color: '#15134B',
    margin: '0',

    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
      lineHeight: '36px',
    },
  },
}));

const Statistic: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      {data.map((item, i) => (
        <BoxItem key={i}>
          <Box>
            <ViewLogo style={{ background: item.color }}>
              <img alt="" src={item.icon} />
            </ViewLogo>
            <p>{item.name}</p>
            <h4>{item.value}</h4>
          </Box>
        </BoxItem>
      ))}
    </Wrapper>
  );
};

export default Statistic;
