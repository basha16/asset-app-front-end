import { useContext, useEffect, useState } from 'react';
import './styles.scss';
import Sidebar from './features/sidebar/Sidebar';
import PrivateRouters from './PrivateRouters';
import { AuthContext } from './AuthProvider';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [currentUser, setCurrentUser] = useContext<any>(AuthContext);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  useEffect(()=>{
    const email = sessionStorage.getItem("email");
    setCurrentUser(email);
  },[])

  console.log(currentUser)

  const handleToggleSidebar = (value: any) => {
    setToggled(value);
  };



  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      {currentUser ? <Sidebar
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

