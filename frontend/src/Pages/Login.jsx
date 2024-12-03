
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useNavigate } from "react-router-dom"

import { AppBar, Box, Button, Card, CardMedia, Checkbox, CircularProgress, FormControlLabel, Grid2, IconButton, Toolbar, Typography } from "@mui/material"
import { useUserContext } from "../context/Context"
import { Loader, LogInIcon } from "lucide-react"
import { useState } from "react"
import Link from '@mui/material/Link';

const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(50),
})
// 2. Define a submit handler.
function Login() {
    const { login, setAuthenticated } = useUserContext()
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "test@example.com",
            password: "123456789",

        }

    })
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { setError, formState: { isSubmitting } } = form
    const { authenticated } = useUserContext()
    const onSubmit = async values => {
        //console.log(values)

        await login(values.email, values.password)
            .then(
                ({ data, status }) => {
                    console.log(data)
                    if (status === 200) {
                        setAuthenticated(true)

                        //  const { role } = data.user
                        navigate('/home')
                    }
                })
            .catch(({ response }) => {
                setError('email', {
                    message: response.data.message
                })
            })



    }
    return (
        <>

            <Box sx={{ flexGrow: 1 }} >


                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >

                            </IconButton>
                            <CardMedia
                                component="img"

                                sx={{ width: '80px', height: '66px' }}
                                image="/src/assets/panneaux-solaires.png"
                                alt="404 Image"

                            />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: '30px' }}>
                                Solar System
                            </Typography>
                            <Box color="inherit" sx={{ mr: '5px' }}>Login
                            </Box>
                            <LogInIcon />
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid2 container spacing={2} columns={16} alignItems="center" justifyContent="center">
                    {/* Left side with image */}
                    <Grid2 xs={8}>
                        <CardMedia
                            component="img"
                            sx={{ width: 'auto', mt: 10 }}
                            image="/src/assets/imglogin.png"
                            alt="Login Image"

                        />
                    </Grid2>

                    {/* Right side with form */}
                    <Card sx={{ minWidth: 300, height: 'auto', width: 500, p: 5, mt: 10 }}>
                        <Grid2 xs={8}>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Email Field */}

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Email</FormLabel>
                                                <FormControl style={{ marginTop: '10px' }} >
                                                    <Input placeholder="Email" {...field} style={{ width: '100%' }} />
                                                </FormControl>
                                                <FormMessage style={{ color: 'red', marginTop: '10px' }} />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Password</FormLabel>
                                                <FormControl style={{ marginTop: '10px' }}>
                                                    <Input
                                                        type={showPassword ? ("password") : ("text")}


                                                        placeholder="Password" {...field} style={{ width: '100%' }} />

                                                </FormControl>
                                                <FormMessage style={{ color: 'red', marginTop: '10px' }} />
                                                <FormControlLabel control={<Checkbox defaultChecked onChange={handleClickShowPassword} />} label="Show password" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <Button variant="contained" color="info"
                                        sx={{ width: '50%', ml: "25%" }}

                                        type="submit" disabled={isSubmitting}>
                                        {isSubmitting && <Loader className="mr-2 animate-spin" />}
                                        Login
                                    </Button>
                                    <Typography variant="body2" sx={{ display: 'block' }}>
                                        Dont have an account ?
                                        <a href="/register"
                                            className="ml-1"
                                            style={{ color: 'blue', textDecoration: 'underline' }}

                                            target="_blank">Register here</a>
                                    </Typography>

                                </form>
                            </Form>

                        </Grid2>
                    </Card>
                </Grid2 >
            </Box >

        </>

    );
}

export default Login;
