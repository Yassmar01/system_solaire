
import Accounts_management from '@/services/Accounts_management';
import { Call, CallEnd, ConfirmationNumber, Handshake, LocalGroceryStore } from '@mui/icons-material';
import { Box, Card, Container, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { blue, blueGrey, orange } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


// Function to group data by month and calculate statistics
const groupByMonth = (data) => {
    const result = {};


    data.forEach(call => {
        const date = new Date(call.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const key = `${month}-${year}`;

        if (!result[key]) {
            result[key] = { name: month, Calls: 0, Confirmation: 0, Delivery: 0, amt: 0 }; // Initialize stats
        }

        // Increment counts based on your logic


        if (call.statue !== 'New') {
            result[key].Calls += 1;

        }
        if (call.statue === 'Confirmé') {
            result[key].Confirmation += 1;

        }
        // if (call.delivered === 1) {
        //     result[key].Delivery += 1;

        // }

    });


    return Object.values(result);
};

export default function Dashboard() {
    const [groupedData, setGroupedData] = useState();


    const [delevery, setDelevery] = useState(0);
    const [sales, setSales] = useState(0);
    const [confirmations, setConfirmations] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        Accounts_management.all('call')
            .then(({ data, status }) => {
                if (status === 200) {
                    const result = groupByMonth(data)
                    //    console.log(result)

                    result.map((x) => {
                        const date = new Date(dayjs());
                        const month = date.toLocaleString('default', { month: 'short' })

                        if (month === x.name) {

                            setSales(x.Calls);
                            setConfirmations(x.Confirmation);
                        }
                    })
                    setGroupedData(result)
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            }).finally(() => {
                // Stop loading
                setLoading(false);
            });

    }, []);


    useEffect(() => {

        Accounts_management.all('operationsCount')
            .then(({ data, status }) => {
                if (status === 200) {

                    //   console.log('operationsCount', data)
                    setDelevery(data);
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }

            });

    }, []);

    return (

        <>
            {loading ? (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <Skeleton variant="rectangular" width='100%' height={160} />
                            </Grid>
                            <Grid item xs>
                                <Skeleton variant="rectangular" width='100%' height={160} />
                            </Grid>
                            <Grid item xs>
                                <Skeleton variant="rectangular" width='100%' height={160} />
                            </Grid>
                        </Grid>
                        <Skeleton variant="rectangular" width='100%' height={350} sx={{ mt: 2 }} />
                    </Box>
                </Container>
            ) : (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={2} sx={{ pr: 8 }}>
                        <Grid container spacing={1} ml={1} columns={{ xs: 4, sm: 8, md: 12 }} >
                            <Grid item xs={12} md={4} lg={3}>

                                <Card variant="outlined"
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 160,
                                    }}
                                >
                                    <Typography color="success.dark" variant="h7">
                                        TOTAL DELIVERIES
                                        <Handshake sx={{ ml: 2, fontSize: 60, color: 'success.dark' }} />
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{delevery}</Typography>
                                    <Typography color="inherit" sx={{ flex: 1 }}>
                                        This month, {dayjs().format('YYYY')}
                                    </Typography>
                                </Card>

                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>

                                <Card variant="outlined"
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 160,

                                    }}
                                >
                                    <Typography color="success.dark" variant="h7">
                                        TOTAL CONFIRMATIONS
                                        <ConfirmationNumber sx={{ ml: 2, fontSize: 60, color: blue[700] }} />
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{confirmations}</Typography>
                                    <Typography color="inherit" sx={{ flex: 1 }}>
                                        This month, {dayjs().format('YYYY')}
                                    </Typography>
                                </Card>

                            </Grid>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 160,


                                    }} >

                                    <Typography color="success.dark" variant="h7">
                                        Calls
                                        <CallEnd sx={{ ml: 2, fontSize: 60, color: orange[700] }} />
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: blueGrey[900] }}>{sales}</Typography>
                                    <Typography color="inherit" sx={{ flex: 1 }}>
                                        This month, {dayjs().format('YYYY')}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        {

                        }
                        <Grid item xs={12}  >
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 450 }}>

                                <LineChart width={1000} height={350} data={groupedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Delivery" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="Confirmation" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="Calls" stroke="#E82D62" activeDot={{ r: 8 }} />

                                </LineChart>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>)}
        </>
    );
}

