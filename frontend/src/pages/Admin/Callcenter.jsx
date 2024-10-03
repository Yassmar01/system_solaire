import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import { RemoveRedEye, Search } from '@mui/icons-material';
import { TextField, Tooltip, Grid } from '@mui/material'; // Import Grid
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Accounts_management from '@/services/Accounts_management';

export default function Callcenter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [agents, setAgents] = useState([]);
    const [filteredRows, setFilteredRows] = useState(agents);

    const handelsearch = (event) => {
        setSearchTerm(event.target.value);
    }

    React.useEffect(() => {
        Accounts_management.all('callcenter')
            .then(({ data, status }) => {
                if (status === 200) {
                    console.log(data);
                    setAgents(data);
                    setFilteredRows(data);
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });
    }, []);

    React.useEffect(() => {
        let filtered = agents;
        if (searchTerm) {
            filtered = filtered.filter(f => {
                return f.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    f.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    f.CIN.toString().includes(searchTerm);
            });
        }
        setFilteredRows(filtered);
    }, [searchTerm, agents]); // Also add 'agents' to the dependency array

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
            <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                    <Search sx={{ color: '#2e7d32', mr: 1, my: 0.5 }} />
                    <TextField
                        id="search"
                        color='success'
                        label="Search"
                        variant="standard"
                        fullWidth // Make the input take full width
                        onChange={handelsearch}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ width: { xs: '100%', md: '80%' }, mx: 'auto', mt: 5 }}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Fullname</TableCell>
                                <TableCell align="center">CIN</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Telephone</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length !== 0 ? (filteredRows.map((row, index) => (
                                <TableRow key={index}> {/* Add a key prop to each TableRow */}
                                    <TableCell component="th" scope="row">
                                        {row.fullname}
                                    </TableCell>
                                    <TableCell align="center">{row.CIN}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.telephone}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Details" placement="top" arrow>
                                            <IconButton aria-label="expand row" size="small">
                                                <Link
                                                    to={`/callcenter/Details?agent=${encodeURIComponent(btoa(row.id))}`}
                                                    target="_blank"
                                                >
                                                    <RemoveRedEye color="success" />
                                                </Link>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No confirmers
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
