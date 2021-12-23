import React from 'react';
import { useLayoutContext } from '../context/LayoutContext';

const Loading2 = () => {
    const { loading } = useLayoutContext();
    return (
        <>
            <div
                className={`${loading ? 'load-wrapper open' : 'load-wrapper'}`}
            >
                <div className='loader'></div>
            </div>
        </>
    );
};

export default Loading2;
