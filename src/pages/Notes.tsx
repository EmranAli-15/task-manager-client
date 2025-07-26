import { Alert, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NotesCardSkeleton from '../ui/NotesCardSkeleton';
import { useMyProvider } from '../contextApi/ContextApi';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router';


import "../App.css"


type TNote = {
    _id: string;
    title: string;
    details: string;
}

export default function Notes() {
    const id = useParams();
    const navigate = useNavigate();
    const { user } = useMyProvider();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const data = { userId: user.id, categoryId: id };
        setLoading(true)
        fetch(`http://localhost:5000/api/getNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        )
            .then(res => res.json())
            .then(data => {
                setNotes(data.data)
                setLoading(false);
            })
    }, [user.id])

    return (
        <Container>
            <div className='py-5 overflow-auto h-screen'>

                <nav className='pb-5'>
                    <div className='flex items-center justify-between'>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outlined"
                            className='text-slate-400! h-9'
                            startIcon={<ArrowBackIcon></ArrowBackIcon>}>
                        </Button>

                        <Link to="/add-note">
                            <Button variant="outlined" className='text-slate-400!' endIcon={<AddBoxIcon></AddBoxIcon>}>Add Note</Button>
                        </Link>
                    </div>
                </nav>

                {
                    loading ? <NotesCardSkeleton></NotesCardSkeleton> :
                        notes.length == 0 ?
                            <Alert severity="warning">No notes saved!</Alert> :
                            <div className='grid md:grid-cols-3 gap-2 h-60'>
                                {
                                    notes.map((note: TNote) => {
                                        const title = note.title ?? '';
                                        const details = note.details ?? '';
                                        return <div
                                            key={note._id}
                                            className='text-white bg-slate-800 rounded-[30px] noteCardShadow h-60'>
                                            <div className='bg-slate-700 p-4 rounded-t-[20px] flex items-center justify-between'>
                                                <div>
                                                    <p className='text-slate-800 bg-slate-800 rounded w-10 h-2'></p>
                                                    <p className='text-slate-800 bg-slate-800 rounded w-20 h-2 my-1'></p>
                                                    <p className='text-slate-800 bg-slate-800 rounded w-32 h-2'></p>
                                                </div>
                                                <div>
                                                    <PushPinIcon className='text-slate-400 rotate-25'></PushPinIcon>
                                                </div>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-slate-300 font-medium text-lg line-clamp-1'>
                                                    {title}
                                                </p>
                                                <p className='mt-5 text-slate-400 line-clamp-3'>
                                                    {details}
                                                </p>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                }
            </div>
        </Container>
    )
}
