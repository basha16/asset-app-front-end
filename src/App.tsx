import { useContext, useEffect, useState } from 'react';
import './styles.scss';
import Sidebar from './features/sidebar/Sidebar';
import PrivateRouters from './PrivateRouters';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [currentUser, setCurrentUser] = useContext<any>(AuthContext);
  const accessToken = sessionStorage.getItem("accessToken");


  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    setCurrentUser(email);
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [])

  console.log(currentUser)

  const handleToggleSidebar = (value: any) => {
    setToggled(value);
  };



  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      {currentUser && accessToken ? <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      /> : null}

      <PrivateRouters />

    </div>
  );
}

export default App;

