import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes } from '../redux/slice/GetNotesSlice';
import { Link } from 'react-router-dom';
import { funcDeleteNote, clearDeleteMessage  } from '../redux/slice/DeleteNotes';


// dispatch send the event action to reducer and then reducer do action when action gives some data after this it return data to store.
const Home = () => {
  const dispatch = useDispatch();
  const allNotesData = useSelector(state => state.getNotes.data);
  let deleteNoteMessage = useSelector(state => state.deleteNotes.deleteNoteMsg);
  const [alert, setAlert] = useState(null);
 

  useEffect(() => {
    dispatch(getAllNotes());
  // as we know that empty dependency array means run once time when component renders.
  }, []);

  useEffect(() => {
    if(deleteNoteMessage){
      dispatch(getAllNotes());
      setAlert({type : "success", message : deleteNoteMessage});
      dispatch(clearDeleteMessage());
    }
  }, [deleteNoteMessage]);
 /*
  Now I understand how to use state in redux. we use state with the reducer. Create another reducer and use the state. what you want like in this.
  we need to null the deleteNoteMsg and we know will achieved by state only but when we use the useState here we don't get the result. And when I create
  another reducer function where i set the state of deleteNotemsg is null. and export that reducer becasue its a action that's we export this from action.
  By this we are using the state with the reducer.
  */
  
  return (  
    <>
      {
        allNotesData && allNotesData.map(data => {
          return (
            <div className='col-md-4'>
              <div className="card my-3">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                  <h5 className="card-title">{data.Title}</h5>
                  <i className="fa-solid fa-trash-can mx-2" onClick={() => dispatch(funcDeleteNote(data.NotesId))}></i>
                  <i className="fa-solid fa-pen-to-square mx-2"></i>
                  </div>
                  <p className="card-text">{data.Description}</p>
                </div>
                <button onClick={(e) => dispatch(getAllNotes())}>Show Note</button>
              </div>
            </div>
          )
        })
      }
      <Link className='btn btn-primary' to="/AddNote">Add Note</Link>
    </>
  )
}
// onClick={() => dispatch(funcDeleteNote(data.NotesId))} -> By this we get those id jisko box ko hum click kr rhe hai. Isliye humne aise function bnake usme id di qki
// already map chlra tha toh voi id milti jispe click kr rhe hai.

export default Home
