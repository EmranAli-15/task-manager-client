import "../App.css";
import { baseURL } from '../utils/baseURL';
import { useMyProvider } from '../contextApi/ContextApi';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router'
import { Alert, Box, Button, LinearProgress } from '@mui/material'

import Swal from 'sweetalert2';

import Color from '../components/navs/Color';
import Container from '../components/Container';
import Category from '../components/navs/Category';
import ListsInputs from "../components/navs/Lists";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LandscapeIcon from '@mui/icons-material/Landscape';
import InsideCardSkeleton from "../ui/InsideCardSkeleton";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type TNote = {
  title: string;
  details: string;
  lists: string[];
  userId: string;
  categoryId: string;
  _id: string;
  color: {
    header: string;
    body: string;
  };
}

let autoTitle = "";
let autoColor = {};
let autoNoteId = "";
let autoCategoryId = "";
let autoDescription = "";
let autoLists: string[] = [];

let initialAutoTitle = "";
let initialAutoColor = {};
let initialAutoCategoryId = "";
let initialAutoDescription = "";
let initialAutoLists: string[] = [];

export default function InsideNote() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useMyProvider();
  const [data, setData] = useState<TNote | any>({});

  const [error, setError] = useState("");
  const [coming, setComing] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const [title, setTitle] = useState("");
  const [noteId, setNoteId] = useState("");
  const [lists, setLists] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("687231b05282890fad825d83");
  const [color, setColor] = useState({ header: "#ffdf20", body: "#fff085" });


  const addList = () => {
    setLists(prev => [...prev, ""]);
  };




  const handleUpdate = async () => {
    setError("");
    setLoading(true);
    const data = { title, lists, details: description, categoryId, userId: user.id, color };

    if (!title && lists.length == 0 && !description) {
      setError("Empty note can't be save!");
      setLoading(false);
      setTimeout(() => setError(""), 2000);
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
      } finally {
        setTimeout(() => {
          setError("");
          setSuccess(false);
        }, 2000);
      }
    }
  }



  const handleDeleteConfirm = async () => {
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

      navigate(-1);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    } finally {
      setTimeout(() => {
        setError("");
      }, 2000)
    }
  }
  const handleDelete = async () => {
    Swal.fire({
      title: "Want to delete note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteConfirm();
      }
      else return;
    });
  }

  const handleUpComing = () => {
    setComing("Up Coming Feature!!");
    setTimeout(() => setComing(""), 2000);
  }


  // for navbar scrolling
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };


  // fetch data
  const handleFetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/getSingleNote/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error("Note not found!");
      }

      setData(result.data);
    } catch (error: any) {
      setError("Something happened wrong!");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }
  }

  // fetch data effect
  useEffect(() => {
    handleFetchData();
    window.scrollTo(0, 0);
  }, [id])

  // setting data on states
  useEffect(() => {
    setNoteId(data?._id);
    setTitle(data?.title);
    setColor(data?.color);
    setLists(data?.lists ?? []);
    setDescription(data?.details);
    setCategoryId(data?.categoryId);

    autoNoteId = data?._id;
    autoColor = data?.color;
    autoTitle = data?.title;
    autoLists = data?.lists ?? [];
    autoDescription = data?.details;
    autoCategoryId = data?.categoryId;

    initialAutoTitle = data?.title;
    initialAutoColor = data?.color;
    initialAutoLists = data?.lists ?? [];
    initialAutoDescription = data?.details;
    initialAutoCategoryId = data?.categoryId;
  }, [data])

  // Get changed data for auto save
  useEffect(() => {
    autoTitle = title;
    autoLists = lists;
    autoColor = color;
    autoCategoryId = categoryId;
    autoDescription = description;
  }, [title, lists, description, categoryId, color])


  // This is for auto save
  useEffect(() => {
    return (() => {
      const data = {
        userId: user.id,
        title: autoTitle,
        lists: autoLists,
        color: autoColor,
        details: autoDescription,
        categoryId: autoCategoryId,
      };


      if (!data.title && data.lists.length === 0 && !data.details) {
        return;
      }

      if (
        autoColor == initialAutoColor &&
        autoTitle == initialAutoTitle &&
        autoLists == initialAutoLists &&
        autoCategoryId == initialAutoCategoryId &&
        autoDescription == initialAutoDescription
      ) {
        return;
      }

      fetch(`${baseURL}/api/updateNote/${autoNoteId}`, {
        method: 'PATCH',
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
  }, [location])



  return (
    <Container>
      <div>
        {
          loading ? <InsideCardSkeleton></InsideCardSkeleton> :
            !loading && error ? <Alert severity="error">{error}</Alert> :
              <div className='overflow-auto'>

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
                  <div className="relative hidden -mt-4">
                    <Button
                      className="bg-[#252525]! text-slate-300!"
                      onClick={() => scroll('left')}
                      variant="contained"
                      startIcon={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}>
                    </Button>
                  </div>
                  {/* nav scroller left end */}

                  <div ref={scrollRef} className='flex items-center gap-2 overflow-auto md:flex-wrap'>
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

                    <Color openColor={openColor} setOpenColor={setOpenColor} color={color} setColor={setColor}></Color>

                    <div>
                      <Button
                        onClick={addList}
                        variant="outlined"
                        className='text-slate-400! normal-case!'
                        endIcon={<ChecklistIcon className="text-orange-400"></ChecklistIcon>}>
                        Lists
                      </Button>
                    </div>

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

                  {/* nav scroller right */}
                  <div className="relative hidden -mt-4">
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
                {success && <Alert severity="success">Note updated.</Alert>}
                {coming && <Alert severity="warning">{coming}</Alert>}


                {/* body section */}
                <div className='text-white my-5 px-2 md:px-0'>
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

                  {/* list section */}
                  <div className="mt-2">
                    <ListsInputs lists={lists} setLists={setLists}></ListsInputs>
                  </div>

                  {/* text area section */}
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Note'
                    className='w-full h-screen outline-none mt-5'>
                  </textarea>
                </div>
                {/* body section end */}

              </div>
        }
      </div>
    </Container>
  )
}
