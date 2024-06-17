import React from 'react';

export default function ModalButton({onOpenModal, onClick}) {
    
  function handleClickFunc () {
    if(onOpenModal) onOpenModal();
    if(onClick) onClick();
  }
  
  return (
    <div>
      <button onClick={handleClickFunc} type="button" className="btn">
        <i className="fa-solid fa-pen-to-square mx-2"></i>
      </button>
    </div>
  )
}

