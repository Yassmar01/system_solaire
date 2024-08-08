import { Clear, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";

function createData(id, fullname, Telephone, province, activity, count_points, toutal) {
    return {
        id,
        fullname,
        Telephone,
        province,
        activity,
        count_points,
        toutal,

    };
}

function createponts(id, date, labele, price) {
    return {
        id,
        date,
        labele,
        price,
    };
}

function Row(props) {
    const { row, points } = props;


    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <Clear color="error" /> : <RemoveRedEye color="success" />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{row.fullname}</TableCell>

                <TableCell align="center">{row.Telephone}</TableCell>
                <TableCell align="center">{row.province}</TableCell>
                <TableCell align="center">{row.activity}</TableCell>
                <TableCell align="center">{row.count_points}</TableCell>
                <TableCell align="center">{row.toutal}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Points
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Points</TableCell>
                                        <TableCell align="center">Price (DH)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {points.map((row) => (
                                        <TableRow key={row.id} >
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.labele}</TableCell>
                                            <TableCell align="center">{row.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        fullname: PropTypes.string.isRequired,
        Telephone: PropTypes.string.isRequired,
        province: PropTypes.string.isRequired,
        toutal: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        labele: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,

    }).isRequired,
};

const rows = [
    createData(1, 'ali alaoui', '0765432311', 'Meknes', 'prospection de leau', 3, 590),
    createData(2, 'kamal', '0665432311', 'Dkhissa', 'prospection de leau', 3, 3000),
    createData(3, 'jamal', '0765832311', 'El Hajeb', 'Analyse', 1, 5000),
];

const points = [
    createponts(1, '12/07/2024', 'point 1', 100),
    createponts(2, '13/07/2024', 'point 2', 300),
    createponts(3, '14/07/2024', 'point 3', 190),
];

function Clients({ searchTerm }) {
    const [filteredRows, setFilteredRows] = React.useState(rows);

    useEffect(() => {
        let filtered = rows;

        if (searchTerm) {

            filtered = filtered.filter(f => {
                return f.fullname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.province.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.Telephone.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())

            })

        }

        setFilteredRows(filtered);
    }, [searchTerm]);

    return (
        <>
            <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'start', mb: 4 }}>
                Clients and Operation
            </Typography>

            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">Fullname</TableCell>
                            <TableCell align="center">Telephone</TableCell>
                            <TableCell align="center">Province</TableCell>
                            <TableCell align="center">Activity</TableCell>
                            <TableCell align="center">Count Points</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((row) => (
                            <Row key={row.id} row={row} points={points} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

// Clients.propTypes = {
//     searchTerm: PropTypes.string.isRequired,
// };

export default Clients;
