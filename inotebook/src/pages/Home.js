import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes } from '../redux/slice/GetNotesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { clearDeleteMessage } from '../redux/slice/DeleteNotes';
import AlertMessage from '../component/AlertMessage';
import useAlert from '../customhook/useAlert';
import { getLoggedInUserDetails } from '../redux/auth/page/GetUserDetailsSlice';
import TagsDropdown from '../component/TagsDropdown';
import NotesCard from '../component/NotesCard';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const validationAlertMsg = useSelector(state => state.ValidationAlert.alert);
  const userNotes = useSelector(state => state.getNotes.data);
  const deleteNoteMessage = useSelector(state => state.deleteNotes.deleteNoteMsg);
  const noteTagState = useSelector(state => state.noteTag.tagValue);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [asking, setAsking] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const filterNotes = (notes, selectedTag) => {
    if (selectedTag === '-1' || selectedTag === undefined) return notes;
    return notes?.filter(note => note.NoteTag === selectedTag);
  };

  useEffect(() => {
    setFilteredNotes(filterNotes(userNotes, noteTagState?.selectedNoteTagValue));
  }, [userNotes, noteTagState?.selectedNoteTagValue]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getAllNotes());
      dispatch(getLoggedInUserDetails());
    } else {
      navigate("/Login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (deleteNoteMessage) {
      dispatch(getAllNotes());
      showAlert({ type: "success", message: deleteNoteMessage });
      dispatch(clearDeleteMessage());
    }
  }, [deleteNoteMessage]);

  const handleAskNotes = async () => {
    if (!question.trim()) return;
    setAsking(true);
    setAnswer(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ai/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ question, notes: userNotes })
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer('Failed to get answer. Try again.');
    }
    setAsking(false);
  };

  return (
    <>
      <div className='errordiv'>
        {validationAlertMsg && <AlertMessage alert={validationAlertMsg.type} message={validationAlertMsg.message} />}
      </div>

      {/* Ask Your Notes Panel */}
      <div className='col-md-12 mb-3'>
        <button
          className='btn btn-outline-primary'
          onClick={() => { setShowChat(!showChat); setAnswer(null); }}
        >
          🤖 {showChat ? 'Hide' : 'Ask Your Notes'}
        </button>
        {showChat && (
          <div className='card mt-2 p-3'>
            <h6 className='mb-2'>Ask anything about your notes</h6>
            <div className='d-flex gap-2'>
              <input
                className='form-control'
                type='text'
                placeholder='e.g. What do I need to finish tomorrow?'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskNotes()}
              />
              <button
                className='btn btn-primary'
                onClick={handleAskNotes}
                disabled={asking}
              >
                {asking ? '...' : 'Ask'}
              </button>
            </div>
            {answer && (
              <div className='alert alert-success mt-2 mb-0'>
                <strong>Answer:</strong> {answer}
              </div>
            )}
          </div>
        )}
      </div>

      <div className='col-md-12 d-flex mb-5'>
        <div className='col-md-3 mt-3'>
          <TagsDropdown />
        </div>
        <div className='col-md-9 my-3 d-flex'>
          <form className="col-md-7 col-sm-7 col-lg-7 d-flex">
            <input className="form-control me-5" type="search" placeholder="Search Notes" aria-label="Search" />
          </form>
          {filteredNotes ? <div></div> : <div><h1>No Notes created by this user</h1></div>}
          <Link className='btn btn-primary px-5' to="/AddNote">Add Note</Link>
        </div>
      </div>

      {filteredNotes && filteredNotes.map(data => (
        <div className='col-md-4 mt-3' key={data.NotesId}>
          <NotesCard nData={data} />
        </div>
      ))}
    </>
  );
};

export default Home;