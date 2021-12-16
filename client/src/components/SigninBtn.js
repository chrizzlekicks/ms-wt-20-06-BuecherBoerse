import React from 'react';

const SigninBtn = (props) => {
    return (
        <>
            <button className='signin-btn' {...props}>
                {props.children}
            </button>
        </>
    );
};

export default SigninBtn;
