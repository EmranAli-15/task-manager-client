import { Box, Button, Modal } from '@mui/material'
import SummarizeIcon from '@mui/icons-material/Summarize';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ImageIcon from '@mui/icons-material/Image';
import "../App.css";

import { Link } from 'react-router'
import Container from '../components/Container';
import { useState } from 'react';
import { nlNL } from '@mui/material/locale';












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

  const [links, setLinks] = useState(["https://facebook.com", "https://youtube.com", "https://google.com", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis omnis quos quo velit, possimus voluptatem consequatur praesentium soluta.", "https://istagram.com"]);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [linkInsert, setLinkInsert] = useState("");
  const [linkUpdate, setLinkUpdate] = useState(0);


  const [open, setOpen] = useState(false);
  const handleOpen = ({ link, index }: { link: string | null, index: number }) => {
    if (link) {
      setLinkInsert(link)
      setLinkUpdate(index);
    }
    setOpen(true);
  }
  const handleClose = () => {
    if (linkUpdate && linkInsert) {
      const copiedLinks = [...links]
      copiedLinks.splice(linkUpdate, 1, linkInsert);
      setLinks(copiedLinks);
      setLinkUpdate(0);
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
  }


  return (
    <Container>
      <div className='flex items-center justify-end'>
        <Link to="/">
          <Button variant="contained" endIcon={<SummarizeIcon></SummarizeIcon>}>Back Home</Button>
        </Link>
      </div>

      <div className='bg-[#f6f7f880] my-2 p-3 rounded'>
        <div className='flex items-center gap-x-2 justify-end'>
          <Button onClick={() => handleOpen({ link: null, index: 0 })}><InsertLinkIcon className='text-black'></InsertLinkIcon></Button>
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
            <div className='flex items-center justify-end'>
              <Button onClick={handleClose}><CheckBoxIcon></CheckBoxIcon></Button>
            </div>
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
          links.length > 0 && <p>Links:</p>
        }
        {
          links.map((link, index) => (
            <div className='flex items-center bg-black/5' key={index}>
              <button
                onClick={() => handleOpen({ link, index })}
                className='w-10 cursor-pointer hover:bg-[#1976d2] hover:text-white'>
                <InsertLinkIcon></InsertLinkIcon>
              </button>
              <p className='AddNoteInput-box p-1 w-full font-thin'>{link}</p>
              <button
                onClick={() => handleDeleteLink(index)}
                className='w-10 cursor-pointer hover:bg-[#1976d2] hover:text-white'>
                <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
              </button>
            </div>
          ))
        }

      </div>

    </Container>
  )
}
