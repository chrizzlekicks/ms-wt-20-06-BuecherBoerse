import React from 'react';

const FilterButton = (props) => {
    return (
        <>
            <button className='filter-btn' key={props.id} {...props}>
                {props.children}
            </button>
        </>
    );
};

export default FilterButton;
