import React, { useRef, useState } from 'react';
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
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { green } from '@mui/material/colors';

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

const Addcalls = () => {
    const [opensnakerror, setOpensnakerror] = useState(false);
    const [open, setOpen] = useState(false);
    const commentRefs = useRef([]);
    const datevrefs = useRef([]);

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
        { id: 1, fullname: 'khalid', province: 'meknes', telephone: '07xxxxxxxx' },
        { id: 2, fullname: 'sara sara', province: 'meknes', telephone: '07xxxxxxx' },
        { id: 3, fullname: 'kamal', province: 'meknes', telephone: '06xxxxxxxx' },
    ];

    const [status, setStatus] = useState({});
    const [errormessage, setErrormessage] = useState("");
    const [selectedDate, setSelectedDate] = useState({});
    const [formData, setFormData] = useState({});

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

    const handleDateChange = (date, id) => {
        setSelectedDate((prevDates) => ({
            ...prevDates,
            [id]: date,
        }));
    };

    const validateForm = (item) => {
        let formValid = true;

        if (!status[item.id]) {
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
            status: status[item.id],
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
    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Call is added with success!
                </Alert>
            </Snackbar>

            <Snackbar open={opensnakerror} autoHideDuration={6000} onClose={handleClose_err}>
                <Alert onClose={handleClose_err} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {errormessage}
                </Alert>
            </Snackbar>

            <TableContainer component={Paper} sx={{ width: '90%', height: 'auto', mt: 3 }}>
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
                        {data.map((item, index) => (
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
                                            options={statusOptions}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Choose status" margin="normal" color="success" />
                                            )}
                                            onChange={(event, newValue) => handleStatusChange(event, newValue, item.id)

                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            fullWidth
                                            label="Comment"
                                            margin='normal'
                                            inputRef={(el) => (commentRefs.current[item.id] = el)}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            color="warning"
                                            variant="outlined"
                                            sx={{ width: '100px', height: '35px' }}
                                            onClick={(event) => handleSubmit(event, item)}
                                        >
                                            Add call
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


                                                        options={techniciens}
                                                        getOptionLabel={(option) => option.label}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Choose Technician"
                                                                margin="normal" color="success" fullWidth
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
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            sx={{ mt: 2 }}
                                                            inputRef={(el) => (datevisitrefs.current[item.id] = el)}

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
                                                        inputRef={(el) => (pricerefs.current[item.id] = el)}
                                                        color="success"
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

export default Addcalls;
