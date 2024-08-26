import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes } from '../redux/slice/GetNotesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { clearDeleteMessage } from '../redux/slice/DeleteNotes';
import AlertMessage from '../component/AlertMessage';
import useAlert from '../customhook/useAlert';
import { getLoggedInUserDetails } from '../redux/auth/page/GetUserDetailsSlice';
import TagsDropdown from '../component/TagsDropdown';
import NotesCard from '../component/NotesCard';


// dispatch send the event action to reducer and then reducer do action when action gives some data after this it return data to store.
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const validationAlertMsg = useSelector(state => state.ValidationAlert.alert);
  const userNotes = useSelector(state => state.getNotes.data);
  const deleteNoteMessage = useSelector(state => state.deleteNotes.deleteNoteMsg);
  const noteTagState = useSelector(state => state.noteTag.tagValue);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Function to filter notes based on selected tag
  const filterNotes = (notes, selectedTag) => {
    if (selectedTag === '-1' || selectedTag === undefined) return notes; // If no tag is selected, return all notes
    return notes?.filter(note => note.NoteTag === selectedTag);
  };

  // Filter notes whenever userNotes or noteTagState changes
  useEffect(() => {
    setFilteredNotes(filterNotes(userNotes, noteTagState?.selectedNoteTagValue));
  }, [userNotes, noteTagState?.selectedNoteTagValue]);

  // Fetch notes and user details on component mount
  useEffect(() => {
    if (localStorage.getItem('token')) {

      dispatch(getAllNotes());
      dispatch(getLoggedInUserDetails());

    } else {
      navigate("/Login");
    }
  }, [dispatch, navigate]);


  // Handle note deletion
  useEffect(() => {
    if (deleteNoteMessage) {
      dispatch(getAllNotes()); // Re-fetch notes after deletion
      showAlert({ type: "success", message: deleteNoteMessage });
      dispatch(clearDeleteMessage());
    }
  }, [deleteNoteMessage]);


  return (
    <>
      <div className='errordiv'>
        {validationAlertMsg && <AlertMessage alert={validationAlertMsg.type} message={validationAlertMsg.message} />}
      </div>
      <div className='col-md-12 d-flex mb-5'>
        <div className='col-md-3 mt-3'>
          <TagsDropdown />
        </div>
        <div className='col-md-9 my-3 d-flex'>
          <form className="col-md-7 col-sm-7 col-lg-7 d-flex">
            <input className="form-control me-5" type="search" placeholder="Search Notes" aria-label="Search"/>
          </form>
          {filteredNotes ? <div></div> : <div><h1>No Notes created by this user</h1></div>}
          <Link className='btn btn-primary px-5' to="/AddNote">Add Note</Link>
        </div>
      </div>
      {
        filteredNotes && filteredNotes.map(data => {
          return (
            <div className='col-md-4 mt-3' key={data.NotesId}>
              <NotesCard nData={data} />
            </div>
          )
        })
      }
    </>
  )
}
// onClick={() => dispatch(funcDeleteNote(data.NotesId))} -> By this we get those id jisko box ko hum click kr rhe hai. Isliye humne aise function bnake usme id di qki
// already map chlra tha toh voi id milti jispe click kr rhe hai.

export default Home;

