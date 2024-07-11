import { Clear, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";

function Charges({ startdate, enddate }) {
    const chargectech = [
        { id: 1, date: '2024-07-01', label: 'machine A',quantite:1, totalPrice: '1000', invoice: 'INV001' },
        { id: 2, date: '2024-06-22', label: 'machine B',quantite:1, totalPrice: '2000', invoice: 'INV002' },
        { id: 3, date: '2024-07-07', label: 'machine c',quantite:1, totalPrice: '3000', invoice: 'INV003' },
        { id: 3, date: '2024-07-02', label: 'machine D',quantite:1, totalPrice: '3000', invoice: 'INV004' },
    ];

    const [allcharges, setAllcharges] = useState(chargectech);

    useEffect(() => {
        let filtered = chargectech;
        if (startdate && enddate) {
            filtered = filtered.filter(f => {
                return f.date >= startdate && f.date <= enddate;
            });
        }
        setAllcharges(filtered);
    }, [startdate, enddate]);

    return (
        <>
            <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'start', mb: 4 }}>
            Technician Charges
            </Typography>

            <TableContainer >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Label</TableCell>
                            <TableCell align="center">Quantite</TableCell>
                            <TableCell align="center">Total Price (DH)</TableCell>
                            <TableCell align="center">Invoice</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allcharges.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell />
                                <TableCell>{row.date}</TableCell>
                                <TableCell align="center">{row.label}</TableCell>
                                <TableCell align="center">{row.quantite}</TableCell>
                                <TableCell align="center">{row.totalPrice}</TableCell>
                                <TableCell align="center">
                                    <Button>
                                        <Tooltip title="Download File" placement="top">{row.invoice}</Tooltip>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

Charges.propTypes = {
    startdate: PropTypes.string,
    enddate: PropTypes.string,
};

export default Charges;
