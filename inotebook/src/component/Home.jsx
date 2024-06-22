import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes } from '../redux/slice/GetNotesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { funcDeleteNote, clearDeleteMessage } from '../redux/slice/DeleteNotes';
import ModalButton from './ModalButton';
import EditNote from './EditNote';


// dispatch send the event action to reducer and then reducer do action when action gives some data after this it return data to store.
const Home = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const allNotesData = useSelector(state => state.getNotes.data);
  let deleteNoteMessage = useSelector(state => state.deleteNotes.deleteNoteMsg);
  const [alert, setAlert] = useState(null);
  const useModalRef = useRef(null);
  const [currentData, setCurrentData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getAllNotes());
    }
    else {
      navigate("/Login");
    }
  }, []);  //  empty dependency array means run once time when component renders.

  useEffect(() => {
    if (deleteNoteMessage) {
      dispatch(getAllNotes());
      setAlert({ type: "success", message: deleteNoteMessage });
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
      {
        allNotesData && allNotesData.map(data => {
          return (
            <div className='col-md-4' key={data.NotesId}>
              <div className="card my-3">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title">{data.Title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => dispatch(funcDeleteNote(data.NotesId))}
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
                <button onClick={(e) => dispatch(getAllNotes())}>Show Note</button>
              </div>
            </div>
          )
        })
      }
      <div className='col-md-6 offset-md-3 my-3'>
        {allNotesData ? <div></div> : <h1>No Notes created by this user</h1>}
        <Link className='btn btn-primary' to="/AddNote">Add Note</Link>
      </div>
    </>
  )
}
// onClick={() => dispatch(funcDeleteNote(data.NotesId))} -> By this we get those id jisko box ko hum click kr rhe hai. Isliye humne aise function bnake usme id di qki
// already map chlra tha toh voi id milti jispe click kr rhe hai.

export default Home;


/*
Note :-
 Now I understand how to use state in redux. we use state with the reducer. Create another reducer and use the state. what you want like in this.
 we need to null the deleteNoteMsg and we know will achieved by state only but when we use the useState here we don't get the result. And when I create
 another reducer function where i set the state of deleteNotemsg is null. and export that reducer becasue its a action that's we export this from action.
 By this we are using the state with the reducer.
 */
