import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AssestsListItem from './AssetsListItem';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Assest from '../Assest';
import { ChangeEvent, memo, useEffect, useState } from 'react';
import assetService from '../../../services/assetUsers/AssetUsers';
import SearchFilter from '../filters/SearchFilter';
import StatusFilter from '../filters/StatusFilter';
import UserMenus from '../../sidebar/UserMenus';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAssetUsers, fetchAssetUsers, setUsers } from '../../store/app/assetSlice';

const AssestsList = () => {
    const [userAssets, setUserAssets] = useState([])

    const [open, setDialogOpen] = useState(false)
    const [assetUser, setAssetUser] = useState(null)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const fetch = async () => {
            fetchUserAssets()
        };
        fetch();
    }, [setUserAssets]);

    const fetchUserAssets = async () => {
        const response = await assetService.getAllAsset()
        setUserAssets(response);
    }

    const handleDialog = (value: boolean, reset?: any) => {
        setDialogOpen(value)
        if (reset) {
            reset()
        }
        setAssetUser(null)
    }

    const handleSearchName = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value) {
            let temp = [...userAssets]
            const trimmedValue = value.trim().toLowerCase();

            const response = temp.filter((user: any) =>
                user.name.replace(/\s/g, '').toLowerCase().includes(trimmedValue.toLowerCase()) ||
                user.first_name.replace(/\s/g, '').toLowerCase().includes(trimmedValue.toLowerCase()) ||
                user.last_name.replace(/\s/g, '').toLowerCase().includes(trimmedValue.toLowerCase())
            );
            setUserAssets(response)
        } else {
            fetchUserAssets()
        }
    }

    const handleSelectStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value) {
            let temp = [...userAssets]
            const response = temp.filter((user: any) => user.status.toLowerCase() === value.toLowerCase());
            setUserAssets(response)
        } else {
            fetchUserAssets()
        }
    }


    const handleEditOpen = (userData: any) => {
        setDialogOpen(true)
        setAssetUser(userData)
    }

    const handleDelete = async (id: any) => {
        await assetService.deleteAssetUser(id)
        await fetchUserAssets();
    }


    return (
        <>
            <Box className='w-full p-10 '>
                <Paper>
                    <Toolbar className="flex justify-evenly flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row space-y-1">
                        <div className='flex justify-items-center '>
                            <Typography
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                                Assets
                            </Typography>
                        </div>

                        <SearchFilter onSearchName={handleSearchName} />

                        <StatusFilter onChangeStatus={handleSelectStatus} />
                        <div >
                            <UserMenus>
                                <Button variant='contained' onClick={() => handleDialog(true)} >
                                    Assign Assest
                                </Button>
                            </UserMenus>
                        </div>


                    </Toolbar>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell >Name </TableCell>
                                    <TableCell>Description </TableCell>
                                    <TableCell>Quantity </TableCell>
                                    <TableCell>Assignee </TableCell>
                                    <TableCell>Status </TableCell>
                                    <UserMenus>  <TableCell>Action </TableCell> </UserMenus>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userAssets && userAssets.map((userAsset: any) => (
                                    <AssestsListItem key={userAsset.id} userAsset={userAsset} onHandleEdit={handleEditOpen} onHandleDelete={handleDelete} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            {open && <Assest open={open} onClose={handleDialog} assetUser={assetUser} />}

        </>
    )
}

export default memo(AssestsList)