import { useMarketplaceContext } from '../context/MarketplaceContext';

const SearchBar = () => {
  const { search, handleSearch } = useMarketplaceContext();

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
