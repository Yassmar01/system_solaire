import { ConfirmationNumber, Handshake, Person, PhoneMissed } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import { blue, blueGrey, orange, red } from '@mui/material/colors';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useUserContext } from '../../../context/AdminContext';
import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react'
import Accounts_management from '@/services/Accounts_management';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,


}));


const Calls = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [calls, setCalls] = useState([]);
    const [confirmationrate, setCsonfirmationrate] = useState(0);

    const [filteredRows, setFilteredRows] = useState(calls);


    const { user } = useUserContext();

    const handleDateChange = (event) => {
        setSelectedDate(event);

    }
    useEffect(() => {

        let filtered = calls;
        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            //   console.log(formattedDate)
            filtered = filtered.filter(row => row.date === formattedDate);
        }
        setFilteredRows(filtered);
    }, [selectedDate]);



    const statusCounts = filteredRows.reduce((acc, call) => {
        acc[call.statue] = (acc[call.statue] || 0) + 1;
        return acc;
    }, {});

    useEffect(() => {
        const confirmStatus = filteredRows.find(({ statue }) => statue === "Confirmé");

        const Injoignablecount = statusCounts["Injoignable"] || 0;
        setCsonfirmationrate(0);
        if (confirmStatus) {
            const confirmscount = statusCounts[confirmStatus.statue] || 0;

         //   console.log('confirm count', confirmscount)

            if (confirmscount !== 0) {
                let result = (confirmscount * 100) / filteredRows.length
                setCsonfirmationrate(result.toFixed(2));

            } else {
                setCsonfirmationrate(0);

            }
        }

    }, [filteredRows]);


    useEffect(() => {

        Accounts_management.show('calls-clients', user.id)
            .then(({ data, status }) => {
                if (status === 200) {
                //    console.log(data);
                    let filtered = data;
                    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
                    //   console.log(formattedDate)
                    filtered = filtered.filter(row => row.date === formattedDate);

                    setCalls(data);
                    setFilteredRows(filtered)
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });


    }, []);

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
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{filteredRows.length}</Typography>
                </Stack>

                </Item>
                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        Confirmation Rate
                        <ConfirmationNumber sx={{ ml: 2, fontSize: 50, color: blue[700] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{confirmationrate} %</Typography>
                </Stack>

                </Item>

                {/* <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        TOTAL Deliveries
                        <Handshake sx={{ ml: 2, fontSize: 50, color: 'success.dark' }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>50</Typography>
                </Stack>

                </Item> */}

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
                            <TableCell >Client Informations</TableCell>

                            <TableCell align="center">Remarque</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length !== 0 ? (filteredRows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>

                                    <Card>
                                        <CardContent>

                                            {row.client.columns.length > 0 ? (
                                                row.client.columns.map((col) => (

                                                    <div key={col.id} color="primary">
                                                        <Typography
                                                            gutterBottom variant="h7"
                                                            component="b"
                                                            sx={{ mr: 1, color: blue[500] }}
                                                        >
                                                            {col.column_name}:
                                                        </Typography>

                                                        {col.value}


                                                    </div>
                                                ))
                                            ) : (
                                                <span>No additional info</span>
                                            )}

                                        </CardContent>

                                    </Card>

                                </TableCell>
                                <TableCell >{row.remarque}</TableCell>

                                <TableCell align="center">  <Chip label={row.statue} color="info" variant="outlined" /></TableCell>

                                <TableCell align="center">{row.date}</TableCell>
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
