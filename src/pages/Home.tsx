import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import SummarizeIcon from '@mui/icons-material/Summarize';

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
                console.log(data)
                setCategories(data?.data?.categories)
                setLoading(false);
            })
    }, [user?.id])


    return (
        <Container>
            <div className='flex flex-col gap-x-5'>
                <div className='flex items-center justify-end'>
                    <div className='flex items-center gap-x-2'>
                        <Link to="add-note">
                            <Button variant="contained" endIcon={<AddBoxIcon></AddBoxIcon>}>Add Note</Button>
                        </Link>
                    </div>
                </div>


                <div>
                    {
                        loading ? <HomeCardSkeleton></HomeCardSkeleton> :
                            categories.map((item: TCard, index: any) => {
                                return (
                                    <div className='w-full h-74 mt-5 relative' key={index}>
                                        <img className='object-cover w-full h-full blur-[3px]' src={item.image} alt="" />
                                        <h1 className='absolute font-bold text-2xl top-0 flex bg-black/30 p-3 rounded w-full text-white'>{item.name}</h1>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </Container>
    )
}
