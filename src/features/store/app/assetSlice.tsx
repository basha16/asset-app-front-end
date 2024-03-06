import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import assetService from '../../../services/assetUsers/AssetUsers';

export const fetchAssetUsers = createAsyncThunk('get/aseet/users', async (_, { dispatch }) => {
    try {
        dispatch(setIsFetching(true))
        const data = await assetService.getAllAsset()
        dispatch(setIsFetching(false))
        return data
    } catch (error) {
        console.error(error)
    }
})

const assetSlice = createSlice({
    name: 'asset',
    initialState: {
        users: [],
        isFetching: false,
        isSubmitting: false
    },
    reducers: {
        setUsers: (state, action) =>{
            state.users = action.payload
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload
        },
        setIsSubmitting: (state, action) => {
            state.isSubmitting = action.payload
        }
    },
    extraReducers: {
        [fetchAssetUsers.fulfilled.toString()]: (state, action) => {
            state.users = action.payload
        }
    }
});

export const { setIsFetching, setIsSubmitting,setUsers } = assetSlice.actions;

export default assetSlice.reducer;

export const SelectUserIsSubmitting = ({app}:any) => app.users.isSubmitting


export const SelectAssetUsers = ({app}:any) => app.asset.users
