import React, { useState } from 'react';
import { dataContracts } from './data';
import { useWindowSize } from 'hooks/useWindowSize';
import { Box } from '@mui/material';

// import { Banner } from 'components/Base/Banner';
import { TableContracts, Stats, ListContracts } from 'components/MyContract';

interface Props {
  title?: string;
}

const MyContract: React.FC<Props> = () => {
  const [connected] = useState(true);
  const [width] = useWindowSize();

  return (
    <Box>
      <Stats connected={connected} />
      {width < 600 ? (
        <ListContracts data={connected ? dataContracts : []} />
      ) : (
        <TableContracts data={connected ? dataContracts : []} />
      )}
    </Box>
  );
};

export default MyContract;
