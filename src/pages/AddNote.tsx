import { Box, Button, Modal } from '@mui/material'
import SummarizeIcon from '@mui/icons-material/Summarize';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ImageIcon from '@mui/icons-material/Image';

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

  const [links, setLinks] = useState(["https://facebook.com", "https://youtube.com", "https://google.com"]);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [linkInsert, setLinkInsert] = useState("");


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    let updatedLinks = [...links, linkInsert];
    setLinks(updatedLinks);
    setOpen(false);
    setLinkInsert("");
  };

  return (
    <Container>
      <div className='flex items-center justify-end'>
        <Link to="/">
          <Button variant="contained" endIcon={<SummarizeIcon></SummarizeIcon>}>Back Home</Button>
        </Link>
      </div>

      <div className='bg-[#f6f7f880] my-2 p-3 rounded'>
        <div className='flex items-center gap-x-2 justify-end'>
          <Button onClick={handleOpen}><InsertLinkIcon className='text-black'></InsertLinkIcon></Button>
          <Button><ImageIcon className='text-black'></ImageIcon></Button>
        </div>



        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <input
              type="url"
              onChange={(e) => setLinkInsert(e.target.value)}
              value={linkInsert}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2] outline-none transition-all"
              placeholder="https://google.com"
            />
          </Box>
        </Modal>



        <textarea name="" className='w-full outline-none rounded bg-black/5 p-2' id=""></textarea>

        {
          links.map((link, index) => (
            <div className='flex items-center gap-x-2 bg-black/5' key={index}>
              <Button><InsertLinkIcon></InsertLinkIcon></Button>
              <p>{link}</p>
            </div>
          ))
        }

      </div>

    </Container>
  )
}
