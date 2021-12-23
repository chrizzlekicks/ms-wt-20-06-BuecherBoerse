import React from 'react';
import FilterButton from './FilterButton';

const Filter = (props) => {
    return (
        <>
            <section className='btn-container'>
                {props.elements.map((element, index) => {
                    if (element === undefined) {
                        return null;
                    }
                    return (
                        <FilterButton
                            key={index}
                            onClick={() => {
                                props.onClick(element);
                            }}
                        >
                            {element}
                        </FilterButton>
                    );
                })}
            </section>
        </>
    );
};

export default Filter;
