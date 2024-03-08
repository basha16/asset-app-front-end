import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './features/login/Login';
import Register from './features/register/Register';
import UserList from './features/user/users/UserList';
import AssestsList from './features/assest/assests/AssetsList';
import DashBoard from './features/dashboard/DashBoard';
import UserMenus from './features/sidebar/UserMenus';

const PrivateRouters = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to={'/login'} />} />

            <Route path="/" element={<PrivateRoute />}>
            <Route path="/assets" element={<AssestsList />} />

                <Route path="/dashboard" element={<UserMenus> <DashBoard /></UserMenus>} />
                <Route path="/users" element={
                    <UserMenus>
                        <UserList />
                    </UserMenus>
                } />
            </Route>


        </Routes>
    )
}

export default PrivateRouters


const PrivateRoute = ({ component, ...rest }: any) => {
    const token = sessionStorage.getItem("email");
    return token ? <Outlet /> : <Navigate to="/login" />;
};