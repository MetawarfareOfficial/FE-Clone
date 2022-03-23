import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

interface Props {
  data: Array<any>;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  margin: '40px 0',
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

const BoxItem = styled(Box)<BoxProps>(() => ({
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

  p: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'capitalize',
    color: '#5A5881',
    margin: '19px 0 4px',
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
