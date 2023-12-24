import { TablePagination } from '@mui/material';
import React from 'react';
import TablePaginationActions from './TablePaginationActions';

function TablePaginationCustom(props) {
    const {count, rowsPerPage, page, setPage, setRowsPerPage } = props

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={3}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
                inputProps: {
                    'aria-label': 'rows per page',
                },
                native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
        />
    );
}

export default TablePaginationCustom;