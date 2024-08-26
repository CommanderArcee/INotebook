import React, { useEffect, useState } from 'react';
import { addNotes, clearDataMsgAfterSavedRecord } from '../redux/slice/AddNewNoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';
import useAlert from '../customhook/useAlert';
import TagsDropdown from './TagsDropdown';
import { getLoggedInUserDetails } from '../redux/auth/page/GetUserDetailsSlice';
import { clearNotetag } from '../redux/slice/NoteTagSlice';

function NewNotes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.addNewNote.isLoading);
  const data = useSelector((state) => state.addNewNote.data);
  const [title, setTitle] = useState("");
  const [description, setDescritpion] = useState("");
  const showAlert = useAlert();
  const validationAlertMsg = useSelector(state => state.ValidationAlert.alert);
  const noteTagState = useSelector(state => state.noteTag.tagValue);

  useEffect(() => {
    dispatch(getLoggedInUserDetails());
  }, []); 

  const saveNotes = () => {
    let {selectedNoteTagValue} = noteTagState;

    if(selectedNoteTagValue === "-1") {
      showAlert({type : "danger" , message : "Please Select Note Tag"});
      return;
    }

    let obj = {
      title,
      description,
      noteTag : selectedNoteTagValue
    }
    if (!status) {
      dispatch(addNotes(obj));
      dispatch(clearNotetag());
    }
  }


  const handleOnChange = (ev) => {
    let { name } = ev.target;
    // Now we don't need textcontent attribute. if we use desctructuring. So we use name attribute in tag to get correct data.

    if (name === 'title') {
      setTitle(ev.target.value);
    }
    if (name === 'description') {
      setDescritpion(ev.target.value);
    }
  }

  useEffect(() => {
    if (data === "Success") {
      dispatch(clearDataMsgAfterSavedRecord());  // As I useDispatch and call one function. So why we add here behind the logic explanation is in Home.jsx page.
      navigate('/');
    } else if (data) {
      showAlert({ type: 'danger', message: 'Something went wrong..' });
      dispatch(clearDataMsgAfterSavedRecord());
    }
  }, [data]);


  return (
    <div className='col-md-12 col-sm-12'>
      <div className='col-md-6 col-sm-6 offset-md-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label label-heading">Title</label>
          <input type="title" className="form-control" id="title" aria-describedby="title" name="title" onChange={handleOnChange} value={title} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label label-heading">Description</label>
          <textarea className="form-control" id="description" rows="3" name='description' onChange={handleOnChange} value={description}></textarea>
        </div>
        <div className="col-md-8 col-sm-8 offset-md-6 d-flex mt-5">
          <label htmlFor="description" className="form-label dropdown-label">Note tag</label>
          <TagsDropdown/>
        </div>
        <button className="btn btn-primary my-5" onClick={saveNotes}>Save</button>
        <Link className="btn btn-primary ms-2" to="/">Back to Notes</Link>
        <div className='errordiv'>
          {validationAlertMsg && <AlertMessage alert={validationAlertMsg.type} message={validationAlertMsg.message} />}
        </div>
      </div>
    </div>
  )
}

export default NewNotes;

// Notes :-
// why we use -> useEffect() because alertMessage function calls sucessfully but using the alertMessage function inside JSX won't execute and render the alert component properly.
//  As we know useEffect calls when component to be render. Or also it is call with another way as we know useEffect calls with dependency array.
/*
   So, here we give state variable because when data state changes it will runs. Because useEffect somethings needs to call so it depends on dependancy array.
   that's why we give statevariable so when it will change(means when statevariable get data) that inside code will runs it means what data we need to set.
   By this we set the our data  with the key interms of object.
   we set data in form of object because its easy to set multiple values in object form  that's why as below we set the variables in the object form.
 */
