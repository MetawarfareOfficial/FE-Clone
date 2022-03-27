import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Tabs, TabsProps, Tab } from '@mui/material';

interface Props {
  title?: string;
}

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  background: '#FFFFFF',
  boxShadow: '0px 20px 45px #F0EDF7',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  padding: '20px 20px',

  '> a': {
    width: '155px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [theme.breakpoints.down('lg')]: {
    background: 'none',
    boxShadow: 'unset',
    padding: 0,
  },

  [theme.breakpoints.down('md')]: {
    display: 'inline-block',
    width: '100% !important',
    margin: '0',
  },
}));

const TabsCustom = styled(Tabs)<TabsProps>(({ theme }) => ({
  '.MuiTab-root': {
    padding: '9px 0px',
    minWidth: 'auto',
    marginRight: '24px',
    position: 'relative',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.045em',
    textTransform: 'capitalize',
    color: 'rgba(35, 40, 89, 0.53)',

    '&:last-child': {
      margin: 0,
    },

    '&::before': {
      content: '""',
      width: '27px',
      height: '2px',
      background: '#fff',
      position: 'absolute',
      bottom: 0,
      zIndex: '2',
    },
  },

  '.Mui-selected': {
    color: '#232859',

    '&::before': {
      background: '#0052FF',
    },
  },

  '.MuiTabs-indicator': {
    width: '0 !important',
    display: 'none',
  },

  [theme.breakpoints.down('md')]: {
    border: '1px solid rgba(56, 100, 255, 0.15)',
    borderRadius: '10px',
    marginBottom: '29px',
    padding: '19px 30px',
  },
}));

const Filters: React.FC<Props> = () => {
  const [filter, setFilter] = useState({
    time: 4,
    contract: 0,
  });

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChangeContract = (event: React.SyntheticEvent, newValue: number) => {
    setFilter({
      ...filter,
      contract: newValue,
    });
  };

  const handleChangeTime = (event: React.SyntheticEvent, newValue: number) => {
    setFilter({
      ...filter,
      time: newValue,
    });
  };

  return (
    <BoxContent width={'calc(100% - 291px - 345px - 60px)'} sx={{ margin: '0 30px' }}>
      <Box sx={{ marginRight: 'auto' }}>
        <TabsCustom value={filter.contract} onChange={handleChangeContract} aria-label="basic tabs example">
          <Tab label="Square" {...a11yProps(0)} />
          <Tab label="Cube" {...a11yProps(1)} />
          <Tab label="Tesseract" {...a11yProps(2)} />
          <Tab label="All" {...a11yProps(3)} />
        </TabsCustom>
      </Box>

      <Box sx={{ marginLeft: 'auto' }}>
        <TabsCustom value={filter.time} onChange={handleChangeTime} aria-label="basic tabs example">
          <Tab label="D" {...a11yProps(0)} />
          <Tab label="W" {...a11yProps(1)} />
          <Tab label="M" {...a11yProps(2)} />
          <Tab label="Y" {...a11yProps(3)} />
          <Tab label="All" {...a11yProps(4)} />
        </TabsCustom>
      </Box>
    </BoxContent>
  );
};

export default Filters;
