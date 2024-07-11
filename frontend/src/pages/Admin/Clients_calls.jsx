import { Alert, Autocomplete, Box, Button, Card, Chip, FormControlLabel, InputBase, Paper, Snackbar, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import { ChangeCircleOutlined } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import ConfirmationDialog from '@/components/ConfirmationDialog';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,


}));
const agents = [

    { Fullname: 'Agent 1', CIN: 'M001' },
    { Fullname: 'Agent 2', CIN: 'M002' },
    { Fullname: 'Agent 3', CIN: 'M003' },
    { Fullname: "Agent 4", CIN: 'M004' },
    { Fullname: 'Agent 5', CIN: 'M005' },
    { Fullname: 'Agent 6', CIN: 'M006' },
];
function createData(ID, agent, Fullname, Telephone, Province, status, comment, Date) {
    return { ID, agent, Fullname, Telephone, Province, status, comment, Date };
}
const rows = [
    createData(1, "M001", 'mouhamed alaoui', '06xxxxxxx', 'El hajeb', "Injoignable", "Indisponible", '28/06/2024'),
    createData(2, "M002", 'Ali ali', '06xxxxxxx', 'Dkhissa', "Injoignable", "Indisponible", '29/05/2024'),
    createData(3, "M003", 'kamal kamal', '06xxxxxxx', 'El hajeb', "Injoignable", "Comment 3", '12/05/2024'),
    createData(4, "M003", 'Omar Omar', '07xxxxxxx', 'El hajeb', "Confirmé", "Comment 4", '27/06/2024'),
    createData(5, "M003", 'yassine', '07xxxxxxx', 'meknes', "Confirmé", "Comment 5", '27/06/2024')
]
const Clients_calls = () => {

    const [filteredRows, setFilteredRows] = useState(rows);
    const [filteredagents, setFilteredagents] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [firstagent, setFirstagent] = useState(null);
    const [secondagent, setSecondagent] = useState(null);

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [opensnakerror, setOpensnakerror] = React.useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }
    const handelexchange = (event) => {
        setIsSwitchOn(event.target.checked);
    }


    const exchange_clients = () => {

        if (firstagent !== null && secondagent !== null) {

            setOpenDialog(true);
            setOpen(false);
            setOpensnakerror(false);

        } else {
            setOpen(false);
            setOpensnakerror(true);
        }

    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleConfirmDialog = () => {
        //confirm affectation of clients

        setOpen(true);
        setOpenDialog(false);

    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);


    };
    const handleClose_err = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpensnakerror(false);


    };

    React.useEffect(() => {

        let filteredRows = rows;
        let sagents = agents;

        if (firstagent) {

            filteredRows = filteredRows.filter(f => {
                return f.agent.toLocaleLowerCase() !== firstagent.toLocaleLowerCase()
            })

            sagents = sagents.filter(f => {
                return f.CIN !== firstagent

            })
        }

        if (searchTerm) {
            filteredRows = filteredRows.filter(f => {
                return f.Fullname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.Province.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    f.status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())

            })
        }
        setFilteredRows(filteredRows);
        setFilteredagents(sagents);

    }, [firstagent, searchTerm]);



    // React.useEffect( () => { }, [, ] );
    return (
        < >
            <Card sx={{ p: 2, width: '100%', mt: 4 }}>
                <Stack direction="row" spacing={2} >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 400, height: 60 }}>

                        <Autocomplete
                            sx={{ ml: 10, flex: 1, mb: 1.5 }}
                            id="highlights-demo"
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setFirstagent(newValue.CIN);


                                } else {
                                    setFirstagent(null);
                                }

                            }}
                            options={agents}
                            getOptionLabel={(option) => option.Fullname}
                            renderInput={(params) => (
                                <TextField {...params} label="Choose Agent" margin="normal" color='success' />
                            )}

                        />
                    </Box>



                    <Item sx={{ display: 'flex', alignItems: 'center', width: 400, height: 55 }}>
                        <SearchIcon />

                        <InputBase
                            sx={{ ml: 1, flex: 1 }}

                            onChange={handleChange}
                            placeholder="search for clients / Calls"
                            inputProps={{ 'aria-label': 'search for clients' }}
                        />
                    </Item>






                </Stack>
                <Stack direction="row" sx={{ mt: 5 }}>
                    <TableContainer component={Paper} sx={{ width: '70%', height: 'auto' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Fullname</TableCell>
                                    <TableCell align="center">Telephone</TableCell>
                                    <TableCell align="center">Province</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Comments</TableCell>

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
                                        <TableCell align="center">{row.comment}</TableCell>
                                        <TableCell align="center">{row.Date}</TableCell>
                                    </TableRow>
                                ))) : <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No Clients
                                    </TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>

                    </TableContainer>

                    <Box sx={{ ml: 5, width: '30%' }}>
                        <FormControlLabel control={<Switch color='success' onChange={handelexchange} sx={{ ml: 6 }} />} label="Clients exchange ?" />

                        {isSwitchOn && (
                            <>

                                <Autocomplete
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setSecondagent(newValue.CIN);

                                        } else {
                                            setSecondagent(null);
                                        }
                                    }}
                                    id="highlights-demo"

                                 value={filteredagents.find(agent => agent.CIN === secondagent) || null}
                                    sx={{ width: 300, mr: 4 }}
                                    options={filteredagents}
                                    getOptionLabel={(option) => option.Fullname || ""}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Choose Agent" margin="normal" color='success' />
                                    )}
                                />




                                <Button
                                    sx={{
                                        bgcolor: red[700],
                                        "&:hover": { bgcolor: red[600] },
                                        height: '50px',
                                        width: 'auto',
                                        ml: 9,
                                        mt: 2
                                    }}
                                    onClick={exchange_clients}
                                    variant="contained"
                                    startIcon={<ChangeCircleOutlined />}
                                >
                                    Change
                                </Button>

                                <ConfirmationDialog
                                    open={openDialog}
                                    handleClose={handleCloseDialog}
                                    handleConfirm={handleConfirmDialog}
                                    title="Confirm Clients Exchange"
                                    message=" Are you sure you want to Exchange Clients?"
                                />

                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert
                                        onClose={handleClose}
                                        severity="success"
                                        variant="filled"
                                        sx={{ width: '100%' }}
                                    >
                                        Clients are Exchanged with success !
                                    </Alert>
                                </Snackbar>

                                <Snackbar open={opensnakerror}
                                    autoHideDuration={6000}
                                    onClose={handleClose_err}

                                >
                                    <Alert

                                        onClose={handleClose_err}
                                        severity="error"
                                        variant="filled"
                                        sx={{ width: '100%' }}
                                    >
                                        Agent 1 or Agent 2 Not selected  !
                                    </Alert>
                                </Snackbar>

                            </>
                        )}
                    </Box>
                </Stack>
            </Card>

        </>
    )
}

export default Clients_calls
