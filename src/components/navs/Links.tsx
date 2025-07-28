import { Box, Button, Modal } from "@mui/material";
import "../../App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useState } from "react";

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


export default function Links({ links, setLinks }: { links: string[], setLinks: Function }) {
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
    return (
        <div>
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

            <div>
                <Button
                    onClick={() => handleOpen({ link: null, index: -1 })}
                    variant="outlined"
                    className='text-slate-400! normal-case!'
                    endIcon={<InsertLinkIcon className="text-blue-600"></InsertLinkIcon>}>
                    Links
                </Button>
            </div>
        </div>
    )
}
