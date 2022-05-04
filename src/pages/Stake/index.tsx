import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

import { ClaimModal, ManagePools, MyStake, StakeStatusModal } from 'components/Stake';
import { useAppSelector } from 'stores/hooks';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useFetchLPTokenBalance } from 'hooks/staking/useFetchLPTokenBalance';
import get from 'lodash/get';
interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const StakePage: React.FC<Props> = () => {
  const { claimAllStakingReward, claimStakingReward, withdrawOne } = useInteractiveContract();
  const [currentTab, setCurrentTab] = useState<'allPool' | 'myPool'>('allPool');
  const [claimType, setClaimType] = useState<'claim_all' | 'claim' | 'unstake'>('claim_all');
  const [status, setStatus] = useState<any>(null);

  const [openStatus, setOpenStatus] = useState(false);

  const [openClaimAll, setOpenClaimAll] = useState(false);

  const [selected, setSelected] = useState<number>(-1);
  const [poolToClaim, setPoolToClaim] = useState('0');
  const [selectedIndex, setSelectedIndex] = useState('0');

  const pools = useAppSelector((state) => state.stake.pools);
  const myPools = pools.filter((item) => item.yourAllStakes.length > 0);
  const selectedPool = pools.filter((item) => item.id === String(selected))[0];

  // const [currentAction, setCurrentAction] = useState('claimAll');
  const { handleGetTokenBalances } = useFetchLPTokenBalance();

  const [currentTransactionId, setCurrenTransactionId] = useState({
    type: '',
    id: '',
  });
  const [txCompleted, setTxCompleted] = useState({
    type: '',
    id: '',
  });

  const handleToggleClaimAll = () => {
    setClaimType('claim_all');
    setOpenClaimAll(!openClaimAll);
  };

  const handleToggleClaimOne = () => {
    setClaimType('claim');
    setOpenClaimAll(!openClaimAll);
  };
  const handleToggleCUnstake = () => {
    setClaimType('unstake');
    setOpenClaimAll(!openClaimAll);
  };

  const closeClaimModal = () => {
    setOpenClaimAll(false);
  };

  const handleToggleStatus = () => {
    if (openStatus) {
      setStatus(null);
    }
    setOpenStatus(!openStatus);
  };

  const handleConfirmClaim = async () => {
    // setCurrentAction('claimAll');
    handleToggleStatus();
    setStatus('pending');
    try {
      if (claimType === 'claim_all') {
        const transaction = await claimAllStakingReward(poolToClaim);
        if (transaction.hash) {
          setCurrenTransactionId({
            id: transaction.hash,
            type: 'claimAll',
          });
          await transaction.wait();
          setTxCompleted({
            id: transaction.hash,
            type: 'claimAll',
          });
        }
      } else if (claimType === 'claim') {
        const transaction = await claimStakingReward(poolToClaim, selectedIndex);
        if (transaction.hash) {
          setCurrenTransactionId({
            id: transaction.hash,
            type: 'claim',
          });
          await transaction.wait();
          setTxCompleted({
            id: transaction.hash,
            type: 'claim',
          });
        }
      } else if (claimType === 'unstake') {
        const transaction = await withdrawOne(poolToClaim, selectedIndex);
        if (transaction.hash) {
          setCurrenTransactionId({
            id: transaction.hash,
            type: 'unstake',
          });
          await transaction.wait();
          setTxCompleted({
            id: transaction.hash,
            type: 'unstake',
          });
        }
      }
    } catch (error) {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (currentTransactionId.id !== '' && currentTransactionId.id === txCompleted.id) {
      setStatus('success');
      setOpenStatus(true);
      setTxCompleted({
        id: '',
        type: '',
      });
    }
  }, [currentTransactionId, txCompleted]);

  return (
    <Wrapper>
      {selected === -1 ? (
        <ManagePools
          onClaimAll={(id) => {
            setPoolToClaim(id);
            handleToggleClaimAll();
          }}
          currentTab={currentTab}
          tabChange={setCurrentTab}
          pools={currentTab === 'allPool' ? pools : myPools}
          onNext={setSelected}
        />
      ) : (
        <MyStake
          handleToggleClaimOne={(index) => {
            setSelectedIndex(String(index));
            setPoolToClaim(String(selected));
            handleToggleClaimOne();
          }}
          handleToggleUnstake={(index) => {
            setSelectedIndex(String(index));
            setPoolToClaim(String(selected));
            handleToggleCUnstake();
          }}
          handleToggleClaimAll={() => {
            setPoolToClaim(String(selected));
            handleToggleClaimAll();
          }}
          data={selectedPool}
          onBack={() => setSelected(-1)}
          handleGetTokenBalances={handleGetTokenBalances}
        />
      )}

      <ClaimModal
        data={pools.filter((item) => item.id === String(poolToClaim))[0]}
        selectedIndex={Number(selectedIndex)}
        type={claimType}
        open={openClaimAll}
        onClose={closeClaimModal}
        onConfirm={handleConfirmClaim}
      />

      <StakeStatusModal
        title={get(selectedPool, 'title', '')}
        open={openStatus}
        onClose={handleToggleStatus}
        status={status}
        onNextStatus={() => {}}
      />
    </Wrapper>
  );
};

export default StakePage;
