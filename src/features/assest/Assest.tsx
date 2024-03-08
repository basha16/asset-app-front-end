import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { AssestInitialValues, AssestSchema, AssignAsset, assetStatus } from "./models";
import assetService from "../../services/assetUsers/AssetUsers";
import { useDispatch, useSelector } from "react-redux";
import { SelectUserIsSubmitting, setIsSubmitting } from "../store/app/usersSlice";
import { fetchAssetUsers } from "../store/app/assetSlice";

type Props = {
    open: boolean
    onClose: any
    assetUser: any
    fetchUserAssets:()=>void
}

const Assest: FC<Props> = ({ open, onClose, assetUser,fetchUserAssets }) => {
    const [normalUser, setNormalUser] = useState([])
    const isSubmitting = useSelector(SelectUserIsSubmitting)
    const dispatch = useDispatch<any>()

    const methods = useForm<AssignAsset>({
        mode: 'onChange',
        defaultValues: AssestInitialValues,
        resolver: yupResolver(AssestSchema)
    })
    const { handleSubmit, control, reset } = methods

    useEffect(() => {
        const fetch = async () => {
            const response = await assetService.getNormalUsers()
            setNormalUser(response);
        };
        fetch();
        if (assetUser && assetUser.name && assetUser.name.length > 0) {
            reset(assetUser)
        }
    }, [setNormalUser]);

    const onSubmit = async (values: AssignAsset) => {
        try {
            dispatch(setIsSubmitting(true))
            if (values.id) {
                await assetService.updateAsset(values)
            } else {
                await assetService.createAsset(values)
            }
            onClose(false, reset)
            fetchUserAssets()
            dispatch(setIsSubmitting(false))
            dispatch(fetchAssetUsers());
        } catch (error) {
            console.error(error)
        } finally {
            onClose(false, reset)
            dispatch(setIsSubmitting(false))
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
                    <DialogTitle> Assign Assest</DialogTitle>
                    <DialogContent>

                        <div className="flex flex-row justify-between pb-4">
                            <Typography className="font-medium pt-4 required"> Name : </Typography>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        id="txtName"
                                        type="text"
                                        label="Name"
                                        placeholder="Name"
                                        className="w-1/2 required"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4"> Description : </Typography>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        id="txtDescription"
                                        type="text"
                                        label="Description"
                                        placeholder="Description"
                                        className="w-1/2"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4"> Quantity : </Typography>
                            <Controller
                                name="quantity"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        id="txtQuantity"
                                        type="text"
                                        label="Quantity"
                                        placeholder="Quantity"
                                        className="w-1/2"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4 required"> Assignee : </Typography>
                            <Controller
                                name="assignee"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <FormControl sx={{ width: 276 }} >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Assignee"
                                            {...field}
                                            error={!!fieldState.error}
                                        >
                                            {normalUser.map((user: any, index: number) => {
                                                return (
                                                    <MenuItem value={user.id} key={index}>{user.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </div>

                        <div className="flex flex-row justify-between  pb-4">
                            <Typography className="font-medium pt-4 required"> Status : </Typography>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <FormControl sx={{ width: 276 }}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Status"
                                            {...field}
                                            error={!!fieldState.error}

                                        >
                                            {assetStatus.map((position: any, index: number) => {
                                                return (
                                                    <MenuItem value={position.value} key={index}>{position.name}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
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
export default memo(Assest)