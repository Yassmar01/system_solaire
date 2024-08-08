import React, { useEffect, useRef, useState } from 'react';
import {
    Autocomplete,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    TableContainer,
    createTheme,
    ThemeProvider,
    Paper,
    InputAdornment,
    Grid,
    Snackbar,
    Alert,
    Box,
    styled,
    InputBase,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { green } from '@mui/material/colors';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,


}));
const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: green[700],
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: green[700],
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: green[700],
                        },
                        '&:hover fieldset': {
                            borderColor: green[800],
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: green[700],
                        },
                    },
                },
            },
        },
        MuiDatePicker: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        color: green[900],
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: green[900],
                    },
                    '& .MuiInputLabel-root': {
                        color: green[900],
                    },
                },
            },
        },
    },
});

const Editcalls = () => {
    const [opensnakerror, setOpensnakerror] = useState(false);
    const [open, setOpen] = useState(false);
    const commentRefs = useRef([]);
    const datevrefs = useRef([]);
    const statusrefs = useRef([]);


    const techrefs = useRef([]);
    const activityrefs = useRef([]);
    const pricerefs = useRef([]);
    const pointrefs = useRef([]);
    const datevisitrefs = useRef([]);







    const statusOptions = [
        { value: 'Confirme', label: 'Confirmé' },
        { value: 'Injoignable', label: 'Injoignable' },
        { value: 'Rdvplanifie', label: 'Rendez-vous planifié' },
        { value: 'Annule', label: 'Annulé' },
        { value: 'Veutapres', label: 'Veut après' },
        { value: 'Ennegociation', label: 'En négociation de prix' },
    ];

    const techniciens = [
        { value: 'Technicien1', label: 'Technicien 1' },
        { value: 'Technicien2', label: 'Technicien 2' },
        { value: 'Technicien3', label: 'Technicien 3' },
        { value: 'Technicien4', label: 'Technicien 4' },
        { value: 'Technicien5', label: 'Technicien 5' },
        { value: 'Technicien6', label: 'Technicien 6' },
    ];

    const activitys = [
        { value: 'prospection', label: 'Prospection de l\'eau' },
        { value: 'Analyse', label: 'Analyse' },
    ];

    const data = [
        { id: 1, fullname: 'khalid', province: 'meknes', telephone: '07xxxxxxxx', comment: 'commrnt 1', status: 'Confirme', date: "11/07/2024" },
        { id: 2, fullname: 'sara sara', province: 'meknes', telephone: '07xxxxxxx', comment: 'commrnt 2', status: 'Veutapres', date: "11/07/2024" },
        { id: 3, fullname: 'kamal', province: 'meknes', telephone: '06xxxxxxxx', comment: 'commrnt 3', status: 'Rdvplanifie', date: "11/07/2024" },
    ];

    // const [status, setStatus] = useState({});
    const [status, setStatus] = useState(() => {
        const initialStatus = {};
        data.forEach(item => {
            initialStatus[item.id] = item.status;
        });
        return initialStatus;
    });
    const [errormessage, setErrormessage] = useState("");
    const [selectedDate, setSelectedDate] = useState({});
    const [formData, setFormData] = useState({});
    const [comments, setComments] = useState(() => {
        const initialComments = {};
        data.forEach(item => {
            initialComments[item.id] = item.comment;
        });
        return initialComments;
    });

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

    const handleStatusChange = (event, newValue, id) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [id]: newValue ? newValue.value : '',
        }));

        setSelectedDate("");
    };
    const handleCommentChange = (event, id) => {
        const { value } = event.target;

        setComments((prevComments) => ({
            ...prevComments,
            [id]: value,
        }));
    };

    const handleDateChange = (date, id) => {
        setSelectedDate((prevDates) => ({
            ...prevDates,
            [id]: date,
        }));
    };

    const validateForm = (item) => {
        let formValid = true;

        if (!statusrefs.current[item.id].value) {
            setErrormessage('Status is required');
            formValid = false;
        }

        if (!commentRefs.current[item.id].value) {
            setErrormessage('Comment is required');
            formValid = false;
        }
        if (status[item.id] === 'Veutapres' || status[item.id] === 'Rdvplanifie') {

            if (!datevrefs.current[item.id].value && status[item.id] === 'Rdvplanifie') {
                setErrormessage('Date is required');
                formValid = false;
            }
        }


        if (status[item.id] === 'Confirme') {

            if (!datevisitrefs.current[item.id].value) {
                setErrormessage('Date is required');
                formValid = false;
            }
            if (!techrefs.current[item.id].value) {
                setErrormessage('Please choose Technicien !');
                formValid = false;
            }

            if (!activityrefs.current[item.id].value) {
                setErrormessage('Please choose Activity !');
                formValid = false;
            }

            if (!pricerefs.current[item.id].value) {
                setErrormessage('Price is required');
                formValid = false;
            }
            if (!pointrefs.current[item.id].value) {
                setErrormessage('Points is required');
                formValid = false;
            }
        }

        return formValid;
    };

    const handleSubmit = (event, item) => {
        let submitvalues = {}
        event.preventDefault();

        if (!validateForm(item)) {
            setOpen(false);
            setOpensnakerror(true);
            return;
        }

        const formValues = {
            status: statusrefs.current[item.id].value,
            comment: commentRefs.current[item.id].value,
            datev: datevrefs.current[item.id]?.value || null,
        };

        if (status[item.id] === 'Confirme') {
            submitvalues = {
                technicien: techrefs.current[item.id].value,
                price: pricerefs.current[item.id].value,
                points: pointrefs.current[item.id].value,
                activity: activityrefs.current[item.id].value,
                datevisite: datevisitrefs.current[item.id]?.value || null,
            };
            console.log('Form submitted:', submitvalues);
        }
        console.log('Form submitted:', formValues);

        setOpensnakerror(false);
        setOpen(true);
    };
    const [searchtext, setSearchtext] = useState('')
    const handelsearch = (event) => {
        // console.log()
        setSearchtext(event.target.value)
    }
    const [filteredRows, setFilteredRows] = useState(data);
    useEffect(() => {
        let filtered = data;
        if (searchtext) {
            filtered = filtered.filter(i => {
                return i.fullname.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.telephone.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.status.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase())

            })
        }

        setFilteredRows(filtered)
    }, [searchtext]);
    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Call was successfully modified !
                </Alert>
            </Snackbar>

            <Snackbar open={opensnakerror} autoHideDuration={6000} onClose={handleClose_err}>
                <Alert onClose={handleClose_err} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {errormessage}
                </Alert>
            </Snackbar>

            <TableContainer component={Paper} sx={{ width: '90%', height: 'auto', mt: 3 }}>
                <Item sx={{ display: 'flex', alignItems: 'center', width: 400, height: 55, my: 3, ml: 1 }}>
                    <SearchIcon />

                    <InputBase


                        onChange={handelsearch}
                        placeholder="search for Calls"
                        inputProps={{ 'aria-label': 'search for clients' }}
                    />
                </Item>
                {/* <Item sx={{ backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', width: '100%', height: 57, my: 5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']} >
                        <DatePicker label="Search by date" defaultValue={selectedDate} onChange={handleDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
            </Item> */}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fullname</TableCell>
                            <TableCell>Province</TableCell>
                            <TableCell>Telephone</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Comment</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <TableRow>
                                    <TableCell>{item.fullname}</TableCell>
                                    <TableCell>{item.province}</TableCell>
                                    <TableCell>{item.telephone}</TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            sx={{ width: 'auto' }}
                                            id="status"
                                            name="status"

                                            value={statusOptions.find(option => option.value === (status[item.id] || item.status))}
                                            options={statusOptions}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Choose status"
                                                    margin="normal" color="success"

                                                    inputRef={(el) => (statusrefs.current[item.id] = el)}
                                                />
                                            )}
                                            onChange={(event, newValue) => handleStatusChange(event, newValue, item.id)}

                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            value={comments[item.id] || ''}
                                            margin='normal'
                                            onChange={(event) => handleCommentChange(event, item.id)}
                                            inputRef={(el) => (commentRefs.current[item.id] = el)}

                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            color="error"
                                            variant="contained"
                                            sx={{ width: 'auto', height: 'auto' }}
                                            onClick={(event) => handleSubmit(event, item)}
                                        >
                                            Edit call
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {(status[item.id] === 'Veutapres' || status[item.id] === 'Rdvplanifie') && (
                                    <TableRow>
                                        <TableCell colSpan={6} align='center'>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    sx={{ bgcolor: 'success' }}
                                                    inputRef={(el) => (datevrefs.current[item.id] = el)}

                                                    label="Choose date"
                                                    value={selectedDate[item.id] || null}
                                                    minDate={dayjs()}
                                                    onChange={(date) => handleDateChange(date, item.id)}
                                                    renderInput={(params) => (
                                                        <TextField {...params} margin="normal" fullWidth />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </TableCell>
                                    </TableRow>
                                )}

                                {status[item.id] === 'Confirme' && (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Grid container spacing={4}>
                                                <Grid item xs={2}>
                                                    <Autocomplete
                                                        id="technician"

                                                        sx={{ width: '100%' }}
                                                        options={techniciens}
                                                        getOptionLabel={(option) => option.label}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Choose Technician"
                                                                margin="normal" color="success" fullWidth
                                                                autoFocus
                                                                inputRef={(el) => (techrefs.current[item.id] = el)}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Autocomplete
                                                        id="activity"


                                                        options={activitys}
                                                        getOptionLabel={(option) => option.label}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Choose Activity"
                                                                margin="normal" color="success" fullWidth
                                                                inputRef={(el) => (activityrefs.current[item.id] = el)}
                                                                autoFocus
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            sx={{ mt: 2 }}
                                                            inputRef={(el) => (datevisitrefs.current[item.id] = el)}
                                                            autoFocus
                                                            label="Choose date"
                                                            value={selectedDate[item.id] || null}
                                                            minDate={dayjs()}
                                                            onChange={(date) => handleDateChange(date, item.id)}
                                                            renderInput={(params) => (
                                                                <TextField {...params} margin="normal" fullWidth />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        inputRef={(el) => (pointrefs.current[item.id] = el)}
                                                        value={pointrefs[item.id] || null}
                                                        autoFocus
                                                        color="success"
                                                        type="number"
                                                        fullWidth
                                                        label="Points"
                                                        margin="normal"
                                                        variant="standard"
                                                        InputProps={{
                                                            inputProps: { min: 0 },
                                                        }}
                                                    />
                                                </Grid>


                                                <Grid item xs={2}>
                                                    <TextField
                                                        // inputRef={(el) => (pointrefs.current[item.id] = el)}
                                                        // value={pointrefs[item.id] || null}
                                                        autoFocus
                                                        color="success"
                                                        type="number"
                                                        fullWidth
                                                        label="hectares"
                                                        margin="normal"
                                                        variant="standard"
                                                        InputProps={{
                                                            inputProps: { min: 0 },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        inputRef={(el) => (pricerefs.current[item.id] = el)}
                                                        autoFocus
                                                        color="success"
                                                        value={pricerefs[item.id] || null}
                                                        required
                                                        fullWidth
                                                        label="Price"
                                                        type="number"
                                                        margin="normal"
                                                        variant="standard"
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">DH</InputAdornment>,
                                                            inputProps: { min: 0 },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
};

export default Editcalls;
