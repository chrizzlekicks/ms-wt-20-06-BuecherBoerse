import Book from './Book';

const Shelf = (props) => {
  return (
    <>
      {props.children.length < 1 ? (
        <section className='empty-shelf'>
          <div className='error-message basic-flex'>
            <h3 className='title'>
              Aktuell sind noch keine Bücher hochgeladen. Lade schnell welche
              hoch und biete sie zum Verleihen an!
            </h3>
          </div>
        </section>
      ) : (
        <ul className='shelf-container'>
          {props.children.map((book) => {
            return <Book key={book._id} {...book} />;
          })}
        </ul>
      )}
    </>
  );
};

export default Shelf;
