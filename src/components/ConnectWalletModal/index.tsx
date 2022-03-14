import { Box, BoxProps, Dialog, DialogProps, Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface WalletItem {
  id: string;
  img: string;
  name: string;
  content: string;
  handleConnectWallet: (id: string) => Promise<void>;
}

interface Props {
  open: boolean;
  onClose: () => void;
  data: WalletItem[];
}

const BootstrapDialog = styled(Dialog)<DialogProps>(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    maxWidth: '400px',
    minWidth: 'fit-content',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const WalletName = styled(Typography)<TypographyProps>(() => ({
  fontSize: '24px',
  fontWeight: '700',
  width: '100%',
  textAlign: 'center',
  color: 'rgb(12, 12, 13)',
  marginTop: '12px',
}));

const ImageBox = styled(Box)<BoxProps>(() => ({
  width: '45px',
  height: '45px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const WalletItem = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid rgba(195, 195, 195, 0.14)',
  padding: '24px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  ['&:hover']: {
    backgroundColor: 'rgba(195, 195, 195, 0.14)',
  },
}));

const TextContent = styled(Box)<BoxProps>(() => ({
  width: '100%',
  fontSize: '18px',
  margin: '0.333em 0px',
  color: ' rgb(169, 169, 188)',
  textAlign: 'center',
}));

export const ConnectWalletModal = ({ open, data, onClose }: Props) => {
  return (
    <BootstrapDialog onClose={onClose} className="Wallet-dialog" open={open}>
      {data.map((item) => {
        return (
          <WalletItem
            key={item.id}
            onClick={() => {
              item.handleConnectWallet(item.id);
            }}
          >
            <ImageBox>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                }}
                src={item.img}
              />
            </ImageBox>
            <WalletName>{item.name}</WalletName>
            <TextContent>{item.content}</TextContent>
          </WalletItem>
        );
      })}
    </BootstrapDialog>
  );
};
