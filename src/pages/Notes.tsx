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
import { baseURL } from '../utils/baseURL';


type TNote = {
    _id: string;
    title: string;
    details: string;
    color: {
        header: string;
        body: string;
    }
}

export default function Notes() {
    const id = useParams();
    const navigate = useNavigate();
    const { user } = useMyProvider();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    const handleFetchData = async () => {
        try {
            const data = { userId: user.id, categoryId: id };
            const response = await fetch(`${baseURL}/api/getNotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Data retrieved failed!');
            }

            setNotes(result.data);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        handleFetchData();
        window.scrollTo(0, 0);
    }, [user?.id, id]);


    const sendingDataInsideComponent = (data: any) => {
        navigate('/inside-note', { state: data });
    }

    return (
        <Container>
            <div className='overflow-auto h-screen'>

                <nav className='pt-1 mb-3'>
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
                        error && !loading ? <Alert severity="error">{error}</Alert> :
                            !error && !loading && notes.length == 0 ? <Alert severity="warning">No notes saved!</Alert> :
                                <div className='grid md:grid-cols-3 gap-2 h-60'>
                                    {
                                        notes.map((note: TNote) => {
                                            const title = note.title ?? '';
                                            const details = note.details ?? '';
                                            const headerColor = note.color ? note.color?.header : '#314158';
                                            const bodyColor = note.color ? note.color?.body : '#1d293d';
                                            return <div
                                                onClick={() => sendingDataInsideComponent(note)}
                                                key={note._id}
                                                style={{ backgroundColor: bodyColor }}
                                                className="text-white rounded-[30px] noteCardShadow h-60 cursor-pointer">
                                                <div
                                                    style={{ backgroundColor: headerColor }}
                                                    className="p-4 rounded-t-[20px] flex items-center justify-between">
                                                    <div>
                                                        <p style={{ backgroundColor: bodyColor }} className='rounded w-10 h-2'></p>
                                                        <p style={{ backgroundColor: bodyColor }} className='rounded w-16 h-2 my-1'></p>
                                                        <p style={{ backgroundColor: bodyColor }} className='rounded w-32 h-2'></p>
                                                        {/* <p className='bg-slate-800 rounded w-10 h-2'></p>
                                                        <p className='bg-slate-800 rounded w-16 h-2 my-1'></p>
                                                        <p className='bg-slate-800 rounded w-32 h-2'></p> */}
                                                    </div>
                                                    <div>
                                                        <PushPinIcon className='text-slate-400 rotate-25'></PushPinIcon>
                                                    </div>
                                                </div>
                                                <div className='p-4'>
                                                    <p className='text-slate-400 font-medium text-lg line-clamp-1'>
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
