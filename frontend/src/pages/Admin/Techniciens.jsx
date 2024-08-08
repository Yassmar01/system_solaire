
import { RemoveRedEye, Search } from "@mui/icons-material";
import { Autocomplete, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Accounts_management from "@/services/Accounts_management";

function Techniciens() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [search, setSearch] = useState('');
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
    const [filteredRows, setFilteredRows] = useState([]);

    const handelsearch = (event) => {
        setSearch(event.target.value)

    }

    useEffect(() => {
        setFilteredRows([]);

        let filtered = allchefs;
        if (province) {
            filtered = filtered.filter(f => {
                return f.province.toLocaleLowerCase().includes(province.toLocaleLowerCase())
            })
            // console.log(filtered)

            setFilteredRows(filtered);
        } else {
            setFilteredRows([]);
        }

        if (search) {
            filtered = filtered.filter(f => {
                return f.fullname.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                    f.CIN.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                    f.telephone.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            })
            setFilteredRows(filtered);

        }

    }, [province, search]);


    useEffect(() => {
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
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                <Autocomplete
                    id="highlights-demo"
                    sx={{ width: 300, ml: 4 }}
                    options={regions}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {

                        setSelectedRegion(newValue);
                        setProvinceKey(prevKey => prevKey + 1);
                        if (!newValue) {
                            setprovince("");
                        }
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Choose Region" margin="normal" color='success' />
                    )}
                />
                <Autocomplete
                    id="highlights-demo"
                    key={provinceKey}
                    sx={{ width: 300, ml: 4 }}
                    options={selectedRegion ? selectedRegion.provinces : []}
                    getOptionLabel={(option) => option}

                    renderInput={(params) => (
                        <TextField {...params} label="Choose Provine"
                            margin="normal" color='success' name="p"
                        />
                    )}
                    onChange={(event, newValue) => setprovince(newValue)}

                />
            </Box>
            <TableContainer component={Paper} sx={{ width: '1000px', mt: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', ml: 2, mb: 5 }} >
                    <Search sx={{ color: '#2e7d32', mr: 1, my: 0.5 }} />
                    <TextField id="search" color='success' label="Search" variant="standard" align="center" onChange={handelsearch} />
                </Box>
                <Table aria-label="collapsible table" >
                    <TableHead>
                        <TableRow>
                            <TableCell >Email</TableCell>
                            <TableCell align="center">Fullname</TableCell>
                            <TableCell align="center">CIN</TableCell>
                            <TableCell align="center">Telephone</TableCell>
                            <TableCell align="center">Province</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length !== 0 ? (
                            filteredRows.map((row, index) =>
                            (
                                <TableRow key={row.CIN}>
                                    <TableCell>{row.email}</TableCell>

                                    <TableCell align="center"> {row.fullname}  </TableCell>


                                    <TableCell align="center">{row.CIN}</TableCell>

                                    <TableCell align="center">{row.telephone}</TableCell>
                                    <TableCell align="center">{row.province}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                        >
                                            <Link

                                                to={`/Techniciens/DetailsTech?chef=${encodeURIComponent(btoa(row.id))}`}
                                                //  to={`/callcenter/Details?agent=${encodeURIComponent(btoa(row.id))}`}

                                                target="_blank">

                                                <RemoveRedEye color="success" />

                                            </Link>

                                        </IconButton>
                                    </TableCell>


                                </TableRow>

                            ))
                        ) : <TableRow>
                            <TableCell colSpan={6} align="center">
                                No Techniciens
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default Techniciens;
