import { Button, TableCell, TableRow } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserMenus from "../../sidebar/UserMenus";
import { FC, memo } from "react";

type Props = {
    userAsset: any
    onHandleEdit: any
    onHandleDelete: any
}
const AssestsListItem: FC<Props> = ({ userAsset,onHandleEdit,onHandleDelete }: any) => {
    return (
        <TableRow>
            <TableCell>{userAsset.name}</TableCell>
            <TableCell >{userAsset.description}</TableCell>
            <TableCell >{userAsset.quantity}</TableCell>
            <TableCell >{`${userAsset.first_name} ${userAsset.last_name}`}</TableCell>
            <TableCell >{userAsset.status}</TableCell>
            <UserMenus>
                <TableCell >
                    <>
                        <Button id='btnEdit' onClick={() => onHandleEdit(userAsset)}>

                            <EditIcon />
                        </Button>
                        <Button id='btnEdit' onClick={() => onHandleDelete(userAsset.id)}>

                            <DeleteIcon />
                        </Button>
                    </>
                </TableCell>
            </UserMenus>
        </TableRow>
    )
}

export default AssestsListItem