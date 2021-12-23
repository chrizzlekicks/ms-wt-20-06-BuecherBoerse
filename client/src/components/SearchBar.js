import React from 'react';

const SearchBar = ({ search, handleSearch }) => {
    return (
        <>
            <section className='search-bar'>
                <input
                    type='text'
                    className='search-form'
                    value={search}
                    onChange={handleSearch}
                    placeholder='Nach Titel oder Autor*in suchen...'
                ></input>
            </section>
        </>
    );
};

export default SearchBar;
