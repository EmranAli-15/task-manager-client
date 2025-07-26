import { useParams } from 'react-router'
import Container from '../components/Container';
import { useEffect, useState } from 'react';
import { useMyProvider } from '../contextApi/ContextApi';
import NotesCardSkeleton from '../ui/NotesCardSkeleton';
import "../App.css"


type TNote = {
    _id: string;
    title: string;
    details: string;
}

export default function Notes() {
    const [loading, setLoading] = useState(true);
    const { user } = useMyProvider();
    const [notes, setNotes] = useState([]);
    const id = useParams();


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


    console.log(notes)


    const h = "Lorem ipsum dolor sit amet, consectetur"
    return (
        <Container>
            <div className='py-5 overflow-auto h-screen'>
                {
                    loading ? <NotesCardSkeleton></NotesCardSkeleton> :
                        <div className='grid md:grid-cols-3 gap-2 h-60'>
                            {
                                notes.map((note: TNote) => (
                                    <div
                                        key={note._id}
                                        className='text-white bg-slate-800 rounded-[30px] noteCardShadow h-60'>
                                        <div className='bg-slate-700 p-4 rounded-t-[20px] text-lg font-medium flex flex-col items-center'>
                                            {/* {
                                                h.length < 20 ? <p>{h}</p> : <p>{h.slice(0, 20)} ...</p>
                                            } */}
                                            <p className='text-slate-800 bg-slate-800 rounded w-10 h-2'></p>
                                            <p className='text-slate-800 bg-slate-800 rounded w-20 h-2 my-1'></p>
                                            <p className='text-slate-800 bg-slate-800 rounded w-32 h-2'></p>
                                        </div>
                                        <div className='p-4'>
                                            <p>{note.details}</p>
                                        </div>
                                    </div>
                                    // <div className="card">
                                    //     <div className="corner-peel"></div>
                                    //     <div className="content">
                                    //     </div>
                                    // </div>
                                ))
                            }
                        </div>
                }
            </div>
        </Container>
    )
}
