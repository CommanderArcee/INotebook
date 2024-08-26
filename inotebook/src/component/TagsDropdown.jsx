import React from 'react';
import tags from '../Enums/EnumTag';
import { useDispatch } from 'react-redux';
import { setNotetag } from '../redux/slice/NoteTagSlice';

export default function TagsDropdown(props) {
    let dispatch = useDispatch();

    const handleChangeTagDrpDwnVal = () => {
        let selectedNoteTagValue = document.getElementById('notetagDrpdwn')?.value;
        dispatch(setNotetag({selectedNoteTagValue}));
    }

    return (
        <select className='dropdown btn dropdown-header mx-5 dropdown-border' id='notetagDrpdwn' onChange={handleChangeTagDrpDwnVal}>
            <option className="dropdown-item" value={"-1"}>Select Note Tag</option>
            {
                Object.entries(tags).map(tag => (
                    <option className="dropdown-item" value={tag[1]} key={tag[1]}>
                        {tag[0]}
                    </option>
                ))
            }
        </select>
    )
}
