import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    InputBase,
    LinearProgress,
    Modal,
    Paper,
    Skeleton,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    styled
} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import React, { useEffect, useMemo, useState } from "react";
import { green } from "@mui/material/colors";
import { Delete, Edit } from "@mui/icons-material";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from "sweetalert";
import { TextSearchIcon, X } from "lucide-react";
import Accounts_management from "@/services/Accounts_management";
import EditAccount from "./Forms_sysadmin/EditAccount";
import { useQuery } from "react-query";
import { axiosClient } from "../../api/axios";
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
];



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
    px: 4,
    pb: 3,
};
function AddAcounts_sysadmin() {
    const [value, setValue] = useState('1');
    const [searchtext, setSearchtext] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === '1' && !searchtext) {
            setFilteredRows(combinedData);
        }
    };

    const handledelete = async (item) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                Accounts_management.delete(item.id, item.role)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            swal(item.fullname + " has been deleted!", {
                                icon: "success",
                            })

                            refetch()
                        }
                    }).catch(({ response }) => {
                        if (response) {
                            console.log(response);
                        }
                    });
            } else {
                swal("Your user is safe!");
            }
        });
    };

    const handelsearch = (event) => {
        const searchValue = event.target.value;
        setSearchtext(searchValue);

        let filteredusers = combinedData;
        if (searchValue) {
            filteredusers = filteredusers.filter(i => {
                return i.fullname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    i.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    i.role.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
            });
        }
        setFilteredRows(filteredusers);
    };

    const handeledit = (item) => {
        setUserData(item);
        handleOpen();
    };

    const [lengthdata, setLengthdata] = useState(0);
    const [userData, setUserData] = useState({});
    const [callcenterdata, setCallcenterdata] = useState([]);

    const fetchAllTables = async () => {
        const [callcenterResponse, chefEquipeResponse] = await Promise.all([
            axiosClient.get('api/callcenter'),

            axiosClient.get('api/chefequipe')
        ]);
        return {
            callcenter: callcenterResponse.data,

            chef_equipe: chefEquipeResponse.data
        };
    };

    const { data, error, isLoading, refetch } = useQuery('allTables', fetchAllTables);
    const { callcenter = [], chef_equipe = [] } = data || {};

    // Use useMemo to prevent unnecessary recalculations
    const combinedData = useMemo(() => [...callcenter, ...chef_equipe], [callcenter, chef_equipe]);

    const [filteredRows, setFilteredRows] = useState(combinedData);



    useEffect(() => {
        if (searchtext) {
            let filteredusers = combinedData.filter(i => {
                return i.fullname.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.email.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase()) ||
                    i.role.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase());
            });
            setFilteredRows(filteredusers);
        } else {
            setFilteredRows(combinedData);
        }
    }, [searchtext, combinedData]);

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Container sx={style}>
                    <EditAccount data={userData} handleClose={handleClose} refetch={refetch} />
                </Container>
            </Modal>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
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
                            aria-label="secondary tabs example"
                        >
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
                                        value={searchtext}
                                        placeholder=" search for users"
                                        inputProps={{ 'aria-label': 'search for clients' }}
                                    />
                                </Item>
                            </Stack>
                            {isLoading ? (

                                <Table>
                                    <TableBody>
                                        {Array.from(new Array(filteredRows.length)).map((_, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {Array.from(new Array(6)).map((_, colIndex) => (
                                                    <TableCell key={colIndex}>
                                                        <Skeleton variant="rectangular" width="100%" height={40} />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <TableContainer component={Paper} sx={{ width: '100%' }}>
                                    <Table sx={{ width: '100%' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Fullname</TableCell>
                                                <TableCell>CIN</TableCell>
                                                <TableCell>Telephone</TableCell>
                                                <TableCell align="center">Role</TableCell>
                                                <TableCell align="center">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredRows.length > 0 ? (
                                                filteredRows.map((item) => (
                                                    <TableRow key={item.email}>
                                                        <TableCell>{item.email}</TableCell>
                                                        <TableCell>{item.fullname}</TableCell>
                                                        <TableCell>{item.CIN}</TableCell>
                                                        <TableCell>{item.telephone}</TableCell>
                                                        <TableCell align="center">{item.role}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton aria-label="delete" size="small" sx={{ mt: -1, mr: 2, outline: 'none' }} onClick={() => handledelete(item)}>
                                                                <Delete color="error" />
                                                            </IconButton>
                                                            <IconButton aria-label="edit" size="small" sx={{ mt: -1, mr: 2, outline: 'none' }} onClick={() => handeledit(item)}>
                                                                <Edit color="warning" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center">
                                                        No data available
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Register_sysadmin tab={setValue} refetch={refetch} />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
}

export default AddAcounts_sysadmin;
