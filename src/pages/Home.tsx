import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { Link } from 'react-router'
import { useMyProvider } from '../contextApi/ContextApi'
import Container from '../components/Container';
import { useEffect, useState } from 'react';
import HomeCardSkeleton from '../ui/HomeCardSkeleton';

type TCard = {
    name: string,
    image: string,
    _id: string
}

export default function Home() {
    const { user } = useMyProvider();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/api/userNotes/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setCategories(data?.data?.categories)
                setLoading(false);
            })
    }, [user?.id])


    return (
        <Container>
            <div className='flex flex-col gap-x-5 pt-2'>


                <div className='flex items-center justify-center'>
                    <Paper
                        className='bg-transparent! border border-[#1976d2ad] h-10'
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            className='text-white!'
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Your Notes"
                            inputProps={{ 'aria-label': 'search your notes' }}
                        />
                        <IconButton className='text-white!' type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>

                <div className='flex items-center justify-center mt-5'>
                    <div className='flex items-center gap-x-2'>
                        <Link to="add-note">
                            <Button variant="outlined" className='text-slate-400!' endIcon={<AddBoxIcon></AddBoxIcon>}>Add Note</Button>
                        </Link>
                    </div>
                </div>


                <div>
                    {
                        loading ? <HomeCardSkeleton></HomeCardSkeleton> :
                            <div className='grid md:grid-cols-3 gap-2'>
                                {
                                    categories.map((item: TCard, index: any) => {
                                        return (
                                            <Link to={`/notes/${item._id}`} className='w-full h-60 mt-5 relative' key={index}>
                                                <img className='object-cover w-full h-full blur-[1px]' src={item.image} alt="" />
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
