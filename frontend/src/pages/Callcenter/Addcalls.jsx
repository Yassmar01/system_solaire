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
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Zoom,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { blue, green, red } from '@mui/material/colors';
import AdminApi from '@/services/api/AdminApi';
import { useUserContext } from '../../../context/AdminContext';
import Accounts_management from '@/services/Accounts_management';
import { date } from 'zod';
import { Loader } from 'lucide-react';
import { AddCircleOutline, Delete } from '@mui/icons-material';
import { axiosClient } from '@/api/axios';

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
    const { user } = useUserContext();
    const [opensnakerror, setOpensnakerror] = useState(false);
    const [open, setOpen] = useState(false);
    const commentRefs = useRef([]);
    const datevrefs = useRef([]);


    const activityrefs = useRef([]);
    const pricerefs = useRef([]);
    const hectares = useRef([]);

    const pointrefs = useRef([]);
    const datevisitrefs = useRef([]);

    const [calls, setCalls] = useState([]);
    const statusOptions = [
        { value: 'Confirmé', label: 'Confirmé' },
        { value: 'Injoignable', label: 'Injoignable' },
        { value: 'Rendez-vous planifié', label: 'Rendez-vous planifié' },
        { value: 'Annulé', label: 'Annulé' },
        // { value: 'Veut après', label: 'Veut après' },
        { value: 'En négociation de prix', label: 'En négociation de prix' },
    ];

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedtech, setSelectedtech] = useState(null);


    const [provinceKey, setProvinceKey] = useState(0);
    const regions = [

        { value: 'Tanger-Tétouan-Al Hoceïma', label: 'Tanger-Tétouan-Al Hoceïma', provinces: ["Tanger-Asilah", "Fahs Anjra", "M'diq-Fnideq", "Chefchaouen", "Larache", "Ouezzane", "Tetouan", "Al Hoceima"] },
        { value: 'Oriental', label: 'L\'Oriental', provinces: ["Berkane", "Driouch", "Figuig", "Guercif", "Jerada", "Nador", "Oujda-Angad", "Taourirt"] },
        { value: 'Fès-Meknès', label: 'Fès-Meknès', provinces: ["Fès", "Boulemane", "El Hajeb", "Ifrane", "Meknès", "Moulay Yacoub", "Séfrou", "Taounate", "Taza"] },
        { value: 'Rabat-Salé-Kénitra', label: 'Rabat-Salé-Kénitra', provinces: ["Kénitra", "Khémisset", "Rabat", "Salé", "Sidi Kacem", "Sidi Slimane", "Skhirate-Témara"] },
        { value: 'Béni Mellal-Khénifra', label: 'Béni Mellal-Khénifra', provinces: ["Azilal", "Béni Mellal", "Fquih Ben Salah", "Khénifra", "Khouribga"] },
        { value: 'Casablanca-Settat', label: 'Casablanca-Settat', provinces: ["Benslimane", "Berrechid", "Casablanca", "El Jadida", "Médiouna", "Mohammédia", "Nouaceur", "Settat", "Sidi Bennour"] },
        { value: 'Marrakech-Safi', label: 'Marrakech-Safi', provinces: ["Al Haouz", "Chichaoua", "El Kelaâ des Sraghna", "Essaouira", "Marrakech", "Rehamna", "Safi", "Youssoufia"] },
        { value: 'Drâa-Tafilalet', label: 'Drâa-Tafilalet', provinces: ["Errachidia", "Ouarzazate", "Midelt", "Zagora", "Tinghir"] },
        { value: 'Souss-Massa', label: 'Souss-Massa', provinces: ["Agadir-Ida OuTanane", "Chtouka-Aït Baha", "Inezgane-Aït Melloul", "Tata", "Taroudant", "Tiznit"] },
        { value: 'Guelmim-Oued Noun', label: 'Guelmim-Oued Noun', provinces: ["Assa-Zag", "Guelmim", "Tan-Tan", "Sidi Ifni"] }
    ];

    const [province, setprovince] = useState("");

    const [allchefs, setAllchefs] = useState([]);
    const [filtredtech, setFiltredtech] = useState([]);


    const activitys = [
        { value: 'Prospection de l\'eau', label: 'Prospection de l\'eau' },
        { value: 'Analyse', label: 'Analyse' },
    ];



    const [status, setStatus] = useState({});
    const [errormessage, setErrormessage] = useState("");
    const [selectedDate, setSelectedDate] = useState({});
    const [formData, setFormData] = useState({});
    const [issubmitting, setIssubmitting] = useState(null);


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
        if (status[item.id] === 'Rendez-vous planifié') {

            if (!datevrefs.current[item.id].value && status[item.id] === 'Rendez-vous planifié') {
                setErrormessage('Date is required');
                formValid = false;
            }
        }


        if (status[item.id] === 'Confirmé') {

            if (!datevisitrefs.current[item.id].value) {
                setErrormessage('Date is required');
                formValid = false;
            }

            if (!hectares.current[item.id].value) {
                setErrormessage('Hectares is required');
                formValid = false;
            }
            if (!selectedtech) {
                setErrormessage('Please choose Technicien !');
                formValid = false;
            }

            if (!activityrefs.current[item.id].value) {
                setErrormessage('Please choose Activity !');
                formValid = false;
            }


            if (points.length < 1) {
                setErrormessage('One point at least should be added!');
                formValid = false;
            }



        }

        return formValid;
    };



    const handleSubmit = async (event, item) => {
        let submitvalues = {};
        setIssubmitting(item.id);
        event.preventDefault();

        // Form validation
        if (!validateForm(item)) {
            setOpen(false);
            setOpensnakerror(true);
            setIssubmitting(null);
            return;
        }

        try {
            // If status is 'Confirmé'
            if (status[item.id] === 'Confirmé') {
                submitvalues = {
                    name_activity: activityrefs.current[item.id].value,
                    hectares: hectares.current[item.id].value,

                    date: dayjs(datevisitrefs.current[item.id].value).format('YYYY-MM-DD'),
                    client_id: item.client.id,
                    chef_equipe_id: selectedtech,
                };

                //   console.log('Form submitted:', submitvalues);

                // Make the initial request for the operation
                const { data, status: operationStatus } = await axiosClient.post('api/operations', submitvalues);

                if (operationStatus === 201) {
                    const etude_operation_id = data.id;
                    console.log('etude_operation_id', etude_operation_id);

                    // Submit points
                    await Promise.all(
                        points.map(async (point, index) => {
                            const submitpointsvalue = {
                                etude_operation_id: etude_operation_id,
                                price: point,
                                lebele: 'point ' + index + 1
                            };
                            const { status: pointStatus } = await axiosClient.post('api/points', submitpointsvalue);
                            // if (pointStatus === 201) {
                            //     setOpensnakerror(false);
                            //     setOpen(true);
                            //     //fetchdata();
                            // }
                        })
                    );
                }
            }

            // Handle 'Rendez-vous planifié' status
            if (status[item.id] === 'Rendez-vous planifié') {
                const d = dayjs(datevrefs.current[item.id].value).format('YYYY-MM-DD');

                const formValues = {
                    statue: status[item.id],
                    remarque: commentRefs.current[item.id].value,
                    date: dayjs().format('YYYY-MM-DD'),
                    RDV_call: d,
                };

                const { status: rdvStatus } = await Accounts_management.edit(item.id, formValues, 'call');
                if (rdvStatus === 200) {
                    setOpensnakerror(false);
                    setOpen(true);
                    fetchdata();
                }
            }

            // Handle 'En négociation de prix' or 'Injoignable' status
            if (status[item.id] === 'En négociation de prix' || status[item.id] === 'Injoignable' || status[item.id] === 'Confirmé' || status[item.id] === 'Annulé') {
                const formValues = {
                    statue: status[item.id],
                    remarque: commentRefs.current[item.id].value,
                    date: dayjs().format('YYYY-MM-DD'),
                };

                const { status: editStatus } = await Accounts_management.edit(item.id, formValues, 'call');
                if (editStatus === 200) {
                    setOpensnakerror(false);
                    setOpen(true);
                    fetchdata();
                }
            }
        } catch (error) {
            console.log(error.response);
        } finally {
            setIssubmitting(null);
        }
    };



    const fetchdata = () => {
        Accounts_management.show('getCalls', user.id)
            .then(({ data, status }) => {
                if (status === 200) {
                    console.log(data);


                    setCalls(data);
                    //  setFilteredRows(filtered)
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });
    }

    useEffect(() => {


        Accounts_management.show('getCalls', user.id)
            .then(({ data, status }) => {
                if (status === 200) {
                    console.log(data);


                    setCalls(data);
                    //  setFilteredRows(filtered)
                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });


        Accounts_management.all('chefequipe')
            .then(({ data, status }) => {
                if (status === 200) {
                    //  console.log(data);
                    setAllchefs(data)


                }
            }).catch(({ response }) => {
                if (response) {
                    console.log(response);
                }
            });


    }, [])



    useEffect(() => {
        setFiltredtech([]);

        let filtered = allchefs;
        if (province) {
            filtered = filtered.filter(f => {
                return f.province.toLocaleLowerCase().includes(province.toLocaleLowerCase())
            })
            // console.log(filtered)

            setFiltredtech(filtered);
        } else {
            setFiltredtech([]);
        }



    }, [province]);

    const [points, setPoints] = useState([]);


    const handladdpoints = (event, item) => {
        const newPoints = pricerefs.current[item.id].value;

        if (newPoints) {
            // Update points array using state setter
            setPoints(prevPoints => [...prevPoints, newPoints]);
        }
        // console.log('Points', points)
    };


    const handldeletepoints = (event, item) => {
        setPoints([])
        pricerefs.current[item.id].value = ''
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
                            <TableCell>Client Informations</TableCell>

                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Comment</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {calls.length !== 0 ? (calls.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <TableRow>

                                    <TableCell>
                                        <Card>
                                            <CardContent>

                                                {item.client.columns.length > 0 ? (
                                                    item.client.columns.map((col) => (

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
                                    <TableCell>
                                        <Autocomplete
                                            sx={{ width: 'auto' }}
                                            id="status"
                                            name="status"
                                            options={statusOptions}
                                            getOptionLabel={(option) => option.label}


                                            isOptionEqualToValue={(option, value) => option.value === value.value}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Choose status" margin="normal" color="success"
                                                />
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
                                            required

                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            color="warning"
                                            variant="outlined"
                                            sx={{ width: 'auto', height: 'auto' }}
                                            disabled={issubmitting === item.id}
                                            onClick={(event) => handleSubmit(event, item)}
                                        >
                                            {issubmitting === item.id ? (
                                                <>
                                                    <span style={{ marginRight: '3px' }}>Adding call</span>
                                                    <Loader className="animate-spin" />
                                                </>
                                            ) : (
                                                'Add call'
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {(status[item.id] === 'Rendez-vous planifié') && (
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

                                {status[item.id] === 'Confirmé' && (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Grid container spacing={4}>
                                                <Grid item xs={2}>
                                                    <Autocomplete
                                                        id="highlights-demo"

                                                        options={regions}
                                                        getOptionLabel={(option) => option.label}
                                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                                        onChange={(event, newValue) => {

                                                            setSelectedRegion(newValue);
                                                            setProvinceKey(prevKey => prevKey + 1);
                                                            setFiltredtech([])

                                                            if (!newValue) {
                                                                setprovince("");

                                                            }
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Choose Region" margin="normal" color='success' />
                                                        )}
                                                    />   </Grid>
                                                <Grid item xs={2}>
                                                    <Autocomplete
                                                        id="highlights-demo"
                                                        key={provinceKey}

                                                        options={selectedRegion ? selectedRegion.provinces : []}
                                                        getOptionLabel={(option) => option}
                                                        isOptionEqualToValue={(option, value) => option === value}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Choose Provine"
                                                                margin="normal" color='success' name="p"
                                                            />
                                                        )}
                                                        onChange={(event, newValue) => setprovince(newValue)}

                                                    />

                                                </Grid>
                                                <Grid item xs={2}>

                                                    <Autocomplete
                                                        id="technician"


                                                        options={filtredtech}
                                                        getOptionLabel={(option) => option.fullname}
                                                        onChange={(event, newValue) => {
                                                            setSelectedtech(newValue.id)
                                                            //   console.log(newValue.id);


                                                        }}


                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Choose Technician"
                                                                margin="normal" color="success" fullWidth

                                                            />
                                                        )}
                                                    />
                                                </Grid>


                                                <Grid item xs={2}>
                                                    <Autocomplete
                                                        id="activity"

                                                        options={activitys}
                                                        getOptionLabel={(option) => option.label}
                                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Choose Activity"
                                                                margin="normal" color="success" fullWidth
                                                                inputRef={(el) => (activityrefs.current[item.id] = el)}
                                                                isOptionEqualToValue
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
                                                        inputRef={(el) => (hectares.current[item.id] = el)}

                                                        required
                                                        color="success"
                                                        type="number"
                                                        fullWidth
                                                        label="Hectares"
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

                                                <Grid item sx={{ mt: 3 }}>
                                                    <Tooltip title="Delete points" TransitionComponent={Zoom} placement='top' arrow>

                                                        <IconButton color="error"
                                                            onClick={(event) => handldeletepoints(event, item)}

                                                        >
                                                            <Delete />

                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Add point" TransitionComponent={Zoom} placement='top' arrow>

                                                        <IconButton color="success"
                                                            onClick={(event) => handladdpoints(event, item)}

                                                        >
                                                            <AddCircleOutline />

                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>


                                                <Grid item xs={2}>
                                                    {points.length > 0 && (
                                                        points.map((p, index) => (
                                                            <Box key={index}
                                                                sx={{
                                                                    bgcolor: red[200],
                                                                    color: 'white',
                                                                    p: 1,
                                                                }}>
                                                                Point {index + 1} : {p} DH
                                                            </Box>
                                                        ))
                                                    )}
                                                </Grid>

                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>)
                        )) : (<React.Fragment>
                            <TableRow>
                                <TableCell colSpan={4} align="center">

                                    No Additional calls

                                </TableCell>
                            </TableRow>

                        </React.Fragment>)


                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
};

export default Addcalls;
