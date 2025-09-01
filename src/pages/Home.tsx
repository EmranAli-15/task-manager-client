import { Alert, Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router'
import { useMyProvider } from '../contextApi/ContextApi'
import Container from '../components/Container';
import { useEffect, useState } from 'react';
import HomeCardSkeleton from '../ui/HomeCardSkeleton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { baseURL } from '../utils/baseURL';
// import { BusinessIcon, EducationIcon, HobbyIcon, HomeWorkIcon, IdeaIcon, WorkSpaceIcon } from '../icons/Icons';
import Modal from '../components/Modal';

type TCard = {
    name: string,
    image: string,
    _id: string,
    index: number,
}

// const icons = [
//     <WorkSpaceIcon></WorkSpaceIcon>,
//     <HomeWorkIcon></HomeWorkIcon>,
//     <IdeaIcon></IdeaIcon>,
//     <HobbyIcon></HobbyIcon>,
//     <EducationIcon></EducationIcon>,
//     <BusinessIcon></BusinessIcon>
// ]

export default function Home() {
    const { user, setLoading: providerLoading } = useMyProvider();

    const [modal, setModal] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    const handleLogOut = () => {
        localStorage.removeItem("token");
        setModal(false);
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
            <Modal modal={modal} setModal={setModal}>
                <div className='bg-[#3f6ed3] rounded-md text-white px-28 py-10 flex items-center gap-x-5'>
                    <div>
                        <Button onClick={handleLogOut} variant='outlined' className='text-white! border-red-600! bg-[#d68888]! normal-case!' startIcon={<LogoutIcon className='rotate-180'></LogoutIcon>}>Log Out</Button>
                    </div>
                    <div>
                        <Button onClick={() => setModal(false)} variant='outlined' className='text-white! border-yellow-400! bg-[#acaa5e]! normal-case!'>Cacle</Button>
                    </div>
                </div>
            </Modal>
            <div>

                <div className='flex items-center justify-between pt-1 mb-3'>
                    <div>
                        <Button onClick={() => setModal(true)} variant='outlined'>
                            <PowerSettingsNewIcon className='text-blue-800 font-bold'></PowerSettingsNewIcon>
                        </Button>
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
                                                    <Link to={`/notes/${item._id}`} className='w-full h-auto relative hover:bg-slate-700! transition-all' key={index}>
                                                        <div className='flex items-center justify-center'>
                                                            <img className='object-cover w-[200px] h-full' src={item.image} alt="" />
                                                        </div>
                                                        {/* <div className='flex items-center justify-center'>
                                                            {
                                                                icons[item.index]
                                                            }
                                                        </div> */}
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
