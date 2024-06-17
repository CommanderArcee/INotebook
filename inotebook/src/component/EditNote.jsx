import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {clearStatusMsg, updateEditNote}  from '../redux/slice/UpdateNoteSlice';
import AlertMessage from './AlertMessage';
import { getAllNotes } from '../redux/slice/GetNotesSlice';


export default function EditNote({ modalRef, currentNoteData, isModalOpen }) {
  const dispatch = useDispatch();
  const [etitle, setTitle] = useState('');
  const [edescription, setDescritpion] = useState('');
  const udpateStatus = useSelector(state => state.editNote.status);
  const updateRes = useSelector(state => state.editNote.data);
  const [alert, setAlert] = useState(null);

  /* 
  Always use useEffect when you want to set the data in the statevariable but we need to use setstate function of useState and we must to know that useState works when
  component to be render. that's why everytime we use useEffect. whether we need to set data or anything all the time react works when component to be render. So, we give
  currentNoteData because when state will be change of this variable useEffect will be run.
  */

  useEffect(() => {
    // Set initial state values based on currentNoteData
    if (currentNoteData) {
      setTitle(currentNoteData.title);
      setDescritpion(currentNoteData.description);
    }
  }, [currentNoteData]);

  const editNote = () => {
      const objEditNote = {
        title :  etitle,
        description : edescription
      }
      dispatch(updateEditNote({id : currentNoteData.id, ...objEditNote}));
      /* In api method get undefined because we passed obj and variable. so run compiler not understand that's why then we send data in the object form and use spread operator
      because we send object inside the object that's so and we know with the help of spread it return the data as one obj/one array if we use two objects or array in one array/one obj.
      this is behavior/beauty of spread. */
  };

  useEffect(() => {
    let timeoutId; 
    if (updateRes && updateRes[0] === 1) {
      if (udpateStatus === "success") {
        setAlert({ type: udpateStatus, message: 'Data update Successfully!' });
        dispatch(getAllNotes());
        timeoutId = setTimeout(() => {
          setAlert(null);
          dispatch(clearStatusMsg());
        }, 1000);
      }
      else {
        setAlert({ type: "danger", message: 'something went wrong!!' });
        timeoutId = setTimeout(() => {
          setAlert(null)
          dispatch(clearStatusMsg());
        }, 1000);
      }
    }

    return () => clearTimeout(timeoutId);

  }, [udpateStatus, updateRes]);

  return (
    <div>
      <div ref={modalRef} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={`${!isModalOpen}`} >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="title" className="form-control" id="title" aria-describedby="title" name="title" onChange={(ev) => setTitle(ev.target.value)} value={etitle} />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="3" name='description' onChange={(ev) => setDescritpion(ev.target.value)} value={edescription}></textarea>
              </div>
            </div>
            {
              <div>
                {alert && <AlertMessage alert={alert.type} message={alert.message} />}
              </div>
            }
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={editNote}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
