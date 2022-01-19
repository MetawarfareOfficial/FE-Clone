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

const TableHeaderText = styled(TableCell)<TableCellCustomProps>(({ fontSize }) => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: fontSize || '14px',
  lineHeight: '16px',
  padding: '7px',
  color: ' #BDBDBD',
  border: 'none',
}));

const TableContentText = styled(TableCell)(() => ({
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '16px',
  padding: '7px',
  color: ' #293247',
  border: 'none',
}));

const ViewCoin = styled('img')`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

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
                  <TableContentText align="right">{item.value}</TableContentText>
                </TableRow>
              ))
            : ''}
        </TableBody>
      </Table>
    </TableCustom>
  );
};

export default TableTokens;
