declare let window: any;

export const onChangeAccounts = () => {
  window.ethereum.removeListener('accountsChanged');
  window.ethereum.on('accountsChanged', () => {
    return true;
  });
};
