import "../App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Alert, Box, Button, LinearProgress } from '@mui/material'
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LandscapeIcon from '@mui/icons-material/Landscape';

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
import Container from '../components/Container';
import { useMyProvider } from '../contextApi/ContextApi';
import { baseURL } from '../utils/baseURL';
import Color from '../components/navs/Color';
import Category from '../components/navs/Category';
import LinkInputs from '../components/navs/Links';

type TNote = {
  title: string;
  details: string;
  links: string[];
  userId: string;
  categoryId: string;
  _id: string;
  color: {
    header: string;
    body: string;
  };
}

export default function InsideNote() {
  const { user } = useMyProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const receivedNote: TNote = location.state;

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const [openColor, setOpenColor] = useState(false);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("687231b05282890fad825d85");
  const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });
  const [noteId, setNoteId] = useState("");
  const [success, setSuccess] = useState(false);
  const [coming, setComing] = useState("");

  useEffect(() => {
    if (receivedNote) {
      setTitle(receivedNote.title);
      setDescription(receivedNote.details);
      setLinks(receivedNote.links ?? []);
      setCategoryId(receivedNote.categoryId);
      setNoteId(receivedNote._id);
      if (receivedNote.color) {
        setColor(receivedNote.color)
      }
    }
    window.scrollTo(0, 0);
  }, [receivedNote, user.id])




  const addLink = () => {
    setLinks(prev => [...prev, ""]);
  };

  const handleUpdate = async () => {
    setError("");
    setLoading(true);
    const data = { title, links, details: description, categoryId, userId: user.id, color };

    if (!title && links.length == 0 && !description) {
      setError("Empty note can't save!");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
    else {
      try {
        const response = await fetch(`${baseURL}/api/updateNote/${noteId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Note update failed!');
        }

        setLoading(false);
        setSuccess(true);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    }
  }


  const handleDelete = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/deleteNote/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Note delete failed!');
      }

      setLoading(false);
      navigate(-1);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }


  const handleUpComing = () => {
    setComing("Up Coming Feature!!");
    setTimeout(() => setComing(""), 3000);
  }


  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container>
      <div className='overflow-auto pt-1'>
        <div>
          {
            loading && <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          }
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Note updated.</Alert>}



        <nav className='flex items-center gap-x-5'>
          <div className="relative hidden md:block -mt-4">
            <Button
              className="bg-[#252525]! text-slate-300!"
              onClick={() => scroll('left')}
              variant="contained"
              startIcon={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}>
            </Button>
          </div>
          <div ref={scrollRef} className='flex items-center gap-x-2 overflow-auto'>
            <div>
              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                className='text-slate-400! h-9 normal-case!'
                startIcon={<ArrowBackIcon></ArrowBackIcon>}>
                Back
              </Button>
            </div>

            <Category setCategoryId={setCategoryId}></Category>

            <div>
              <Button
                onClick={handleUpdate}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<OnlinePredictionIcon className="text-red-600"></OnlinePredictionIcon>}>
                <p>Save</p>
              </Button>
            </div>

            <div>
              <Button
                onClick={addLink}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<InsertLinkIcon className="text-blue-600"></InsertLinkIcon>}>
                Link
              </Button>
            </div>

            <Color openColor={openColor} setOpenColor={setOpenColor} color={color} setColor={setColor}></Color>

            <div>
              <Button
                onClick={handleUpComing}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<ChecklistIcon className="text-orange-400"></ChecklistIcon>}>
                Lists
              </Button>
            </div>

            <div>
              <Button
                onClick={handleUpComing}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<LandscapeIcon className="text-green-400"></LandscapeIcon>}>
                Photos
              </Button>
            </div>

            <div>
              <Button
                onClick={handleDelete}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<DeleteIcon className="text-red-500"></DeleteIcon>}>
                Delete
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block -mt-4">
            <Button
              className="bg-[#252525]! text-slate-300!"
              onClick={() => scroll('right')}
              variant="contained"
              endIcon={<ArrowCircleRightIcon></ArrowCircleRightIcon>}>
            </Button>
          </div>
        </nav>



        {coming && <Alert severity="warning">{coming}</Alert>}



        <div className='text-white my-2 mt-3 px-2 rounded'>


          {/* TITLE SECTION */}
          <section>
            <input
              style={{ color: color.header }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Title'
              type="text"
              className='w-full outline-none text-2xl h-10 mb-2 p-2 font-semibold border-b border-gray-500'
            />
          </section>


          {/* LINK SECTION */}
          <LinkInputs links={links} setLinks={setLinks} />


          {/* TEXTAREA SECTION */}
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            autoFocus
            placeholder='Note'
            className='w-full h-screen outline-none mt-3'>
          </textarea>
        </div>
      </div>
    </Container>
  )
}
