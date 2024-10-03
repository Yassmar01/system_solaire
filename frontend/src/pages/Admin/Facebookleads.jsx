import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { AddCircle, AutoMode, Build, Delete, DeleteForever, DeleteOutline, Remove, Send, Settings } from '@mui/icons-material';
import { Alert, Autocomplete, Button, Grid, Icon, Snackbar, TextField, ToggleButton, styled } from '@mui/material';
import { green, pink, red } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { Label } from '@/components/ui/label';
import * as XLSX from 'xlsx';
import { DeleteIcon } from 'lucide-react';
import Accounts_management from '@/services/Accounts_management';
import { axiosClient } from '@/api/axios';
const VisuallyHiddenInput = ({ handleFileChange }) => (
    <input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        onChange={handleFileChange}
    />
);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {


    const { onSelectAllClick, numSelected, rowCount, headCells, handleRemoveColumn } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="success"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all Clients',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sx={{ textAlign: "center" }}
                    >
                        {headCell.label}

                        {/* <IconButton
                            size="small"
                            onClick={() => handleRemoveColumn(headCell.id)}
                            sx={{ ml: 1 }}
                        >
                            <Tooltip title="Delete" arrow placement="top" >

                                <Remove fontSize="small" color='error' />
                            </Tooltip>
                        </IconButton> */}
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
    headCells: PropTypes.array.isRequired,
    handleRemoveColumn: PropTypes.func.isRequired,
};

function EnhancedTableToolbar(props) {
    let { numSelected, setColumns, headCells, checkedclients } = props;
    const { agents, setJsonData, setHeadCells, jsonData, setSelected, setCheckedclients } = props;
    const [agentselect, setAgentselect] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [opensnakerror, setOpensnakerror] = React.useState(false);
    const [confirmaffect, setConfirmaffect] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const handleCloseDialog = () => {
        setConfirmaffect(false);
    };


    const handleConfirmDialog = () => {
        // Confirm affectation of clients
        setLoading(true);

        // Array to store promises
        const promises = [];

        for (let index = 0, length = checkedclients.length; index < length; index += 1) {
            const clientData = checkedclients[index]; // Assuming each row represents a client

            // Create a promise chain for each client and push it into the promises array
            const clientPromise = axiosClient.post('api/client')
                .then(({ data, status }) => {
                    if (status === 201) {
                        const clientId = data.id; // Assuming the newly created client ID is returned

                        // Now affect client to this agent
                        return axiosClient.post('api/call', {
                            client_id: clientId,
                            call_center_id: agentselect
                        }).then(({ data, status }) => {
                            if (status === 201) {
                                console.log('Affectation client:', data);
                            }

                            // Now, create the columns for this client
                            const columnPromises = headCells.map((header, columnIndex) => {
                                const columnValue = clientData[columnIndex]; // Assuming the order of columns in the row matches the headCells

                                return axiosClient.post('api/column', {
                                    column_name: header.label,
                                    value: columnValue,
                                    client_id: clientId, // Associate this column with the client
                                }).then(({ data, status }) => {
                                    if (status === 201) {
                                        console.log('Column creation:', data);
                                    }
                                }).catch(({ response }) => {
                                    console.error('Error creating column:', response);
                                });
                            });

                            // Return a promise that resolves when all columns are created
                            return Promise.all(columnPromises);
                        }).catch(({ response }) => {
                            console.error('Error affecting client:', response);
                        });
                    }
                }).catch(({ response }) => {
                    console.error('Error creating client:', response);
                });

            // Push the clientPromise to the promises array
            promises.push(clientPromise);
        }

        // Wait for all promises to complete
        Promise.all(promises)
            .then(() => {
                setLoading(false);
                setConfirmaffect(false);
                // Remove the row from checkedcalls array if it's unchecked
                const uncheckedClients = jsonData.filter(client => !checkedclients.includes(client));
                setJsonData(uncheckedClients)
                setSelected([]);
                setCheckedclients([])
                swal({
                    title: "Success!",
                    text: "Clients affected successfully",
                    icon: "success",
                    buttons: false,
                    timer: 3000, // Show the message for 3 seconds
                });
            })
            .catch((error) => {
                console.error('Error in processing clients:', error);
                setLoading(false);
                setConfirmaffect(false);
            });
    };



    const handleClick = () => {
        if (numSelected > 0 && agentselect !== null && headCells.length === jsonData[0].length) {

            setOpensnakerror(false);
            setConfirmaffect(true);



        }
        else {
            setOpensnakerror(true);


        }

    };


    const handeldeletetable = () => {
        setJsonData([]);
        setHeadCells([]);
        setColumns([])
        // sessionStorage.removeItem('jsonData');
        // sessionStorage.removeItem('headcell');

    }
    const handleClose_err = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpensnakerror(false);


    };

    React.useEffect(() => {
        setAgentselect(null);


        setOpensnakerror(false);

    }, [numSelected]);
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
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <>

                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Clients :
                    </Typography>

                    <IconButton
                        size="small"
                        onClick={handeldeletetable}
                        sx={{ ml: 1 }}
                    >

                        <Tooltip title="Empty the table" arrow placement="top" >

                            <DeleteOutline fontSize="medium" color='error' />
                        </Tooltip>
                    </IconButton>
                </>

            )}

            {numSelected > 0 && (
                <>
                    <Autocomplete
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setAgentselect(newValue.id);


                            } else {
                                setAgentselect(null);
                            }
                        }}
                        value={agents.find(agent => agent.id === agentselect) || null}
                        disableClearable
                        id="highlights-demo"
                        sx={{ width: 300, mr: 4 }}
                        options={agents}
                        getOptionLabel={(option) => option.fullname}
                        renderInput={(params) => (
                            <TextField {...params} label="Choose Agent" margin="normal" color='success' />
                        )}

                    />

                    <Tooltip title="Affecter">

                        <IconButton >
                            <Send color='success' onClick={handleClick} />
                        </IconButton>
                    </Tooltip>

                    <>



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
                                Agent and columns are required  !
                            </Alert>
                        </Snackbar>

                        <ConfirmationDialog
                            open={confirmaffect}
                            handleClose={handleCloseDialog}
                            handleConfirm={handleConfirmDialog}
                            title="Confirm Clients Affectation"
                            message=" Are you sure you want to Affect Thos Clients?"
                            loading={loading}
                            loadingmessage="Affecting"
                        />
                    </>
                </>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
function Facebookleads() {
    const [columns, setColumns] = React.useState()
    const columnsrefs = React.useRef([]);
    const [jsonData, setJsonData] = React.useState(() => {

        const savedData = sessionStorage.getItem('jsonData');
        return savedData ? JSON.parse(savedData) : [];
    });


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [headCells, setHeadCells] = React.useState(
        () => {
            const savedHeadCells = sessionStorage.getItem('headcell');
            return savedHeadCells ? JSON.parse(savedHeadCells) : [];
        }
    );



    const handleSelectAllClick = (event) => {

        if (event.target.checked) {
            const newSelected = visibleRows.map((row, index) => page * rowsPerPage + index);
            setSelected(newSelected);
            setCheckedclients(visibleRows);
            return;
        } else {
            setCheckedclients([]);
        }
        setSelected([]);


    };

    // const handleClick = (event, id, row) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }
    //     setSelected(newSelected);

    // };


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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jsonData.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(jsonData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, jsonData],
    );
    const [agents, setAgents] = React.useState([]);

    const [isManual, setIsManual] = React.useState(() => {
        const savedMode = localStorage.getItem('mode');
        return savedMode ? JSON.parse(savedMode) : false;
    });
    const [isChecked, setIsChecked] = React.useState(true);
    const [label, setLabel] = React.useState(isManual ? 'Manual Mode' : 'Automatic Mode');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [confirmaffect, setConfirmaffect] = React.useState(false);
    const [checkedclients, setCheckedclients] = React.useState([]);


    React.useEffect(() => {
        console.log("Updated checked clients:", checkedclients);
    }, [checkedclients]);


    const handleCheck = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    React.useEffect(() => {
        // Update the label whenever isManual changes
        setLabel(isManual ? 'Manual Mode' : 'Automatic Mode');
        setSelected([])

    }, [isManual]);




    const handleConfirmDialog = () => {
        setIsChecked(!isChecked);
        const newMode = !isManual;
        localStorage.setItem('mode', JSON.stringify(newMode));
        setIsManual(newMode);
        setFile(null);
        setOpenDialog(false);
    };
    const [file, setFile] = React.useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        readExcel(file);
        // Reset the input value to null to allow the same file to be uploaded again
        event.target.value = null;

    };


    const readExcel = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setJsonData(jsonData);


        };
        reader.readAsBinaryString(file);
    };

    const handleRemoveColumn = (columnId) => {
        setHeadCells((prevHeadCells) =>
            prevHeadCells.filter((headCell) => headCell.id !== columnId)
        );
    };
    const add_columns = () => {

        if (columnsrefs.current && columnsrefs.current.value) {
            const columnsToAdd = columnsrefs.current.value.split(',');
            const newHeadCells = columnsToAdd.map(column => ({

                numeric: false,
                disablePadding: false,
                label: column.trim()
            }));
            setHeadCells(prevHeadCells => [...prevHeadCells, ...newHeadCells]);


        }
        columnsrefs.current.value = ""

    }

    React.useEffect(() => {
        const savedData = sessionStorage.getItem('jsonData');
        if (savedData) {
            setJsonData(JSON.parse(savedData));
        }


        const saveheads = sessionStorage.getItem('headcell');
        if (saveheads) {
            setHeadCells(JSON.parse(saveheads));
        }
    }, []);

    React.useEffect(() => {
        sessionStorage.setItem('jsonData', JSON.stringify(jsonData));

    }, [jsonData]);


    React.useEffect(() => {
        sessionStorage.setItem('headcell', JSON.stringify(headCells));
    }, [headCells]);

    React.useEffect(
        () => {

            setCheckedclients([])
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
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}

                direction="column"
                justifyContent="center"
                alignItems="center"
            >

                <Grid item xs={8}>


                    {/* <ToggleButton
                        onClick={handleCheck}
                        // sx={{
                        //     bgcolor: red[300],
                        //     color: 'white',
                        //     "&:hover": { bgcolor: red[500] },
                        //     width: 'auto'
                        // }}
                        sx={{ color: red[700], width: 'auto', "&:hover": { bgcolor: red[700], color: 'white', } }}
                        variant="outlined"
                    >
                        {label === "Automatic Mode" ? <AutoMode sx={{ mr: 1 }} /> : <Build sx={{ mr: 1 }} />}

                        {label}
                    </ToggleButton> */}



                    <ConfirmationDialog
                        open={openDialog}
                        handleClose={handleCloseDialog}
                        handleConfirm={handleConfirmDialog}
                        title="Confirm Mode Change"
                        message="Are you sure you want to change the mode?"
                    />
                </Grid>
            </Grid>







            {isManual && (

                <Grid container spacing={12} sx={{ mt: -7, width: '90%' }}>


                    <Grid item xs={12}>

                        <Box>

                            <TextField
                                sx={{ width: 'auto' }}
                                size="small"
                                required
                                fullWidth
                                name="new-column"
                                color='success'
                                type="text"
                                autoComplete="new-column"

                                inputRef={columnsrefs}

                            />

                            <Button

                                type="submit"
                                color='warning'
                                fullWidth
                                variant="contained"
                                sx={{ width: 'auto', ml: 2 }}
                                onClick={add_columns}
                            >

                                <AddCircle sx={{ mr: 1 }} />
                                Add Column
                            </Button>
                        </Box>
                        <Button
                            sx={{
                                bgcolor: green[700],
                                my: 4,
                                "&:hover": { bgcolor: green[600] },
                                width: 'auto'
                            }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >

                            Upload Excel file
                            <VisuallyHiddenInput handleFileChange={handleFileChange} />
                        </Button>
                        <Box sx={{ width: '100%' }}>
                            <Paper sx={{ width: '100%', mb: 2 }}>
                                <EnhancedTableToolbar
                                    numSelected={selected.length}
                                    agents={agents}
                                    setColumns={setColumns}
                                    setHeadCells={setHeadCells}
                                    setSelected={setSelected}
                                    headCells={headCells}
                                    setJsonData={setJsonData}
                                    setCheckedclients={setCheckedclients}

                                    jsonData={jsonData}
                                    checkedclients={checkedclients}
                                />
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: '100%' }}
                                        aria-labelledby="tableTitle"
                                        size={dense ? 'small' : 'medium'}
                                    >
                                        <EnhancedTableHead
                                            numSelected={selected.length}

                                            onSelectAllClick={handleSelectAllClick}

                                            rowCount={visibleRows.length}
                                            headCells={headCells}
                                            handleRemoveColumn={handleRemoveColumn}
                                        />
                                        <TableBody>
                                            {visibleRows.map((row, index) => {
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
                                                        setCheckedclients((prevCheckedcalls) => [...prevCheckedcalls, row]);

                                                    } else {
                                                        // Remove the row from checkedcalls array if it's unchecked
                                                        setCheckedclients((prevCheckedcalls) => prevCheckedcalls.filter(c => c !== row));

                                                        //  console.log('unchecked')

                                                    }

                                                    //     console.log(checkedclients);
                                                };

                                                return (


                                                    <TableRow

                                                        //  onClick={(event) => handleClick(event, globalIndex, row)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={globalIndex}
                                                        selected={isItemSelected}

                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                color="success"
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                                onChange={(event) => {

                                                                    handleCheckboxChange(event);
                                                                }}
                                                            />
                                                        </TableCell>

                                                        {Object.values(row).map((value, i) => (
                                                            <TableCell sx={{ textAlign: "center" }} key={i}>{value}</TableCell>

                                                        ))}
                                                    </TableRow>




                                                );
                                            })}
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
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={jsonData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                            <FormControlLabel
                                control={<Switch checked={dense} onChange={handleChangeDense} color='success' />}
                                label="Dense padding"
                            />
                        </Box>
                    </Grid>

                </Grid >
            )
            }
        </>

    );
}

export default Facebookleads;
