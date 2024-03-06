import { TextField } from "@mui/material";
import { FC } from "react";

type Props = {
    onSearchName: any
}

const SearchFilter: FC<Props> = ({ onSearchName }) => {
    return (
        <div >
            <TextField fullWidth id="outlined-basic" label="Search by name or assignee" variant="outlined" onChange={onSearchName} />
        </div>
    )
}

export default SearchFilter