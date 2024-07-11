import { CallMissed, ConfirmationNumber, Handshake, MissedVideoCall, MonetizationOn, Payments, Person, PhoneMissed, Savings } from "@mui/icons-material";
import { Avatar, Card, IconButton, InputBase, Paper, Stack, styled, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { blue, blueGrey, green, orange, red } from "@mui/material/colors";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";
import Clients from "./Clients";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Table } from "lucide-react";
import Charges from "./Charges";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',

}));
function DetailsTech() {
    const [searchTerm, setSearchTerm] = useState("");
    const [value, setValue] = React.useState(dayjs());
    const [startdate, setStartdate] = React.useState(dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
    const [enddate, setEnddate] = React.useState(dayjs().format('YYYY-MM-DD'));


    const handleChange = (event) => {
        setSearchTerm(event.target.value)

    }



    const handleChangestartdate = (newValue) => {

        setStartdate(newValue.format('YYYY-MM-DD'));

    }

    const handleChangeenddate = (newValue) => {
        setEnddate(newValue.format('YYYY-MM-DD'));


    }

    useEffect(() => {


    }, []);
    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: '100%' }}
            >
                <Item sx={{ pt: 6 }}> <Stack spacing={1}>

                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>
                        <Person sx={{ ml: 2, fontSize: 50, color: orange[700] }} /> Zakaria </Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: 'auto', width: '56px' }}>
                    </Avatar>
                </Item>





                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        TOTAL Deliveries
                        <Handshake sx={{ ml: 2, fontSize: 50, color: 'success.dark' }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>10</Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>
                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        income
                        <MonetizationOn sx={{ ml: 2, fontSize: 50, color: blue[800] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>8390 DH</Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>

                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        TOTAL Charges
                        <Payments sx={{ ml: 2, fontSize: 50, color: red[900] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>3000 DH</Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>


                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        Rest
                        <Savings sx={{ ml: 2, fontSize: 50, color: green[700] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>5390 DH</Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>


            </Stack>
            <Card sx={{ p: 2, width: '100%', mt: 4 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
                    <Item sx={{ display: 'flex', alignItems: 'center', width: 400, height: 60 }}>
                        <SearchIcon />
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            onChange={handleChange}
                            placeholder="search for operation"
                            inputProps={{ 'aria-label': 'search for operation' }}
                        />
                    </Item>
                    <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', width: '100%', height: 57 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']} >
                                <DatePicker label="Start Date"
                                    defaultValue={dayjs().subtract(1, 'month')}
                                    onChange={handleChangestartdate}
                                    renderInput={(params) => <InputBase {...params} />}
                                />
                                <DatePicker label="End Date"
                                    defaultValue={dayjs()}
                                    onChange={handleChangeenddate}
                                    renderInput={(params) => <InputBase {...params} />}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Item>
                </Stack>

                <Stack direction="row" spacing={2}  >

                    <Item sx={{ width: '100%' }}>
                        <Clients searchTerm={searchTerm} />
                    </Item>

                    <Item sx={{ width: '100%' }}>

                        <Charges startdate={startdate} enddate={enddate} />

                    </Item>





                </Stack>


            </Card>

        </>
    );
}

export default DetailsTech;
