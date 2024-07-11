import { Autocomplete, Box, Button, Container, CssBaseline, Grid, IconButton, InputBase, Modal, Paper, Stack, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, styled } from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import React, { useEffect, useState } from "react";
import { green } from "@mui/material/colors";
import { Block, Delete, Edit } from "@mui/icons-material";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from "sweetalert";
import { SearchIcon, TextSearchIcon } from "lucide-react";
import Register_sysadmin from "./Register_sysadmin";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const options = [
    { value: 'callcenter', label: 'Call Center' },
    { value: 'callcenter', label: 'Sys Admin' }
]
const handledelete = () => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("The user has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your user is safe!");
            }
        });
}


const handledelblock = () => {
    swal({
        title: "Are you sure?",
        text: "Once Blocked, you will not be able to recover this user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("The user has been Blocked!", {
                    icon: "success",
                });
            } else {
                swal("Your user is safe!");
            }
        });
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid green',
    boxShadow: 24,
    p: 6,
    px: 4,
    pb: 3,
};
function AddAcounts_sysadmin() {

    const regions = [
        { value: '', label: 'Sélectionnez une région', provinces: [] },
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
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [value, setValue] = useState('1')
    const [searchtext, setSearchtext] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handelsearch = (event) => {
        // console.log()
        setSearchtext(event.target.value)
    }
    const handeledit = (item) => {
        handleOpen()
        setUserData({
            email: item.email,
            CIN: item.CIN,
            fullname: item.fullname,
            email: item.email,
            telephone: item.telephone,
            role: item.role,
        })
    }
    const data = [{
        id: 1,
        email: "john.c.calhoun@examplepetstore.com",
        CIN: 'D4444',
        fullname: 'khalid',
        telephone: '07xxxxxxxx',
        role: 'Technician',
        province: 'meknes',

    },

    {
        id: 2,
        email: "calhoun@rdi.com",
        CIN: 'D1244',
        fullname: 'sara sara',
        telephone: '07xxxxxxx',
        role: 'call center'


    },
    {
        id: 3,
        email: "yassine@rdi.com",
        CIN: 'D844',
        fullname: 'kamal',
        telephone: '06xxxxxxxx',
        role: 'Technician',
        province: 'meknes',

    }
    ]
    const [userData, setUserData] = useState(
        {
            email: "",
            CIN: "",
            fullname: "",
            email: "",
            telephone: "",
            role: "",
            province: "",

        }
    );
    const [filteredRows, setFilteredRows] = useState(data);
    useEffect(() => {
        let filteredusers = data;
        if (searchtext) {
            filteredusers = filteredusers.filter(i => {
                return i.fullname.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.CIN.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.email.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.telephone.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.role.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase())

            })
        }

        setFilteredRows(filteredusers)
    }, [searchtext]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <>
            <Modal
                open={open}

                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />

                    <Box component="form" noValidate sx={style}>

                        {userData.role === "Technician" && (
                            <Grid container columns={16} spacing={2} >

                                <Grid item xs={8}>
                                    <Autocomplete
                                        id="regions"
                                        options={regions}

                                        renderInput={(params) => (
                                            <TextField {...params} label="Choose Region" margin="normal" color='success' />
                                        )}
                                        onChange={(event, newValue) => setSelectedRegion(newValue)}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Autocomplete
                                        id="provinces"

                                        options={selectedRegion ? selectedRegion.provinces : []}
                                        value={userData.province}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Choose Province" margin="normal" color='success' />
                                        )}
                                        onChange={(event, newValue) => setSelectedProvince(newValue)}
                                    />

                                </Grid>
                            </Grid>
                        )}
                        <Grid container columns={16} spacing={2} sx={{ mt: -1 }}>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullname"
                                    required
                                    fullWidth
                                    id="Fullname"
                                    label="Fullname"
                                    value={userData.fullname}
                                    onChange={handleInputChange}
                                    color='success'

                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="given-name"
                                    name="CIN"
                                    required
                                    fullWidth
                                    id="CIN"
                                    label="CIN"
                                    value={userData.CIN}
                                    onChange={handleInputChange}
                                    color='success'
                                />
                            </Grid>

                        </Grid>
                        <Grid container columns={16} >
                            <Grid item xs={16}>
                                <TextField
                                    sx={{ mt: 2 }}
                                    required
                                    fullWidth
                                    id="email"
                                    color='success'
                                    label="Email Address"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                        </Grid>

                        <Grid container columns={16}>
                            <Grid item xs={16}>
                                <TextField
                                    sx={{ mt: 2 }}
                                    required
                                    fullWidth
                                    id="Telephone"
                                    color='success'
                                    label="Telephone"
                                    value={userData.telephone}
                                    onChange={handleInputChange}
                                    name="telephone"
                                    autoComplete="Telephone"
                                /> </Grid></Grid>

                        <Grid container columns={16}>
                            <Grid item xs={16}>
                                <TextField
                                    required
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    name="password"
                                    color='success'
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />

                            </Grid>
                        </Grid>



                        <Button
                            type="submit"
                            color='warning'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => handeledit({

                                email: '',
                                password: '',

                            })}
                        >
                            Edit
                        </Button>

                    </Box>


                </Container>
            </Modal >







            <Box sx={{ width: '100%', typography: 'body1' }} >

                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: green[500],
                                },
                                "&& .Mui-selected": {
                                    color: green[700],
                                },
                            }}
                            aria-label="secondary tabs example"  >
                            <Tab label="Users" value="1" />
                            <Tab label="Add user" value="2" />
                        </Tabs>
                    </Box>

                    <TabPanel value="1">
                        <Box sx={{ height: 400, width: '100%' }}>
                            <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
                                <Item sx={{ display: 'flex', alignItems: 'center', width: 400, height: 60 }}>
                                    <TextSearchIcon />

                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        onChange={handelsearch}
                                        placeholder=" search for users"
                                        inputProps={{ 'aria-label': 'search for clients' }}
                                    />
                                </Item>

                            </Stack>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>CIN</TableCell>
                                        <TableCell>Fullname</TableCell>
                                        <TableCell>Telephone</TableCell>
                                        <TableCell align="center">Role</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRows.length !== 0 ? (filteredRows.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell >{item.email}</TableCell>
                                            <TableCell >{item.CIN}</TableCell>
                                            <TableCell >{item.fullname}</TableCell>
                                            <TableCell >{item.telephone}</TableCell>

                                            <TableCell align="center">{item.role}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="delete"
                                                    size="small"
                                                    sx={{ mt: -1, mr: 2, outline: 'none' }}
                                                    onClick={() => handledelete(item)}
                                                >
                                                    <Delete color="error" />
                                                </IconButton>

                                                <IconButton
                                                    aria-label="edit"
                                                    size="small"
                                                    sx={{ mt: -1, mr: 2, outline: 'none' }}
                                                    onClick={() => handeledit(item)}

                                                >
                                                    <Edit color="warning" />
                                                </IconButton>

                                                <IconButton
                                                    aria-label="block"
                                                    size="small"
                                                    sx={{ mt: -1, mr: 2, outline: 'none' }}
                                                    onClick={() => handledelblock(item)}
                                                >
                                                    <Block color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>

                                    ))) : <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            No items
                                        </TableCell>
                                    </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">

                        <Register_sysadmin />
                    </TabPanel>

                </TabContext>
            </Box>

        </>
    );
}

export default AddAcounts_sysadmin;
