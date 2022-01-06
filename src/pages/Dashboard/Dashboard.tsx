import React from 'react';
import ConnectWallet from 'components/ConnectWallet/ConnectWallet';

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
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Dashboard;
