import { Link,  useNavigate } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import { FC, useContext } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';
import { AuthContext } from '../../AuthProvider';
import UserMenus from './UserMenus';

type Props = {
  collapsed: any
  toggled: any
  handleToggleSidebar: any
  handleCollapsedChange: any
}
const Sidebar: FC<Props> = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
  const [currentUser, setCurrentUser] = useContext<any>(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('login')
    setCurrentUser(null)
  }
  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      <SidebarHeader>
        <Menu >

          <MenuItem
            onClick={handleCollapsedChange}

          >
            <div
              style={{
                padding: '9px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 15,
                letterSpacing: '1px'
              }}
            >
              Assest Management
            </div>
          </MenuItem>

        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <Menu >
          <UserMenus>
            <MenuItem icon={<GridViewIcon />}>
              Dashboard <Link to="/dashboard" />
            </MenuItem>
          </UserMenus>
          <UserMenus>
            <MenuItem icon={<PeopleOutlineIcon />} >
              Users <Link to="/users" />
            </MenuItem>
          </UserMenus>


          <MenuItem icon={<ProductionQuantityLimitsIcon />}>
            Assets <Link to="/assets" />
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <Button
            onClick={handleLogout}
            variant='outlined'
          >
            <ExitToAppIcon />
            Log out
          </Button>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
