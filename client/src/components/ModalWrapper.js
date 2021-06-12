const ModalWrapper = (props) => {
  return (
    <>
      <section className={`${props ? 'modal-wrapper open' : 'modal-wrapper'}`}>
        {props.children}
      </section>
    </>
  );
};

export default ModalWrapper;
