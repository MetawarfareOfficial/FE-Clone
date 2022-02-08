import React from 'react';
import { styled } from '@mui/material/styles';
import {
  TableContainer,
  TableContainerProps,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellProps,
} from '@mui/material';

// interface TokenType {
//   coin: string;
//   name: string;
//   amount: number;
//   value: number;
// }

interface Props {
  data: Array<any>;
  fontSize?: string;
}

interface TableCellCustomProps extends TableCellProps {
  fontSize?: string;
}

const TableCustom = styled(TableContainer)<TableContainerProps>(() => ({
  width: '100%',
}));

const TableHeaderText = styled(TableCell)<TableCellCustomProps>(({ fontSize, theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: fontSize || '14px',
  lineHeight: '16px',
  padding: '7px',
  color: theme.palette.mode === 'light' ? '#BDBDBD' : '#4F4F4F',
  border: 'none',

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '14px',
    padding: '5px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '16px',
    padding: '7px',
  },
}));

const TableContentText = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '16px',
  padding: '7px',
  color: theme.palette.mode === 'light' ? '#293247' : '#fff',
  border: 'none',

  [theme.breakpoints.down('lg')]: {
    fontSize: '12px',
    lineHeight: '14px',
    padding: '5px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '16px',
    padding: '7px',
  },
}));

const ViewCoin = styled('img')(({ theme }) => ({
  width: '22px',
  height: '22px',
  marginRight: '10px',

  [theme.breakpoints.down('lg')]: {
    width: '18px',
    height: '18px',
  },
}));

const TextToken = styled('div')`
  display: flex;
  align-items: center;
`;

const TableTokens: React.FC<Props> = ({ data, fontSize }) => {
  return (
    <TableCustom>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableHeaderText fontSize={fontSize}>Token Name</TableHeaderText>
            <TableHeaderText fontSize={fontSize} align="center">
              Amount
            </TableHeaderText>
            <TableHeaderText fontSize={fontSize} align="right">
              $ value
            </TableHeaderText>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0
            ? data.map((item, i) => (
                <TableRow key={i}>
                  <TableContentText>
                    <TextToken>
                      <ViewCoin alt="" src={item.icon} /> {item.name}
                    </TextToken>
                  </TableContentText>
                  <TableContentText align="center">{item.amount}</TableContentText>
                  <TableContentText align="right">${item.value}</TableContentText>
                </TableRow>
              ))
            : ''}
        </TableBody>
      </Table>
    </TableCustom>
  );
};

export default TableTokens;
