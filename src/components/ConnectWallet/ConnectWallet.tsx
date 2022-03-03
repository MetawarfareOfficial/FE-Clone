import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError } from '@web3-react/core';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { setAccount, setLogin, unSetAccount, unSetLogin } from 'services/account';
import { styled } from '@mui/material/styles';
import { ButtonProps, Button, Link, LinkProps } from '@mui/material';
import { errorMessage } from 'messages/errorMessages';
import { successMessage } from 'messages/successMessages';
import { isMetaMaskInstalled, onClickConnect, addEthereumChain, getSignerSignMessage } from 'helpers';
import { authenticateUser, getToken, unAuthenticateUser } from 'services/auth';
import useFetchRewardAmount from 'hooks/useFetchRewardAmount';
import WalletButton from 'components/Base/WalletButton';
import { useWindowSize } from 'hooks/useWindowSize';
import { useToast } from 'hooks/useToast';
import useMobileChangeAccountMetamask from 'hooks/useMobileChangeAccountMetamask';
interface Props {
  name?: string;
}

const ButtonConnect = styled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  textDecoration: 'none',
  borderRadius: '14px',
  padding: '12px 20px',
  textTransform: 'unset',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 'bold',
  color: theme.palette.primary[theme.palette.mode],
  border: `1px solid ${theme.palette.primary[theme.palette.mode]}`,

  '&:hover': {
    color: theme.palette.primary[theme.palette.mode],
    border: `1px solid ${theme.palette.primary[theme.palette.mode]}`,
    opacity: 0.7,
  },
}));

const ButtonWallet = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  padding: '12px 24px',
  borderRadius: '14px',
  textTransform: 'capitalize',
  boxShadow: 'none',
  background:
    theme.palette.mode === 'light'
      ? theme.palette.primary.main
      : 'linear-gradient(141.34deg, #2978F4 28.42%, #23ABF8 132.6%)',
  color: 'white',

  '&:hover': {
    opacity: 0.7,
    boxShadow: 'none',
    background: theme.palette.primary.main,
  },
}));

const LinkToMetamask = styled(Link)<LinkProps>(() => ({
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center',
  padding: '10px',
  background: 'linear-gradient(129.07deg, #7FB2FE 3.5%, #879FFF 115.01%), #FFFFFF',
  color: 'white',
  borderRadius: '10px',
}));

const MessageMetamaskNotInstall = styled('p')(() => ({
  textAlign: 'center',
  margin: '5px 0',
}));

const CustomToastWithLink = () => (
  <div>
    <MessageMetamaskNotInstall>{errorMessage.META_MASK_DONT_INSTALLED.message}</MessageMetamaskNotInstall>
    <LinkToMetamask href="https://metamask.io" target={'_blank'}>
      {"Go to MetaMask's website"}
    </LinkToMetamask>
  </div>
);

const ConnectWallet: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [width] = useWindowSize();
  const { active, account, activate, deactivate, error, chainId } = useWeb3React<Web3Provider>();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);
  const { createToast } = useToast();

  const login = async (): Promise<void> => {
    try {
      if (!isMetaMaskInstalled()) {
        createToast({
          message: CustomToastWithLink,
          type: 'error',
        });
        return;
      }
      await onClickConnect();
      const signature = await getSignerSignMessage();
      await activate(injected);
      if (!getToken()) dispatch(setLogin());
      authenticateUser(signature as string);
      createToast({
        message: successMessage.META_MASK_CONNECT_SUCCESSFULLY.message,
        type: 'success',
        toastId: 2,
      });
    } catch (ex: any) {
      createToast({
        message: ex.message,
        type: 'error',
      });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await deactivate();
      unAuthenticateUser();
      dispatch(unSetLogin());
      dispatch(unSetAccount());
      createToast({
        message: successMessage.META_MASK_DISCONNECT_SUCCESSFULLY.message,
        type: 'info',
      });
    } catch (ex: any) {
      createToast({
        message: ex.message,
        type: 'error',
      });
    } finally {
    }
  };

  const handleWrongNetWork = async (): Promise<void> => {
    try {
      await addEthereumChain();
      await activate(injected);
    } catch (ex: any) {
      createToast({
        message: ex.message,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (account && active && chainId && isLogin) {
      dispatch(setAccount({ address: account }));
      return;
    }
    dispatch(unSetAccount());
  }, [account, active, chainId, isLogin, currentUserAddress]);

  useEffect(() => {
    if (getToken()) {
      dispatch(setLogin());
      return;
    }
    dispatch(unSetLogin());
  }, [getToken()]);

  useEffect(() => {
    if (error?.name === 'UnsupportedChainIdError' || error?.name === 't') {
      createToast({
        message: errorMessage.META_MASK_WRONG_NETWORK.message,
        type: 'error',
        toastId: 1,
      });
      return;
    }
  }, [error?.name]);

  useFetchRewardAmount();
  useMobileChangeAccountMetamask();

  if (width < 900) {
    return (
      <div>
        {!(active && isLogin) && (
          <div>
            {isUnsupportedChainIdError && !chainId ? (
              <WalletButton onChange={handleWrongNetWork} mode={'login'} />
            ) : (
              <WalletButton onChange={login} mode={'login'} />
            )}
          </div>
        )}
        {active && isLogin && (
          <div>
            <WalletButton onChange={logout} mode={'logout'} />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {!(active && isLogin) && (
          <div>
            {isUnsupportedChainIdError && !chainId ? (
              <ButtonConnect variant="outlined" color="primary" onClick={handleWrongNetWork}>
                Wrong network
              </ButtonConnect>
            ) : (
              <ButtonConnect variant="outlined" color="primary" onClick={login}>
                Connect Wallet
              </ButtonConnect>
            )}
          </div>
        )}
        {active && isLogin && (
          <div>
            <ButtonWallet variant="contained" color="primary" onClick={logout}>
              Disconnect Wallet
            </ButtonWallet>
          </div>
        )}
      </div>
    );
  }
};

export default ConnectWallet;
