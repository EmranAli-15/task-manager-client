import { Button } from '@mui/material'
import { Outlet } from 'react-router'
import { useMyProvider } from '../contextApi/ContextApi'

export default function Home() {
    const {setLoading, setUser, user} = useMyProvider();
console.log(user)
    const handleLogOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(true);
    }

    return (
        <div>
            Home
            <Button onClick={handleLogOut} variant="contained">Log Out</Button>
            <Outlet></Outlet>
        </div>
    )
}
