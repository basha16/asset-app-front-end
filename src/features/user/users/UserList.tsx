import { useEffect, useState } from 'react';
import UserListItem from './UserListItem';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import User from '../User';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from '../../store/app/dialogSlice';
import userService from '../../../services/userServices/UserServices';
import { SelectUsers, fetchUsers } from '../../store/app/usersSlice';

const UserList = () => {
    const users = useSelector(SelectUsers)
    const [open, setDialogOpen] = useState(false)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch<any>()
    const userId = sessionStorage.getItem('id')

    useEffect(() => {
        dispatch(fetchUsers(userId))
    }, [dispatch, userId]);

    const handleDialog = (value: boolean, reset?: any) => {
        setDialogOpen(value)
        dispatch(openDialog(true))
        if (reset) {
            reset()
        }
        setUser(null)
    }

    const handleEditOpen = (userData: any) => {
        setDialogOpen(true)
        setUser(userData)
    }

    const handleDelete = async (id: any) => {
        await userService.deleteUser(id)
        dispatch(fetchUsers(userId))
    }

    return (
        <>
            <Box sx={{ width: '100%', pt: 4 }} >
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Toolbar>
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Users
                        </Typography>

                        <Button variant='contained' onClick={() => handleDialog(true)}>
                            Add new user
                        </Button>

                        <Tooltip title="Filter list">
                            <IconButton>

                            </IconButton>
                        </Tooltip>

                    </Toolbar>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell >Name </TableCell>
                                    <TableCell>Email </TableCell>
                                    <TableCell>Position </TableCell>
                                    <TableCell>Team </TableCell>
                                    <TableCell>Actions </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user: any) => (
                                    <UserListItem user={user} onHandleEdit={handleEditOpen} onHandleDelete={handleDelete} />
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            {open && <User open={open} onClose={handleDialog} user={user} />}
        </>
    )
}

export default UserList