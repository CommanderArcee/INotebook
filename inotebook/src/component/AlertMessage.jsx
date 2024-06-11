import React from 'react';

function AlertMessage(props) {
    return (
        <div className='my-3'>
            <div class={`alert alert-${props.alert}`} role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default AlertMessage;
