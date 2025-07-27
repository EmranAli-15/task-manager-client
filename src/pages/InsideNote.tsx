import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Alert, Box, Button, LinearProgress, Modal } from '@mui/material'
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LandscapeIcon from '@mui/icons-material/Landscape';
import "../App.css";

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
import Container from '../components/Container';
import { useMyProvider } from '../contextApi/ContextApi';
import { baseURL } from '../utils/baseURL';





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






const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#252525',
  boxShadow: 24,
  p: 2,
};


export default function InsideNote() {
  const { user } = useMyProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const receivedNote: TNote = location.state;

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
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
  }, [receivedNote, user.id])


  const [open, setOpen] = useState(false);
  const [linkInsert, setLinkInsert] = useState("");
  const [linkUpdate, setLinkUpdate] = useState(-1);
  const [openColor, setOpenColor] = useState(false);


  const handleOpen = ({ link, index }: { link: string | null, index: number }) => {
    if (link) {
      setLinkInsert(link)
      setLinkUpdate(index);
    }
    setOpen(true);
  }
  const handleClose = () => {
    if (linkUpdate >= 0 && linkInsert) {
      const copiedLinks = [...links]
      copiedLinks.splice(linkUpdate, 1, linkInsert);
      setLinks(copiedLinks);
      setLinkUpdate(-1);
    }
    else if (linkInsert) {
      let updatedLinks = [...links, linkInsert];
      setLinks(updatedLinks);
    }
    setOpen(false);
    setLinkInsert("");
  };



  const handleDeleteLink = (index: number) => {
    const copiedLinks = [...links]
    copiedLinks.splice(index, 1);
    setLinks(copiedLinks);
    setLinkInsert("");
    setOpen(false);
  }


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



  const handleColorCode = (color: string) => {
    if (color == 'yellow') {
      setColor({ header: "#ffdf20", body: "#fff085" })
    }
    else if (color == 'green') {
      setColor({ header: "#05df72", body: "#7bf1a8" })
    }
    else if (color == 'red') {
      setColor({ header: "#ff6467", body: "#ffa2a2" })
    }
    else if (color == 'white') {
      setColor({ header: "#fff", body: "#e2e8f0" })
    }
    else {
      setColor({ header: "#314158", body: "#1d293d" })
    }
    setOpenColor(false);
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
      <div className='overflow-auto'>
        <div>
          {
            loading && <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          }
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Note updated.</Alert>}



        <nav className='pt-2 flex items-center gap-x-5'>
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

            <div>
              <Button variant="outlined">
                <select onChange={(e) => setCategoryId(e.target.value)} className='cursor-pointer outline-0 text-gray-400 h-6'>
                  <option value="687231b05282890fad825d85">Work space</option>
                  <option value="687231b05282890fad825d83">Home work</option>
                  <option value="687231b05282890fad825d84">Idea</option>
                  <option value="687231b05282890fad825d87">Hobby</option>
                  <option value="687231b05282890fad825d82">Education</option>
                  <option value="687231b05282890fad825d86">Business</option>
                </select>
              </Button>
            </div>

            <div>
              <Button
                onClick={handleUpdate}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<OnlinePredictionIcon className="text-red-600 animate-ping"></OnlinePredictionIcon>}>
                <p className="animate-bounce">Save</p>
              </Button>
            </div>

            <div>
              <Button
                onClick={() => handleOpen({ link: null, index: -1 })}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<InsertLinkIcon className="text-blue-600"></InsertLinkIcon>}>
                Links
              </Button>
            </div>

            <div className="relative">
              <Button
                onClick={() => setOpenColor(!openColor)}
                variant="outlined"
                className='text-slate-400! normal-case!'
                endIcon={<ColorLensIcon style={{ color: color.header }}></ColorLensIcon>}>
                Color
              </Button>
              {
                openColor && <div className="top-14 left-1/2 -translate-x-1/2 fixed w-20">
                  <div onClick={() => handleColorCode("yellow")} className="bg-yellow-300 w-full h-7 cursor-pointer"></div>
                  <div onClick={() => handleColorCode("green")} className="bg-green-400 w-full h-7 cursor-pointer"></div>
                  <div onClick={() => handleColorCode("red")} className="bg-red-400 w-full h-7 cursor-pointer"></div>
                  <div onClick={() => handleColorCode("white")} className="bg-white w-full h-7 cursor-pointer"></div>
                  <div onClick={() => handleColorCode("slate")} className="bg-slate-700 w-full h-7 cursor-pointer"></div>
                </div>
              }
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



        <div className='text-white my-2 p-3 rounded'>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <div className='flex items-center justify-end'>
                <Button
                  onClick={handleClose}>
                  <CheckBoxIcon></CheckBoxIcon>
                </Button>
                <Button
                  onClick={() => handleDeleteLink(linkUpdate)}>
                  <DeleteIcon className='text-red-500'></DeleteIcon>
                </Button>
              </div>
              <input
                type="text"
                onChange={(e) => setLinkInsert(e.target.value)}
                value={linkInsert}
                className="w-full px-4 py-2 border border-gray-500 rounded-md text-gray-300 outline-none transition-all"
                placeholder="https://example.com"
              />
            </Box>
          </Modal>


          {/* TITLE SECTION */}
          <section>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder='Title'
              type="text"
              className='w-full outline-none text-white text-2xl h-10 mb-2 p-2 font-semibold border-b border-gray-500'
            />
          </section>


          {/* LINK SECTION */}
          <section className='my-2'>
            {
              links.map((link, index) => (
                <div className='flex items-center bg-black/5' key={index}>
                  <button
                    onClick={() => handleOpen({ link, index })}
                    className='w-10 cursor-pointer hover:bg-[#1976d2] hover:text-white'>
                    <InsertLinkIcon></InsertLinkIcon>
                  </button>
                  <p className='border-b p-1 w-full font-thin text-gray-500'>{link}</p>
                </div>
              ))
            }
          </section>


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
