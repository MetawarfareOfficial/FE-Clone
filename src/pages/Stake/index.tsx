import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

import { ClaimModal, ManagePools, MyStake, StakeStatusModal } from 'components/Stake';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { useInteractiveContract } from 'hooks/useInteractiveContract';
import { useFetchLPTokenBalance } from 'hooks/staking/useFetchLPTokenBalance';
import get from 'lodash/get';
import { useWeb3React } from '@web3-react/core';
import { convertStakingData } from 'helpers/staking';
import { setSelectedPoolData } from 'services/staking';
interface Props {
  title?: string;
}

const Wrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
}));

const StakePage: React.FC<Props> = () => {
  const { claimRewards, withDrawSelectedEntities, getPoolInfo } = useInteractiveContract();
  const { account } = useWeb3React();
  const [currentTab, setCurrentTab] = useState<'allPool' | 'myPool'>('allPool');
  const [claimType, setClaimType] = useState<'claim_all' | 'claim' | 'unstake'>('claim_all');
  const [status, setStatus] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [openStatus, setOpenStatus] = useState(false);

  const [openClaimAll, setOpenClaimAll] = useState(false);

  const [selected, setSelected] = useState<number>(-1);
  const [poolToClaim, setPoolToClaim] = useState('0');
  const [selectedIndex, setSelectedIndex] = useState('0');

  const pools = useAppSelector((state) => state.stake.pools);
  const myPools = pools.filter((item) => Number(item.yourTotalStakedAmount) > 0);
  const selectedPool = pools.filter((item) => item.id === String(selected))[0];

  const selectedPoolTableData = useAppSelector((state) => state.stake.selectedPoolData);
  // const [currentAction, setCurrentAction] = useState('claimAll');
  const { handleGetTokenBalances } = useFetchLPTokenBalance();
  const [tableDataLoading, setTableDataLoading] = useState(false);
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

  const handleFetchTableData = async () => {
    try {
      setTableDataLoading(true);
      const selectedPoolInfo = await getPoolInfo(account!, String(selected));
      const convertedData = convertStakingData({
        dates: selectedPoolInfo.yourStakingTimes[0].split('#'),
        stakedAmounts: selectedPoolInfo.yourStakedAmounts[0].split('#'),
        rewards: selectedPoolInfo.yourRewardAmounts[0].split('#'),
      });
      dispatch(setSelectedPoolData(convertedData));
    } catch {}
    setTableDataLoading(false);
  };

  const handleConfirmClaim = async () => {
    handleToggleStatus();
    setStatus('pending');
    try {
      if (claimType === 'claim_all') {
        const transaction = await claimRewards(poolToClaim, ['a']);
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
          handleFetchTableData();
        }
      } else if (claimType === 'claim') {
        const transaction = await claimRewards(poolToClaim, [selectedIndex]);
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
          handleFetchTableData();
        }
      } else if (claimType === 'unstake') {
        const transaction = await withDrawSelectedEntities(poolToClaim, [selectedIndex]);
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
          handleFetchTableData();
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

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (selected !== -1 && account) {
      handleFetchTableData();
      interval = setInterval(() => {
        handleFetchTableData();
      }, 10000);
    } else if (!account) {
      dispatch(setSelectedPoolData([]));
      setSelected(-1);
    } else if (selected === -1) {
      dispatch(setSelectedPoolData([]));
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selected, account]);

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
          tableData={selectedPoolTableData}
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
