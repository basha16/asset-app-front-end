import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { LoginInitialValues, LoginSchema, UserLogin } from './models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, redirect, useNavigate } from 'react-router-dom';
import authServices from '../../services/authServices/AuthServices';
import { AuthContext } from '../../AuthProvider';

const defaultTheme = createTheme();

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useContext<any>(AuthContext);
    const [errorMesaage, setErrorMessage] = React.useState('')

    const methods = useForm<UserLogin>({
        mode: 'onChange',
        defaultValues: LoginInitialValues,
        resolver: yupResolver(LoginSchema)
    })

    const { handleSubmit, control } = methods

    const onSubmit = async (values: UserLogin) => {
        let response;
        try {
            response = await authServices.login(values)
            if (response && response?.status === 'success') {
                setErrorMessage('')
                const { currentUser } = response
                sessionStorage.clear();
                sessionStorage.setItem('id', currentUser[0].id)
                sessionStorage.setItem('email', currentUser[0].email)
                sessionStorage.setItem('first_name', currentUser[0].first_name)
                sessionStorage.setItem('last_name', currentUser[0].last_name)
                sessionStorage.setItem('position', currentUser[0].position)
                setCurrentUser(currentUser[0].email)
                navigate('/dashboard');
            }
        }
        catch (error) {
            setErrorMessage('Email or Password is Incorrect')
            console.log(error)
        }

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                {errorMesaage && <div>
                                    <span className='text-red-600'>{errorMesaage}</span>
                                </div>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>


                                <Link to={'/register'}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </form>
                        </FormProvider>
                    </Box>

                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default Login