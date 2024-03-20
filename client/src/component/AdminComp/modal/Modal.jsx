const ModalAdd = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center p-5 md:p-0"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-full md:p-5 flex flex-col">
        <button
          className={`text-white font-extrabold text-xl place-self-center bg-blue-500 p-2 rounded-2xl mb-2 duration-300 transition-all hover:bg-blue-900`}
          onClick={() => onClose()}
        >
          X Close
        </button>
        <div className="bg-white p-2 rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default ModalAdd;
