import { Alert, Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router'
import { useMyProvider } from '../contextApi/ContextApi'
import Container from '../components/Container';
import { useEffect, useState } from 'react';
import HomeCardSkeleton from '../ui/HomeCardSkeleton';
import { baseURL } from '../utils/baseURL';
import { BusinessIcon, EducationIcon, HobbyIcon, HomeWorkIcon, IdeaIcon, WorkSpaceIcon } from '../icons/Icons';

type TCard = {
    name: string,
    image: string,
    _id: string,
    index: number,
}

const icons = [
    <WorkSpaceIcon></WorkSpaceIcon>,
    <HomeWorkIcon></HomeWorkIcon>,
    <IdeaIcon></IdeaIcon>,
    <HobbyIcon></HobbyIcon>,
    <EducationIcon></EducationIcon>,
    <BusinessIcon></BusinessIcon>
]

export default function Home() {
    const { user, setLoading: providerLoading } = useMyProvider();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    const handleLogOut = () => {
        localStorage.removeItem("token");
        providerLoading(true);
    }


    const handleFetchData = async () => {
        try {
            const response = await fetch(`${baseURL}/api/userNotes/${user.id}`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Data retrieved failed!');
            }

            setCategories(result.data.categories);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }


    useEffect(() => {
        handleFetchData();
        window.scrollTo(0, 0);
    }, [user.id])


    return (
        <Container>
            <div>

                <div className='flex items-center justify-between pt-1 mb-3'>
                    <div>
                        <Button onClick={handleLogOut} variant='outlined' className='text-slate-400! normal-case!' startIcon={<LogoutIcon className='rotate-180'></LogoutIcon>}>Log Out</Button>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <Link to="add-note">
                            <Button variant="outlined" className='text-slate-400!' endIcon={<AddBoxIcon></AddBoxIcon>}>Add Note</Button>
                        </Link>
                    </div>
                </div>


                <div className='px-2 md:px-0'>
                    {
                        loading ? <HomeCardSkeleton></HomeCardSkeleton> :
                            error && !loading ? <Alert severity="error">{error}</Alert> :
                                !error && !loading && categories.length == 0 ? <Alert severity="warning">You have not any notes!</Alert> :
                                    <div className='grid md:grid-cols-3 gap-2'>
                                        {
                                            categories.map((item: TCard, index: any) => {
                                                return (
                                                    <Link to={`/notes/${item._id}`} className='w-full h-60 relative hover:bg-slate-700! transition-all' key={index}>
                                                        {/* <img className='object-cover w-full h-full blur-[1px]' src={item.image} alt="" /> */}
                                                        <div className='flex items-center justify-center'>
                                                            {
                                                                icons[item.index]
                                                            }
                                                        </div>
                                                        <h1 className='absolute font-bold text-2xl top-0 flex bg-black/30 p-3 rounded w-full text-white'>{item.name}</h1>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                    }
                </div>
            </div>
        </Container>
    )
}
