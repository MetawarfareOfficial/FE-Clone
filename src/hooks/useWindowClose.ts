import { useEffect } from 'react';
import { unAuthenticateUser } from 'services/auth';

export const useWindowClose = () => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      window.onblur = function () {
        unAuthenticateUser();
      };
    });
  }, []);
};
