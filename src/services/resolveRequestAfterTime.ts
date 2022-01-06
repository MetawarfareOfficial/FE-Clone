import { toast } from 'react-toastify';

export const resolveRequestAfterTime = (url: string, time: number) => {
  const resolveAfter3Sec = new Promise((resolve, reject) =>
    setTimeout(() => {
      fetch(url).then((res) => {
        if (res.status === 200) return resolve(res);
        return reject(res);
      });
    }, time),
  );
  toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    },
    { hideProgressBar: true },
  );
};
