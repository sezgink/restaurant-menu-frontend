const EditPanelModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          {/* <button
            className="text-gray-500 hover:text-gray-800 float-right"
            onClick={onClose}
          >
            ✖
          </button> */}
          <div>{children}</div>
        </div>
      </div>
    );
  };
  
  export default EditPanelModal;