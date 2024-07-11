import { ConfirmationNumber, Handshake, Person, PhoneMissed, QuestionAnswer } from "@mui/icons-material";
import { Avatar, Box, Card, Chip, InputBase, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { blue, blueGrey, orange, red } from "@mui/material/colors";

import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
const statuses = [
    { label: 'Confirmé', number: 50 },
    { label: 'En négociation de prix', number: 60 },
    { label: 'Rendez-vous planifié', number: 7 },
    { label: 'Veut après', number: 4 },
    { label: 'Injoignable', number: 30 },
    { label: 'Annulé', number: 12 },
];
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
    createData(1, 'Ali alaoui', '06xxxxxxx', 'El hajeb', "Injoignable", '06/07/2024'),
    createData(2, 'Ali alaoui', '06xxxxxxx', 'Dkhissa', "Injoignable", '06/07/2024'),
    createData(3, 'xx yy', '06xxxxxxx', 'El hajeb', "Confirmé", '06/07/2024'),
    createData(4, 'Omar Omar', '07xxxxxxx', 'El hajeb', "Confirmé", '07/07/2024'),
    createData(5, 'yassine', '07xxxxxxx', 'meknes', "Confirmé", '07/07/2024')
]
function Details() {

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [filteredRows, setFilteredRows] = useState(rows);
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleDateChange = (event) => {
        setSelectedDate(event);

    }


    useEffect(() => {

        let filtered = rows;

        if (searchTerm) {
            filtered = filtered.filter(f => {
                return f.Fullname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.Telephone.toString().includes(searchTerm) ||
                    f.status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.Province.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
            })
        }

        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
            console.log(formattedDate)
            filtered = filtered.filter(row => row.Date === formattedDate);
        }
        setFilteredRows(filtered);
    }, [searchTerm, selectedDate]);
    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: '100%' }}
            >
                <Item sx={{ pt: 6 }}> <Stack spacing={1}>

                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>
                        <Person sx={{ ml: 2, mb: 2, fontSize: 50, color: orange[700] }} /> Fadoua Alaoui </Typography>
                </Stack>

                </Item>


                <Item sx={{ minWidth: '17%' }}>
                    <Stack direction="column">
                        {statuses.map((status, index) => (
                            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }} >
                                <Typography variant="body1">{status.label}</Typography>
                                <Chip label={status.number}
                                    color="error"
                                    // variant="outlined"
                                    size="small"
                                    sx={{ ml: 1 }} />
                            </Box>
                        ))}
                    </Stack>



                </Item>


                <Item> <Stack spacing={1}>

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
                        Response Rate
                        <QuestionAnswer sx={{ ml: 2, fontSize: 50, color: orange[700] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>37.59 %</Typography>
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
            <Card sx={{ p: 2, width: '100%', mt: 4 }}>
                <Stack direction="row" spacing={2}>
                    <Item sx={{ display: 'flex', alignItems: 'center', width: 400, height: 60 }}>

                        <SearchIcon />

                        <InputBase
                            sx={{ ml: 1, flex: 1 }}

                            onChange={handleChange}
                            placeholder="search for clients / status"
                            inputProps={{ 'aria-label': 'search for clients' }}
                        />
                    </Item>
                    <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', width: 400, height: 57 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker label="Search by date" defaultValue={selectedDate} onChange={handleDateChange} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Item>
                </Stack>
            </Card>
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
                                No items
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default Details;
