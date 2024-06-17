import React from 'react';

function AlertMessage(props) {
    return (
        <div className='my-3'>
            <div className={`alert alert-${props.alert}`} role="alert">
                <strong> {props.message} </strong>
            </div>
        </div>
    )
}

export default AlertMessage;
