
import { RemoveRedEye, Search } from "@mui/icons-material";
import { Autocomplete, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";



function createData(fullname, CIN, Telephone, province) {
    return {
        fullname,
        CIN,
        Telephone,
        province,


    };
}

function Row(props) {
    const { row } = props;



    return (
        <React.Fragment>


            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.fullname}
                </TableCell>
                <TableCell align="center">{row.CIN}</TableCell>

                <TableCell align="center">{row.Telephone}</TableCell>
                <TableCell align="center">{row.province}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                    >
                        <Link to={'/Techniciens/DetailsTech'} target="_blank"><RemoveRedEye color="success" /></Link>

                    </IconButton>
                </TableCell>


            </TableRow>

        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        CIN: PropTypes.string.isRequired,
        Telephone: PropTypes.string.isRequired,

        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                phone_cust: PropTypes.string.isRequired,

                date: PropTypes.string.isRequired,
                Statue: PropTypes.string.isRequired,
            }),
        ).isRequired,
        fullname: PropTypes.string.isRequired,

        province: PropTypes.string.isRequired,
    }).isRequired,
};

const rows = [
    createData('ali alaoui', 'D67889', '0765432311', 'Meknès'),
    createData('xx yy', 'D67889', '0765432311', 'Meknès'),
    createData('zz zzzzzz', 'D67889', '0765432311', 'El Hajeb'),
    createData('ali salah', 'D67889', '0765432311', 'Ifrane'),
    createData('salah salah', 'D67889', '0765432311', 'Ifrane'),

];

function Techniciens() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [search, setSearch] = useState('');
    const [provinceKey, setProvinceKey] = useState(0);
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

    const [province, setprovince] = useState("Meknès");

    const [filteredRows, setFilteredRows] = useState(rows);
    const handelsearch = (event) => {
        setSearch(event.target.value)
    }

    useEffect(() => {

        let filtered = rows;

        setFilteredRows([]);
        if (province) {
            filtered = filtered.filter(f => {
                return f.province.toLocaleLowerCase().includes(province.toLocaleLowerCase())

            })

            setFilteredRows(filtered);
        }

        if (search) {
            filtered = filtered.filter(f => {
                return f.fullname.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                    f.CIN.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                    f.Telephone.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            })
            setFilteredRows(filtered);
        }
    }, [province, search]);


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
                            <TableCell >Fullname</TableCell>
                            <TableCell align="center">CIN</TableCell>
                            <TableCell align="center">Telephone</TableCell>
                            <TableCell align="center">Province</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length !== 0 ? (filteredRows.map((row) => (
                            <Row key={row.CIN} row={row} />
                        ))) : <TableRow>
                            <TableCell colSpan={5} align="center">
                                No items
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default Techniciens;
