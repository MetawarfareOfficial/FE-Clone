import { toast } from 'react-toastify';

export const resolveRequestAfterTime = (time: number) => {
  const resolveAfter3Sec = new Promise((resolve) =>
    setTimeout(async () => {
      resolve('');
    }, time),
  );
  toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Loading....',
      success: 'Fetch Data Successfully 👌',
    },
    { hideProgressBar: true },
  );
};
