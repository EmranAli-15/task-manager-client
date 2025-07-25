import { Box, Button, Modal } from '@mui/material'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import "../App.css";

import { Link } from 'react-router'
import Container from '../components/Container';
import { useState } from 'react';












const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};


export default function About() {

  const [links, setLinks] = useState(["https://facebook.com", "https://youtube.com"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");



  const [linkInsert, setLinkInsert] = useState("");
  const [linkUpdate, setLinkUpdate] = useState(-1);


  const [open, setOpen] = useState(false);
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


  return (
    <Container>
      <nav className='flex items-center justify-between pt-2'>
        <Link to="/">
          <Button variant="outlined" className='text-slate-400!' startIcon={<ArrowBackIcon></ArrowBackIcon>}>Back Home</Button>
        </Link>
        <Button variant="outlined" className='text-slate-400!' endIcon={<OnlinePredictionIcon></OnlinePredictionIcon>}>Save Cloud</Button>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
              placeholder="https://google.com"
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
            className='w-full outline-none text-white text-2xl h-10 mb-2 p-2 font-semibold border-b'
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
