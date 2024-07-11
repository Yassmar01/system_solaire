
import { ConfirmationNumber, Handshake, LocalGroceryStore } from '@mui/icons-material';
import { Card, Container, Grid, Paper, Typography } from '@mui/material';
import { blue, blueGrey, orange } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Fullname', headerName: 'Fullname', width: 130 },
    { field: 'Statue', headerName: 'Statue', width: 170 },
    { field: 'Remarque', headerName: 'Remarque', width: 130 },
    {
        field: 'Date',
        headerName: 'Date',
        type: 'Date',
        width: 130,
    }
];
const rows = [

    { id: 1, Fullname: 'Kamal kamal', Statue: 'En négociation de prix', Remarque: 'Remarque 1', Date: '18/12/2024' },
    { id: 2, Fullname: 'Jon kamal', Statue: 'Injoignable', Remarque: 'Remarque 1', Date: '12/09/2024' },
    { id: 3, Fullname: 'Ahmed alaoui', Statue: 'Confirmed', Remarque: 'Remarque 1', Date: '01/09/2023' },
    { id: 4, Fullname: 'Rdi alaoui', Statue: 'Confirmed', Remarque: 'Remarque 1', Date: '02/01/2023' },
    { id: 5, Fullname: 'Jon Jon', Statue: 'Injoignable', Remarque: 'Remarque 1', Date: '12/09/2024' },
    { id: 6, Fullname: 'Jon smith', Statue: 'Veut après ', Remarque: 'Remarque 1', Date: '12/04/2024' },
    { id: 7, Fullname: 'Kamal Kamal', Statue: 'Confirmed', Remarque: 'Remarque 1', Date: '12/04/2024' },
    { id: 8, Fullname: 'Ali ali', Statue: 'Rendez-vous planifié', Remarque: 'Remarque 1', Date: '12/09/2024' },
    { id: 9, Fullname: 'Jon smith', Statue: 'Annulé', Remarque: 'Remarque 1', Date: '22/10/2024' }

];


const data = [
    { name: 'Jan', Calls: 1600, Confirmation: 7000, Delivery: 5400, amt: 4400 },
    { name: 'Feb', Calls: 7700, Confirmation: 4200, Delivery: 6500, amt: 5500 },
    { name: 'Mar', Calls: 2800, Confirmation: 5300, Delivery: 6600, amt: 5600 },
    { name: 'Apr', Calls: 3900, Confirmation: 6400, Delivery: 8700, amt: 5700 },
    { name: 'May', Calls: 7000, Confirmation: 7500, Delivery: 8800, amt: 2800 },
    { name: 'Jun', Calls: 2100, Confirmation: 7600, Delivery: 7900, amt: 6900 },
    { name: 'Jul', Calls: 2200, Confirmation: 5700, Delivery: 7000, amt: 6000 },
    { name: 'Aug', Calls: 3300, Confirmation: 5800, Delivery: 8100, amt: 3100 },
    { name: 'Sep', Calls: 4400, Confirmation: 4900, Delivery: 7200, amt: 3200 },
    { name: 'Oct', Calls: 5500, Confirmation: 5000, Delivery: 7300, amt: 6300 },
    { name: 'Nov', Calls: 6600, Confirmation: 5000, Delivery: 3400, amt: 5400 },
    { name: 'Dec', Calls: 7700, Confirmation: 5000, Delivery: 3500, amt: 4500 },
];



export default function Dashboard() {
    const theme = useTheme();

    return (
        <>
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
                                <Typography variant="h4" sx={{ color: blueGrey[900] }}>540</Typography>
                                <Typography color="inherit" sx={{ flex: 1 }}>
                                    This month, 2024
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
                                <Typography variant="h4" sx={{ color: blueGrey[900] }}>220</Typography>
                                <Typography color="inherit" sx={{ flex: 1 }}>
                                    This month, 2024
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
                                    SALES
                                    <LocalGroceryStore sx={{ ml: 2, fontSize: 60, color: orange[700] }} />
                                </Typography>
                                <Typography variant="h4" sx={{ color: blueGrey[900] }}>43 024.00 DH</Typography>
                                <Typography color="inherit" sx={{ flex: 1 }}>
                                    This month, 2024
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}  >
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 450 }}>

                            <LineChart width={1000} height={350} data={data}>
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
            </Container>
        </>
    );
}

