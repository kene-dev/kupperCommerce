import React from 'react';

const Modal = ({ handleModal, children, formSize }) => {
  // Calculate the size class directly without useState
  const getSizeClass = () => {
    switch (formSize) {
      case "sm":
        return 'h-[40%]';
      case "md":
        return 'lg:h-[60%] h-max';
      case "lg":
        return 'h-[80%]';
      default:
        return 'h-[80%]';
    }
  };

  const sizeClass = getSizeClass();

  return (
    <div 
      onClick={() => handleModal(false)} 
      className='w-full fixed inset-0 bg-black/70 flex items-center justify-center px-5 z-50' 
    >
      <div 
        onClick={(e) => e.stopPropagation()}  
        className={`lg:w-3/5 w-full ${sizeClass} overflow-y-scroll bg-white rounded-md p-6 py-10 lg:px-16 flex flex-col gap-5 items-center justify-center relative z-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;