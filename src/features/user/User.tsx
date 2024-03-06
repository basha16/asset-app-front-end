import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { User as user, UserInitialValues, UserSchema, positions } from "./models";
import userService from "../../services/userServices/UserServices";
import { SelectUserIsSubmitting, fetchUsers, setIsSubmitting } from "../store/app/usersSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {
    open: boolean
    onClose: any
    user: any
}
 
const User: FC<Props> = ({ open, onClose, user }) => {
    const isSubmitting = useSelector(SelectUserIsSubmitting)
    const dispatch = useDispatch<any>()
    const userId = sessionStorage.getItem('id')

    const methods = useForm<user>({
        mode: 'onChange',
        defaultValues: UserInitialValues,
        resolver: yupResolver(UserSchema)
    })

    const { handleSubmit, control, reset } = methods

    useEffect(() => {
        return () => {
            reset()
        }
    }, [])

    if (user && user.email) {
        reset({ ...user, firstName: user.first_name, lastName: user.last_name })
    }

    const onSubmit = async (values: user) => {
        try {
            dispatch(setIsSubmitting(true))
            if (values.id) {
                const response = await userService.updateUser(values)
                if (response.status === 'success') {
                    onClose(false, reset)
                }
            } else {
                const response = await userService.createUser(values)
                console.log(response)
                if (response.status === 'success') {
                    onClose(false, reset)
                }
            }
            dispatch(setIsSubmitting(false))
            dispatch(fetchUsers(userId))
        } catch (error) {
            console.error(error)
        } finally {
            dispatch(setIsSubmitting(false))
            onClose(false, reset)
        }

    }

    return (
        <Dialog
            open={open}
            onClose={() => onClose(false, reset)}
            fullWidth
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <DialogTitle> Add User</DialogTitle>
                    <DialogContent>

                        <div className="flex justify-between pb-4">
                            <Typography className="font-medium pt-4 required"> First Name : </Typography>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        id="txtName"
                                        type="text"
                                        label="First Name"
                                        placeholder="First Name"
                                        className="w-1/2 required"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-row justify-between pb-4">
                            <Typography className="font-medium pt-4 required"> Last Name : </Typography>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        id="txtName"
                                        type="text"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        className="w-1/2 required"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4"> Email : </Typography>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        id="txtEmail"
                                        type="email"
                                        label="Email"
                                        placeholder="Email"
                                        className="w-1/2"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4"> Password : </Typography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        className="w-1/2"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4 required"> Position : </Typography>
                            <Controller
                                name="position"
                                control={control}
                                render={({ field }) => (
                                    <FormControl sx={{ width: 276 }}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Position"
                                            {...field}

                                        >
                                            {positions.map((position: any, index: number) => {
                                                return (
                                                    <MenuItem value={position.value} key={index}>{position.name}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </div>

                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4"> Team : </Typography>
                            <Controller
                                name="team"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        id="txtTeam"
                                        type="text"
                                        label="Team"
                                        placeholder="Team"
                                        className="w-1/2"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => onClose(false, reset)}>Cancel</Button>
                        <Button type="submit" variant="contained">{isSubmitting ? 'Loading...' : 'Save'}</Button>
                    </DialogActions>
                </form>
            </FormProvider>
        </Dialog>
    )
}
export default User