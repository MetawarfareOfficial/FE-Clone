import { useEffect } from 'react';
import { unAuthenticateUser } from 'services/auth';

export const useWindowClose = () => {
  useEffect(() => {
    const beforeunload = () => {
      window.onblur = function () {
        unAuthenticateUser();
      };
    };

    window.addEventListener('beforeunload', beforeunload);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    };
  }, []);
};
