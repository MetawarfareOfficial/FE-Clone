import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError } from '@web3-react/core';
import Button from 'components/Base/Button';
import { toast } from 'react-toastify';
import { getSignerSignMessage } from 'helpers/signMessage';
import { useAppDispatch } from 'stores/hooks';
import { setAccount, unSetAccount } from 'services/account';

interface Props {
  name?: string;
}

const ConnectWallet: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { active, account, activate, deactivate, error } = useWeb3React<Web3Provider>();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

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
      {!active && <Button name={'Login'} handleClick={login} />}
      {active && <Button name={'Logout'} handleClick={logout} />}
    </div>
  );
};

export default ConnectWallet;
