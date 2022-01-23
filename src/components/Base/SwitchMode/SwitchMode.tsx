import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { styled } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';

import MySwitch from 'components/Base/Switch';

import LightSun from 'assets/images/light-sun.svg';

interface Props {
  mode: 'light' | 'dark';
  onChange: (value: any) => void;
}

const ButtonMode = styled(IconButton)<IconButtonProps>(() => ({
  border: '1px solid #3864FF',
  boxSizing: 'border-box',
  boxShadow: '0px 12px 11px -10px rgba(0, 0, 0, 0.25)',
  borderRadius: '10px',
  width: '48px',
  height: '48px',
  padding: '11px',

  img: {
    width: '100%',
  },
}));

const SwitchMode: React.FC<Props> = ({ mode, onChange }) => {
  const [width] = useWindowSize();

  if (width < 900) {
    return (
      <ButtonMode onClick={onChange}>
        <img alt="" src={LightSun} />
      </ButtonMode>
    );
  } else {
    return <MySwitch checked={mode === 'light' ? true : false} onChange={onChange} />;
  }
};

export default SwitchMode;
