import React from 'react';

const ActionBtn = (props) => {
    return (
        <>
            <button className='action-btn' {...props}>
                {props.children}
            </button>
        </>
    );
};

export default ActionBtn;
