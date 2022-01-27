import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, PaperProps, Box, BoxProps, Typography, TypographyProps, Button, ButtonProps } from '@mui/material';

import LineChart from 'components/Base/LineChart';
import MintContractModal from 'components/Base/MintContractModal';
import MintStatusModal from 'components/Base/MintStatusModal';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import BigNumber from 'bignumber.js';
import { contractType, DELAY_TIME, LIMIT_MAX_MINT } from 'consts/typeReward';
import { createMultipleNodesWithTokens } from 'helpers/interractiveContract';
import { sleep } from 'helpers/delayTime';
import { useFetchNodes } from 'hooks/useFetchNodes';
import { setInsuffBalance, setIsCreatingNodes, unSetInsuffBalance, unSetIsCreatingNodes } from 'services/contract';
import { computedRewardRatioPerYear } from '../../helpers/computedRewardRatioPerYear';
import { RewardRatioChart } from '../../interfaces/RewardRatioChart';

interface Props {
  id: any;
  icon: string;
  name: string;
  value: number;
  apy: string;
  earn: string;
  color: string;
  colorChart: string;
  // dataChart: Array<any>;
}

const Wrapper = styled(Paper)<PaperProps>(({ theme }) => ({
  width: '100%',
  marginBottom: '15px',
  padding: '12px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '24px',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',

  [theme.breakpoints.down('md')]: {
    display: 'inline-block',
    width: '100%',
    padding: '22px 31px 26px',
  },
}));

const BoxContract = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '10px 17px',
  display: 'inline-flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '286px',
  boxShadow: '0px 14px 26px -2px rgba(0, 0, 0, 0.08)',
  borderRadius: '15px',

  [theme.breakpoints.down('lg')]: {
    width: '230px',
    padding: '10px 12px',
    boxSizing: 'border-box',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'center',
  },
}));

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // width: '100%',
  boxSizing: 'border-box',
  width: 'calc(100% - 286px)',

  [theme.breakpoints.down('lg')]: {
    width: 'calc(100% - 230px)',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '0',
    display: 'inline-block',
  },
}));

const ViewImage = styled(Box)<BoxProps>(({ theme }) => ({
  width: '43px',
  height: '43px',

  [theme.breakpoints.down('lg')]: {
    width: '30px',
    height: '30px',
  },
  [theme.breakpoints.down('md')]: {
    width: '43px',
    height: '43px',
  },
}));

const Name = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  color: '#293247',
  fontSize: '16px',
  lineHeight: '24px',
  textTransform: 'uppercase',
  fontWeight: 600,
  margin: '0 0 0 10px',

  [theme.breakpoints.down('lg')]: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

const ViewInfo = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'inline-flex',
  width: 'calc(100% - 158px)',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingLeft: '48px',
  paddingRight: '10px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  margin: '0 auto',

  [theme.breakpoints.down('lg')]: {
    paddingLeft: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    // display: 'inline-block',
    padding: '0',
    marginTop: '27px',
  },
}));

const Info = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'inline-flex',
  // width: '100%',
  width: '65%',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    width: '50%',
    // float: 'left',
    display: 'inline-block',
  },
}));

// const BoxDetail = styled(Box)<BoxProps>(({ theme }) => ({
//   marginLeft: 'auto',
//   display: 'inline-flex',
//   alignItems: 'center',
//   boxSizing: 'border-box',

//   [theme.breakpoints.down('sm')]: {
//     display: 'block',
//     width: '50%',
//     padding: '0',
//     float: 'right',
//     paddingLeft: '20px',
//   },
// }));

const Text = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#293247',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  minWidth: '114px',
  width: 'auto',

  [theme.breakpoints.up('xl')]: {
    width: '30%',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '18px',
    minWidth: '40px',
    padding: '0 12px',
    boxSizing: 'border-box',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0',
    width: '100%',
    fontSize: '14px',
    lineHeight: '21px',
    marginBottom: '7px',
  },
}));

const ButtonMint = styled(Button)<ButtonProps>(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '14px',
  lineHeight: '21px',
  padding: '12px',
  width: '158px',
  borderRadius: ' 14px',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  // marginLeft: 'auto',
  // marginLeft: '40px',
  // display: 'inline-flex',

  [theme.breakpoints.up('xl')]: {},
  [theme.breakpoints.down('lg')]: {
    fontSize: '13px',
    lineHeight: '18px',
    width: '120px',
    padding: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: ' 27px 0 0',
    display: 'block',
  },
}));

// const ButtonMintMobile = styled(Button)<ButtonProps>(({ theme }) => ({
//   fontFamily: 'Poppins',
//   fontSize: '14px',
//   lineHeight: '22px',
//   padding: '9px 12px',
//   borderRadius: ' 14px',
//   fontWeight: 'bold',
//   textTransform: 'capitalize',
//   marginLeft: '40px',
//   width: '100%',
//   margin: ' 14px 0 0',
//   display: 'none',

//   [theme.breakpoints.down('sm')]: {
//     display: 'block',
//   },
// }));

const ViewChart = styled('div')`
  width: 143px;
  height: 37px;

  @media (min-width: 1441px) {
    width: 200px;
    height: 60px;
  }
  @media (max-width: 900px) {
    width: 120px;
    height: 30px;
  }

  @media (max-width: 600px) {
    width: 50%;
    height: 60px;
  }
`;

const STATUS = ['success', 'error', 'pending'];

const TypeReward: React.FC<Props> = ({ icon, name, value, apy, earn, color, colorChart }) => {
  const dispatch = useAppDispatch();

  const zeroXBlockBalance = useAppSelector((state) => state.user.zeroXBlockBalance);
  const nodes = useAppSelector((state: any) => state.contract.nodes);
  const currentUserAddress = useAppSelector((state) => state.user.account?.address);

  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [maxMint, setMaxMint] = useState<number>(-1);
  const [crtNodeOk, setCreateNodeOk] = useState<boolean>(false);
  const [dataChart, setDataChart] = useState<Array<RewardRatioChart>>([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleStatus = () => {
    setOpenStatus(!openStatus);
  };

  const handleSubmit = async (params: Record<string, string>[], type: string) => {
    try {
      if (new BigNumber(zeroXBlockBalance).isLessThan(15)) {
        setOpen(false);
        setStatus('');
        setOpenStatus(true);
        dispatch(setInsuffBalance());
        return;
      }

      dispatch(setIsCreatingNodes());
      dispatch(unSetInsuffBalance());

      const names = params.map((item) => item.name);
      const key = type.split(' ')[0].toLowerCase();
      const cType = contractType[`${key}`];

      const response: Record<string, any> = await createMultipleNodesWithTokens(names, cType);

      setOpen(false);
      setStatus(STATUS[2]);
      setOpenStatus(true);
      await sleep(DELAY_TIME);

      if (response.hash) {
        setCreateNodeOk(!crtNodeOk);
        setStatus(STATUS[0]);
      }
    } catch (e: any) {
      setStatus(STATUS[1]);
    } finally {
      setOpen(false);
      setOpenStatus(true);
      dispatch(unSetIsCreatingNodes());
    }
  };

  useEffect(() => {
    const balances = zeroXBlockBalance !== '' ? zeroXBlockBalance : 0;
    const _maxMint = new BigNumber(balances).div(value).integerValue(BigNumber.ROUND_DOWN).toNumber();
    setMaxMint(_maxMint >= LIMIT_MAX_MINT - nodes ? LIMIT_MAX_MINT - nodes : _maxMint);
  }, [zeroXBlockBalance, nodes]);

  useEffect(() => {
    setOpen(false);
    setOpenStatus(false);
    dispatch(unSetInsuffBalance());
  }, [currentUserAddress]);

  useEffect(() => {
    setDataChart(computedRewardRatioPerYear(earn));
  }, [earn]);

  useFetchNodes(crtNodeOk);

  return (
    <Wrapper>
      <BoxContract sx={{ backgroundColor: color }}>
        <ViewImage>
          <img alt="" src={icon} width="100%" />
        </ViewImage>
        <Name>{name}</Name>
      </BoxContract>

      <BoxContent>
        <ViewInfo>
          <Info>
            <Text>{value} 0xB</Text>
            <Text>{Number(apy)}% APR</Text>
            <Text>Earn {earn} 0xB/day</Text>
          </Info>

          <ViewChart>
            <LineChart data={dataChart} color={colorChart} />
          </ViewChart>

          {/* <BoxDetail>
            <ViewChart>
              <LineChart data={dataChart} color={colorChart} />
            </ViewChart>

            <ButtonMint variant="outlined" color="primary" onClick={handleToggle} disabled={!currentUserAddress}>
              Mint
            </ButtonMint>
          </BoxDetail> */}
        </ViewInfo>

        <ButtonMint variant="outlined" color="primary" onClick={handleToggle} disabled={!currentUserAddress}>
          Mint
        </ButtonMint>

        {/* <ButtonMintMobile variant="outlined" color="primary" onClick={handleToggle}>
        <ButtonMintMobile variant="outlined" color="primary" onClick={handleToggle} disabled={!currentUserAddress}>
          Mint
        </ButtonMintMobile> */}
      </BoxContent>

      <MintContractModal
        icon={icon}
        name={name}
        maxMint={maxMint}
        valueRequire={value}
        contracts={['Name']}
        open={open}
        onClose={handleToggle}
        onSubmit={handleSubmit}
      />

      <MintStatusModal
        icon={icon}
        name={name}
        open={openStatus}
        status={status}
        text={
          status === 'success'
            ? 'Contract minted successfully'
            : status === 'error'
            ? 'Contract minting failed'
            : status === 'pending'
            ? 'Processing'
            : 'Insufficient Tokens'
        }
        onClose={handleToggleStatus}
      />
    </Wrapper>
  );
};

export default TypeReward;
