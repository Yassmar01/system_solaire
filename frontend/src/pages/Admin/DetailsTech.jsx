import { CallMissed, Clear, ConfirmationNumber, Handshake, MissedVideoCall, MonetizationOn, Paid, Payments, Person, PhoneMissed, RemoveRedEye, Savings, Terrain } from "@mui/icons-material";
import { Avatar, Card, IconButton, InputBase, Table, Paper, Stack, styled, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Tooltip, Collapse, Box, CardContent } from "@mui/material";
import { blue, blueGrey, green, orange, red } from "@mui/material/colors";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";
import Clients from "./Clients";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocation } from "react-router-dom";
import Accounts_management from "@/services/Accounts_management";
import { GrabIcon } from "lucide-react";
import { axiosClient } from "@/api/axios";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
}));

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Row(props) {
    const { row, point } = props;
    const [open, setOpen] = React.useState(false);
    const [toutalprice, setToutalprice] = React.useState(0);

    useEffect(() => {

        let t = 0
        let inc = 0
        point.map(
            (item, index) => {


                t = t + item.price
            }

        )
        inc = inc + t
        setToutalprice(t)



    }, [])


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={
                            () => {
                                setOpen(!open)
                                // setOperationid(row.id)
                            }
                        }>
                        {open ?
                            <Tooltip title="Close" placement="top" arrow>
                                <Clear color="error" />
                            </Tooltip > :
                            <Tooltip title="Show points" placement="top" arrow>
                                <RemoveRedEye color="success" />
                            </Tooltip >
                        }
                    </IconButton>
                </TableCell>


                <TableCell align="center">{row.date}</TableCell>


                <TableCell align="center">{row.name_activity}</TableCell>
                <TableCell align="center">{row.hectares}</TableCell>

                <TableCell align="center">{point.length}</TableCell>
                <TableCell align="center">{toutalprice}</TableCell>
                <TableCell>
                    {row.client &&
                        (
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

                        )
                    }
                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Points
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                {point.length !== 0 && (

                                    <TableHead>
                                        <TableRow>

                                            <TableCell align="center">Label</TableCell>
                                            <TableCell align="center">Price (DH)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                )}
                                <TableBody>
                                    {point.length !== 0 ? point.map((row) => (
                                        <TableRow key={row.id} >

                                            <TableCell align="center">{row.lebele}</TableCell>
                                            <TableCell align="center">{row.price}</TableCell>
                                        </TableRow>
                                    )) : <TableRow>
                                        <TableCell colSpan={3} align="center" >
                                            No points for this operation
                                        </TableCell>
                                    </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}


const downloadFile = async (filename) => {
    try {
        const response = await axiosClient.get(`/api/download/${filename}`, {
            responseType: 'blob', // Important for file downloads
        });
        console.log(response)

        // Create a URL for the file and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // The filename you want to save as
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error downloading the file', error);
    }
};
function DetailsTech() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedId = queryParams.get('chef');

    const chefid = encodedId ? atob(encodedId) : null;

    const [searchTerm, setSearchTerm] = useState("");
    const [chefequipe, setChefequipe] = useState("");
    const [charges, setCharges] = useState([]);
    const [operations, setOperations] = useState([]);
    const [operations_search, setOperations_search] = useState(operations);

    const [totalcharges, setTotalcharges] = useState(0);
    const [incomes, setIncomes] = useState(0);

    const [startdate, setStartdate] = useState(dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
    const [enddate, setEnddate] = useState(dayjs().format('YYYY-MM-DD'));

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChangestartdate = (newValue) => {
        setStartdate(newValue.format('YYYY-MM-DD'));
    };

    const handleChangeenddate = (newValue) => {
        setEnddate(newValue.format('YYYY-MM-DD'));
    };

    useEffect(() => {

        Accounts_management.show('chefequipe', chefid)
            .then(({ data, status }) => {
                if (status === 200) {
                    setChefequipe(data);

                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });

        let amount = 0;
        Accounts_management.show('charges_chef', chefid)
            .then(({ data, status }) => {
                if (status === 200) {
                    let filtered = data.charges;
                    if (startdate && enddate) {
                        filtered = filtered.filter(f => {
                            return formatDate(f.created_at) >= startdate && formatDate(f.created_at) <= enddate;
                        });
                        //     console.log('daaata',data.charges);
                        setCharges(filtered);
                        filtered.forEach((x) => {
                            amount += x.prix * x.quantity;
                        });
                        setTotalcharges(amount);
                    }

                    // Save data to local storage
                    // localStorage.setItem('charges', JSON.stringify(data.charges));
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });

        Accounts_management.show('operations_clients', chefid)
            .then(({ data, status }) => {
                if (status === 200) {
                    let filtered = data;
                    amount = 0
                    if (startdate && enddate) {

                        filtered = filtered.filter(f => {
                            return f.date >= startdate && f.date <= enddate;
                        });
                        setOperations(filtered)
                        setOperations_search(filtered)

                        console.log('client', filtered)
                        filtered.forEach((p) => {


                            p.point.forEach((item) => {
                                amount += item.price;

                            })

                        })
                        setIncomes(amount)
                    }



                    //      localStorage.setItem('operations', JSON.stringify(data));

                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });
    }, [chefid, startdate, enddate]);




    useEffect(() => {
        let filtered = charges;
        let filtered_operations = operations;

        let amount = 0;
        let toutalam = 0;




        if (startdate && enddate) {
            filtered = filtered.filter(f => {
                return formatDate(f.created_at) >= startdate && formatDate(f.created_at) <= enddate;
            });

            setCharges(filtered);
            filtered.forEach((x) => {
                amount += x.prix * x.quantity;
            });
            setTotalcharges(amount);




            filtered_operations = filtered_operations.filter(f => {
                return f.date >= startdate && f.date <= enddate;
            });

            filtered_operations.forEach((p) => {

                p.point.forEach((item) => {
                    //  console.log('incomes', item.price)
                    toutalam += item.price;

                })

            })
            setIncomes(toutalam)
            setOperations(filtered_operations)
            setOperations_search(filtered_operations)
        }
    }, [startdate, enddate]);


    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: '100%' }}
            >
                <Item sx={{ pt: 6 }}> <Stack spacing={1}>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>
                        <Person sx={{ ml: 2, fontSize: 50, color: orange[700] }} /> {chefequipe.fullname}
                    </Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: 'auto', width: '56px' }}>
                    </Avatar>
                </Item>

                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        TOTAL Deliveries
                        <Handshake sx={{ ml: 2, fontSize: 50, color: 'success.dark' }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{operations.length}</Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>

                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        income
                        <MonetizationOn sx={{ ml: 2, fontSize: 50, color: blue[800] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{incomes} DH</Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>

                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        TOTAL Charges
                        <Payments sx={{ ml: 2, fontSize: 50, color: red[900] }} />
                    </Typography>
                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{totalcharges} DH</Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>

                <Item> <Stack spacing={1}>
                    <Typography color="success.dark" variant="overline">
                        Rest
                        <Savings sx={{ ml: 2, fontSize: 50, color: green[700] }} />
                    </Typography>
                    <Typography variant="h4" sx={{
                        color: (incomes - totalcharges) < 0 ? red[700] : green[700]
                    }}>
                        {incomes - totalcharges} DH
                    </Typography>
                </Stack>
                    <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                    </Avatar>
                </Item>
            </Stack>

            <Card sx={{ p: 2, width: '100%', mt: 4 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 5 }}>

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
                    <Item sx={{ width: '60%' }}>

                        <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'start', mb: 4, color: green[900] }}>
                            <Terrain /> Operations
                        </Typography>
                        <TableContainer >
                            <Table aria-label="collapsible table">
                                <TableHead sx={{ backgroundColor: green[100] }}>
                                    <TableRow>
                                        <TableCell />

                                        <TableCell align="center">Date</TableCell>

                                        <TableCell align="center">activity</TableCell>
                                        <TableCell align="center">Hectares</TableCell>

                                        <TableCell align="center">count points</TableCell>
                                        <TableCell align="center">Total price</TableCell>
                                        <TableCell align="center">Client</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {operations_search.length !== 0 ? (

                                        operations_search.map((row) => (

                                            <Row key={row.id} row={row} point={row.point} />

                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} sx={{ textAlign: 'center' }}>No operations</TableCell>
                                        </TableRow>
                                    )}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Item>

                    <Item sx={{ width: '40%' }}>
                        <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'start', mb: 4, color: red[700] }}>
                            <Paid />     Technician Charges
                        </Typography>

                        <TableContainer >
                            <Table aria-label="collapsible table">
                                <TableHead sx={{ backgroundColor: red[100] }}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell >Date</TableCell>
                                        <TableCell align="center" >Label</TableCell>
                                        <TableCell align="center" >Quantity</TableCell>
                                        <TableCell align="center" >Price (DH)</TableCell>
                                        <TableCell align="center" >Invoice</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        charges.length !== 0 ? (
                                            charges.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell />
                                                    <TableCell align="center">{formatDate(row.created_at)}</TableCell>
                                                    <TableCell align="center">{row.label}</TableCell>
                                                    <TableCell align="center">{row.quantity}</TableCell>
                                                    <TableCell align="center">{row.prix}</TableCell>
                                                    <TableCell align="center">
                                                        <Button sx={{ color: red[700] }}
                                                            onClick={
                                                                () => {
                                                                    downloadFile(row.invoice)
                                                                }
                                                            }>

                                                            <Tooltip title="Download Invoice" placement="top" arrow>
                                                                Download
                                                            </Tooltip>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))) : (
                                            <TableRow>
                                                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>No charges</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Item>
                </Stack>
            </Card >
        </>
    );
}

export default DetailsTech;
