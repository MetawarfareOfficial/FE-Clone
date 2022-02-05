import { toast, ToastContent, ToastOptions } from 'react-toastify';

const ToastDefaultConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
};

export interface OverrideToastOption extends ToastOptions {
  message?: ToastContent;
  promise?: {
    callback: any;
    successMessage: string;
    errorMessage?: string;
    pendingMessage: string;
  };
}

export const customToast = (props: OverrideToastOption) => {
  const { promise, message = '' } = props;
  if (promise) {
    return toast.promise(
      promise.callback,
      {
        pending: promise.pendingMessage,
        success: promise.successMessage,
        error: promise.errorMessage,
      },
      {
        ...ToastDefaultConfig,
        ...props,
      },
    );
  }
  return toast(message, {
    ...ToastDefaultConfig,
    ...props,
  });
};
