import { Alert, Autocomplete, Box, Button, Card, CardContent, Checkbox, Chip, CircularProgress, FormControlLabel, IconButton, InputBase, Paper, Snackbar, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { ChangeCircleOutlined } from '@mui/icons-material';
import { blue, green, red } from '@mui/material/colors';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import Accounts_management from '@/services/Accounts_management';
import { axiosClient } from '@/api/axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




function EnhancedTableToolbar(props) {
    let { numSelected } = props;


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 && (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected

                </Typography>
            )}


        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
const Clients_calls = () => {
    const [filteredRows, setFilteredRows] = useState([]);
    const [calls_clients, setCalls_clients] = useState([]);



    const [filteredagents, setFilteredagents] = useState([]);

    const [selectedstatue, setSelectedstatue] = useState();

    const [firstagent, setFirstagent] = useState(null);
    const [secondagent, setSecondagent] = useState(null);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [opensnakerror, setOpensnakerror] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('CIN');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [agents, setAgents] = useState([]);

    const [checkedcalls, setCheckedcalls] = useState([]);


    const [loading, setLoading] = useState(false);

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const handleDateChange = (event) => {
        setSelectedDate(event);

    }

    useEffect(() => {
        console.log("Updated checked calls:", checkedcalls);
    }, [checkedcalls]);
    const status_searchOptions = [


        { value: 'Injoignable', label: 'Injoignable' },
        { value: 'Rendez-vous planifié', label: 'Rendez-vous planifié' },
        { value: 'Annulé', label: 'Annulé' },
        { value: 'En négociation de prix', label: 'En négociation de prix' },
        { value: 'Confirmé', label: 'Confirmé' },

    ];

    const handleStatus_serach_Change = (event, newvalue) => {

        if (newvalue) {

            setSelectedstatue(newvalue.value)
        } else {
            setSelectedstatue("")
        }


    };
    const handelexchange = (event) => {
        setIsSwitchOn(event.target.checked);
    };

    const exchange_clients = () => {

        if (selected.length > 0 && secondagent !== null) {
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

    const fetchUsers = async () => {

        Accounts_management.all('calls-clients')
            .then(({ data, status }) => {
                if (status === 200) {

                    setCalls_clients(data)
                    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');

                    let filtered = data;

                    filtered = filtered.filter(f => f.call_center_id === firstagent && f.date === formattedDate);

                    setFilteredRows(filtered);


                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });
    };

    const handleConfirmDialog = async () => {
        setLoading(true);
        try {
            // Confirm affectation of clients
            const updatePromises = checkedcalls.map(async (row) => {
                const { client, ...call } = row;
                call.call_center_id = secondagent;

                //  Accounts_management.edit is an async function
                const response = await Accounts_management.edit(row.id, call, 'call');
                return response;
            });
            // Example of a loading spinner

            // Wait for all updates to complete
            const results = await Promise.all(updatePromises);

            // Check if all requests were successful
            if (results.every(({ status }) => status === 200)) {
                swal({
                    title: "Success!",
                    text: "Calls have been affected successfully.",
                    icon: "success",
                    buttons: false,
                    timer: 3000, // Show the message for 2 seconds
                });

                setOpenDialog(false);  // Close the dialog
                setSelected([]);       // Clear selected rows
                fetchUsers();           // Refresh table data
                handleClose(); // Close any related UI components

            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            swal({
                title: "Error",
                text: "An error occurred while affecting the calls.",
                icon: "error",
                buttons: true,
            });
        } finally {
            setLoading(false); // Stop loading indicator
        }
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


    useEffect(
        () => {
            Accounts_management.all('calls-clients')
                .then(({ data, status }) => {
                    if (status === 200) {
                        console.log('data', data);
                        setCalls_clients(data)


                    }
                }).catch(({ response }) => {
                    if (response) {
                        console.log(response);
                    }
                });

            Accounts_management.all('callcenter')
                .then(({ data, status }) => {
                    if (status === 200) {
                        //  console.log(data);
                        setAgents(data)


                    }
                }).catch(({ response }) => {
                    if (response) {
                        console.log(response);
                    }
                });

        }, [])
    React.useEffect(() => {

        let sagents = agents;
        setFilteredRows([]);

        let filtered = calls_clients;




        if (firstagent) {

            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');

            filtered = filtered.filter(f => f.call_center_id === firstagent && f.date === formattedDate);

            sagents = sagents.filter(f => f.id !== firstagent);
            setFilteredRows(filtered);

        } else {
            setFilteredRows([]);
        }

        setFilteredagents(sagents);
    }, [firstagent, secondagent]);


    useEffect(() => {

        let filtered = calls_clients;



        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            // filtered = filtered.filter(row => row.date === formattedDate);
            filtered = filtered.filter(f => f.call_center_id === firstagent && f.date === formattedDate);

            console.log('filtered', filtered);

            setFilteredRows(filtered);

        }

    }, [selectedDate]);

    useEffect(() => {

        let filtered = calls_clients;
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        if (selectedstatue) {

            filtered = filtered.filter(f => f.call_center_id === firstagent
                && f.date === formattedDate
                && f.statue === selectedstatue
            );

            setFilteredRows(filtered);
        } else {


            filtered = filtered.filter(f => f.call_center_id === firstagent && f.date === formattedDate);
            setFilteredRows(filtered);
        }

    }, [selectedstatue]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = visibleRows.map((row, index) => page * rowsPerPage + index);
            setSelected(newSelected);
            setCheckedcalls(visibleRows);
            return;
        } else {
            setCheckedcalls([]);
        }
        setSelected([]);

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };



    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const visibleRows = React.useMemo(() =>
        stableSort(filteredRows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, filteredRows],
    );

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function EnhancedTableHead(props) {
        const { onSelectAllClick, numSelected, rowCount } = props;

        const headCells = [

            { id: 'Status', numeric: true, disablePadding: false, label: 'Status' },
            { id: 'Comments', numeric: true, disablePadding: false, label: 'Comments' },
            { id: 'Date', numeric: true, disablePadding: false, label: 'Date' },
            { id: 'Client', numeric: true, disablePadding: false, label: 'Client' }

        ];

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="success"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all Clients' }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            sx={{ textAlign: "center" }}
                        >
                            {headCell.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    return (
        <Card sx={{ p: 2, width: '100%', mt: 4 }}>
            <Stack direction="row" spacing={2} >
                <Box sx={{ display: 'flex', alignItems: 'center', width: 400, height: 60 }}>
                    <Autocomplete
                        sx={{ ml: 10, flex: 1, mb: 1.5 }}
                        id="highlights-demo"
                        isOptionEqualToValue={(option, value) => option.fullname === value.fullname}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setFirstagent(newValue.id);
                            } else {
                                setFirstagent(null);
                            }
                        }}
                        options={agents}
                        getOptionLabel={(option) => option.fullname}
                        renderInput={(params) => (
                            <TextField {...params} label="Choose Agent" margin="normal" color='success' />
                        )}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '20%', height: 60 }}>
                    <Autocomplete
                        sx={{ flex: 1, mb: 1.5 }}
                        id="status"
                        name="status"
                        options={status_searchOptions}
                        getOptionLabel={(option) => option.label}

                        renderInput={(params) => (
                            <TextField {...params} label="Choose status" margin="normal" color="success"


                            />
                        )}
                        onChange={(event, newValue) => handleStatus_serach_Change(event, newValue)}
                    />
                </Box>
                <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', width: 400, height: 57 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label="Search by date" defaultValue={selectedDate} onChange={handleDateChange} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Item>
            </Stack>
            <Stack direction="row" sx={{ mt: 5 }}>
                <TableContainer component={Paper} sx={{ width: '100%', height: 'auto' }}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        agents={agents}

                    />
                    <Table aria-label="simple table">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={visibleRows.length}
                        />
                        <TableBody>
                            {visibleRows.length !== 0 ? visibleRows.map((row, index) => {
                                const globalIndex = index + page * rowsPerPage;
                                const isItemSelected = isSelected(globalIndex);
                                const labelId = `enhanced-table-checkbox-${globalIndex}`;



                                const handleCheckboxChange = (event) => {


                                    const selectedIndex = selected.indexOf(globalIndex);

                                    let newSelected = [];

                                    if (selectedIndex === -1) {
                                        newSelected = newSelected.concat(selected, globalIndex);
                                    } else if (selectedIndex === 0) {
                                        newSelected = newSelected.concat(selected.slice(1));
                                    } else if (selectedIndex === selected.length - 1) {
                                        newSelected = newSelected.concat(selected.slice(0, -1));
                                    } else if (selectedIndex > 0) {
                                        newSelected = newSelected.concat(
                                            selected.slice(0, selectedIndex),
                                            selected.slice(selectedIndex + 1),
                                        );
                                    }

                                    setSelected(newSelected);




                                    if (event.target.checked) {
                                        // Add the row to checkedcalls array if it's checked
                                        setCheckedcalls((prevCheckedcalls) => [...prevCheckedcalls, row]);
                                    } else {
                                        // Remove the row from checkedcalls array if it's unchecked
                                        setCheckedcalls((prevCheckedcalls) => prevCheckedcalls.filter(c => c !== row));
                                    }

                                    console.log(checkedcalls);

                                };



                                return (
                                    <TableRow

                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={globalIndex}
                                        selected={isItemSelected}

                                    >
                                        <TableCell padding="checkbox" >
                                            <Checkbox
                                                color="success"

                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                onChange={(event) => {
                                                    //  event.stopPropagation();
                                                    handleCheckboxChange(event);
                                                }}
                                            />
                                        </TableCell>


                                        <TableCell align="center"> <Chip label={row.statue} color="info" variant="outlined" /></TableCell>
                                        <TableCell align="center">{row.remarque}</TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
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
                                    </TableRow>
                                );
                            }) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No Clients
                                    </TableCell>
                                </TableRow>
                            )}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </TableContainer>
                <Box sx={{ ml: 5, width: '20%' }}>
                    <FormControlLabel control={<Switch color='success' onChange={handelexchange} />} label="Clients exchange ?" />
                    {isSwitchOn && (
                        <>
                            <Autocomplete
                                id="highlights-demo"
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setSecondagent(newValue.id);
                                    } else {
                                        setSecondagent(null);
                                    }
                                }}
                                value={filteredagents.find(agent => agent.id === secondagent) || null}
                                sx={{ width: 'auto', height: 'auto' }}
                                options={filteredagents}
                                getOptionLabel={(option) => option.fullname || ""}
                                renderInput={(params) => (
                                    <TextField {...params} label="Choose Agent" margin="normal" color='success' />
                                )}
                            />
                            <Button
                                sx={{
                                    bgcolor: red[700],
                                    "&:hover": { bgcolor: red[600] },
                                    height: 'auto',
                                    width: 'auto',
                                    mt: 2
                                }}
                                onClick={exchange_clients}
                                variant="contained"
                                startIcon={<ChangeCircleOutlined />}
                            >
                                Affecte Clients
                            </Button>
                            <ConfirmationDialog
                                open={openDialog}
                                handleClose={handleCloseDialog}
                                handleConfirm={handleConfirmDialog}
                                title="Confirm Clients Exchange"
                                message="Are you sure you want to Affect those Clients?"
                                loading={loading}
                                loadingmessage="Updating"
                            />
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert
                                    onClose={handleClose}
                                    severity="success"
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    Clients are Affected with success!
                                </Alert>
                            </Snackbar>
                            <Snackbar open={opensnakerror} autoHideDuration={6000} onClose={handleClose_err}>
                                <Alert
                                    onClose={handleClose_err}
                                    severity="error"
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    Client or Agent not selected !
                                </Alert>
                            </Snackbar>
                        </>
                    )}
                </Box>
            </Stack>
        </Card>
    );
};

export default Clients_calls;
