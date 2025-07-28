import "../App.css";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Alert, Box, Button, LinearProgress } from '@mui/material'
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import LandscapeIcon from '@mui/icons-material/Landscape';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router'
import Container from '../components/Container';
import { useMyProvider } from '../contextApi/ContextApi';
import { baseURL } from "../utils/baseURL";
import Color from "../components/navs/Color";
import Category from "../components/navs/Category";
import LinkInputs from "../components/navs/Links";


export default function AddNote() {
  const { user } = useMyProvider();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("687231b05282890fad825d85");
  const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });
  const [coming, setComing] = useState("");

  const [openColor, setOpenColor] = useState(false);


  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };


  const addLink = () => {
    setLinks(prev => [...prev, ""]);
  };


  const handleUpload = async () => {
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
        const response = await fetch(`${baseURL}/api/createNote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Note upload failed!');
        }

        setLoading(false);
        setTitle("");
        setDescription("");

      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    }
  }


  const handleUpComing = () => {
    setComing("Up Coming Feature!!");
    setTimeout(() => setComing(""), 3000);
  }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user.id]);

  return (
    <Container>
      <div>
        {
          loading && <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        }
      </div>




      <nav className='pt-1 flex items-center gap-x-5'>
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
              onClick={() => navigate("/")}
              variant="outlined"
              className='text-slate-400! h-9 normal-case!'
              startIcon={<HomeIcon></HomeIcon>}>
              Home
            </Button>
          </div>

          <Category setCategoryId={setCategoryId}></Category>

          <div>
            <Button
              onClick={handleUpload}
              variant="outlined"
              className='text-slate-400! normal-case!'
              endIcon={<OnlinePredictionIcon className="text-red-600 animate-ping"></OnlinePredictionIcon>}>
              <p className="animate-bounce">Save</p>
            </Button>
          </div>

          <Color openColor={openColor} setOpenColor={setOpenColor} color={color} setColor={setColor}></Color>


          <div>
            <Button
              onClick={addLink}
              variant="outlined"
              className='text-slate-400! normal-case!'
              endIcon={<InsertLinkIcon className="text-blue-600"></InsertLinkIcon>}>
              Link
            </Button>
          </div>


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


      {error && <Alert severity="error">{error}</Alert>}
      {coming && <Alert severity="warning">{coming}</Alert>}




      <div className='text-white my-2 p-3 rounded'>

        {/* TITLE SECTION */}
        <section>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder='Title'
            type="text"
            className='w-full outline-none text-white text-2xl h-10 mb-2 font-semibold border-b border-gray-500'
          />
        </section>


        {/* LINKS SECTION */}
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

    </Container>
  )
}
