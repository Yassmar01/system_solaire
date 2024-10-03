import Accounts_management from '@/services/Accounts_management.js';

import { zodResolver } from '@hookform/resolvers/zod';
import { PersonAdd } from '@mui/icons-material';
import { Alert, Autocomplete, Box, Button, Container, CssBaseline, Grid, Snackbar, TextField } from '@mui/material';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { object, z } from 'zod';

const formSchema = z.object({
    //   email: z.string().email().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    fullname: z.string().min(2, "Fullname is required").max(50),
    // CIN: z.string().min(2, "CIN is required").max(50).optional(),
    // telephone: z.string().refine((value) => /^(?:[0-9-()/.]\s?){6,10}[0-9]{1}$/.test(value), "Please specify a valid phone number .").optional(),
    role: z.string(),
    CIN: z.string().optional(),
    telephone: z.string().optional(),
    province: z.string().optional(),
}).refine(data => {
    if (data.role !== 'sysadmin') {
        return data.CIN;
    }
    return true;
}, {
    message: " CIN is required ",
    path: ["CIN"],
}).refine(data => {
    if (data.role !== 'sysadmin') {
        return data.telephone;
    }
    return true;
}, {
    message: " Phone is required ",
    path: ["telephone"],
})
    .refine(data => {
        if (data.role === 'chefequipe') {
            return data.province;
        }
        return true;
    }, {
        message: "Province is required ",
        path: ["province"],
    });


export default function EditAccount({ data, handleClose, refetch }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: data
    });




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




    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [provinceKey, setProvinceKey] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClosemessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };

    const onSubmit = async values => {
        console.log(values);

        const response = await Accounts_management.edit(data.id, values, data.role)
            .then(
                ({ data, status }) => {
                    if (status === 200) {
                        handleClose()

                        swal({
                            title: "Success!",
                            text: values.fullname + " information has been updated successfully.",
                            icon: "success",
                            buttons: false,
                            timer: 2000, // Show the message for 2 seconds
                        })
                        refetch();

                    }
                })

            .catch(({ response }) => {
                if (response && response.data && response.data.errors) {
                    const errors = response.data.errors;
                    Object.keys(errors).forEach(key => {
                        form.setError(key, {
                            type: "manual",
                            message: errors[key]
                        });
                    });
                }
            })
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClosemessage}>
                <Alert
                    onClose={handleClosemessage}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Account Updated with success !
                </Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={form.handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>


                                {data.role === "chefequipe" && (
                                    <>
                                        <Controller
                                            name="region"
                                            id="region"
                                            control={form.control}

                                            render={({ field }) => (
                                                <Autocomplete
                                                    {...field}
                                                    options={regions}
                                                    getOptionLabel={(option) => option.label}
                                                    value={regions.find(region => region.value === field.value) || null}
                                                    onChange={(event, newValue) => {
                                                        setProvinceKey(prevKey => prevKey + 1)
                                                        field.onChange(newValue?.value || "");
                                                        setSelectedRegion(newValue);
                                                        form.resetField('province'); // Reset the province field
                                                    }}

                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Choose Region"
                                                            margin="normal" color="success"
                                                            error={!!form.formState.errors.region}
                                                            helperText={form.formState.errors.region?.message} />
                                                    )}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="province"
                                            id="province"

                                            control={form.control}
                                            render={({ field }) => (
                                                <Autocomplete

                                                    key={provinceKey}
                                                    {...field}
                                                    options={selectedRegion ? selectedRegion.provinces : []}
                                                    getOptionLabel={(option) => option}
                                                    onChange={(event, newValue) =>
                                                        field.onChange(newValue || "")
                                                    }

                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Choose Province"
                                                            margin="normal" color="success"
                                                            value={selectedProvince}
                                                            error={!!form.formState.errors.province}
                                                            helperText={form.formState.errors.province?.message} />
                                                    )}
                                                />
                                            )}
                                        />
                                    </>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField

                                    autoComplete="given-name"
                                    name="fullname"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Fullname"
                                    color="success"
                                    {...form.register('fullname')}
                                    error={!!form.formState.errors.fullname}
                                    helperText={form.formState.errors.fullname?.message}
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
                                    color="success"
                                    {...form.register('CIN')}
                                    error={!!form.formState.errors.CIN}
                                    helperText={form.formState.errors.CIN?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="telephone"
                                    color="success"
                                    label="Telephone"
                                    name="telephone"
                                    autoComplete="telephone"
                                    {...form.register('telephone')}
                                    error={!!form.formState.errors.telephone}
                                    helperText={form.formState.errors.telephone?.message}
                                />
                            </Grid>



                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    color="success"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...form.register('email')}
                                    error={!!form.formState.errors.email}
                                    helperText={form.formState.errors.email?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    color="success"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...form.register('password')}
                                    error={!!form.formState.errors.password}
                                    helperText={form.formState.errors.password?.message}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            color="success"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={form.formState.isSubmitting} // Disable button during submission
                        >
                            <PersonAdd sx={{ mr: 1 }} />
                            {/* {isSubmitting && <Loader className="position-absolute end-5 animate-spin" />} */}
                            {form.formState.isSubmitting ? <Loader className="animate-spin" /> : "Edit"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
