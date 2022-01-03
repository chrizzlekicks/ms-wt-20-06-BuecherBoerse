import React from 'react';

const TextAreaInput = (props) => {
    return (
        <>
            <div className='form-control'>
                <label htmlFor={props.htmlFor} name={props.name}>
                    {props.htmlFor}
                </label>
                <textarea {...props} />
            </div>
        </>
    );
};

export default TextAreaInput;
