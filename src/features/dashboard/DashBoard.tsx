import { Box, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import assetService from "../../services/assetUsers/AssetUsers";
import AssetDashboard from "./AssetDashboard";

const DashBoard: FC = () => {
    const [userAssets, setUserAssets] = useState([])

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

    return (
        <Box sx={{ width: '75%', p: 4 }} >
            <Paper sx={{ width: '75%', mb: 2, p:2 }}>
                <AssetDashboard userAssets={userAssets} />
            </Paper>
        </Box>
    )
}
export default DashBoard