import React from 'react';

const ModalWrapper = (props) => {
    return (
        <>
            <section
                className={`${props ? 'modal-wrapper open' : 'modal-wrapper'}`}
                onClick={props.onClick}
            >
                {props.children}
            </section>
        </>
    );
};

export default ModalWrapper;
