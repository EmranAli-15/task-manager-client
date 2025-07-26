import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Alert, Box, Button, LinearProgress, Modal } from '@mui/material'
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import "../App.css";

import { useState } from 'react';
import { Link } from 'react-router'
import Container from '../components/Container';
import { useMyProvider } from '../contextApi/ContextApi';












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


export default function About() {
  const { user } = useMyProvider();

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("687231b05282890fad825d85");



  const [open, setOpen] = useState(false);
  const [linkInsert, setLinkInsert] = useState("");
  const [linkUpdate, setLinkUpdate] = useState(-1);


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



  const handleUpload = async () => {
    setError("");
    setLoading(true);
    const data = { title, links, details: description, categoryId, userId: user.id };

    if (!title && links.length == 0 && !description) {
      setError("Empty note can't save!");
      setLoading(false);
    }
    else {
      try {
        const response = await fetch('http://localhost:5000/api/createNote', {
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

  return (
    <Container>
      <div>
        {
          loading && <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        }
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <nav className='pt-2'>
        <div className='flex items-center justify-between'>
          <Link to="/">
            <Button
              variant="outlined"
              className='text-slate-400! h-9'
              startIcon={<ArrowBackIcon></ArrowBackIcon>}>
            </Button>
          </Link>

          <Button>
            <select onChange={(e) => setCategoryId(e.target.value)} className='border rounded-sm border-[#295480] text-gray-400 outline-0 h-9'>
              <option value="687231b05282890fad825d85">Work space</option>
              <option value="687231b05282890fad825d83">Home work</option>
              <option value="687231b05282890fad825d84">Idea</option>
              <option value="687231b05282890fad825d87">Hobby</option>
              <option value="687231b05282890fad825d82">Education</option>
              <option value="687231b05282890fad825d86">Business</option>
            </select>
          </Button>

          <Button
            onClick={handleUpload}
            variant="outlined"
            className='text-slate-400! normal-case!'
            endIcon={<OnlinePredictionIcon></OnlinePredictionIcon>}>
            Save
          </Button>
        </div>
      </nav>

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
          <div className='flex items-center px-2 justify-end'>
            <button onClick={() => handleOpen({ link: null, index: -1 })}><InsertLinkIcon className='text-white cursor-pointer'></InsertLinkIcon></button>
          </div>

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

    </Container>
  )
}
