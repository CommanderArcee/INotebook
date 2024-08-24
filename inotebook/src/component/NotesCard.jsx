import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { funcDeleteNote, clearDeleteMessage } from '../redux/slice/DeleteNotes';
import ModalButton from './ModalButton';
import EditNote from './EditNote';

export default function NotesCard(props) {
    const useModalRef = useRef(null);
    const dispatch = useDispatch();
    const [currentData, setCurrentData] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

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
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{props.nData.Title}</h5>
                    <i
                        className="fa-solid fa-trash-can mx-2"
                        onClick={() => dispatch(funcDeleteNote(props.nData.NotesId))}
                    ></i>
                    <ModalButton
                        onOpenModal={handleOpenModal}
                        onClick={() => setCurrentData({ id: props.nData.NotesId, title: props.nData.Title, description: props.nData.Description })}
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
                <p className="card-text">{props.nData.Description}</p>
            </div>
            <Link to="/About" className='btn btn-newcolor'>Show Note</Link>
        </div>
    )
}
