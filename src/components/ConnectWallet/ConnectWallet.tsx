import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError } from '@web3-react/core';
import { toast } from 'react-toastify';
import { getSignerSignMessage } from 'helpers/signMessage';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { setAccount, unSetAccount } from 'services/account';
import { styled } from '@mui/material/styles';
import { ButtonProps, Button } from '@mui/material';
import { errorMessage } from 'messages/errorMessages';
import { successMessage } from 'messages/successMessages';

interface Props {
  name?: string;
}

const ButtonConnect = styled(Button)<ButtonProps>(() => ({
  textDecoration: 'none',
  borderRadius: '14px',
  padding: '12px 20px',
  textTransform: 'unset',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'bold',
}));

const ConnectWallet: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { active, account, activate, deactivate, error } = useWeb3React<Web3Provider>();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const currentUserAddress = useAppSelector((state) => state.user.account?.address);

  const login = async (): Promise<void> => {
    try {
      const signMessage = await getSignerSignMessage();

      if (isUnsupportedChainIdError) {
        toast.error(errorMessage.META_MASK_WRONG_NETWORK, { hideProgressBar: true });
        return;
      }

      if (signMessage) {
        await activate(injected);
        toast.success(successMessage.META_MASK_CONNECT_SUCCESSFULLY, { hideProgressBar: true });
      }
    } catch (ex: any) {
      toast.error(ex.message, { hideProgressBar: true });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await deactivate();
      toast.info(successMessage.META_MASK_DISCONNECT_SUCCESSFULLY, { hideProgressBar: true });
    } catch (ex: any) {
      toast.error(ex.message, { hideProgressBar: true });
    }
  };

  useEffect(() => {
    if (account && active) {
      dispatch(setAccount({ address: account }));
      return;
    }
    dispatch(unSetAccount);
  }, [account, active]);

  return (
    <div>
      {!active && (
        <ButtonConnect variant="outlined" color="primary" onClick={login}>
          Connect Wallet
        </ButtonConnect>
      )}
      {active && (
        <div>
          <span>{currentUserAddress}</span>
          <ButtonConnect variant="outlined" color="primary" onClick={logout}>
            Disconnect Wallet
          </ButtonConnect>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
