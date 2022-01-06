import { getInstanceEtherJs } from 'BaseEtherJs';

export const getSignerSignMessage = async () => {
  try {
    return await getInstanceEtherJs().getSigner().signMessage('👋');
  } catch (err: any) {
    if (err.code === 4001) throw err;
    throw new Error('Oop! Something went wrong');
  }
};
