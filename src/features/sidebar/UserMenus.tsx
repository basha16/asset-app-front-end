import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode
}

const UserMenus: FC<Props> = ({ children }) => {
    const currentUserPosition = sessionStorage.getItem('position')
    return (
        <>
            {(currentUserPosition === 'hr' || currentUserPosition === 'admin') &&
                children
            }
        </>
    )
}
export default UserMenus