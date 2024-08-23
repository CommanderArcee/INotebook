import React, { useEffect, useState } from 'react';
import tags from '../Enums/EnumTag';

export const handleChangeTagDrpDwnVal = () => {
    let selectValue = document.getElementById('notetagDrpdwn').value;
    return selectValue;
}

export default function TagsDropdown(props) {

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
