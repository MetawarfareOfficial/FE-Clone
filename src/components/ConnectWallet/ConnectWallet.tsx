import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { Web3Provider } from '@ethersproject/providers';
import { UnsupportedChainIdError } from '@web3-react/core';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import {
  setAccount,
  setLogin,
  setNativeBalance,
  setZeroXBlockBalance,
  unSetAccount,
  unSetLogin,
  unSetNativeBalance,
  unSetZeroXBlockBalance,
} from 'services/account';
import { styled } from '@mui/material/styles';
import { ButtonProps, Button, Link, LinkProps } from '@mui/material';
import { errorMessage } from 'messages/errorMessages';
import { successMessage } from 'messages/successMessages';
import { isMetaMaskInstalled, onClickConnect, addEthereumChain, getSignerSignMessage } from 'helpers';
import { authenticateUser, getToken, unAuthenticateUser } from 'services/auth';
import { getBalanceNativeTokenOf, getBalanceTokenOf } from 'helpers/interractiveContract';
import { bigNumber2Number } from 'helpers/formatNumber';
import { unSetNodes, unSetRewardAmount } from 'services/contract';
import { useFetchNodes } from 'hooks/useFetchNodes';
import useFetchRewardAmount from 'hooks/useFetchRewardAmount';
import WalletButton from 'components/Base/WalletButton';
import { useWindowSize } from 'hooks/useWindowSize';

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

  const login = async (): Promise<void> => {
    try {
      if (!isMetaMaskInstalled()) {
        toast.error(CustomToastWithLink, { hideProgressBar: true, autoClose: false });
        return;
      }
      await onClickConnect();
      const signature = await getSignerSignMessage();
      await activate(injected);
      if (!getToken()) dispatch(setLogin());
      authenticateUser(signature as string);
    } catch (ex: any) {
      toast.error(ex.message, { hideProgressBar: true });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await deactivate();
      unAuthenticateUser();
      dispatch(unSetLogin());
      dispatch(unSetAccount());
      toast.info(successMessage.META_MASK_DISCONNECT_SUCCESSFULLY.message, { hideProgressBar: true });
    } catch (ex: any) {
      toast.error(ex.message, { hideProgressBar: true });
    }
  };

  const handleWrongNetWork = async (): Promise<void> => {
    try {
      await addEthereumChain();
      await activate(injected);
    } catch (ex: any) {
      toast.error(ex.message, { hideProgressBar: true });
    }
  };

  const fetchBalance = async (address: string): Promise<void> => {
    try {
      const nativeToken = await getBalanceNativeTokenOf(address);
      const nativeBalance = bigNumber2Number(nativeToken);
      dispatch(setNativeBalance(nativeBalance));

      const zeroXBlockToken = await getBalanceTokenOf(address);
      if (zeroXBlockToken[0]) {
        const zeroXBlockBalance = bigNumber2Number(zeroXBlockToken[0]);
        dispatch(setZeroXBlockBalance(zeroXBlockBalance));
      }
    } catch (e) {
      throw error?.message;
    }
  };

  useEffect(() => {
    if (account && active && chainId && isLogin) {
      dispatch(setAccount({ address: account }));
      !getToken() &&
        toast.success(successMessage.META_MASK_CONNECT_SUCCESSFULLY.message, {
          hideProgressBar: true,
          autoClose: 2000,
        });
      return;
    }
    dispatch(unSetAccount());
  }, [account, active, chainId, isLogin]);

  useEffect(() => {
    if (getToken()) {
      dispatch(setLogin());
      return;
    }
    dispatch(unSetLogin());
  }, [getToken()]);

  useEffect(() => {
    if (error?.name === 'UnsupportedChainIdError') {
      toast.error(errorMessage.META_MASK_WRONG_NETWORK.message, { hideProgressBar: true });
      return;
    }
  }, [error?.name]);

  useEffect(() => {
    try {
      if (currentUserAddress) {
        fetchBalance(currentUserAddress);
        return;
      }
      dispatch(unSetNativeBalance());
      dispatch(unSetZeroXBlockBalance());
      dispatch(unSetNodes());
      dispatch(unSetRewardAmount());
    } catch (e) {
      toast.error('Oop! Something went wrong', { hideProgressBar: true });
    }
  }, [currentUserAddress]);

  useFetchNodes();
  useFetchRewardAmount();

  if (width < 600) {
    return (
      <div>
        {currentUserAddress ? (
          <WalletButton onChange={logout} mode={'logout'} />
        ) : (
          <WalletButton onChange={login} mode={'login'} />
        )}
      </div>
    );
  } else {
    return (
      <div>
        {!(active && isLogin) && (
          <div>
            {isUnsupportedChainIdError || getToken() ? (
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
