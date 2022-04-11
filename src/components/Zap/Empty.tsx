import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';

import EmptyIcon from 'assets/images/empty-zap.svg';
// import EmptyLinkIcon from 'assets/images/empty-link.svg';

interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const EmptyContent = styled(Box)<BoxProps>(() => ({}));

const ViewImg = styled(Box)<BoxProps>(() => ({}));

const Text = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '33px',
  textAlign: 'center',
  letterSpacing: '0.04em',
  color: '#9CA0AC',
  maxWidth: '321px',
}));

const Empty: React.FC<Props> = () => {
  return (
    <Wrapper>
      <EmptyContent>
        <ViewImg>
          <img alt="" src={EmptyIcon} width={264} />
        </ViewImg>
        <Text variant="body1">You need to connect your wallet to use ZAP feature.</Text>
      </EmptyContent>
    </Wrapper>
  );
};

export default Empty;
