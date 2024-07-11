
import { PersonAdd } from '@mui/icons-material';
import { Autocomplete, Box, Button, Container, CssBaseline, Grid, TextField } from '@mui/material';
import { useState } from 'react';



export default function Register_sysadmin() {
    const options = [
        { value: 'chef_equipe', label: 'Chef dequipe' },
        { value: 'callcenter', label: 'Call Center' },
      
    ]
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
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
    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="highlights-demo"
                                    options={options}
                                    getOptionLabel={(option) => option.label}
                                    autoFocus
                                    renderInput={(params) => (
                                        <TextField {...params} label="Choose Acount Type" margin="normal" color='success' />
                                    )}
                                    onChange={(event, newValue) => setSelectedOption(newValue)}
                                />

{selectedOption && selectedOption.label === "Chef dequipe" && (
                <>
                    <Autocomplete
                        id="regions"
                        options={regions}

                        renderInput={(params) => (
                            <TextField {...params} label="Choose Region" margin="normal" color='success' />
                        )}
                        onChange={(event, newValue) => setSelectedRegion(newValue)}
                    />

                        <Autocomplete
                            id="provinces"
                            options={selectedRegion ? selectedRegion.provinces : []}

                            renderInput={(params) => (
                                <TextField {...params} label="Choose Province" margin="normal" color='success' />
                            )}
                            onChange={(event, newValue) => setSelectedProvince(newValue)}
                        />

                </>
            )}



                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="Fullname"
                                    required
                                    fullWidth
                                    id="Fullname"
                                    label="Fullname"
                                    color='success'

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="CIN"
                                    label="CIN"
                                    name="CIN"
                                    autoComplete="CIN"
                                    color='success'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    color='success'
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Telephone"
                                    color='success'
                                    type="number"
                                    label="Telephone"
                                    name="Telephone"
                                    autoComplete="Telephone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
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
                            color='success'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <PersonAdd sx={{ mr: 1 }} />
                            Add
                        </Button>

                    </Box>
                </Box>

            </Container>

        </>
    );
}
