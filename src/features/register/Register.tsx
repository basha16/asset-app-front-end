import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserRegister, UserRegisterInitialValues, UserRegisterSchema } from './models';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import authServices from '../../services/authServices/AuthServices';
import { AuthContext } from '../../AuthProvider';

const defaultTheme = createTheme();

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useContext<any>(AuthContext);
    const methods = useForm<UserRegister>({
        mode: 'onChange',
        defaultValues: UserRegisterInitialValues,
        resolver: yupResolver(UserRegisterSchema)
    })

    const { handleSubmit, control } = methods

    const onSubmit = async (values: UserRegister) => {
        try {
            const response = await authServices.register(values)
            if (response && response?.status === 'success') {
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
            console.log(error)
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Grid container spacing={2} className='pt-4'>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <TextField
                                                    {...field}
                                                    autoComplete="given-name"
                                                    required
                                                    fullWidth
                                                    id="firstName"
                                                    label="First Name"
                                                    autoFocus
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <TextField
                                                    required
                                                    {...field}
                                                    fullWidth
                                                    id="lastName"
                                                    label="Last Name"
                                                    name="lastName"
                                                    autoComplete="family-name"
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <TextField
                                                    {...field}
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    autoComplete="email"
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <TextField
                                                    {...field}
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="confirmPassword"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <TextField
                                                    required
                                                    fullWidth
                                                    {...field}
                                                    label="Confirm Password"
                                                    type="password"
                                                    id="confirmPassword"
                                                    autoComplete="new-password"
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to={'/login'}>
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </FormProvider>
                </Box>
                
            </Container>
        </ThemeProvider>
    );
}

export default Register