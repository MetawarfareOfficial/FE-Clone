import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, PaperProps, Box, BoxProps, Typography, TypographyProps, Button, ButtonProps } from '@mui/material';

import LineChart from 'components/Base/LineChart';
import MintContractModal from 'components/Base/MintContractModal';
import MintStatusModal from 'components/Base/MintStatusModal';

interface Props {
  id: any;
  icon: string;
  name: string;
  value: number;
  apy: number;
  earn: number;
  color: string;
  colorChart: string;
  dataChart: Array<any>;
}

const Wrapper = styled(Paper)<PaperProps>(() => ({
  width: '100%',
  marginBottom: '15px',
  padding: '12px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '24px',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
}));

const BoxContract = styled(Box)<BoxProps>(() => ({
  padding: '10px 17px',
  display: 'inline-flex',
  alignItems: 'center',
  width: '286px',
  boxShadow: '0px 14px 26px -2px rgba(0, 0, 0, 0.08)',
  borderRadius: '15px',
}));

const ViewImage = styled(Box)<BoxProps>(() => ({
  width: '43px',
  height: '43px',
}));

const Name = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'Poppins',
  color: '#293247',
  fontSize: '16px',
  lineHeight: '24px',
  textTransform: 'uppercase',
  fontWeight: 600,
  margin: '0 0 0 10px',
}));

const ViewInfo = styled(Box)<BoxProps>(() => ({
  display: 'inline-flex',
  width: 'calc(100% - 286px)',
  alignItems: 'center',
  height: '100%',
  paddingLeft: '48px',
  paddingRight: '10px',
}));

const BoxDetail = styled(Box)<BoxProps>(() => ({
  marginLeft: 'auto',
  display: 'inline-flex',
  alignItems: 'center',
}));

const Text = styled(Typography)<TypographyProps>(() => ({
  color: '#293247',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  minWidth: '114px',
}));

const ButtonMint = styled(Button)<ButtonProps>(() => ({
  fontSize: '14px',
  lineHeight: '21px',
  padding: '12px',
  width: '158px',
  borderRadius: ' 14px',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  marginLeft: '40px',
}));

const STATUS = ['success', 'error', 'pending'];

const TypeReward: React.FC<Props> = ({ icon, name, value, apy, earn, color, colorChart, dataChart }) => {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleStatus = () => {
    setOpenStatus(!openStatus);
  };

  const handleSubmit = () => {
    setOpen(false);
    setStatus(STATUS[Math.floor(Math.random() * STATUS.length)]);
    setOpenStatus(true);
  };

  return (
    <Wrapper>
      <BoxContract sx={{ backgroundColor: color }}>
        <ViewImage>
          <img alt="" src={icon} width="100%" />
        </ViewImage>
        <Name>{name}</Name>
      </BoxContract>

      <ViewInfo>
        <Text>{value} 0xB</Text>
        <Text>{apy}% APY</Text>
        <Text>Earn {earn} 0xB/day</Text>

        <BoxDetail>
          <div style={{ width: '143px', height: '37px' }}>
            <LineChart data={dataChart} color={colorChart} />
          </div>

          <ButtonMint variant="outlined" color="primary" onClick={handleToggle}>
            Mint
          </ButtonMint>
        </BoxDetail>
      </ViewInfo>

      <MintContractModal
        icon={icon}
        name={name}
        maxMint={10}
        contracts={['Name']}
        open={open}
        onClose={handleToggle}
        onSubmit={handleSubmit}
      />

      <MintStatusModal
        icon={icon}
        name={name}
        open={openStatus}
        status={status}
        text={
          status === 'success'
            ? 'Rewards claimed successfully'
            : status === 'error'
            ? 'Contract minting failed'
            : status === 'pending'
            ? 'Processing'
            : 'Insufficient Tokens'
        }
        onClose={handleToggleStatus}
      />
    </Wrapper>
  );
};

export default TypeReward;
