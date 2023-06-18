import React from 'react';
import ReactDOM from 'react-dom';
import ScreenLoader from './ScreenLoader';

const LoaderModal = () => {
  return ReactDOM.createPortal(
    <div className="loader-modal">
      <ScreenLoader />
    </div>,
    document.getElementById('modal-root') // Add a new div element with id="modal-root" in your index.html file
  );
};

export default LoaderModal;
