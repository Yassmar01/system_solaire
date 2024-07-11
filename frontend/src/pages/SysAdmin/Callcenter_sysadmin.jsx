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
import { TextField, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function createData(fullname, CIN, Email, Telephone, Confirmation_Rate, Statue) {
    return {
        fullname,
        CIN,
        Email,
        Telephone,
        Confirmation_Rate,
        Statue,
        history: [
            {
                date: '2024-01-05',
                customerId: 'khalid',
                amount: 3000,
                Statue: 'Injoiagnable',
                province: 'Drissa',


            },
            {
                date: '2024-01-02',
                customerId: 'Anonymous',
                amount: 9000,
                Statue: 'Confirmed',
                province: 'EL Hajeb',
            },
        ],
    };
}
function Row(props) {
    const { row } = props;

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.fullname}
                </TableCell>
                <TableCell align="center">{row.CIN}</TableCell>
                <TableCell align="center">{row.Email}</TableCell>
                <TableCell align="center">{row.Telephone}</TableCell>
                <TableCell align="center">{row.Confirmation_Rate}</TableCell>
                <TableCell>
                    <Tooltip title="Details" placement="top">
                        <IconButton
                            aria-label="expand row"
                            size="small"

                        >
                            <Link to={'/sysadmin/callcenter/Details'} target="_blank"><RemoveRedEye color="success" /></Link>


                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}
Row.propTypes = {
    row: PropTypes.shape({
        CIN: PropTypes.string.isRequired,
        Telephone: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                Statue: PropTypes.string.isRequired,
            }),
        ).isRequired,
        fullname: PropTypes.string.isRequired,

        Confirmation_Rate: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Fdoua alaoui', 'D67889', 'alaoui@zzz.com', '0765432311', 4.0),
    createData('amira amira', 'D67889', 'alaoui@zzz.com', '0765432311', 4.3),
    createData('xx yy', 'D67889', 'alaoui@zzz.com', '0765432311', 6.0),
    createData('zz zzzzzz', 'D67889', 'alaoui@zzz.com', '0765432311', 4),
    createData('slma salah', 'D67889', 'alaoui@zzz.com', '0765432311', 3),
];

export default function Callcenter_sysadmin() {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRows, setFilteredRows] = useState(rows);
    const handelsearch = (event) => {
        setSearchTerm(event.target.value)

    }

    React.useEffect(() => {

        let filtered = rows;
        if (searchTerm) {
            filtered = filtered.filter(f => {
                return f.fullname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.CIN.toString().includes(searchTerm)
            })
        }
        setFilteredRows(filtered);

    }, [searchTerm]);
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                <Search sx={{ color: '#2e7d32', mr: 1, my: 0.5 }} />
                <TextField id="search" color='success' label="Search" variant="standard" align="center" onChange={handelsearch} />
            </Box>
            <TableContainer component={Paper} sx={{ width: '1000px', mt: 5 }}>
                <Table aria-label="collapsible table" >
                    <TableHead>
                        <TableRow>
                            <TableCell >Fullname</TableCell>
                            <TableCell align="center">CIN</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Telephone</TableCell>
                            <TableCell align="center">Confirmation Rate (%)</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length !== 0 ? (filteredRows.map((row) => (
                            <Row key={row.fullname} row={row} />
                        )) ): <TableRow>
                            <TableCell colSpan={5} align="center">
                                No items
                            </TableCell>
                        </TableRow>}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
