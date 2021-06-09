import FilterButton from './FilterButton';
import { useMarketplaceContext } from '../context/MarketplaceContext';

const GenreFilter = () => {
  const { categories, filterBooks } = useMarketplaceContext();

  return (
    <>
      <section className='btn-container'>
        {categories.map((category, index) => {
          return (
            <FilterButton
              key={index}
              onClick={() => {
                filterBooks(category);
              }}
            >
              {category}
            </FilterButton>
          );
        })}
      </section>
    </>
  );
};

export default GenreFilter;
