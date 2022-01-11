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
        toast.error(`Wrong network`, { hideProgressBar: true });
        return;
      }

      if (signMessage) {
        await activate(injected);
        toast.success('Login successfully', { hideProgressBar: true });
      }
    } catch (ex: any) {
      toast.error(ex.message, { hideProgressBar: true });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await deactivate();
      toast.info('Logout successfully', { hideProgressBar: true });
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
