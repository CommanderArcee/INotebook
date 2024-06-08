import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes } from '../redux/slice/GetNotesSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  // dispatch send the event action to reducer and then reducer do action when action gives some data after this it return data to store.
  const dispatch = useDispatch();
  const allNotesData = useSelector(state => state.getNotesReducer.data);

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);


  return (
    <>
      {
        allNotesData && allNotesData.map(data => {
          return (
            <div className='col-md-4'>
              <div className="card my-3">
                <div className="card-body">
                  <h5 className="card-title">{data.Title}</h5>
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

export default Home
