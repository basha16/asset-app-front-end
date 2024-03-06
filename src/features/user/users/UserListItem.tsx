import { Button, TableCell, TableRow } from "@mui/material"
import { FC } from "react"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    user: any
    onHandleEdit: any
    onHandleDelete: any
}

const UserListItem: FC<Props> = ({ user, onHandleEdit,onHandleDelete }) => {
    return (
        <TableRow>
            <TableCell>{`${user.first_name} ${user.last_name}`} </TableCell>
            <TableCell >{user.email}</TableCell>
            <TableCell >{user.position}</TableCell>
            <TableCell >{user.team}</TableCell>
            <TableCell className="cursor-pointer">
                <>
                    <Button id='btnEdit' onClick={() => onHandleEdit(user)}>

                        <EditIcon />
                    </Button>
                    <Button id='btnEdit' onClick={() => onHandleDelete(user.id)}>

                        <DeleteIcon />
                    </Button>
                </>
            </TableCell>
        </TableRow>
    )
}

export default UserListItem