import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { funcDeleteNote } from '../redux/slice/DeleteNotes';
import ModalButton from './ModalButton';
import EditNote from './EditNote';

export default function NotesCard(props) {
    const useModalRef = useRef(null);
    const dispatch = useDispatch();
    const [currentData, setCurrentData] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [summary, setSummary] = useState(null);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [autoTagging, setAutoTagging] = useState(false);
    const [classifying, setClassifying] = useState(false);

    const handleOpenModal = () => setModalOpen(true);

    useEffect(() => {
        if (isModalOpen && useModalRef.current) {
            const modal = new window.bootstrap.Modal(useModalRef.current);
            modal.show();
            const handleHidden = () => setModalOpen(false);
            useModalRef.current.addEventListener('hidden.bs.modal', handleHidden);
        }
    }, [isModalOpen, currentData]);

    const handleSummarize = async () => {
        setLoadingSummary(true);
        setSummary(null);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ai/summarize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'auth-token': token },
                body: JSON.stringify({ text: props.nData.Description })
            });
            const data = await response.json();
            setSummary(data.summary);
        } catch (error) {
            setSummary('Failed to summarize. Try again.');
        }
        setLoadingSummary(false);
    };

    const handleAutoTag = async () => {
        setAutoTagging(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ai/autotag`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'auth-token': token },
                body: JSON.stringify({ title: props.nData.Title, description: props.nData.Description })
            });
            const data = await response.json();
            alert(`Suggested tag: ${data.tag}`);
        } catch (error) {
            alert('Failed to generate tag.');
        }
        setAutoTagging(false);
    };

    const handleClassify = async () => {
        setClassifying(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ai/classify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'auth-token': token },
                body: JSON.stringify({ text: `${props.nData.Title} ${props.nData.Description}` })
            });
            const data = await response.json();
            alert(`Category: ${data.category} (${Math.round(data.confidence * 100)}% confidence)`);
        } catch (error) {
            alert('Classification failed.');
        }
        setClassifying(false);
    };

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
                    {isModalOpen &&
                        <EditNote
                            modalRef={useModalRef}
                            currentNoteData={currentData}
                            isModalOpen={isModalOpen}
                        />
                    }
                </div>
                <p className="card-text">{props.nData.Description}</p>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={handleSummarize}
                        disabled={loadingSummary}
                    >
                        {loadingSummary ? 'Summarizing...' : '✨ Summarize'}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleAutoTag}
                        disabled={autoTagging}
                    >
                        {autoTagging ? 'Tagging...' : '🏷️ Auto-tag'}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-success"
                        onClick={handleClassify}
                        disabled={classifying}
                    >
                        {classifying ? 'Classifying...' : '🧠 Classify'}
                    </button>
                </div>
                {summary && (
                    <div className="alert alert-info mt-2 mb-0 p-2">
                        <small><strong>Summary:</strong> {summary}</small>
                    </div>
                )}
            </div>
            <Link to="/About" className='btn btn-newcolor'>Show Note</Link>
        </div>
    );
}