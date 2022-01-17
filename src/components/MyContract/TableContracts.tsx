import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  BoxProps,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableCellProps,
  TableBody,
  TableBodyProps,
  TableContainer,
  TableContainerProps,
  Button,
  ButtonProps,
} from '@mui/material';

interface Props {
  title?: string;
  data: Array<any>;
}

const EmptyContracts = styled(Box)<BoxProps>(() => ({
  minHeight: 'calc(100vh - 119px - 315px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#E0E0E0',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  fontSize: '36px',
  lineHeight: '42px',
}));

const TableCellHeader = styled(TableCell)<TableCellProps>(() => ({
  backgroundColor: '#DBECFD',
  padding: '15px 40px',
  color: '#293247',
  fontFamily: 'Roboto',
  fontSize: '16px',
  lineHeight: '19px',
  fontWeight: 'bold',
  border: 'none',
}));

const TableCellContent = styled(TableCell)<TableCellProps>(() => ({
  backgroundColor: '#fff',
  padding: '11px 40px',
  color: '#293247',
  fontFamily: 'Poppins',
  fontSize: '14px',
  lineHeight: '25px',
  fontWeight: '500',
  border: 'none',
}));

const ButtonClaimAll = styled(Button)<ButtonProps>(() => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  padding: '8px 10px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  width: '98px',
  height: '38px',
}));

const ButtonClaim = styled(Button)<ButtonProps>(() => ({
  fontSize: '14px',
  lineHeight: '21px',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  padding: '8px 17px',
  textTransform: 'unset',
  borderRadius: '10px',
  boxShadow: 'none',
  width: '98px',
  height: '38px',
}));

const TableWrapper = styled(TableContainer)<TableContainerProps>(() => ({
  boxShadow: '0px 23px 48px rgba(0, 0, 0, 0.06)',
  border: 'none',
  borderRadius: '20px',
  maxHeight: 'calc(100vh - 119px - 205px)',

  '&::-webkit-scrollbar-button': {
    height: '74px',
  },
  '&::-webkit-scrollbar': {
    width: '9px',
    height: '60px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'none',
    webkitBoxShadow: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#3864FF',
    height: '60px',
    outline: 'none',
    borderRadius: '10px',
  },
}));

const CustomTableBody = styled(TableBody)<TableBodyProps>(() => ({
  overflow: 'auto',
}));

const TableContracts: React.FC<Props> = ({ data }) => {
  return (
    <Box>
      <TableWrapper>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader>Mint Date</TableCellHeader>
              <TableCellHeader align="center">Name</TableCellHeader>
              <TableCellHeader align="center">Type</TableCellHeader>
              <TableCellHeader align="center">Initial 0xB/day </TableCellHeader>
              <TableCellHeader align="center">Current 0xB/day</TableCellHeader>
              <TableCellHeader align="center">Rewards</TableCellHeader>
              <TableCellHeader align="right">
                <ButtonClaimAll size="small" variant="contained" color="primary">
                  Claim all
                </ButtonClaimAll>
              </TableCellHeader>
            </TableRow>
          </TableHead>
          <CustomTableBody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <TableRow key={i}>
                  <TableCellContent>{item.mintDate}</TableCellContent>
                  <TableCellContent align="center">{item.name}</TableCellContent>
                  <TableCellContent align="center">{item.type}</TableCellContent>
                  <TableCellContent align="center">{item.initial}</TableCellContent>
                  <TableCellContent align="center">{item.current}</TableCellContent>
                  <TableCellContent align="center">{item.rewards}</TableCellContent>
                  <TableCellContent align="right">
                    <ButtonClaim size="small" variant="outlined" color="primary">
                      Claim
                    </ButtonClaim>
                  </TableCellContent>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyContracts>No contracts yet!</EmptyContracts>
                </TableCell>
              </TableRow>
            )}
          </CustomTableBody>
        </Table>
      </TableWrapper>
    </Box>
  );
};

export default TableContracts;
