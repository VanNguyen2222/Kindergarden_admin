import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ItemOwnClass from 'features/Students/components/ItemOwnClass';
import React from 'react';
import { useData } from './hook';

function EditStudentPage(props) {
    const { ownClassList } = useData();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Course name</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ownClassList &&
                        ownClassList?.map(cClass => (
                            <ItemOwnClass key={cClass.id} {...cClass} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EditStudentPage;