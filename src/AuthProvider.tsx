import { FC, ReactNode, createContext, useState } from 'react';
import './styles.scss';

type Props = {
    children:ReactNode
}
export const AuthContext = createContext(null) as any;

const AuthProvider:FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  return (
    <AuthContext.Provider value={[ currentUser, setCurrentUser ]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider