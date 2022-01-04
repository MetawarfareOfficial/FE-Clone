import React from 'react';

interface DashboardProps {
  name?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className={'flex justify-between items-center'}>
      <div>
        <p>Ring finance</p>
      </div>
      <div>
        <button className={'px-4 py-2 text-sm bg-blue text-white rounded-none'}>Login</button>
      </div>
    </div>
  );
};

export default Dashboard;
