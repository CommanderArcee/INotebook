import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes } from '../redux/slice/GetNotesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { funcDeleteNote, clearDeleteMessage } from '../redux/slice/DeleteNotes';
import ModalButton from './ModalButton';
import EditNote from './EditNote';
import AlertMessage from './AlertMessage';
import useAlert from '../customhook/useAlert';
import { getLoggedInUserDetails } from '../redux/auth/page/GetUserDetailsSlice';


// dispatch send the event action to reducer and then reducer do action when action gives some data after this it return data to store.
const Home = () => {
  const useModalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const validationAlertMsg = useSelector(state => state.ValidationAlert.alert);
  const allNotesData = useSelector(state => state.getNotes.data);
  const deleteNoteMessage = useSelector(state => state.deleteNotes.deleteNoteMsg);
  const [currentData, setCurrentData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getAllNotes());
      dispatch(getLoggedInUserDetails());
    }
    else {
      navigate("/Login");
    }
  }, []);  //  empty dependency array means run once time when component renders.

  useEffect(() => {
    if (deleteNoteMessage) {
      dispatch(getAllNotes());
      showAlert({ type: "success", message: deleteNoteMessage });
      dispatch(clearDeleteMessage());
    }
  }, [deleteNoteMessage]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && useModalRef.current) {
      const modal = new window.bootstrap.Modal(useModalRef.current);
      modal.show();

      const handleHidden = () => {
        setModalOpen(false);
      };

      useModalRef.current.addEventListener('hidden.bs.modal', handleHidden);
    }
  }, [isModalOpen, currentData]);


  return (
    <>
      <div className='errordiv'>
        {validationAlertMsg && <AlertMessage alert={validationAlertMsg.type} message={validationAlertMsg.message} />}
      </div>
      <div className='col-md-8 offset-md-3 my-3 d-flex'>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success me-5" type="submit">Search</button>
        </form>
        {allNotesData ? <div></div> : <h1>No Notes created by this user</h1>}
        <Link className='btn btn-primary px-5' to="/AddNote">Add Note</Link>
      </div>
      {
        allNotesData && allNotesData.map(data => {
          return (
            <div className='col-md-4 mt-3' key={data.NotesId}>
              <div className="card my-3">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title">{data.Title}</h5>
                    <i
                      className="fa-solid fa-trash-can mx-2"
                      onClick={() => dispatch(funcDeleteNote(data.NotesId))}
                    ></i>
                    <ModalButton
                      onOpenModal={handleOpenModal}
                      onClick={() => setCurrentData({ id: data.NotesId, title: data.Title, description: data.Description })}
                    />
                    {
                      isModalOpen &&
                      <EditNote
                        modalRef={useModalRef}
                        currentNoteData={currentData}
                        isModalOpen={isModalOpen}
                      />
                    }
                  </div>
                  <p className="card-text">{data.Description}</p>
                </div>
                <Link to="/About" className='btn btn-newcolor'>Show Note</Link>
              </div>
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

