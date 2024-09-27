import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AlertCircle, X } from 'lucide-react';

const Modal = ({ isOpen, onClose, onRegister }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <div className="flex items-center mb-4">
          <AlertCircle className="text-yellow-500 mr-2" size={24} />
          <h2 className="text-xl font-bold text-white">Access Required</h2>
        </div>
        <p className="text-gray-300 mb-6">
          Please register or log in to access the Blogs. Join our community to unlock exclusive content!
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onRegister}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded hover:from-green-600 hover:to-blue-700 transition-colors"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

const PrivateRoute = ({ element }) => {
  const [redirect, setRedirect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setShowModal(true);
    }
  }, [token]);

  const handleRegister = () => {
    setShowModal(false);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/register" />;
  }

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onRegister={handleRegister}
      />
      {token ? element : null}
    </>
  );
};

export default PrivateRoute;