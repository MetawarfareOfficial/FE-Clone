import React from 'react';
// import { styled } from '@mui/material/styles';

import {
  Paper,
  Table,
  // TableProps,
  TableContainer,
  // TableContainerProps,
  TableBody,
  // TableBodyProps,
  TableCell,
  // TableCellProps,
  TableHead,
  // TableHeadProps,
  TableRow,
  // TableRowProps,
} from '@mui/material';

interface Props {
  data: Array<any>;
}

const TableInvestments: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableInvestments;
