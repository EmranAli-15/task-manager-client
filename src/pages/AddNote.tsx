import "../App.css";

import Color from "../components/navs/Color";
import Container from '../components/Container';
import HomeIcon from '@mui/icons-material/Home';
import Category from "../components/navs/Category";
import ListsInputs from "../components/navs/Lists";
import ChecklistIcon from '@mui/icons-material/Checklist';
import LandscapeIcon from '@mui/icons-material/Landscape';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import { baseURL } from "../utils/baseURL";
import { useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react';
import { useMyProvider } from '../contextApi/ContextApi';
import { Alert, Box, Button, LinearProgress } from '@mui/material'

let autoTitle = "";
let autoLists: string[] = [];
let autoDescription = "";
let autoCategoryId = "";
let autoUserId = "";
let autoColor = {};

export default function AddNote() {
  const navigate = useNavigate();
  const { user } = useMyProvider();


  const [title, setTitle] = useState("");
  const [lists, setLists] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("687231b05282890fad825d85");
  const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });

  const [error, setError] = useState("");
  const [coming, setComing] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
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


  const addLists = () => {
    setLists(prev => [...prev, ""]);
  };


  const handleUpload = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    const data = { title, lists, details: description, categoryId, userId: user.id, color };

    if (!title && lists.length == 0 && !description) {
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
        setSuccess("Note saved!");
        setTitle("");
        setDescription("");
        setLists([]);

      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      } finally {
        setTimeout(() => {
          setError("");
          setSuccess("")
        }, 2000)
      }
    }
  }


  const handleUpComing = () => {
    setComing("Up Coming Feature!!");
    setTimeout(() => setComing(""), 2000);
  }

  // Get changed data for auto save
  useEffect(() => {
    autoTitle = title;
    autoLists = lists;
    autoDescription = description;
    autoCategoryId = categoryId;
    autoUserId = user.id;
    autoColor = color;
  }, [title, lists, description, categoryId, color])

  // This is for auto save
  useEffect(() => {
    return (() => {
      const data = {
        title: autoTitle,
        lists: autoLists,
        details: autoDescription,
        categoryId: autoCategoryId,
        userId: autoUserId,
        color: autoColor
      };


      if (!data.title && data.lists.length === 0 && !data.details) {
        return;
      }

      fetch(`${baseURL}/api/createNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(result => {
          if (!result.success) { }
        })
    })
  }, [])

  return (
    <Container>
      <div className="h-screen overflow-auto">

        {/* loading ui */}
        <div>
          {
            loading && <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          }
        </div>
        {/* loading ui end */}


        <nav className='flex items-center gap-x-5 mt-1'>

          {/* nav scroller left */}
          <div className="relative hidden md:block -mt-4">
            <Button
              className="bg-[#252525]! text-slate-300!"
              onClick={() => scroll('left')}
              variant="contained"
              startIcon={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}>
            </Button>
          </div>
          {/* nav scroller left end */}

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

            <div>
              <Category setCategoryId={setCategoryId}></Category>
            </div>

            <div>
              <Button
                onClick={handleUpload}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<OnlinePredictionIcon className="text-red-600"></OnlinePredictionIcon>}>
                <p>Save</p>
              </Button>
            </div>

            <div>
              <Color openColor={openColor} setOpenColor={setOpenColor} color={color} setColor={setColor}></Color>
            </div>

            <div>
              <Button
                onClick={addLists}
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
                endIcon={<InsertLinkIcon className="text-blue-600"></InsertLinkIcon>}>
                Link
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

          {/* nav scroller right */}
          <div className="relative hidden md:block -mt-4">
            <Button
              className="bg-[#252525]! text-slate-300!"
              onClick={() => scroll('right')}
              variant="contained"
              endIcon={<ArrowCircleRightIcon></ArrowCircleRightIcon>}>
            </Button>
          </div>
          {/* nav scroller right end */}

        </nav>


        {error && <Alert severity="error">{error}</Alert>}
        {coming && <Alert severity="warning">{coming}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}


        <div className='text-white my-5'>

          {/* title section */}
          <section>
            <input
              style={{ color: color.header }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Title'
              type="text"
              className='w-full outline-none text-2xl h-10 font-semibold border-b rounded-b border-gray-500'
            />
          </section>


          {/* lists section */}
          <div className="mt-2">
            <ListsInputs lists={lists} setLists={setLists} />
          </div>


          {/* textarea section */}
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            autoFocus
            placeholder='Note'
            className='w-full h-screen outline-none mt-5'>
          </textarea>
        </div>

      </div>
    </Container>
  )
}
