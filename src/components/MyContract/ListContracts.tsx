import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Button, ButtonProps } from '@mui/material';

import ContractDetail from './ContractDetail';

interface Props {
  data: Array<any>;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '0 14px',
}));

const Actions = styled(Box)<BoxProps>(() => ({
  textAlign: 'right',
  width: '100%',
  marginBottom: '14px',
}));

const ButtonClaimAll = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  padding: '8px 10px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  width: '99px',
  height: '38px',
  boxSizing: 'border-box',

  '&:hover': {
    cursor: 'pointed',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    opacity: 0.7,
    boxShadow: 'none',
  },

  '&:disabled': {
    color: '#fff',
    background: '#E0E0E0',
  },
}));

const EmptyContracts = styled(Box)<BoxProps>(() => ({
  minHeight: '192px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#E0E0E0',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '28px',
  lineHeight: '33px',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.1)',
  borderRadius: '14px',
}));

const ListContracts: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Actions>
        <ButtonClaimAll size="small" variant="contained" color="primary" disabled={data.length === 0}>
          Claim all
        </ButtonClaimAll>
      </Actions>

      <Box>
        {data && data.length > 0 ? (
          data.map((item, i) => (
            <ContractDetail
              key={i}
              mintDate={item.mintDate}
              type={item.type}
              initial={item.initial}
              name={item.name}
              rewards={item.rewards}
              current={item.current}
            />
          ))
        ) : (
          <EmptyContracts>No contracts yet!</EmptyContracts>
        )}
      </Box>
    </Wrapper>
  );
};

export default ListContracts;
