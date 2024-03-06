import { FormControl, MenuItem, Select } from "@mui/material";
import { FC } from "react";

type Props ={
    onChangeStatus:any
}

const StatusFilter: FC<Props> = ({onChangeStatus}) => {
    return (
        <div>
            <FormControl sx={{ width: 276 }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={onChangeStatus}
                >
                    <MenuItem >Select</MenuItem>
                    <MenuItem value={'active'}>Active</MenuItem>
                    <MenuItem value={'returned'}>Returned</MenuItem>
                    <MenuItem value={'damaged'}>Damaged</MenuItem>

                </Select>
            </FormControl>
        </div>
    )
}
export default StatusFilter