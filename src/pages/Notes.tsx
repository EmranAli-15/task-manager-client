import Container from '../components/Container';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PushPinIcon from '@mui/icons-material/PushPin';
import NotesCardSkeleton from '../ui/NotesCardSkeleton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { baseURL } from '../utils/baseURL';
import { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';
import { useMyProvider } from '../contextApi/ContextApi';
import { Link, useLocation, useNavigate, useParams } from 'react-router';

import "../App.css"

let totalNotes: number = 1;

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
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useMyProvider();

    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

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
            totalNotes = result.data.length;
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

    useEffect(() => {
        if (!loading) {
            totalNotes = notes.length;
        }
    }, [loading])

    useEffect(() => {
        return (() => {
            if (totalNotes == 0) {
                fetch(`${baseURL}/api/deleteCategory`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ categoryId: id, userId: user.id })
                    }
                )
                    .then(res => res.json())
                    .then(result => { if (!result) { } })
            }
            totalNotes = 1
        })
    }, [location])

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
                            !error && !loading && notes.length == 0 ? <Alert severity="warning">There are no notes, this category will delete automatically!</Alert> :
                                <div className='grid md:grid-cols-3 gap-2 h-60'>
                                    {
                                        notes.map((note: TNote) => {
                                            const title = note.title ?? '';
                                            const details = note.details ?? '';
                                            const headerColor = note.color ? note.color?.header : '#314158';
                                            const bodyColor = note.color ? note.color?.body : '#1d293d';
                                            return <Link
                                                to={`/inside-note/${note._id}`}
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
                                                    </div>
                                                    <div>
                                                        <PushPinIcon className='text-slate-400 rotate-25'></PushPinIcon>
                                                    </div>
                                                </div>
                                                <div className='p-4'>
                                                    <p className='text-black font-bold text-lg line-clamp-1'>
                                                        {title}
                                                    </p>
                                                    <p className='mt-5 text-slate-700 line-clamp-3'>
                                                        {details}
                                                    </p>
                                                </div>
                                            </Link>
                                        })
                                    }
                                </div>
                }
            </div>
        </Container>
    )
}
