import { Alert, Autocomplete, Box, Button, Card, Checkbox, Chip, FormControlLabel, IconButton, InputBase, Paper, Snackbar, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { ChangeCircleOutlined } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import Accounts_management from '@/services/Accounts_management';

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
    const [searchTerm, setSearchTerm] = useState("");
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

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
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

    const handleConfirmDialog = () => {
        // Confirm affectation of clients
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


    useEffect(
        () => {
            Accounts_management.all('calls-clients')
                .then(({ data, status }) => {
                    if (status === 200) {
                        console.log(data);
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


            filtered = filtered.filter(f => f.call_center_id === firstagent);

            sagents = sagents.filter(f => f.id !== firstagent);
            setFilteredRows(filtered);
        } else {
            setFilteredRows([]);
        }

        if (searchTerm) {
            filtered = filtered.filter(f =>
                f.client.fullname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                f.client.province.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                f.statue.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
            );
            setFilteredRows(filtered);
        }


        setFilteredagents(sagents);
    }, [firstagent, searchTerm, secondagent]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = visibleRows.map((row, index) => page * rowsPerPage + index);
            setSelected(newSelected);
            return;
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

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);

        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
            { id: 'Fullname', numeric: false, disablePadding: true, label: 'Fullname' },
            { id: 'Telephone', numeric: true, disablePadding: false, label: 'Phone Number' },
            { id: 'Province', numeric: true, disablePadding: false, label: 'Province' },
            { id: 'Status', numeric: true, disablePadding: false, label: 'Status' },
            { id: 'Comments', numeric: true, disablePadding: false, label: 'Comments' },
            { id: 'Date', numeric: true, disablePadding: false, label: 'Date' }
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
                <TableContainer component={Paper} sx={{ width: '80%', height: 'auto' }}>
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

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, globalIndex)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={globalIndex}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="success"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}

                                            />
                                        </TableCell>
                                        <TableCell align="center" >{row.client.fullname}</TableCell>
                                        <TableCell align="center">{row.client.telephone}</TableCell>
                                        <TableCell align="center">{row.client.province}</TableCell>
                                        <TableCell align="center"> <Chip label={row.statue} color="success" variant="outlined" /></TableCell>
                                        <TableCell align="center">{row.remarque}</TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
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
                    <FormControlLabel control={<Switch color='success' onChange={handelexchange}  />} label="Clients exchange ?" />
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
                                sx={{ width: 'auto' ,height:'auto' }}
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
