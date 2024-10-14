import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UserManagementForm from './../components/UserManagementForm';


const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formValues, setFormValues] = useState({
    id: '',
    userName: '',
    userSurname: '',
    idNumber: '',
    userEmail: '',
    userActive: true,
  });

  useEffect(() => {
    if (user) {
      setFormValues({
        id: user.id || '',
        userName: user.userName || '',
        userSurname: user.userSurname || '',
        userIdNumber: user.userIdNumber || '',
        userEmail: user.userEmail || '',
        isUserActive: user.userActive || false,
      });
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const handleSaveEvent = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await onSave({
      ...formValues,
      userActive: formValues.userActive !== undefined ? formValues.userActive : true,
    });
    onClose(); 
  } catch (error) {
    console.error("There was a problem saving the changes made to the user.");
  } finally {
    setLoading(false);
  }
};

  const handleClearEvent = () => {
    setFormValues({
      id: '',
      userName: '',
      userSurname: '',
      userIdNumber: '',
      userEmail: '',
      isUserActive: true,
    });
  };

  const fields = [
    { name: 'userName', label: 'Name', type: 'text', placeholder: 'Enter name' },
    { name: 'userSurname', label: 'Surname', type: 'text', placeholder: 'Enter surname' },
    { name: 'userIdNumber', label: 'ID Number', type: 'text', placeholder: 'Enter ID number' },
    { name: 'userEmail', label: 'Email', type: 'email', placeholder: 'Enter email' },
    { name: 'isUserActive', label: 'Active User', type: 'checkbox', placeholder: '' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit User"
      className="max-w-2xl w-full mx-auto my-10 bg-white p-6 shadow-lg rounded-lg"
    //   overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl mb-4">Edit User</h2> 
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <UserManagementForm
        header="Edit User"
        fields={fields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSave={handleSaveEvent}
        onClear={handleClearEvent}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Close
      </button>
    </Modal>
  );
};

export default EditUserModal;
