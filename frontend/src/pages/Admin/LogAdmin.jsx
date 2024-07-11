
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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Loader } from "lucide-react"
import { Button } from "@mui/material"
import { useUserContext } from "../../../context/AdminContext"
import { redirecttodashboard } from "../../router/index.jsx";
const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(50),
})
// 2. Define a submit handler.
function LogAdmin() {
    const { login, setAuthenticated } = useUserContext()
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "admin@gmail.com",
            password: "123456789",
        },
    })
    const { setError, formState: { isSubmitting } } = form

    const onSubmit = async values => {

        console.log(values)
        await login(values.email, values.password)
            .then(
                ({ data, status }) => {
                    if (status === 200) {

                        setAuthenticated(true)
                        const { role } = data.user
                        navigate(redirecttodashboard(role))
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} style={{ width: '100%' }} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type={'password'} placeholder="Password" {...field} style={{ width: '100%' }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="contained" color="success" sx={{ width: '100%' }} type="submit" disabled={isSubmitting} >
                        {isSubmitting && <Loader className="mr-2 animate-spin" />} Login
                    </Button>
                </form>
            </Form >

        </>
    );
}

export default LogAdmin;
