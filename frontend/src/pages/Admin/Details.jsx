import { ConfirmationNumber, Handshake, Person, PhoneMissed, QuestionAnswer } from "@mui/icons-material";
import { Avatar, Box, Card, Chip, InputBase, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { blue, blueGrey, orange, red } from "@mui/material/colors";

import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Accounts_management from "@/services/Accounts_management";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,


}));

function Details() {


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedId = queryParams.get('agent');

    // Decode the base64 encoded calls_clients_filter
    const agentid = encodedId ? atob(encodedId) : null;
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [calls_clients, setCalls_clients] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [filtredcalls_search, setFiltredcalls_search] = useState(filteredRows);

    const [searchTerm, setSearchTerm] = useState("");
    const [agent, setAgent] = useState({});
    const [confirmationrate, setConfirmationrate] = useState();
    const [responserate, setResponserate] = useState();

    const statusCounts = filteredRows.reduce((acc, call) => {
        acc[call.statue] = (acc[call.statue] || 0) + 1;
        return acc;
    }, {});


    // Define the statuses with their corresponding labels
    const statusLabels = [
        { label: 'Confirmé', status: 'Confirmé' },
        { label: 'En négociation de prix', status: 'En négociation de prix' },
        { label: 'Rendez-vous planifié', status: 'Rendez-vous planifié' },
        { label: 'Veut après', status: 'Veut après' },
        { label: 'Injoignable', status: 'Injoignable' },
        { label: 'Annulé', status: 'Annulé' },
    ];
    useEffect(() => {
        const confirmStatus = statusLabels.find(({ label }) => label === "Confirmé");

        const Injoignablecount = statusCounts["Injoignable"] || 0;
        // console.log(Injoignablecount)
        if (confirmStatus) {
            const number = statusCounts[confirmStatus.status] || 0;


            if (number !== 0) {
                let result = (number * 100) / filteredRows.length
                setConfirmationrate(result.toFixed(2));


                let responserate = (number * 100) / (filteredRows.length - Injoignablecount)
                setResponserate(responserate.toFixed(2));
                console.log(responserate)
            } else {
                setConfirmationrate(0);
                setResponserate(0);
            }
        }
    }, [statusLabels, statusCounts, filteredRows]);

    const statuses = statusLabels.map(({ label, status }) => ({
        label,
        number: statusCounts[status] || 0
    }));




    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleDateChange = (event) => {
        setSelectedDate(event);

    }

    useEffect(() => {

        Accounts_management.show('callcenter', agentid)
            .then(({ data, status }) => {
                if (status === 200) {
                    setAgent(data)
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });

        Accounts_management.all('calls-clients')
            .then(({ data, status }) => {
                if (status === 200) {
                    let filteredData = data.filter(item => item.call_center_id == agentid);

                    setCalls_clients(filteredData)
                    if (selectedDate) {
                        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
                        // console.log(formattedDate);
                        filteredData = filteredData.filter(row => row.date === formattedDate);

                        setFilteredRows(filteredData);

                        setFiltredcalls_search(filteredData)
                    }

                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });

    }, []);
    useEffect(() => {

        let filtered = calls_clients;


        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            // console.log(formattedDate);
            filtered = filtered.filter(row => row.date === formattedDate);

            setFilteredRows(filtered);
            setFiltredcalls_search(filtered)
        }

    }, [selectedDate]);


    useEffect(() => {
        let searchfilter = filteredRows;

        if (searchTerm) {
            searchfilter = searchfilter.filter(f => {
                return f.client.fullname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.client.telephone.toString().includes(searchTerm) ||
                    f.statue.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.client.province.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
            })
            console.log(searchfilter)
            setFiltredcalls_search(searchfilter)

        }
        else {
            setFiltredcalls_search(filteredRows)

        }

    }, [searchTerm]);
    return (
        <>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: '100%' }}
            >
                <Item sx={{ pt: 6, }}>
                    <Stack spacing={1}>

                        <Typography variant="h4" sx={{ color: blueGrey[900] }}>
                            <Person sx={{ ml: 2, mb: 2, fontSize: 50, color: orange[700] }} /> {agent.fullname}
                        </Typography>
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




                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        Response Rate
                        <QuestionAnswer sx={{ ml: 2, fontSize: 50, color: orange[700] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{responserate} %</Typography>
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
                        {filtredcalls_search.length !== 0 ? (filtredcalls_search.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.client.fullname}</TableCell>
                                <TableCell align="center">{row.client.telephone}</TableCell>
                                <TableCell align="center">{row.client.province}</TableCell>
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
    );
}

export default Details;
