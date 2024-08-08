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
    let { numSelected } = props;
    const { agents, setJsonData, setHeadCells } = props;
    const [agentselect, setAgentselect] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [opensnakerror, setOpensnakerror] = React.useState(false);
    const [confirmaffect, setConfirmaffect] = React.useState(false);


    const handleCloseDialog = () => {
        setConfirmaffect(false);
    };
    const handleConfirmDialog = () => {
        //confirm affectation of clients

        setOpen(true);
        setConfirmaffect(false);
    };
    const handleClick = () => {
        if (numSelected > 0 && agentselect !== null) {

            setOpensnakerror(false);
            setConfirmaffect(true);


        }
        else {
            setOpensnakerror(true);
            setOpen(false);

        }

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };
    const handeldeletetable = () => {
        setJsonData([]);
        setHeadCells([]);
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

        setOpen(false);
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
                                setAgentselect(newValue.CIN);

                            } else {
                                setAgentselect(null);
                            }
                        }}
                        value={agents.find(agent => agent.CIN === agentselect) || null}
                        disableClearable
                        id="highlights-demo"
                        sx={{ width: 300, mr: 4 }}
                        options={agents}
                        getOptionLabel={(option) => option.Fullname}
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
                        {agentselect && (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                Clients are Affected with success !
                            </Alert>
                        </Snackbar>)}


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
                                Select an Agent !
                            </Alert>
                        </Snackbar>

                        <ConfirmationDialog
                            open={confirmaffect}
                            handleClose={handleCloseDialog}
                            handleConfirm={handleConfirmDialog}
                            title="Confirm Clients Affectation"
                            message=" Are you sure you want to Affect Thos Clients?"
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
    // const [columns, setColumns] = React.useState()
    const columnsrefs = React.useRef([]);
    const [jsonData, setJsonData] = React.useState(() => {

        const savedData = sessionStorage.getItem('jsonData');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('CIN');
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
            return;
        }
        setSelected([]);
        console.log(event.target.checked)

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
    const agents = [

        { Fullname: 'Agent 1', CIN: 'M001' },
        { Fullname: 'Agent 2', CIN: 'M002' },
        { Fullname: 'Agent 3', CIN: 'M003' },
        { Fullname: "Agent 4", CIN: 'M004' },
        { Fullname: 'Agent 5', CIN: 'M005' },
        { Fullname: 'Agent 6', CIN: 'M006' },
    ];
    const [isManual, setIsManual] = React.useState(() => {
        const savedMode = localStorage.getItem('mode');
        return savedMode ? JSON.parse(savedMode) : false;
    });
    const [isChecked, setIsChecked] = React.useState(true);
    const [label, setLabel] = React.useState(isManual ? 'Manual Mode' : 'Automatic Mode');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [confirmaffect, setConfirmaffect] = React.useState(false);


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
        console.log(file.name)
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
        console.log('add columns: ' + columnsrefs.current.value)

        if (columnsrefs.current && columnsrefs.current.value) {
            const columnsToAdd = columnsrefs.current.value.split(',');
            const newHeadCells = columnsToAdd.map(column => ({
                id: column.trim(),
                numeric: false,
                disablePadding: false,
                label: column.trim()
            }));
            setHeadCells(prevHeadCells => [...prevHeadCells, ...newHeadCells]);
        }

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

    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}

                direction="column"
                justifyContent="center"
                alignItems="center"
            >

                <Grid item xs={8}>


                    <ToggleButton
                        onClick={handleCheck}
                        sx={{
                            bgcolor: red[700],
                            color: 'white',
                            "&:hover": { bgcolor: red[500] },
                            width: 'auto'
                        }}
                        variant="contained"

                    >
                        {label === "Automatic Mode" ? <AutoMode sx={{ mr: 1 }} /> : <Build sx={{ mr: 1 }} />}

                        {label}
                    </ToggleButton>



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
                                    setHeadCells={setHeadCells}
                                    setJsonData={setJsonData}
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
