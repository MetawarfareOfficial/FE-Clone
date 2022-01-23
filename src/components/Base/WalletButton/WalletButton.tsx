import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';

import LightWallet from 'assets/images/light-wallet.svg';

interface Props {
  mode?: string;
  onChange: (value: any) => void;
}

const ButtonMode = styled(IconButton)<IconButtonProps>(() => ({
  background: ' #DADADA',
  boxShadow: '0px 12px 11px -10px rgba(0, 0, 0, 0.25)',
  boxSizing: 'border-box',
  borderRadius: '10px',
  width: '48px',
  height: '48px',
  padding: '11px',
  marginLeft: '12px',

  img: {
    width: '100%',
  },

  ['&:hover']: {
    opacity: '0.7',
    background: ' #DADADA',
  },
}));

const WalletButton: React.FC<Props> = ({ onChange }) => {
  return (
    <ButtonMode onClick={onChange}>
      <img alt="" src={LightWallet} />
    </ButtonMode>
  );
};

export default WalletButton;
