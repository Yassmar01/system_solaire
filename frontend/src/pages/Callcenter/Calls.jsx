import { ConfirmationNumber, Handshake, Person, PhoneMissed } from '@mui/icons-material'
import { Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import { blue, blueGrey, orange, red } from '@mui/material/colors';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,


}));

function createData(ID, Fullname, Telephone, Province, status, Date) {
    return { ID, Fullname, Telephone, Province, status, Date };
}

const rows = [
    createData(1, 'Ali alaoui', '06xxxxxxx', 'El hajeb', "Confirmé", '06/07/2024'),
    createData(2, 'Ali alaoui', '06xxxxxxx', 'Dkhissa', "Confirmé", '07/06/2024'),
    createData(3, 'xx yy', '06xxxxxxx', 'El hajeb', "Injoignable", '06/07/2024'),
    createData(4, 'Omar Omar', '07xxxxxxx', 'El hajeb', "Confirmé", '06/07/2024'),
    createData(5, 'yassine', '07xxxxxxx', 'meknes', "Confirmé", '07/07/2024')
]
const Calls = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [filteredRows, setFilteredRows] = useState(rows);



    const handleDateChange = (event) => {
        setSelectedDate(event);

    }
    useEffect(() => {

        let filtered = rows;
        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
            console.log(formattedDate)
            filtered = filtered.filter(row => row.Date === formattedDate);
        }
        setFilteredRows(filtered);
    }, [selectedDate]);
    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: 'auto' }}
            >



                <Item> <Stack spacing={2} >

                    <Typography sx={{ color: blueGrey[900] }} variant="overline">
                        TOTAL Calls
                        <PhoneMissed sx={{ ml: 2, fontSize: 50, color: red[400] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>163</Typography>
                </Stack>

                </Item>
                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        Confirmation Rate
                        <ConfirmationNumber sx={{ ml: 2, fontSize: 50, color: blue[700] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>30.67 %</Typography>
                </Stack>

                </Item>

                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        TOTAL Deliveries
                        <Handshake sx={{ ml: 2, fontSize: 50, color: 'success.dark' }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>50</Typography>
                </Stack>

                </Item>

            </Stack>


            <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', width: '100%', height: 57, my: 5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']} >
                        <DatePicker label="Search by date" defaultValue={selectedDate} onChange={handleDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
            </Item>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, mt: 5 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Fullname</TableCell>
                            <TableCell align="center">Telephone</TableCell>
                            <TableCell align="center">Province</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length !== 0 ? (filteredRows.map((row) => (
                            <TableRow
                                key={row.ID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.Fullname}</TableCell>
                                <TableCell align="center">{row.Telephone}</TableCell>
                                <TableCell align="center">{row.Province}</TableCell>
                                <TableCell align="center">  <Chip label={row.status} color="success" variant="outlined" /></TableCell>

                                <TableCell align="center">{row.Date}</TableCell>
                            </TableRow>
                        ))) : <TableRow>
                            <TableCell colSpan={5} align="center">
                                No Calls
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>




        </>

    )
}

export default Calls
