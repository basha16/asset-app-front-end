import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../../services/userServices/UserServices';

export const fetchUsers = createAsyncThunk('get/users', async (currentUserId:any, { dispatch }) => {
    try {
        dispatch(setIsFetching(true))
        const data = userService.getUsers(currentUserId)
        return data
        dispatch(setIsFetching(false))
    } catch (error) {
        console.error(error)
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        isFetching: false,
        isSubmitting: false
    },
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload
        },
        setIsSubmitting: (state, action) => {
            state.isSubmitting = action.payload
        }
    },
    extraReducers: {
        [fetchUsers.fulfilled.toString()]: (state, action) => {
            state.users = action.payload
        }
    }
});

export const { setIsFetching, setIsSubmitting } = usersSlice.actions;

export default usersSlice.reducer;

export const SelectUserIsSubmitting = ({app}:any) => app.users.isSubmitting


export const SelectUsers = ({app}:any) => app.users.users
